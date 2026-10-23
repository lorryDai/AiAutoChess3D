System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Vec3, GameConfig, C, _crd;

  _export({
    GameConfig: void 0,
    C: void 0
  });

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1a2b3xNXm9Ke4ydDh8qO0xd", "GameConfig", undefined);

      /** 全局配置：棋盘尺寸、经济、战斗时长、数值常量 */
      __checkObsolete__(['Vec3']);

      _export("GameConfig", GameConfig = class GameConfig {
        static isPlayerRow(row) {
          return row > GameConfig.EMPTY_ROW;
        }

        static isEnemyRow(row) {
          return row < GameConfig.EMPTY_ROW;
        }
        /** 格子 -> 世界坐标 */


        static cellToWorld(col, row, out) {
          const x = (col - (GameConfig.COLS - 1) * 0.5) * GameConfig.CELL_X;
          const z = (row - (GameConfig.ROWS - 1) * 0.5) * GameConfig.CELL_Z;

          if (!out) {
            return new Vec3(x, 0, z);
          }

          out.set(x, 0, z);
          return out;
        }
        /** 世界坐标 -> 格子（超出棋盘返回 null） */


        static worldToCell(x, z) {
          const col = Math.round(x / GameConfig.CELL_X + (GameConfig.COLS - 1) * 0.5);
          const row = Math.round(z / GameConfig.CELL_Z + (GameConfig.ROWS - 1) * 0.5);

          if (col < 0 || col >= GameConfig.COLS || row < 0 || row >= GameConfig.ROWS) {
            return null;
          }

          return {
            col,
            row
          };
        }

      });
      /** 配色 */


      /** 棋盘列数（4 x 7） */
      GameConfig.COLS = 4;

      /** 棋盘行数：上方 3 行敌方，中间 1 行空格，下方 3 行我方 */
      GameConfig.ROWS = 7;

      /** 中间空行（不可放置棋子） */
      GameConfig.EMPTY_ROW = 3;

      /** 单格世界尺寸（横向略宽、纵向略窄，配合俯视相机压缩） */
      GameConfig.CELL = 1.15;
      GameConfig.CELL_X = 1.35;
      GameConfig.CELL_Z = 0.95;

      /** 准备阶段初始金币 */
      GameConfig.START_GOLD = 20;

      /** 每个棋 / 装备价格 */
      GameConfig.COST = 1;

      /** 商店每行槽位 */
      GameConfig.SHOP_SLOTS = 5;

      /** 手牌（未上场棋子）上限 */
      GameConfig.BENCH_SIZE = 8;

      /** 装备背包上限 */
      GameConfig.BAG_SIZE = 10;

      /** 每个棋子的装备槽 */
      GameConfig.MAX_EQUIP = 3;

      /** 蓝量上限 */
      GameConfig.MANA_MAX = 100;

      /** 每次攻击回蓝 */
      GameConfig.MANA_ON_ATTACK = 14;

      /** 每次受击回蓝 */
      GameConfig.MANA_ON_HIT = 10;

      /** 战斗 40 秒后加速 */
      GameConfig.SPEED_UP_TIME = 40;

      /** 战斗 60 秒强制结束 */
      GameConfig.FORCE_END_TIME = 60;

      /** 加速倍率 */
      GameConfig.SPEED_SCALE = 2;

      /** 片头倒计时 */
      GameConfig.BATTLE_INTRO_TIME = 2.5;

      /** 星级倍率（血量 / 攻击 / 防御） */
      GameConfig.STAR_MULT = [0, 1, 1.45, 2.0];

      /** 升星需要的同名同星棋子数量 */
      GameConfig.MERGE_COUNT = 3;

      _export("C", C = class C {});

      C.PANEL = '#0d1522ee';
      C.PANEL_DARK = '#0a101bee';
      C.TOPBAR = '#0d1522f2';
      C.CARD = '#1c2a3f';
      C.CARD_HOVER = '#26394f';
      C.SLOT_EMPTY = '#131c2b';
      C.GOLD = '#ffd24a';
      C.TEXT = '#e8f0ff';
      C.TEXT_DIM = '#9fb0c6';
      C.PLAYER = '#3fa9f5';
      C.ENEMY = '#ff5a5a';
      C.GREEN = '#5ce07a';
      C.HP_BG = '#101827';
      C.MP = '#4a7dff';
      C.BOARD_BASE = '#0e1626';
      C.PLAYER_TILE_A = '#23405c';
      C.PLAYER_TILE_B = '#1d344b';
      C.ENEMY_TILE_A = '#4a2333';
      C.ENEMY_TILE_B = '#3d1d2b';
      C.MID_TILE = '#1a2130';
      C.RAIL = '#c9a227';

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=70e80a88e0d8ba5d24d95304c3680f51f6fe76ae.js.map