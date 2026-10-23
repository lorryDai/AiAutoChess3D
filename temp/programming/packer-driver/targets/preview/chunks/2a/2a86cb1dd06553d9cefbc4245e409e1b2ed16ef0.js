System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, Team, ChessType, CHESS_LIST, CHESS_DEFS, BASE_EQUIPS, EQUIP_DEFS, COMBINE_MAP, UID_SEED;

  function getEquip(id) {
    return EQUIP_DEFS[id];
  }

  function isBaseEquip(id) {
    return !!EQUIP_DEFS[id] && EQUIP_DEFS[id].base;
  }

  function combineEquip(a, b) {
    if (!isBaseEquip(a) || !isBaseEquip(b)) {
      return null;
    }

    var key = [a, b].sort().join('');
    return COMBINE_MAP[key] || null;
  }
  /** 棋盘上的棋子实例数据（准备阶段的持久数据） */


  function nextUid() {
    return UID_SEED++;
  }

  _export({
    getEquip: getEquip,
    isBaseEquip: isBaseEquip,
    combineEquip: combineEquip,
    nextUid: nextUid
  });

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2b3c41eb3pLjJ0OHyo7TF1u", "GameData", undefined);

      /** 阵营 */
      _export("Team", Team = /*#__PURE__*/function (Team) {
        Team[Team["Player"] = 0] = "Player";
        Team[Team["Enemy"] = 1] = "Enemy";
        return Team;
      }({}));
      /** 棋子类型 A/B/C/D */


      _export("ChessType", ChessType = /*#__PURE__*/function (ChessType) {
        ChessType["Tank"] = "A";
        ChessType["Assassin"] = "B";
        ChessType["Ranger"] = "C";
        ChessType["Healer"] = "D";
        return ChessType;
      }({}));

      _export("CHESS_LIST", CHESS_LIST = [ChessType.Tank, ChessType.Assassin, ChessType.Ranger, ChessType.Healer]);

      _export("CHESS_DEFS", CHESS_DEFS = {
        [ChessType.Tank]: {
          type: ChessType.Tank,
          name: '铁壁守卫',
          role: '坦克',
          hp: 260,
          atk: 16,
          def: 32,
          moveSpeed: 0.75,
          atkSpeed: 0.6,
          range: 1,
          skillName: '钢铁壁垒',
          shout: '钢铁壁垒！',
          skillDesc: '蓝量满时，8 秒内防御力翻倍',
          color: '#4a90d9',
          enemyColor: '#d97a3a'
        },
        [ChessType.Assassin]: {
          type: ChessType.Assassin,
          name: '暗影刺客',
          role: '刺客',
          hp: 130,
          atk: 30,
          def: 8,
          moveSpeed: 1.5,
          atkSpeed: 1.7,
          range: 1,
          skillName: '暗影突袭',
          shout: '暗影突袭！',
          skillDesc: '蓝量满时，2 秒内攻击力翻倍、移速大增',
          color: '#d95f7f',
          enemyColor: '#c03a4a'
        },
        [ChessType.Ranger]: {
          type: ChessType.Ranger,
          name: '疾风射手',
          role: '射手',
          hp: 115,
          atk: 22,
          def: 5,
          moveSpeed: 0.9,
          atkSpeed: 1.1,
          range: 3,
          skillName: '疾风连射',
          shout: '箭雨！',
          skillDesc: '蓝量满时，2 秒内攻速翻倍并同时攻击 2 个目标',
          color: '#63c47c',
          enemyColor: '#8fc347'
        },
        [ChessType.Healer]: {
          type: ChessType.Healer,
          name: '圣光牧师',
          role: '治疗师',
          hp: 140,
          atk: 12,
          def: 6,
          moveSpeed: 0.85,
          atkSpeed: 0.65,
          range: 3,
          skillName: '生命祝福',
          shout: '生命祝福！',
          skillDesc: '蓝量满时，恢复我方全体 10% 最大生命',
          color: '#d9c04a',
          enemyColor: '#c39a3a'
        }
      });
      /** 装备 id：A~D 为散件，E~N 为合成件 */


      _export("BASE_EQUIPS", BASE_EQUIPS = ['A', 'B', 'C', 'D']);

      _export("EQUIP_DEFS", EQUIP_DEFS = {
        A: {
          id: 'A',
          name: '精钢短刃',
          short: '短刃',
          base: true,
          atkSpeed: 0.25,
          special: '攻击速度 +25%',
          color: '#8fd3ff'
        },
        B: {
          id: 'B',
          name: '秘银护甲',
          short: '护甲',
          base: true,
          def: 12,
          special: '防御 +12',
          color: '#a9b7c9'
        },
        C: {
          id: 'C',
          name: '生命护符',
          short: '护符',
          base: true,
          hp: 80,
          special: '生命 +80',
          color: '#7ee29a'
        },
        D: {
          id: 'D',
          name: '力量之斧',
          short: '战斧',
          base: true,
          atk: 12,
          special: '攻击 +12',
          color: '#ff9b6b'
        },
        E: {
          id: 'E',
          name: '疾风之刃',
          short: '疾风',
          base: false,
          atkSpeed: 0.45,
          range: 1,
          recipe: 'A + A',
          special: '攻速 +45%，攻击距离 +1 格',
          color: '#6fe3ff'
        },
        F: {
          id: 'F',
          name: '铁壁战镰',
          short: '铁壁',
          base: false,
          atkSpeed: 0.25,
          def: 16,
          recipe: 'A + B',
          special: '命中后降低目标 20% 攻速（不叠加）',
          color: '#9fd8e8'
        },
        G: {
          id: 'G',
          name: '时之锁链',
          short: '时锁',
          base: false,
          atkSpeed: 0.25,
          hp: 110,
          recipe: 'A + C',
          special: '首次攻击使目标 3 秒无法攻击（不叠加）',
          color: '#7de0c0'
        },
        H: {
          id: 'H',
          name: '破阵战斧',
          short: '破阵',
          base: false,
          atkSpeed: 0.25,
          moveSpeed: 0.2,
          recipe: 'A + D',
          special: '命中后降低目标 20% 防御（不叠加）',
          color: '#ffc26b'
        },
        I: {
          id: 'I',
          name: '荆棘之甲',
          short: '荆棘',
          base: false,
          def: 25,
          recipe: 'B + B',
          special: '反弹 10% 所受伤害',
          color: '#c0c9d6'
        },
        J: {
          id: 'J',
          name: '冰霜壁垒',
          short: '冰霜',
          base: false,
          hp: 160,
          def: 12,
          recipe: 'B + C',
          special: '命中后降低目标 35% 移速（不叠加）',
          color: '#8fd7ff'
        },
        K: {
          id: 'K',
          name: '守护者之铠',
          short: '守护',
          base: false,
          def: 16,
          moveSpeed: 0.2,
          recipe: 'B + D',
          special: '被攻击时降低攻击者 15% 攻击（不叠加）',
          color: '#b8c6ff'
        },
        L: {
          id: 'L',
          name: '生命之泉',
          short: '生命泉',
          base: false,
          hp: 260,
          recipe: 'C + C',
          special: '每次攻击回复自身 10% 最大生命',
          color: '#5cf08a'
        },
        M: {
          id: 'M',
          name: '血怒战锤',
          short: '血怒',
          base: false,
          atk: 16,
          hp: 160,
          recipe: 'C + D',
          special: '首次攻击后获得 10% 最大生命的攻击力',
          color: '#ff8f6b'
        },
        N: {
          id: 'N',
          name: '狂战之刃',
          short: '狂战',
          base: false,
          atk: 28,
          recipe: 'D + D',
          special: '每次攻击永久 +10% 攻击（可叠加）',
          color: '#ff6b6b'
        }
      });
      /** 合表：散件两两合成 */


      COMBINE_MAP = {
        'AA': 'E',
        'AB': 'F',
        'AC': 'G',
        'AD': 'H',
        'BB': 'I',
        'BC': 'J',
        'BD': 'K',
        'CC': 'L',
        'CD': 'M',
        'DD': 'N'
      };
      UID_SEED = 1;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2a86cb1dd06553d9cefbc4245e409e1b2ed16ef0.js.map