import { Color, Label, Node, UITransform, UIOpacity, Vec3, tween } from 'cc';
import { C } from '../config/GameConfig';
import { ChessType, CHESS_DEFS, EQUIP_DEFS, EquipId, UnitData } from '../data/GameData';
import { UIUtil } from './UIUtil';

export interface HudCallbacks {
    onStartBattle: () => void;
    onRefresh: () => void;
    onBuyEquip: (index: number) => void;
    onBuyUnit: (index: number) => void;
    onCombine: () => void;
}

export interface ResultRow {
    name: string;
    color: string;
    dmg: number;
    taken: number;
    heal: number;
}

/** 全部 2D 界面：顶栏、商店、手牌、背包、首页、结算、合成确认、飘提示 */
export class GameHUD {
    public W = 960;
    public H = 640;

    private canvas: Node = null!;
    private cb: HudCallbacks = null!;

    private topBar: Node = null!;
    private bottom: Node = null!;
    private goldLabel: Label = null!;
    private roundLabel: Label = null!;
    private phaseLabel: Label = null!;
    private timerLabel: Label = null!;
    private hintLabel: Label = null!;
    private speedLabel: Label = null!;

    private rowEquip: Node = null!;
    private rowUnit: Node = null!;
    private rowBench: Node = null!;
    private rowBag: Node = null!;
    private startBtn: Node = null!;
    private refreshBtn: Node = null!;
    private combineBtn: Node = null!;

    private homeNode: Node = null!;
    private resultNode: Node = null!;
    private comboNode: Node = null!;
    private confirmNode: Node = null!;
    private toastNode: Node = null!;
    private dragNode: Node = null!;

    private shopEquips: EquipId[] = [];
    private shopUnits: ChessType[] = [];
    private bench: UnitData[] = [];
    private bag: EquipId[] = [];
    private selectedUid = -1;
    private bagSel = -1;

    private left = 0;
    private cardW = 0;

    public build(canvas: Node, cb: HudCallbacks) {
        this.canvas = canvas;
        this.cb = cb;

        const ut = canvas.getComponent(UITransform);
        if (ut && ut.width > 0) {
            this.W = ut.width;
            this.H = ut.height;
        }
        this.left = -(this.W - 12) * 0.5;
        const areaW = this.W - 12 - 56 - 140;
        this.cardW = areaW / 5 - 6;

        this.buildTopBar();
        this.buildBottom();
    }

    // ===================== 顶栏 =====================
    private buildTopBar() {
        const W = this.W;
        const H = this.H;
        this.topBar = UIUtil.rect(this.canvas, 'TopBar', W, 54, C.TOPBAR, 0);
        this.topBar.setPosition(0, H * 0.5 - 27);

        this.goldLabel = UIUtil.label(this.topBar, 'gold', '金币 0', 22, C.GOLD, true);
        this.goldLabel.node.setPosition(-W * 0.5 + 96, 0);

        this.roundLabel = UIUtil.label(this.topBar, 'round', '第 1 回合', 18, C.TEXT, true);
        this.roundLabel.node.setPosition(-W * 0.5 + 268, 0);

        this.phaseLabel = UIUtil.label(this.topBar, 'phase', '准备阶段', 20, C.PLAYER, true);
        this.phaseLabel.node.setPosition(-30, 0);

        this.timerLabel = UIUtil.label(this.topBar, 'timer', '', 18, C.TEXT_DIM, false);
        this.timerLabel.node.setPosition(150, 0);

        this.speedLabel = UIUtil.label(this.topBar, 'speed', '', 16, C.GOLD, true);
        this.speedLabel.node.setPosition(258, 0);

        this.startBtn = UIUtil.button(this.topBar, 'start', '开始战斗', 124, 38, '#c0392b',
            '#ffffff', 20, () => this.cb.onStartBattle());
        this.startBtn.setPosition(W * 0.5 - 78, 0);

        this.hintLabel = UIUtil.label(this.canvas, 'hint', '', 15, C.TEXT_DIM, false, W - 60);
        this.hintLabel.node.setPosition(0, H * 0.5 - 76);
    }

