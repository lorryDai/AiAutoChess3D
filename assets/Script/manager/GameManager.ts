import {
    _decorator, Camera, Color, Component, DirectionalLight, EventTouch, Material, Node, UITransform, Vec2, Vec3,
    director, geometry, view,
} from 'cc';
import { C, GameConfig } from '../config/GameConfig';
import {
    BASE_EQUIPS, ChessType, CHESS_DEFS, CHESS_LIST, EquipId, EQUIP_DEFS, combineEquip,
    nextUid, Team, UnitData,
} from '../data/GameData';
import { ChessUnit } from '../unit/ChessUnit';
import { MeshKit } from '../core/MeshKit';
import { BoardManager } from './BoardManager';
import { BattleManager } from './BattleManager';
import { GameHUD, ResultRow } from '../ui/GameHUD';
import { FloatingText } from '../fx/FloatingText';

const { ccclass, property } = _decorator;

enum Phase {
    Home,
    Prep,
    Battle,
    Result,
}

/** 游戏总控：阶段流转、商店经济、布阵 / 上装 / 合成 / 升星、输入与结算 */
@ccclass('GameManager')
export class GameManager extends Component {
    /** 标准材质资源：保证 builtin-standard effect 随场景加载（运行时材质以它为模板） */
    @property(Material)
    public stdMat: Material | null = null;

    private phase: Phase = Phase.Home;

    private gold = 0;
    private roundNo = 1;

    /** 玩家棋子（含手牌，row = -1 表示在手牌） */
    private roster: UnitData[] = [];
    private bag: EquipId[] = [];
    private enemyRoster: UnitData[] = [];

    private units: ChessUnit[] = [];
    private shopEquips: EquipId[] = [];
    private shopUnits: ChessType[] = [];

    /** 拖拽状态：'bag' = 拖装备，'unit' = 拖棋子 */
    private dragKind: 'bag' | 'unit' | null = null;
    private dragIndex = -1;
    private dragUid = -1;
    private dragging = false;
    private dragFrom = new Vec2();

    private cameraC: Camera = null!;
    private canvas: Node = null!;
    private canvasUT: UITransform = null!;
    private hud: GameHUD = null!;
    private board: BoardManager = null!;
    private battle: BattleManager = null!;

    private worldRoot: Node = null!;
    private unitsRoot: Node = null!;
    private floatRoot: Node = null!;

    private ray = new geometry.Ray();
    private tmpV = new Vec3();
    private tmpScreen = new Vec3();

