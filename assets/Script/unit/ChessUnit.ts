import { _decorator, Camera, Color, Component, Label, MeshRenderer, Node, Tween, Vec3, tween } from 'cc';
import { GameConfig } from '../config/GameConfig';
import { ChessDef, ChessType, CHESS_DEFS, EQUIP_DEFS, EquipId, Team, UnitData } from '../data/GameData';
import { MeshKit } from '../core/MeshKit';
import { FloatingText } from '../fx/FloatingText';
import { Projectile } from '../fx/Projectile';
import { UIUtil } from '../ui/UIUtil';

const { ccclass } = _decorator;

interface BuffEntry {
    tag?: string;
    atkMul?: number;
    defMul?: number;
    atkSpeedMul?: number;
    moveSpeedMul?: number;
    rangeAdd?: number;
    flatAtk?: number;
    disarm?: boolean;
    until?: number;
}

const LUNGE_TIME = 0.16;
const GOLD = '#ffd24a';
/** 血条 / 蓝条相对棋子节点的挂点高度（棋子模型顶部约 1.16） */
const HUD_HEIGHT = 1.5;

/** 棋盘上的一个棋子：属性、3D 外观、血条蓝条、攻击/受击/技能表现 */
@ccclass('ChessUnit')
export class ChessUnit extends Component {
    public data: UnitData = null!;
    public def: ChessDef = null!;
    public alive = true;

    public hp = 0;
    public mp = 0;
    public now = 0;
    public attackCd = 0;

    public moving = false;
    public col = 0;
    public row = 0;

    public dmgDealt = 0;
    public dmgTaken = 0;
    public healed = 0;

    public cameraRef: Camera = null!;
    public hudLayer: Node = null!;
    public allies: ChessUnit[] = [];
    public enemies: ChessUnit[] = [];

    private visual: Node = null!;
    private hud: Node = null!;
    private hpFill: Node = null!;
    private mpFill: Node = null!;
    private statsLabel: Label = null!;
    private flashParts: MeshRenderer[] = [];
    private flashColors: string[] = [];
    private flashT = 0;

    private moveFrom = new Vec3();
    private moveTo = new Vec3();
    private moveT = 0;
    private moveDur = 0;

    private lungeT = 0;
    private lungeDir = new Vec3();

    private faceAngle = 0;
    private faceTarget = 0;

    private buffs: BuffEntry[] = [];
    private skillUntil = 0;
    private skillType: ChessType = null!;
    private nextSkillAt = 0;
    private gUsed = false;
    private mUsed = false;

    private lastHpText = '';
    private lastMpText = '';

    private tmpV = new Vec3();
    private tmpV2 = new Vec3();
    private tmpEuler = new Vec3();

    /** 初始化（创建 3D 外观与血条） */
    public init(data: UnitData, camera: Camera, hudLayer: Node) {
        this.data = data;
        this.def = CHESS_DEFS[data.type];
        this.cameraRef = camera;
        this.hudLayer = hudLayer;
        this.col = data.col;
        this.row = data.row;

        this.node.name = `${this.def.role}_${data.uid}`;
        GameConfig.cellToWorld(data.col, data.row, this.tmpV);
        this.node.setPosition(this.tmpV);

        this.hp = this.maxHp;
        this.mp = 0;
        this.buildBody();
        this.buildHud();
        this.updateHud();
    }