    // ===================== 底部面板 =====================
    private buildBottom() {
        const W = this.W;
        const H = this.H;
        const bh = 236;

        this.bottom = UIUtil.rect(this.canvas, 'BottomPanel', W - 12, bh, C.PANEL, 12);
        this.bottom.setPosition(0, -H * 0.5 + bh * 0.5 + 6);

        // 行标题
        const titles: [string, number][] = [['装备', 84], ['棋子', 38], ['手牌', -12], ['背包', -54]];
        for (const t of titles) {
            const lb = UIUtil.label(this.bottom, 'rowTitle', t[0], 13, C.TEXT_DIM, false);
            lb.node.setPosition(this.left + 22, t[1]);
        }

        this.rowEquip = UIUtil.node(this.bottom, 'rowEquip', W - 12, 44);
        this.rowEquip.setPosition(0, 84);
        this.rowUnit = UIUtil.node(this.bottom, 'rowUnit', W - 12, 44);
        this.rowUnit.setPosition(0, 38);
        this.rowBench = UIUtil.node(this.bottom, 'rowBench', W - 12, 42);
        this.rowBench.setPosition(0, -12);
        this.rowBag = UIUtil.node(this.bottom, 'rowBag', W - 12, 36);
        this.rowBag.setPosition(0, -54);

        // 刷新按钮
        this.refreshBtn = UIUtil.button(this.bottom, 'refresh', '刷新 1金', 100, 36, '#2f4a6b',
            '#ffffff', 16, () => this.cb.onRefresh());
        this.refreshBtn.setPosition((W - 12) * 0.5 - 62, 61);

        // 合成按钮
        this.combineBtn = UIUtil.button(this.bottom, 'combine', '合成装备', 100, 36, '#6b5a2f',
            '#ffe9a8', 16, () => this.cb.onCombine());
        this.combineBtn.setPosition((W - 12) * 0.5 - 62, -30);
    }

    // ===================== 状态 =====================
    public setStatus(gold: number, round: number, phase: string, phaseColor: string) {
        this.goldLabel.string = `金币 ${gold}`;
        this.roundLabel.string = `第 ${round} 回合`;
        this.phaseLabel.string = phase;
        this.phaseLabel.color = new Color(phaseColor);
    }

    public setTimer(text: string) {
        this.timerLabel.string = text;
    }

    public setSpeed(text: string) {
        this.speedLabel.string = text;
    }

    public setHint(text: string) {
        this.hintLabel.string = text;
    }

    public setBattleMode(on: boolean) {
        this.startBtn.active = !on;
        this.refreshBtn.active = !on;
    }

    public setHudVisible(on: boolean) {
        this.topBar.active = on;
        this.bottom.active = on;
        this.hintLabel.node.active = on;
    }

    // ===================== 商店 / 手牌 / 背包 =====================
    public setShop(equips: EquipId[], units: ChessType[]) {
        this.shopEquips = equips;
        this.shopUnits = units;
        this.renderShop();
    }

    public setBench(bench: UnitData[], selectedUid = -1) {
        this.bench = bench;
        this.selectedUid = selectedUid;
        this.renderBench();
    }

    public setBag(bag: EquipId[], bagSel = -1) {
        this.bag = bag;
        this.bagSel = bagSel;
        this.renderBag();
    }

    public setCombineEnabled(on: boolean) {
        this.combineBtn.active = on;
    }

    // ===================== 拖拽 =====================
    /** 手指位置（画布本地坐标）命中的手牌格，-1 表示未命中 */
    public benchIndexAt(lx: number, ly: number): number {
        const rowY = -this.H * 0.5 + 112;
        if (Math.abs(ly - rowY) > 24) {
            return -1;
        }
        return this.slotIndex(lx, this.left + 56 + 31, 66, 62, 8);
    }

    /** 手指位置命中的背包装备格，-1 表示未命中 */
    public bagIndexAt(lx: number, ly: number): number {
        const rowY = -this.H * 0.5 + 70;
        if (Math.abs(ly - rowY) > 20) {
            return -1;
        }
        return this.slotIndex(lx, this.left + 56 + 23, 49, 46, 10);
    }

    private slotIndex(lx: number, startX: number, step: number, slotW: number, count: number): number {
        const i = Math.round((lx - startX) / step);
        if (i < 0 || i >= count) {
            return -1;
        }
        if (Math.abs(lx - (startX + i * step)) > slotW * 0.5 + 2) {
            return -1;
        }
        return i;
    }

