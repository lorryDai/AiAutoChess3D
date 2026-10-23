import { Vec3 } from 'cc';

/** 全局配置：棋盘尺寸、经济、战斗时长、数值常量 */
export class GameConfig {
    /** 棋盘列数（4 x 7） */
    public static readonly COLS = 4;
    /** 棋盘行数：上方 3 行敌方，中间 1 行空格，下方 3 行我方 */
    public static readonly ROWS = 7;
    /** 中间空行（不可放置棋子） */
    public static readonly EMPTY_ROW = 3;
    /** 单格世界尺寸（横向略宽、纵向略窄，配合俯视相机压缩） */
    public static readonly CELL = 1.15;
    public static readonly CELL_X = 1.35;
    public static readonly CELL_Z = 0.95;

    /** 准备阶段初始金币 */
    public static readonly START_GOLD = 20;
    /** 每个棋 / 装备价格 */
    public static readonly COST = 1;
    /** 商店每行槽位 */
    public static readonly SHOP_SLOTS = 5;
    /** 手牌（未上场棋子）上限 */
    public static readonly BENCH_SIZE = 8;
    /** 装备背包上限 */
    public static readonly BAG_SIZE = 10;
    /** 每个棋子的装备槽 */
    public static readonly MAX_EQUIP = 3;

    /** 蓝量上限 */
    public static readonly MANA_MAX = 100;
    /** 每次攻击回蓝 */
    public static readonly MANA_ON_ATTACK = 14;
    /** 每次受击回蓝 */
    public static readonly MANA_ON_HIT = 10;

    /** 战斗 40 秒后加速 */
    public static readonly SPEED_UP_TIME = 40;
    /** 战斗 60 秒强制结束 */
    public static readonly FORCE_END_TIME = 60;
    /** 加速倍率 */
    public static readonly SPEED_SCALE = 2;
    /** 片头倒计时 */
    public static readonly BATTLE_INTRO_TIME = 2.5;

    /** 星级倍率（血量 / 攻击 / 防御） */
    public static readonly STAR_MULT = [0, 1, 1.45, 2.0];

    /** 升星需要的同名同星棋子数量 */
    public static readonly MERGE_COUNT = 3;

    public static isPlayerRow(row: number): boolean {
        return row > GameConfig.EMPTY_ROW;
    }

    public static isEnemyRow(row: number): boolean {
        return row < GameConfig.EMPTY_ROW;
    }

    /** 格子 -> 世界坐标 */
    public static cellToWorld(col: number, row: number, out?: Vec3): Vec3 {
        const x = (col - (GameConfig.COLS - 1) * 0.5) * GameConfig.CELL_X;
        const z = (row - (GameConfig.ROWS - 1) * 0.5) * GameConfig.CELL_Z;
        if (!out) {
            return new Vec3(x, 0, z);
        }
        out.set(x, 0, z);
        return out;
    }

    /** 世界坐标 -> 格子（超出棋盘返回 null） */
    public static worldToCell(x: number, z: number): { col: number; row: number } | null {
        const col = Math.round(x / GameConfig.CELL_X + (GameConfig.COLS - 1) * 0.5);
        const row = Math.round(z / GameConfig.CELL_Z + (GameConfig.ROWS - 1) * 0.5);
        if (col < 0 || col >= GameConfig.COLS || row < 0 || row >= GameConfig.ROWS) {
            return null;
        }
        return { col, row };
    }
}

/** 配色 */
export class C {
    public static readonly PANEL = '#0d1522ee';
    public static readonly PANEL_DARK = '#0a101bee';
    public static readonly TOPBAR = '#0d1522f2';
    public static readonly CARD = '#1c2a3f';
    public static readonly CARD_HOVER = '#26394f';
    public static readonly SLOT_EMPTY = '#131c2b';
    public static readonly GOLD = '#ffd24a';
    public static readonly TEXT = '#e8f0ff';
    public static readonly TEXT_DIM = '#9fb0c6';
    public static readonly PLAYER = '#3fa9f5';
    public static readonly ENEMY = '#ff5a5a';
    public static readonly GREEN = '#5ce07a';
    public static readonly HP_BG = '#101827';
    public static readonly MP = '#4a7dff';
    public static readonly BOARD_BASE = '#0e1626';
    public static readonly PLAYER_TILE_A = '#23405c';
    public static readonly PLAYER_TILE_B = '#1d344b';
    public static readonly ENEMY_TILE_A = '#4a2333';
    public static readonly ENEMY_TILE_B = '#3d1d2b';
    public static readonly MID_TILE = '#1a2130';
    public static readonly RAIL = '#c9a227';
}