    // ===================== 外观 =====================
    private buildBody() {
        const isEnemy = this.data.team === Team.Enemy;
        const mainColor = isEnemy ? this.def.enemyColor : this.def.color;

        this.visual = new Node('visual');
        this.visual.parent = this.node;
        const s = 1 + (this.data.star - 1) * 0.14;
        this.visual.setScale(new Vec3(s, s, s));

        // 阵营光环
        this.addPart('ring', MeshKit.cylinder(0.42, 0.42, 0.05),
            isEnemy ? '#ff5a5a' : '#3fa9f5', new Vec3(0, 0.03, 0), 0.7);

        switch (this.data.type) {
            case ChessType.Tank: {
                this.addPart('body', MeshKit.box(0.58, 0.5, 0.4), mainColor, new Vec3(0, 0.44, 0));
                this.addPart('head', MeshKit.sphere(0.2), '#cfd8e6', new Vec3(0, 0.82, 0));
                this.addPart('shield', MeshKit.box(0.1, 0.46, 0.36), '#9aa8bb', new Vec3(0.36, 0.5, 0.05));
                this.addPart('armL', MeshKit.box(0.14, 0.3, 0.2), mainColor, new Vec3(-0.36, 0.5, 0));
                this.addPart('armR', MeshKit.box(0.14, 0.3, 0.2), mainColor, new Vec3(0.32, 0.5, -0.06));
                break;
            }
            case ChessType.Assassin: {
                this.addPart('body', MeshKit.capsule(0.16, 0.15, 0.5), mainColor, new Vec3(0, 0.4, 0));
                this.addPart('head', MeshKit.sphere(0.18), '#cfd8e6', new Vec3(0, 0.78, 0));
                this.addPart('hood', MeshKit.box(0.26, 0.14, 0.26), '#2b2f3d', new Vec3(0, 0.88, 0));
                const b1 = this.addPart('bladeL', MeshKit.box(0.04, 0.38, 0.05), '#d9e2ff', new Vec3(-0.27, 0.42, 0));
                b1.node.setRotationFromEuler(0, 0, 18);
                const b2 = this.addPart('bladeR', MeshKit.box(0.04, 0.38, 0.05), '#d9e2ff', new Vec3(0.27, 0.42, 0));
                b2.node.setRotationFromEuler(0, 0, -18);
                break;
            }
            case ChessType.Ranger: {
                this.addPart('body', MeshKit.cylinder(0.16, 0.22, 0.5), mainColor, new Vec3(0, 0.35, 0));
                this.addPart('head', MeshKit.sphere(0.18), '#e8d7b8', new Vec3(0, 0.72, 0));
                this.addPart('cape', MeshKit.box(0.42, 0.34, 0.05), '#24455c', new Vec3(0, 0.5, -0.18));
                this.addPart('bow', MeshKit.box(0.05, 0.46, 0.05), '#c9a227', new Vec3(0.3, 0.5, 0.02));
                this.addPart('quiver', MeshKit.box(0.1, 0.28, 0.1), '#3d5a3d', new Vec3(-0.26, 0.46, -0.1));
                break;
            }
            case ChessType.Healer:
            default: {
                this.addPart('body', MeshKit.cylinder(0.2, 0.26, 0.55), mainColor, new Vec3(0, 0.36, 0));
                this.addPart('head', MeshKit.sphere(0.18), '#f0e2c8', new Vec3(0, 0.75, 0));
                this.addPart('hood', MeshKit.box(0.36, 0.1, 0.3), '#f0f0f0', new Vec3(0, 0.9, 0));
                this.addPart('orb', MeshKit.sphere(0.1), '#ffe08a', new Vec3(0.3, 0.62, 0.12), 1.6);
                break;
            }
        }

        // 星级宝石
        for (let i = 0; i < this.data.star; i++) {
            const x = (i - (this.data.star - 1) * 0.5) * 0.17;
            this.addPart('star' + i, MeshKit.sphere(0.055), GOLD, new Vec3(x, 1.16, 0), 1.4);
        }
    }

    private addPart(name: string, mesh: any, color: string, pos: Vec3, emissive = 0): MeshRenderer {
        const mr = MeshKit.part(this.visual, name, mesh, color, pos, emissive);
        this.flashParts.push(mr);
        this.flashColors.push(color);
        return mr;
    }