    public showDragGhost(text: string, color: string) {
        this.hideDragGhost();
        const n = UIUtil.rect(this.canvas, 'DragGhost', 150, 34, '#0b1220e6', 17);
        UIUtil.frame(n, 'ring', 152, 36, '#00000000', color, 2, 18);
        UIUtil.label(n, 'txt', text, 15, color, true, 140);
        this.dragNode = n;
    }

    public moveDragGhost(lx: number, ly: number) {
        if (this.dragNode && this.dragNode.isValid) {
            this.dragNode.setPosition(lx, ly + 36, 0);
        }
    }

    public hideDragGhost() {
        if (this.dragNode && this.dragNode.isValid) {
            this.dragNode.destroy();
        }
        this.dragNode = null;
    }

    private renderShop() {
        UIUtil.clearChildren(this.rowEquip);
        UIUtil.clearChildren(this.rowUnit);
        const startX = this.left + 56 + this.cardW * 0.5;

        for (let i = 0; i < this.shopEquips.length; i++) {
            const id = this.shopEquips[i];
            const def = EQUIP_DEFS[id];
            const card = this.makeCard(this.rowEquip, this.cardW, 40,
                `${id} ${def.name}`, `${def.special || ''} · 1金`, '#22334a', def.color);
            card.setPosition(startX + i * (this.cardW + 6), 0);
            card.on(Node.EventType.TOUCH_END, () => this.cb.onBuyEquip(i), this);
        }

        for (let i = 0; i < this.shopUnits.length; i++) {
            const type = this.shopUnits[i];
            const def = CHESS_DEFS[type];
            const card = this.makeCard(this.rowUnit, this.cardW, 40,
                `${def.role} ${def.name}`, `${def.hp}血 ${def.atk}攻 ${def.range}格 · 1金`,
                '#22334a', def.color);
            card.setPosition(startX + i * (this.cardW + 6), 0);
            card.on(Node.EventType.TOUCH_END, () => this.cb.onBuyUnit(i), this);
        }
    }

    private makeCard(parent: Node, w: number, h: number, title: string, sub: string,
        bg: string, accent: string): Node {
        const n = UIUtil.rect(parent, 'card', w, h, bg, 7);
        UIUtil.rect(n, 'accent', 4, h - 8, accent, 2).setPosition(-w * 0.5 + 5, 0);
        const t = UIUtil.label(n, 'title', title, 14, C.TEXT, true, w - 16);
        t.node.setPosition(4, 9);
        const s = UIUtil.label(n, 'sub', sub, 10, C.TEXT_DIM, false, w - 16);
        s.node.setPosition(4, -10);
        return n;
    }

    private renderBench() {
        UIUtil.clearChildren(this.rowBench);
        const slotW = 62;
        const step = 66;
        const startX = this.left + 56 + slotW * 0.5;
        for (let i = 0; i < 8; i++) {
            const u = this.bench[i];
            const selected = u && u.uid === this.selectedUid;
            const bg = u ? '#243a52' : C.SLOT_EMPTY;
            const slot = UIUtil.rect(this.rowBench, 'bench' + i, slotW, 40, bg, 6);
            slot.setPosition(startX + i * step, 0);
            if (selected) {
                UIUtil.frame(slot, 'sel', slotW + 2, 42, '#00000000', C.GOLD, 2, 6);
            }
            if (u) {
                const def = CHESS_DEFS[u.type];
                const lb = UIUtil.label(slot, 'name', `${def.role}${u.star > 1 ? ' ' + u.star + '★' : ''}`,
                    12, def.color, true, slotW - 6);
                lb.node.setPosition(0, 4);
                const eq = UIUtil.label(slot, 'eq', u.equips.length > 0 ? u.equips.join('') : '未装备',
                    9, C.TEXT_DIM, false, slotW - 6);
                eq.node.setPosition(0, -12);
            }
        }
    }

