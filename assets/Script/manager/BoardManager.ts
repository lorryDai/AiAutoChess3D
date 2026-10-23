import { _decorator, Component, Node, Vec3 } from 'cc';
import { C, GameConfig } from '../config/GameConfig';
import { MeshKit } from '../core/MeshKit';

const { ccclass } = _decorator;

/** 4 x 7 棋盘（3D 地块、选中光圈、可移动提示） */
@ccclass('BoardManager')
export class BoardManager extends Component {
    private selectMark: Node = null!;
    private moveMarks: Node[] = [];
    private time = 0;

    public build() {
        const width = GameConfig.COLS * GameConfig.CELL_X;
        const depth = GameConfig.ROWS * GameConfig.CELL_Z;

        // 底座
        const base = new Node('Base');
        base.parent = this.node;
        MeshKit.part(base, 'plate', MeshKit.box(width + 0.6, 0.3, depth + 0.8),
            C.BOARD_BASE, new Vec3(0, -0.15, 0), 0.12);

        // 边框
        const railY = 0.02;
        const railLong = MeshKit.box(0.1, 0.1, depth + 0.8);
        const railShort = MeshKit.box(width + 0.6, 0.1, 0.1);
        const mkRail = (name: string, mesh: any, pos: Vec3) => {
            MeshKit.part(base, name, mesh, C.RAIL, pos, 0.35);
        };
        mkRail('railL', railLong, new Vec3(-width * 0.5 - 0.28, railY, 0));
        mkRail('railR', railLong, new Vec3(width * 0.5 + 0.28, railY, 0));
        mkRail('railB', railShort, new Vec3(0, railY, depth * 0.5 + 0.38));
        mkRail('railT', railShort, new Vec3(0, railY, -depth * 0.5 - 0.38));

        // 四角立柱
        const px = width * 0.5 + 0.28;
        const pz = depth * 0.5 + 0.38;
        for (const sx of [-1, 1]) {
            for (const sz of [-1, 1]) {
                MeshKit.part(base, 'pillar', MeshKit.box(0.16, 0.6, 0.16), C.RAIL,
                    new Vec3(sx * px, 0.28, sz * pz), 0.45);
            }
        }

        // 地块
        const tileMesh = MeshKit.box(GameConfig.CELL_X * 0.88, 0.06, GameConfig.CELL_Z * 0.88);
        const p = new Vec3();
        for (let row = 0; row < GameConfig.ROWS; row++) {
            for (let col = 0; col < GameConfig.COLS; col++) {
                GameConfig.cellToWorld(col, row, p);
                let color = C.MID_TILE;
                if (GameConfig.isPlayerRow(row)) {
                    color = (row + col) % 2 === 0 ? C.PLAYER_TILE_A : C.PLAYER_TILE_B;
                } else if (GameConfig.isEnemyRow(row)) {
                    color = (row + col) % 2 === 0 ? C.ENEMY_TILE_A : C.ENEMY_TILE_B;
                }
                MeshKit.part(base, `tile_${col}_${row}`, tileMesh, color, new Vec3(p.x, 0.02, p.z), 0.05);
            }
        }

        // 选中光圈
        this.selectMark = new Node('SelectMark');
        this.selectMark.parent = this.node;
        MeshKit.part(this.selectMark, 'ring', MeshKit.cylinder(0.5, 0.5, 0.04), '#ffd24a',
            new Vec3(0, 0.1, 0), 1.2);
        this.selectMark.active = false;

        // 可移动提示
        for (let i = 0; i < 12; i++) {
            const m = new Node('MoveMark' + i);
            m.parent = this.node;
            MeshKit.part(m, 'dot', MeshKit.cylinder(0.13, 0.13, 0.04), '#5ce07a',
                new Vec3(0, 0.1, 0), 0.9);
            m.active = false;
            this.moveMarks.push(m);
        }
    }

    public markSelect(col: number, row: number) {
        const p = GameConfig.cellToWorld(col, row);
        this.selectMark.setPosition(p.x, 0, p.z);
        this.selectMark.active = true;
    }

    public clearSelect() {
        if (this.selectMark) {
            this.selectMark.active = false;
        }
    }

    public showMoves(cells: { col: number; row: number }[]) {
        for (let i = 0; i < this.moveMarks.length; i++) {
            const mark = this.moveMarks[i];
            if (i < cells.length) {
                const p = GameConfig.cellToWorld(cells[i].col, cells[i].row);
                mark.setPosition(p.x, 0, p.z);
                mark.active = true;
            } else {
                mark.active = false;
            }
        }
    }

    public clearMoves() {
        for (const m of this.moveMarks) {
            m.active = false;
        }
    }

    update(dt: number) {
        this.time += dt;
        if (this.selectMark && this.selectMark.active) {
            const s = 1 + Math.sin(this.time * 5) * 0.07;
            this.selectMark.setScale(new Vec3(s, 1, s));
        }
    }
}