    // ===================== 血条 =====================
    private buildHud() {
        if (!this.hudLayer) {
            return;
        }
        const isEnemy = this.data.team === Team.Enemy;
        const n = UIUtil.node(this.hudLayer, 'UnitHud', 132, 50);
        this.hud = n;

        const nameLb = UIUtil.label(n, 'name', `${this.def.role} ${this.data.star}★`, 12,
            isEnemy ? '#ff9a9a' : '#a9d8ff', true, 128);
        nameLb.node.setPosition(0, 20);

        this.statsLabel = UIUtil.label(n, 'stats', '', 10, '#dfe9f7', false, 128);
        this.statsLabel.node.setPosition(0, 7);

        const hpBar = UIUtil.bar(n, 'hp', 98, 5, '#101827', '#5ce07a');
        hpBar.root.setPosition(0, -5);
        this.hpFill = hpBar.fill;

        const mpBar = UIUtil.bar(n, 'mp', 98, 4, '#101827', '#4a7dff');
        mpBar.root.setPosition(0, -12);
        this.mpFill = mpBar.fill;
    }

    private updateHud() {
        if (!this.hud || !this.hud.isValid || !this.cameraRef) {
            return;
        }
        // 血条 / 蓝条固定挂在棋子头顶：世界坐标 → 画布中心相对 UI 坐标
        const wp = this.node.worldPosition;
        this.tmpV2.set(wp.x, wp.y + HUD_HEIGHT, wp.z);
        UIUtil.worldToUI(this.cameraRef, this.tmpV2, this.tmpV);
        this.hud.setPosition(this.tmpV);

        this.hpFill.setScale(new Vec3(Math.max(0.001, this.hp / this.maxHp), 1, 1));
        this.mpFill.setScale(new Vec3(Math.max(0, this.mp / GameConfig.MANA_MAX), 1, 1));

        const hpTxt = `${Math.ceil(this.hp)}/${this.maxHp}`;
        const mpTxt = `${Math.floor(this.mp)}/${GameConfig.MANA_MAX}`;
        if (hpTxt !== this.lastHpText || mpTxt !== this.lastMpText) {
            this.lastHpText = hpTxt;
            this.lastMpText = mpTxt;
            this.statsLabel.string = `HP ${hpTxt}  MP ${mpTxt}`;
        }
    }

    // ===================== 属性 =====================
    public hasEquip(id: EquipId): boolean {
        return this.data.equips.indexOf(id) >= 0;
    }

    private starMult(): number {
        return GameConfig.STAR_MULT[this.data.star] || 1;
    }

    public get maxHp(): number {
        let hp = this.def.hp * this.starMult();
        for (const e of this.data.equips) {
            hp += EQUIP_DEFS[e].hp || 0;
        }
        return Math.round(hp);
    }

    public get atk(): number {
        let base = this.def.atk * this.starMult();
        for (const e of this.data.equips) {
            base += EQUIP_DEFS[e].atk || 0;
        }
        let mul = 1;
        let flat = 0;
        for (const b of this.buffs) {
            if (b.until > this.now) {
                mul *= (b.atkMul || 1);
                flat += (b.flatAtk || 0);
            }
        }
        mul = Math.min(mul, 3.2);
        return Math.max(1, Math.round(base * mul + flat));
    }

    public get defense(): number {
        let base = this.def.def * this.starMult();
        for (const e of this.data.equips) {
            base += EQUIP_DEFS[e].def || 0;
        }
        let mul = 1;
        for (const b of this.buffs) {
            if (b.until > this.now) {
                mul *= (b.defMul || 1);
            }
        }
        return Math.max(0, Math.round(base * mul));
    }

    public get atkSpeed(): number {
        let mul = 1;
        for (const e of this.data.equips) {
            mul += (EQUIP_DEFS[e].atkSpeed || 0);
        }
        for (const b of this.buffs) {
            if (b.until > this.now) {
                mul *= (b.atkSpeedMul || 1);
            }
        }
        return Math.max(0.1, this.def.atkSpeed * mul);
    }

    public get moveSpeed(): number {
        let mul = 1;
        for (const e of this.data.equips) {
            mul += (EQUIP_DEFS[e].moveSpeed || 0);
        }
        for (const b of this.buffs) {
            if (b.until > this.now) {
                mul *= (b.moveSpeedMul || 1);
            }
        }
        return Math.max(0.15, this.def.moveSpeed * mul);
    }