    private renderBag() {
        UIUtil.clearChildren(this.rowBag);
        const slotW = 46;
        const step = 49;
        const startX = this.left + 56 + slotW * 0.5;
        for (let i = 0; i < 10; i++) {
            const id = this.bag[i];
            const selected = i === this.bagSel;
            const slot = UIUtil.rect(this.rowBag, 'bag' + i, slotW, 32, id ? '#2a3a2e' : C.SLOT_EMPTY, 6);
            slot.setPosition(startX + i * step, 0);
            if (selected) {
                UIUtil.frame(slot, 'sel', slotW + 2, 34, '#00000000', C.GOLD, 2, 6);
            }
            if (id) {
                const def = EQUIP_DEFS[id];
                const lb = UIUtil.label(slot, 'name', `${id} ${def.short}`, 12, def.color, true, slotW - 4);
                lb.node.setPosition(0, 0);
            }
        }
    }

    // ===================== 提示 =====================
    public toast(text: string) {
        if (this.toastNode && this.toastNode.isValid) {
            this.toastNode.destroy();
        }
        const n = UIUtil.rect(this.canvas, 'Toast', 420, 40, '#000000cc', 20);
        n.setPosition(0, this.H * 0.5 - 118);
        const lb = UIUtil.label(n, 'txt', text, 17, C.GOLD, true, 400);
        const op = n.addComponent(UIOpacity);
        this.toastNode = n;
        tween(op).delay(0.9).to(0.5, { opacity: 0 }).call(() => {
            if (n.isValid) {
                n.destroy();
            }
        }).start();
    }

    // ===================== 首页 =====================
    public showHome(onStart: () => void) {
        if (this.homeNode && this.homeNode.isValid) {
            this.homeNode.active = true;
            return;
        }
        const m = UIUtil.mask(this.canvas, 'Home', 200);
        this.homeNode = m;

        const title = UIUtil.label(m, 'title', '金铲铲之战 · 3D 自走棋', 42, C.GOLD, true);
        title.node.setPosition(0, 150);

        const lines = [
            '4 x 7 棋盘：上方 3 行敌方，下方 3 行我方，中间空行',
            '准备阶段：购买棋子 / 装备（各 1 金），拖动棋子布阵，同名棋子购买后自动升星',
            '装备可拖动到棋子身上穿戴；两件一级装备同穿一件会弹出合成确认',
            '战斗阶段：AI 自动战斗，40 秒加速，60 秒按剩余血量强制结算',
        ];
        for (let i = 0; i < lines.length; i++) {
            const lb = UIUtil.label(m, 'line', lines[i], 16, C.TEXT, false, 700);
            lb.node.setPosition(0, 70 - i * 30);
        }

        const btn = UIUtil.button(m, 'play', '开始游戏', 210, 58, '#c0392b', '#ffffff', 24, onStart);
        btn.setPosition(0, -110);

        const tip = UIUtil.label(m, 'tip', '提示：点击商店购买 → 拖动棋子到我方格子上阵 → 拖动背包装备到棋子身上穿戴', 13, C.TEXT_DIM, false, 760);
        tip.node.setPosition(0, -180);
    }

    public hideHome() {
        if (this.homeNode && this.homeNode.isValid) {
            this.homeNode.active = false;
        }
    }

    // ===================== 结算 =====================
    public showResult(title: string, rows: ResultRow[], onNext: () => void, onRestart: () => void) {
        this.hideResult();
        const m = UIUtil.mask(this.canvas, 'Result', 210);
        this.resultNode = m;

        const panel = UIUtil.rect(m, 'panel', 660, 470, '#0b1220f5', 14);
        panel.setPosition(0, 0);

        const t = UIUtil.label(panel, 'title', title, 30, C.GOLD, true);
        t.node.setPosition(0, 200);

        const head = UIUtil.label(panel, 'head', '棋子', 15, C.TEXT_DIM, false);
        head.node.setPosition(-250, 162);
        const h2 = UIUtil.label(panel, 'h2', '造成伤害', 15, C.TEXT_DIM, false);
        h2.node.setPosition(-80, 162);
        const h3 = UIUtil.label(panel, 'h3', '承受伤害', 15, C.TEXT_DIM, false);
        h3.node.setPosition(70, 162);
        const h4 = UIUtil.label(panel, 'h4', '治疗量', 15, C.TEXT_DIM, false);
        h4.node.setPosition(210, 162);

        const maxRows = Math.min(rows.length, 15);
        for (let i = 0; i < maxRows; i++) {
            const r = rows[i];
            const y = 134 - i * 19;
            const n1 = UIUtil.label(panel, 'r' + i, r.name, 14, r.color, false, 220);
            n1.node.setPosition(-250, y);
            const n2 = UIUtil.label(panel, 'd' + i, `${r.dmg}`, 14, '#ff9b9b', false);
            n2.node.setPosition(-80, y);
            const n3 = UIUtil.label(panel, 't' + i, `${r.taken}`, 14, '#9fc8ff', false);
            n3.node.setPosition(70, y);
            const n4 = UIUtil.label(panel, 'h' + i, `${r.heal}`, 14, '#8cf0a4', false);
            n4.node.setPosition(210, y);
        }

        const next = UIUtil.button(panel, 'next', '下一回合', 160, 44, '#2f6b4a', '#ffffff', 19, onNext);
        next.setPosition(-95, -190);
        const restart = UIUtil.button(panel, 'restart', '重新开始', 160, 44, '#8a3a3a', '#ffffff', 19, onRestart);
        restart.setPosition(95, -190);
    }