    onLoad() {
        const scene = director.getScene();
        this.canvas = scene.getChildByName('Canvas');
        this.canvasUT = this.canvas.getComponent(UITransform);

        const camNode = scene.getChildByName('Main Camera');
        this.cameraC = camNode.getComponent(Camera);
        // 相机取景：整盘棋 + 上方信息、下方操作区
        camNode.setPosition(0, 8, 9.6);
        camNode.lookAt(new Vec3(0, 0, 2.6));
        this.cameraC.clearColor = new Color('#0a1220');

        const lightNode = scene.getChildByName('Directional Light');
        if (lightNode) {
            const light = lightNode.getComponent(DirectionalLight);
            if (light) {
                light.illuminance = 90000;
            }
        }

        this.worldRoot = new Node('World');
        this.worldRoot.parent = this.node;
        MeshKit.template = this.stdMat;

        const boardNode = new Node('Board');
        boardNode.parent = this.worldRoot;
        this.board = boardNode.addComponent(BoardManager);
        this.board.build();

        const battleNode = new Node('Battle');
        battleNode.parent = this.node;
        this.battle = battleNode.addComponent(BattleManager);
        this.battle.onFinish = (winner, forced) => this.onBattleFinish(winner, forced);
        this.battle.onSpeedUp = () => {
            if (this.hud) {
                this.hud.setSpeed('战斗加速 x2');
            }
        };

        this.unitsRoot = new Node('Units');
        this.unitsRoot.parent = this.worldRoot;

        this.floatRoot = new Node('FloatLayer');
        this.floatRoot.parent = this.canvas;
        this.floatRoot.layer = this.canvas.layer;
        this.floatRoot.addComponent(UITransform);
        FloatingText.camera = this.cameraC;
        FloatingText.root = this.floatRoot;

        this.canvas.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.canvas.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.canvas.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.canvas.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    start() {
        this.hud = new GameHUD();
        this.hud.build(this.canvas, {
            onStartBattle: () => this.startBattle(),
            onRefresh: () => this.refreshShop(),
            onBuyEquip: (i) => this.buyEquip(i),
            onBuyUnit: (i) => this.buyUnit(i),
            onCombine: () => this.openCombine(),
        });
        this.hud.setHudVisible(false);
        this.hud.showHome(() => this.startGame());
    }

    // ===================== 商店 =====================
    private rollShop() {
        this.shopEquips = [];
        this.shopUnits = [];
        for (let i = 0; i < GameConfig.SHOP_SLOTS; i++) {
            this.shopEquips.push(BASE_EQUIPS[Math.floor(Math.random() * BASE_EQUIPS.length)]);
            this.shopUnits.push(CHESS_LIST[Math.floor(Math.random() * CHESS_LIST.length)]);
        }
        this.hud.setShop(this.shopEquips, this.shopUnits);
    }

    private refreshShop() {
        if (this.phase === Phase.Battle) {
            this.hud.toast('战斗阶段不能刷新商店');
            return;
        }
        if (this.gold < GameConfig.COST) {
            this.hud.toast('金币不足');
            return;
        }
        this.gold -= GameConfig.COST;
        this.rollShop();
        this.syncHud();
    }

    private buyEquip(index: number) {
        if (this.phase === Phase.Battle) {
            this.hud.toast('战斗阶段不能购买');
            return;
        }
        if (this.gold < GameConfig.COST) {
            this.hud.toast('金币不足');
            return;
        }
        if (this.bag.length >= GameConfig.BAG_SIZE) {
            this.hud.toast('装备背包已满');
            return;
        }
        this.gold -= GameConfig.COST;
        const id = this.shopEquips[index];
        this.bag.push(id);
        // 买走后从商店移除该牌
        this.shopEquips.splice(index, 1);
        this.hud.setShop(this.shopEquips, this.shopUnits);
        this.hud.setBag(this.bag);
        this.hud.setCombineEnabled(this.hasCombine());
        this.syncHud();
        this.hud.toast(`购买 ${EQUIP_DEFS[id].name}`);
    }

    private buyUnit(index: number) {
        if (this.phase === Phase.Battle) {
            this.hud.toast('战斗阶段不能购买');
            return;
        }
        if (this.gold < GameConfig.COST) {
            this.hud.toast('金币不足');
            return;
        }
        const benchCount = this.roster.filter(u => u.row < 0).length;
        if (benchCount >= GameConfig.BENCH_SIZE) {
            this.hud.toast('手牌已满，请先上阵');
            return;
        }
        const type = this.shopUnits[index];
        this.gold -= GameConfig.COST;
        this.roster.push({
            uid: nextUid(),
            type,
            star: 1,
            equips: [],
            col: -1,
            row: -1,
            team: Team.Player,
        });
        this.tryMerge(type);
        this.rebuildUnits();
        // 买走后从商店移除该牌
        this.shopUnits.splice(index, 1);
        this.hud.setShop(this.shopEquips, this.shopUnits);
        this.hud.setBench(this.benchList());
        this.syncHud();
        this.hud.toast(`购买 ${CHESS_DEFS[type].role}`);
    }

    /** 购买后立即检测升星（3 个同名同星合成 1 个高星） */
    private tryMerge(type: ChessType) {
        let merged = true;
        while (merged) {
            merged = false;
            for (let star = 1; star <= 2; star++) {
                const group = this.roster.filter(u => u.type === type && u.star === star);
                if (group.length < GameConfig.MERGE_COUNT) {
                    continue;
                }
                // 优先保留场上棋子
                group.sort((a, b) => (a.row >= 0 ? 0 : 1) - (b.row >= 0 ? 0 : 1));
                const keep = group[0];
                const removed = group.slice(1, GameConfig.MERGE_COUNT);
                for (const r of removed) {
                    const idx = this.roster.indexOf(r);
                    if (idx >= 0) {
                        this.roster.splice(idx, 1);
                    }
                }
                keep.star = star + 1;
                this.hud.toast(`${CHESS_DEFS[type].role} 升星 → ${keep.star}★`);
                merged = true;
                break;
            }
        }
    }

    // ===================== 阶段 =====================
    private startGame() {
        this.hud.hideHome();
        this.hud.setHudVisible(true);
        this.gold = 0;
        this.roundNo = 1;
        this.roster = [];
        this.bag = [];
        this.rollShop();
        this.enterPrep();
    }

    private enterPrep() {
        this.phase = Phase.Prep;
        this.gold += GameConfig.START_GOLD;
        this.generateEnemies();
        this.rebuildUnits();

        this.hud.setBattleMode(false);
        this.hud.setTimer('');
        this.hud.setSpeed('');
        this.hud.setBag(this.bag);
        this.hud.setBench(this.benchList());
        this.hud.setCombineEnabled(this.hasCombine());
        this.hud.setHint('点击商店购买棋子/装备 → 拖动棋子到我方格子上阵 → 拖动背包装备到棋子身上穿戴（同名棋子购买后自动升星）');
        this.syncHud();
        this.hud.toast(`准备阶段开始，获得 ${GameConfig.START_GOLD} 金币`);
    }

    private syncHud() {
        if (!this.hud) {
            return;
        }
        let phaseText = '准备阶段';
        let color = C.PLAYER;
        if (this.phase === Phase.Battle) {
            phaseText = '战斗阶段';
            color = C.ENEMY;
        } else if (this.phase === Phase.Result) {
            phaseText = '战斗结算';
            color = C.GOLD;
        }
        this.hud.setStatus(this.gold, this.roundNo, phaseText, color);
    }

    private startBattle() {
        if (this.phase !== Phase.Prep) {
            return;
        }
        const boardCount = this.roster.filter(u => u.row >= 0).length;
        if (boardCount === 0) {
            this.hud.toast('请先购买棋子并布置到我方格子上');
            return;
        }
        this.phase = Phase.Battle;
        this.board.clearSelect();
        this.board.clearMoves();

        this.hud.setBattleMode(true);
        this.hud.setBench(this.benchList());
        this.hud.setBag(this.bag);
        this.hud.setHint('战斗阶段：棋子自动战斗（40 秒加速，60 秒按剩余血量结算），仍可合成装备');
        this.syncHud();
        this.hud.setTimer('0s');

        // 刷新双方状态（满血、清空统计）
        this.rebuildUnits();
        this.battle.begin();
    }

    private onBattleFinish(winner: Team, forced: boolean) {
        this.phase = Phase.Result;

        const rows: ResultRow[] = [];
        for (const u of this.units) {
            if (!u || !u.data) {
                continue;
            }
            const d = CHESS_DEFS[u.data.type];
            rows.push({
                name: `${u.data.team === Team.Player ? '我方' : '敌方'} ${d.role} ${u.data.star}★`,
                color: u.data.team === Team.Player ? '#8fd0ff' : '#ff9b9b',
                dmg: Math.round(u.dmgDealt),
                taken: Math.round(u.dmgTaken),
                heal: Math.round(u.healed),
            });
        }
        rows.sort((a, b) => {
            const pa = a.name.indexOf('我方') === 0 ? 0 : 1;
            const pb = b.name.indexOf('我方') === 0 ? 0 : 1;
            if (pa !== pb) {
                return pa - pb;
            }
            return b.dmg - a.dmg;
        });

        let title = winner === Team.Player ? '战斗胜利' : '战斗失败';
        if (forced) {
            title += '（60 秒剩余血量判定）';
        }

        this.hud.setBattleMode(false);
        this.hud.setTimer(`战斗 ${Math.floor(this.battle.time)}s`);
        this.syncHud();
        this.hud.showResult(title, rows, () => this.nextRound(), () => this.restartGame());
    }

    private nextRound() {
        this.hud.hideResult();
        this.roundNo++;
        this.rollShop();
        this.enterPrep();
    }

    private restartGame() {
        this.hud.hideResult();
        this.startGame();
    }

    // ===================== 输入（拖拽为主，点击兜底） =====================
    /** 触摸点 → 画布本地坐标（以画布中心为原点，与 HUD 布局坐标一致） */
    private localUI(event: EventTouch): Vec2 {
        const ui = event.getUILocation();
        const vs = view.getVisibleSize();
        return new Vec2(ui.x - vs.width * 0.5, ui.y - vs.height * 0.5);
    }

    /** 触摸点是否落在顶栏或底部面板（画布本地 y） */
    private inPanel(ly: number): boolean {
        return ly > this.hud.H * 0.5 - 56 || ly < -this.hud.H * 0.5 + 250;
    }

    /** 触摸点 → 棋盘格子 */
    private rayCell(event: EventTouch): { col: number; row: number } | null {
        const loc = event.getLocation();
        const ray = this.cameraC.screenPointToRay(loc.x, loc.y, this.ray);
        if (Math.abs(ray.d.y) < 0.0001) {
            return null;
        }
        const t = -ray.o.y / ray.d.y;
        if (t <= 0) {
            return null;
        }
        return GameConfig.worldToCell(ray.o.x + ray.d.x * t, ray.o.z + ray.d.z * t);
    }

    private onTouchStart(event: EventTouch) {
        this.dragKind = null;
        this.dragIndex = -1;
        this.dragUid = -1;
        this.dragging = false;
        if (!this.hud || this.phase !== Phase.Prep || this.hud.isModalOpen) {
            return;
        }
        const p = this.localUI(event);
        this.dragFrom.set(p);

        const bagIdx = this.hud.bagIndexAt(p.x, p.y);
        if (bagIdx >= 0 && this.bag[bagIdx]) {
            this.dragKind = 'bag';
            this.dragIndex = bagIdx;
            return;
        }
        const bench = this.benchList();
        const benchIdx = this.hud.benchIndexAt(p.x, p.y);
        if (benchIdx >= 0 && bench[benchIdx]) {
            this.dragKind = 'unit';
            this.dragUid = bench[benchIdx].uid;
            return;
        }
        // 顶栏 / 底部面板区域不再取棋盘格
        if (this.inPanel(p.y)) {
            return;
        }
        const cell = this.rayCell(event);
        if (!cell) {
            return;
        }
        const u = this.roster.find(x => x.row === cell.row && x.col === cell.col);
        if (u) {
            this.dragKind = 'unit';
            this.dragUid = u.uid;
        }
    }

    private onTouchMove(event: EventTouch) {
        if (!this.dragKind) {
            return;
        }
        const p = this.localUI(event);
        if (!this.dragging) {
            if (Math.abs(p.x - this.dragFrom.x) + Math.abs(p.y - this.dragFrom.y) < 8) {
                return;
            }
            this.dragging = true;
            if (this.dragKind === 'bag') {
                const def = EQUIP_DEFS[this.bag[this.dragIndex]];
                this.hud.showDragGhost(`${def.id} ${def.short}`, def.color);
            } else {
                const u = this.roster.find(x => x.uid === this.dragUid);
                if (u) {
                    const def = CHESS_DEFS[u.type];
                    this.hud.showDragGhost(`${def.role} ${u.star}★`, def.color);
                }
            }
        }
        this.hud.moveDragGhost(p.x, p.y);
    }

    private onTouchEnd(event: EventTouch) {
        const kind = this.dragKind;
        const index = this.dragIndex;
        const uid = this.dragUid;
        const dragging = this.dragging;
        this.dragKind = null;
        this.dragIndex = -1;
        this.dragUid = -1;
        this.dragging = false;
        if (this.hud) {
            this.hud.hideDragGhost();
        }

        // 只有真拖拽才有落点结算，单纯点击不做任何操作
        if (kind && dragging) {
            this.resolveDrop(event, kind, index, uid);
        }
    }

    private onTouchCancel() {
        this.dragKind = null;
        this.dragIndex = -1;
        this.dragUid = -1;
        this.dragging = false;
        if (this.hud) {
            this.hud.hideDragGhost();
        }
    }

    /** 拖拽落点结算 */
    private resolveDrop(event: EventTouch, kind: 'bag' | 'unit', index: number, uid: number) {
        const p = this.localUI(event);
        const cell = this.inPanel(p.y) ? null : this.rayCell(event);
        const bench = this.benchList();
        const benchIdx = this.hud.benchIndexAt(p.x, p.y);
        const onBench = benchIdx >= 0 && bench[benchIdx] ? bench[benchIdx] : null;
        const onBoard = cell ? this.roster.find(u => u.row === cell.row && u.col === cell.col) : null;
        const target = onBoard || onBench;

        // 装备拖到棋子身上穿戴（棋盘格子没命中时，取屏幕上离落点最近的己方棋子，放大判定区域）
        if (kind === 'bag') {
            const owner = onBench || onBoard || this.unitNear(event);
            if (!owner) {
                this.hud.toast('把装备拖到棋子身上才能穿戴');
                return;
            }
            this.equipSmart(owner, index);
            return;
        }

        // 棋子拖到格子上阵 / 换位
        const src = this.roster.find(u => u.uid === uid);
        if (!src) {
            return;
        }
        if (target && target.uid !== src.uid) {
            this.hud.toast('棋子不能重叠，购买同名棋子会自动升星');
            return;
        }
        if (!cell) {
            this.hud.toast('把棋子拖到我方格子上阵');
            return;
        }
        if (!GameConfig.isPlayerRow(cell.row)) {
            this.hud.toast('只能布置在下方 3 行我方格子');
            return;
        }
        if (src.row === cell.row && src.col === cell.col) {
            return;
        }
        src.col = cell.col;
        src.row = cell.row;
        this.board.clearSelect();
        this.rebuildUnits();
        this.hud.setBench(this.benchList());
        this.hud.toast(`上阵 ${CHESS_DEFS[src.type].role} ${src.star}★`);
    }

    /** 落点附近最近的己方场上棋子（屏幕空间椭圆判定，拖装备时的宽松拾取） */
    private unitNear(event: EventTouch): UnitData | null {
        const loc = event.getLocation();
        let best: UnitData = null;
        let bestD = 1;
        for (const u of this.roster) {
            if (u.row < 0) {
                continue;
            }
            const inst = this.units.find(x => x.data === u);
            if (!inst || !inst.isValid) {
                continue;
            }
            inst.node.getWorldPosition(this.tmpV);
            // 以棋子身体中部为判定中心（模型高约 1.16）
            this.tmpV.y += 0.8;
            this.cameraC.worldToScreen(this.tmpV, this.tmpScreen);
            const dx = (this.tmpScreen.x - loc.x) / 72;
            const dy = (this.tmpScreen.y - loc.y) / 110;
            const d = dx * dx + dy * dy;
            if (d < bestD) {
                bestD = d;
                best = u;
            }
        }
        return best;
    }

    // ===================== 手牌 / 背包 =====================
    private benchList(): UnitData[] {
        return this.roster.filter(u => u.row < 0);
    }

    private equipTo(unit: UnitData, bagIndex: number) {
        if (unit.equips.length >= GameConfig.MAX_EQUIP) {
            this.hud.toast('该棋子 3 个装备槽已满');
            return;
        }
        const id = this.bag[bagIndex];
        if (!id) {
            return;
        }
        unit.equips.push(id);
        this.bag.splice(bagIndex, 1);
        this.hud.setBag(this.bag);
        this.hud.setCombineEnabled(this.hasCombine());
        this.hud.setBench(this.benchList());
        this.rebuildUnits();
        this.hud.toast(`${CHESS_DEFS[unit.type].role} 装备 ${EQUIP_DEFS[id].name}`);
    }

    /** 拖拽穿戴：一级装备 + 该棋子已有的一级装备 → 弹合成预览确认框 */
    private equipSmart(unit: UnitData, bagIndex: number) {
        const id = this.bag[bagIndex];
        if (!id) {
            return;
        }
        const base = unit.equips.find(e => BASE_EQUIPS.indexOf(e) >= 0);
        if (base && BASE_EQUIPS.indexOf(id) >= 0) {
            const result = combineEquip(base, id);
            if (result) {
                const def = EQUIP_DEFS[result];
                this.hud.showConfirm(`合成预览：${def.name}`, [
                    `${EQUIP_DEFS[base].name} + ${EQUIP_DEFS[id].name} → ${def.name}`,
                    def.special || '',
                    '确认后两件一级装备合成为一件，直接穿戴在该棋子身上',
                    '取消则不穿戴',
                ], () => this.equipCombined(unit, bagIndex, base, result), '确认穿戴');
                return;
            }
        }
        this.equipTo(unit, bagIndex);
    }

    /** 确认后：棋子身上的一级装备 + 背包里的一级装备合成为高级装备并穿戴 */
    private equipCombined(unit: UnitData, bagIndex: number, base: EquipId, result: EquipId) {
        const i = unit.equips.indexOf(base);
        if (i >= 0) {
            unit.equips.splice(i, 1);
        }
        unit.equips.push(result);
        this.bag.splice(bagIndex, 1);
        this.hud.setBag(this.bag);
        this.hud.setCombineEnabled(this.hasCombine());
        this.hud.setBench(this.benchList());
        this.rebuildUnits();
        this.hud.toast(`${CHESS_DEFS[unit.type].role} 穿戴 ${EQUIP_DEFS[result].name}`);
    }

    // ===================== 合成 =====================
    private hasCombine(): boolean {
        const count: Record<string, number> = {};
        for (const id of this.bag) {
            count[id] = (count[id] || 0) + 1;
        }
        // 两件散件即可尝试合成（同件需 2 个）
        let kinds = 0;
        for (const id of BASE_EQUIPS) {
            if ((count[id] || 0) >= 1) {
                kinds++;
            }
        }
        return kinds >= 2 || BASE_EQUIPS.some(id => (count[id] || 0) >= 2);
    }

    private openCombine() {
        const count: Record<string, number> = {};
        for (const id of this.bag) {
            count[id] = (count[id] || 0) + 1;
        }
        const combos: { a: EquipId; b: EquipId; result: EquipId }[] = [];
        for (const a of BASE_EQUIPS) {
            for (const b of BASE_EQUIPS) {
                if (a > b) {
                    continue;
                }
                const need = a === b ? 2 : 1;
                if ((count[a] || 0) < need) {
                    continue;
                }
                if ((count[b] || 0) < need) {
                    continue;
                }
                const result = combineEquip(a, b);
                if (result) {
                    combos.push({ a, b, result });
                }
            }
        }
        this.hud.showCombos(combos, (a, b) => this.previewCombine(a, b));
    }

    private previewCombine(a: EquipId, b: EquipId) {
        const result = combineEquip(a, b);
        if (!result) {
            return;
        }
        this.hud.hideCombos();
        const def = EQUIP_DEFS[result];
        this.hud.showConfirm(`合成预览：${result} ${def.name}`, [
            `${EQUIP_DEFS[a].name} + ${EQUIP_DEFS[b].name} → ${def.name}`,
            def.special || '',
            '确认后消耗两件散件（不可二次合成）',
        ], () => this.doCombine(a, b));
    }

    private doCombine(a: EquipId, b: EquipId) {
        const result = combineEquip(a, b);
        if (!result) {
            return;
        }
        const i1 = this.bag.indexOf(a);
        if (i1 >= 0) {
            this.bag.splice(i1, 1);
        }
        const i2 = this.bag.indexOf(b);
        if (i2 >= 0) {
            this.bag.splice(i2, 1);
        }
        this.bag.push(result);
        this.hud.setBag(this.bag);
        this.hud.setCombineEnabled(this.hasCombine());
        this.hud.toast(`合成成功：${EQUIP_DEFS[result].name}`);
    }

    // ===================== 棋子实例 =====================
    private rebuildUnits() {
        for (const u of this.units) {
            if (u && u.isValid) {
                u.dispose();
            }
        }
        this.units = [];
        this.battle.reset();

        for (const data of this.roster) {
            if (data.row >= 0) {
                this.spawnUnit(data);
            }
        }
        for (const data of this.enemyRoster) {
            this.spawnUnit(data);
        }
    }

    private spawnUnit(data: UnitData) {
        const n = new Node('Unit');
        n.parent = this.unitsRoot;
        const u = n.addComponent(ChessUnit);
        u.init(data, this.cameraC, this.floatRoot);
        this.units.push(u);
        this.battle.addUnit(u);
    }

    private generateEnemies() {
        this.enemyRoster = [];
        const count = Math.min(6, 2 + this.roundNo);
        const used: string[] = [];
        for (let i = 0; i < count; i++) {
            const type = CHESS_LIST[Math.floor(Math.random() * CHESS_LIST.length)];
            const star = this.roundNo >= 5 && Math.random() < 0.4 ? 2 : 1;
            const cell = this.pickEnemyCell(type, used);
            used.push(`${cell.col},${cell.row}`);
            this.enemyRoster.push({
                uid: nextUid(),
                type,
                star,
                equips: [],
                col: cell.col,
                row: cell.row,
                team: Team.Enemy,
            });
        }
    }

    /** 敌方布阵：坦克/刺客（近战）优先前排，射手/治疗师（远程）优先后排 */
    private pickEnemyCell(type: ChessType, used: string[]): { col: number; row: number } {
        const frontRows = [GameConfig.EMPTY_ROW - 1, GameConfig.EMPTY_ROW - 2, 0];
        const backRows = [0, 1, GameConfig.EMPTY_ROW - 1];
        const near = type === 'A' || type === 'B';
        for (const row of near ? frontRows : backRows) {
            const free: number[] = [];
            for (let col = 0; col < GameConfig.COLS; col++) {
                if (used.indexOf(`${col},${row}`) < 0) {
                    free.push(col);
                }
            }
            if (free.length > 0) {
                return { col: free[Math.floor(Math.random() * free.length)], row };
            }
        }
        return { col: Math.floor(Math.random() * GameConfig.COLS), row: 0 };
    }

    // ===================== 每帧 =====================
    update(dt: number) {
        if (!this.hud) {
            return;
        }
        if (this.phase === Phase.Battle) {
            const t = Math.floor(this.battle.time);
            this.hud.setTimer(`战斗 ${t}s / 60s`);
            if (this.battle.time >= GameConfig.SPEED_UP_TIME) {
                this.hud.setSpeed('战斗加速 x2');
            }
        }
    }
}