    public get range(): number {
        let r = this.def.range;
        for (const e of this.data.equips) {
            r += (EQUIP_DEFS[e].range || 0);
        }
        for (const b of this.buffs) {
            if (b.until > this.now) {
                r += (b.rangeAdd || 0);
            }
        }
        return r;
    }

    public get disarmed(): boolean {
        for (const b of this.buffs) {
            if (b.disarm && b.until > this.now) {
                return true;
            }
        }
        return false;
    }

    private skillActive(): boolean {
        return this.now < this.skillUntil;
    }

    // ===================== Buff =====================
    public addSelfBuff(entry: BuffEntry, duration: number) {
        const e = entry;
        e.until = this.now + duration;
        this.buffs.push(e);
    }

    public addDebuff(tag: string, entry: BuffEntry, duration: number) {
        for (const b of this.buffs) {
            if (b.tag === tag && b.until > this.now) {
                return; // 同类特效不可叠加
            }
        }
        const e = entry;
        e.tag = tag;
        e.until = this.now + duration;
        this.buffs.push(e);
    }

    // ===================== 战斗行为 =====================
    public setContext(allies: ChessUnit[], enemies: ChessUnit[]) {
        this.allies = allies;
        this.enemies = enemies;
    }

    public startMove(col: number, row: number, duration: number) {
        this.col = col;
        this.row = row;
        this.moveFrom.set(this.node.position);
        GameConfig.cellToWorld(col, row, this.moveTo);
        this.moveT = 0;
        this.moveDur = Math.max(0.08, duration);
        this.moving = true;
        this.faceTo(this.moveTo, true);
    }

    public attack(target: ChessUnit) {
        if (!this.alive || !target || !target.alive) {
            return;
        }
        this.faceTo(target.node.position, true);
        this.lungeTo(target.node.position);

        if (this.range > 1) {
            Projectile.shoot(this.node.parent as Node, this.muzzlePos(), target.hitPos(),
                new Color(this.data.team === Team.Player ? '#9fe0ff' : '#ffb27a'), 0.22);
        }
        this.strike(target, true);

        // 射手技能：同时攻击 2 个目标
        if (this.data.type === ChessType.Ranger && this.skillActive() && this.skillType === ChessType.Ranger) {
            const second = this.findSecondTarget(target);
            if (second) {
                Projectile.shoot(this.node.parent as Node, this.muzzlePos(), second.hitPos(),
                    new Color('#b8ffb0'), 0.22);
                this.strike(second, false);
            }
        }
    }

    private findSecondTarget(exclude: ChessUnit): ChessUnit | null {
        let best: ChessUnit = null;
        let bestD = 999;
        for (const e of this.enemies) {
            if (!e || !e.alive || e === exclude) {
                continue;
            }
            const d = Math.abs(e.col - this.col) + Math.abs(e.row - this.row);
            if (d < bestD) {
                bestD = d;
                best = e;
            }
        }
        return best;
    }

    private strike(target: ChessUnit, primary: boolean) {
        const dmg = target.takeDamage(this.atk, this);
        this.dmgDealt += dmg;
        if (primary) {
            this.mp = Math.min(GameConfig.MANA_MAX, this.mp + GameConfig.MANA_ON_ATTACK);
            this.applyOnHit(target);
        }
    }

    /** 蓝量满后释放技能 */
    public tryCastSkill() {
        if (!this.alive || this.mp < GameConfig.MANA_MAX || this.now < this.nextSkillAt) {
            return;
        }
        this.mp = 0;
        this.nextSkillAt = this.now + 1.0;
        this.skillType = this.data.type;
        FloatingText.show(this.topPos(new Vec3()), this.def.shout, new Color(GOLD), 26);

        switch (this.data.type) {
            case ChessType.Tank:
                this.skillUntil = this.now + 8;
                this.addSelfBuff({ defMul: 2.0 }, 8);
                break;
            case ChessType.Assassin:
                this.skillUntil = this.now + 2;
                this.addSelfBuff({ atkMul: 2.0, moveSpeedMul: 1.6 }, 2);
                break;
            case ChessType.Ranger:
                this.skillUntil = this.now + 2;
                this.addSelfBuff({ atkSpeedMul: 2.2 }, 2);
                break;
            case ChessType.Healer:
            default: {
                this.skillUntil = this.now + 1;
                for (const ally of this.allies) {
                    if (ally && ally.alive) {
                        ally.heal(ally.maxHp * 0.1, this);
                    }
                }
                break;
            }
        }
    }