    public hideResult() {
        if (this.resultNode && this.resultNode.isValid) {
            this.resultNode.destroy();
            this.resultNode = null;
        }
    }

    // ===================== 合成 =====================
    public showCombos(combos: { a: EquipId; b: EquipId; result: EquipId }[], onPick: (a: EquipId, b: EquipId) => void) {
        this.hideCombos();
        const m = UIUtil.mask(this.canvas, 'Combine', 200);
        this.comboNode = m;

        const panel = UIUtil.rect(m, 'panel', 540, 450, '#0b1220f5', 14);
        const t = UIUtil.label(panel, 'title', '装备合成（不可二次合成）', 22, C.GOLD, true);
        t.node.setPosition(0, 196);

        if (combos.length === 0) {
            const lb = UIUtil.label(panel, 'empty', '背包中没有可合成的散件组合', 16, C.TEXT_DIM, false);
            lb.node.setPosition(0, 40);
        }

        for (let i = 0; i < combos.length && i < 10; i++) {
            const c = combos[i];
            const def = EQUIP_DEFS[c.result];
            const txt = `${c.a} + ${c.b}  →  ${c.result} ${def.name}   ${def.special || ''}`;
            const btn = UIUtil.button(panel, 'c' + i, txt, 490, 30, '#1d2f45', def.color, 13, () => {
                onPick(c.a, c.b);
            });
            btn.setPosition(0, 150 - i * 32);
        }

        const close = UIUtil.button(panel, 'close', '取消', 120, 38, '#3a3a3a', '#ffffff', 16, () => this.hideCombos());
        close.setPosition(0, -192);
    }

    public hideCombos() {
        if (this.comboNode && this.comboNode.isValid) {
            this.comboNode.destroy();
            this.comboNode = null;
        }
    }

    /** 二次确认弹窗（装备合成预览 / 棋子合成预览） */
    public showConfirm(title: string, lines: string[], onOk: () => void, okText = '确认合成') {
        if (this.confirmNode && this.confirmNode.isValid) {
            this.confirmNode.destroy();
        }
        const m = UIUtil.mask(this.canvas, 'Confirm', 210);
        this.confirmNode = m;

        const panel = UIUtil.rect(m, 'panel', 440, 240, '#0b1220f8', 14);
        const t = UIUtil.label(panel, 'title', title, 22, C.GOLD, true, 400);
        t.node.setPosition(0, 82);
        for (let i = 0; i < lines.length; i++) {
            const lb = UIUtil.label(panel, 'line', lines[i], 15, C.TEXT, false, 400);
            lb.node.setPosition(0, 36 - i * 26);
        }

        const ok = UIUtil.button(panel, 'ok', okText, 130, 40, '#2f6b4a', '#ffffff', 17, () => {
            this.hideConfirm();
            onOk();
        });
        ok.setPosition(-80, -76);
        const cancel = UIUtil.button(panel, 'cancel', '取消', 130, 40, '#5a3a3a', '#ffffff', 17, () => this.hideConfirm());
        cancel.setPosition(80, -76);
    }

    public hideConfirm() {
        if (this.confirmNode && this.confirmNode.isValid) {
            this.confirmNode.destroy();
            this.confirmNode = null;
        }
    }

    public get isModalOpen(): boolean {
        return !!(this.resultNode && this.resultNode.isValid)
            || !!(this.comboNode && this.comboNode.isValid)
            || !!(this.confirmNode && this.confirmNode.isValid);
    }
}