    /** 返回实际造成的伤害 */
    public takeDamage(raw: number, from: ChessUnit | null): number {
        if (!this.alive || raw <= 0) {
            return 0;
        }
        const dmg = Math.max(1, Math.round(raw * 100 / (100 + this.defense)));
        this.hp = Math.max(0, this.hp - dmg);
        this.dmgTaken += dmg;
        this.mp = Math.min(GameConfig.MANA_MAX, this.mp + GameConfig.MANA_ON_HIT);
        this.flash();
        FloatingText.show(this.topPos(new Vec3()), `-${dmg}`, new Color('#ff6b6b'), 22);

        if (from && from.alive) {
            if (this.hasEquip('K')) {
                from.addDebuff('K', { atkMul: 0.85 }, 3);
            }
            if (this.hasEquip('I')) {
                const back = from.takeDamage(dmg * 0.1, null);
                this.dmgDealt += back;
            }
        }

        if (this.hp <= 0) {
            this.die();
        }
        return dmg;
    }

    public heal(amount: number, creditTo?: ChessUnit) {
        if (!this.alive || amount <= 0) {
            return;
        }
        const real = Math.min(amount, this.maxHp - this.hp);
        if (real < 1) {
            return;
        }
        this.hp += real;
        (creditTo || this).healed += real;
        FloatingText.show(this.topPos(new Vec3()), `+${Math.round(real)}`, new Color('#5ce07a'), 20);
    }

    private applyOnHit(target: ChessUnit) {
        if (this.hasEquip('F')) {
            target.addDebuff('F', { atkSpeedMul: 0.8 }, 3);
        }
        if (this.hasEquip('H')) {
            target.addDebuff('H', { defMul: 0.8 }, 3);
        }
        if (this.hasEquip('J')) {
            target.addDebuff('J', { moveSpeedMul: 0.65 }, 3);
        }
        if (this.hasEquip('G') && !this.gUsed) {
            this.gUsed = true;
            target.addDebuff('G', { disarm: true }, 3);
            FloatingText.show(target.topPos(new Vec3()), '禁攻 3s', new Color('#7de0c0'), 18);
        }
        if (this.hasEquip('L')) {
            this.heal(this.maxHp * 0.1);
        }
        if (this.hasEquip('M') && !this.mUsed) {
            this.mUsed = true;
            this.addSelfBuff({ flatAtk: this.maxHp * 0.1 }, 9999);
        }
        if (this.hasEquip('N')) {
            this.addSelfBuff({ atkMul: 1.1 }, 9999);
        }
    }

    /** 回收（重开 / 下一回合时清理节点与血条） */
    public dispose() {
        if (this.visual && this.visual.isValid) {
            Tween.stopAllByTarget(this.visual);
        }
        if (this.hud && this.hud.isValid) {
            this.hud.destroy();
        }
        if (this.node && this.node.isValid) {
            this.node.destroy();
        }
    }

    public die() {
        if (!this.alive) {
            return;
        }
        this.alive = false;
        this.moving = false;
        if (this.hud && this.hud.isValid) {
            this.hud.active = false;
        }
        const v = this.visual;
        tween(v)
            .to(0.32, { scale: new Vec3(0.01, 0.01, 0.01) }, { easing: 'backIn' })
            .call(() => {
                // 只隐藏不销毁：结算界面仍需读取该棋子的战斗数据，下一回合 rebuildUnits 再统一清理
                if (this.node && this.node.isValid) {
                    this.node.active = false;
                }
            })
            .start();
    }

    // ===================== 表现 =====================
    private flash() {
        this.flashT = 0.12;
        const white = MeshKit.mat('#ffffff', 0.8);
        for (const mr of this.flashParts) {
            if (mr && mr.isValid) {
                mr.material = white;
            }
        }
    }

    private restoreFlash() {
        for (let i = 0; i < this.flashParts.length; i++) {
            const mr = this.flashParts[i];
            if (mr && mr.isValid) {
                mr.material = MeshKit.mat(this.flashColors[i]);
            }
        }
    }

    private lungeTo(pos: Vec3) {
        const p = this.node.position;
        const dx = pos.x - p.x;
        const dz = pos.z - p.z;
        const len = Math.sqrt(dx * dx + dz * dz) || 1;
        this.lungeDir.set(dx / len, 0, dz / len);
        this.lungeT = LUNGE_TIME;
    }

    private faceTo(pos: Vec3, instant = false) {
        const p = this.node.position;
        const dx = pos.x - p.x;
        const dz = pos.z - p.z;
        if (Math.abs(dx) < 0.001 && Math.abs(dz) < 0.001) {
            return;
        }
        this.faceTarget = Math.atan2(dx, dz) * 180 / Math.PI;
        if (instant) {
            this.faceAngle = this.faceTarget;
        }
    }

    public topPos(out: Vec3): Vec3 {
        const p = this.node.position;
        return out.set(p.x, p.y + 1.55, p.z);
    }

    private hitPos(): Vec3 {
        const p = this.node.position;
        return new Vec3(p.x, p.y + 0.55, p.z);
    }

    private muzzlePos(): Vec3 {
        const p = this.node.position;
        return new Vec3(p.x + this.lungeDir.x * 0.3, p.y + 0.72, p.z + this.lungeDir.z * 0.3);
    }

    // ===================== 帧更新 =====================
    /** 准备阶段也每帧刷新头顶血条（战斗中由 updateFrame 驱动逻辑） */
    update() {
        if (this.alive) {
            this.updateHud();
        }
    }

    public updateFrame(dt: number) {
        if (!this.alive) {
            return;
        }
        this.now += dt;
        if (this.attackCd > 0) {
            this.attackCd -= dt;
        }
        if (this.flashT > 0) {
            this.flashT -= dt;
            if (this.flashT <= 0) {
                this.restoreFlash();
            }
        }

        // 格子间移动
        if (this.moving) {
            this.moveT += dt;
            const k = this.moveDur > 0 ? Math.min(1, this.moveT / this.moveDur) : 1;
            const p = this.node.position;
            this.node.setPosition(
                this.moveFrom.x + (this.moveTo.x - this.moveFrom.x) * k,
                this.moveFrom.y,
                this.moveFrom.z + (this.moveTo.z - this.moveFrom.z) * k,
            );
            if (k >= 1) {
                this.moving = false;
            }
        }

        // 视觉偏移：移动起伏 / 攻击前冲
        if (this.visual && this.visual.isValid) {
            if (this.moving) {
                const k = this.moveDur > 0 ? Math.min(1, this.moveT / this.moveDur) : 1;
                this.visual.setPosition(new Vec3(0, Math.sin(k * Math.PI) * 0.1, 0));
            } else if (this.lungeT > 0) {
                this.lungeT = Math.max(0, this.lungeT - dt);
                const k = this.lungeT / LUNGE_TIME;
                this.visual.setPosition(new Vec3(this.lungeDir.x * 0.3 * k, 0, this.lungeDir.z * 0.3 * k));
            } else {
                this.visual.setPosition(Vec3.ZERO);
            }

            // 面向平滑
            let diff = this.faceTarget - this.faceAngle;
            while (diff > 180) {
                diff -= 360;
            }
            while (diff < -180) {
                diff += 360;
            }
            this.faceAngle += diff * Math.min(1, dt * 10);
            this.visual.setRotationFromEuler(0, this.faceAngle, 0);
        }
    }
}
