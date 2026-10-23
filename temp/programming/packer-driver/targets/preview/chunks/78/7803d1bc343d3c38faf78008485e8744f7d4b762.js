System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Camera, Color, Component, DirectionalLight, Material, Node, UITransform, Vec2, Vec3, director, geometry, view, C, GameConfig, BASE_EQUIPS, CHESS_DEFS, CHESS_LIST, EQUIP_DEFS, combineEquip, nextUid, Team, ChessUnit, MeshKit, BoardManager, BattleManager, GameHUD, FloatingText, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, Phase, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfC(extras) {
    _reporterNs.report("C", "../config/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameConfig(extras) {
    _reporterNs.report("GameConfig", "../config/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBASE_EQUIPS(extras) {
    _reporterNs.report("BASE_EQUIPS", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfChessType(extras) {
    _reporterNs.report("ChessType", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCHESS_DEFS(extras) {
    _reporterNs.report("CHESS_DEFS", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCHESS_LIST(extras) {
    _reporterNs.report("CHESS_LIST", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEquipId(extras) {
    _reporterNs.report("EquipId", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEQUIP_DEFS(extras) {
    _reporterNs.report("EQUIP_DEFS", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcombineEquip(extras) {
    _reporterNs.report("combineEquip", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfnextUid(extras) {
    _reporterNs.report("nextUid", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTeam(extras) {
    _reporterNs.report("Team", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUnitData(extras) {
    _reporterNs.report("UnitData", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfChessUnit(extras) {
    _reporterNs.report("ChessUnit", "../unit/ChessUnit", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMeshKit(extras) {
    _reporterNs.report("MeshKit", "../core/MeshKit", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBoardManager(extras) {
    _reporterNs.report("BoardManager", "./BoardManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfBattleManager(extras) {
    _reporterNs.report("BattleManager", "./BattleManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameHUD(extras) {
    _reporterNs.report("GameHUD", "../ui/GameHUD", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResultRow(extras) {
    _reporterNs.report("ResultRow", "../ui/GameHUD", _context.meta, extras);
  }

  function _reportPossibleCrUseOfFloatingText(extras) {
    _reporterNs.report("FloatingText", "../fx/FloatingText", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Camera = _cc.Camera;
      Color = _cc.Color;
      Component = _cc.Component;
      DirectionalLight = _cc.DirectionalLight;
      Material = _cc.Material;
      Node = _cc.Node;
      UITransform = _cc.UITransform;
      Vec2 = _cc.Vec2;
      Vec3 = _cc.Vec3;
      director = _cc.director;
      geometry = _cc.geometry;
      view = _cc.view;
    }, function (_unresolved_2) {
      C = _unresolved_2.C;
      GameConfig = _unresolved_2.GameConfig;
    }, function (_unresolved_3) {
      BASE_EQUIPS = _unresolved_3.BASE_EQUIPS;
      CHESS_DEFS = _unresolved_3.CHESS_DEFS;
      CHESS_LIST = _unresolved_3.CHESS_LIST;
      EQUIP_DEFS = _unresolved_3.EQUIP_DEFS;
      combineEquip = _unresolved_3.combineEquip;
      nextUid = _unresolved_3.nextUid;
      Team = _unresolved_3.Team;
    }, function (_unresolved_4) {
      ChessUnit = _unresolved_4.ChessUnit;
    }, function (_unresolved_5) {
      MeshKit = _unresolved_5.MeshKit;
    }, function (_unresolved_6) {
      BoardManager = _unresolved_6.BoardManager;
    }, function (_unresolved_7) {
      BattleManager = _unresolved_7.BattleManager;
    }, function (_unresolved_8) {
      GameHUD = _unresolved_8.GameHUD;
    }, function (_unresolved_9) {
      FloatingText = _unresolved_9.FloatingText;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8b9c00eLzpLTJ1eb3qLnA0k", "GameManager", undefined);

      __checkObsolete__(['_decorator', 'Camera', 'Color', 'Component', 'DirectionalLight', 'EventTouch', 'Material', 'Node', 'UITransform', 'Vec2', 'Vec3', 'director', 'geometry', 'view']);

      ({
        ccclass,
        property
      } = _decorator);

      Phase = /*#__PURE__*/function (Phase) {
        Phase[Phase["Home"] = 0] = "Home";
        Phase[Phase["Prep"] = 1] = "Prep";
        Phase[Phase["Battle"] = 2] = "Battle";
        Phase[Phase["Result"] = 3] = "Result";
        return Phase;
      }(Phase || {});
      /** 游戏总控：阶段流转、商店经济、布阵 / 上装 / 合成 / 升星、输入与结算 */


      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property(Material), _dec(_class = (_class2 = class GameManager extends Component {
        constructor() {
          super(...arguments);

          /** 标准材质资源：保证 builtin-standard effect 随场景加载（运行时材质以它为模板） */
          _initializerDefineProperty(this, "stdMat", _descriptor, this);

          this.phase = Phase.Home;
          this.gold = 0;
          this.roundNo = 1;

          /** 玩家棋子（含手牌，row = -1 表示在手牌） */
          this.roster = [];
          this.bag = [];
          this.enemyRoster = [];
          this.units = [];
          this.shopEquips = [];
          this.shopUnits = [];

          /** 拖拽状态：'bag' = 拖装备，'unit' = 拖棋子 */
          this.dragKind = null;
          this.dragIndex = -1;
          this.dragUid = -1;
          this.dragging = false;
          this.dragFrom = new Vec2();
          this.cameraC = null;
          this.canvas = null;
          this.canvasUT = null;
          this.hud = null;
          this.board = null;
          this.battle = null;
          this.worldRoot = null;
          this.unitsRoot = null;
          this.floatRoot = null;
          this.ray = new geometry.Ray();
          this.tmpV = new Vec3();
          this.tmpScreen = new Vec3();
        }

        onLoad() {
          var scene = director.getScene();
          this.canvas = scene.getChildByName('Canvas');
          this.canvasUT = this.canvas.getComponent(UITransform);
          var camNode = scene.getChildByName('Main Camera');
          this.cameraC = camNode.getComponent(Camera); // 相机取景：整盘棋 + 上方信息、下方操作区

          camNode.setPosition(0, 8, 9.6);
          camNode.lookAt(new Vec3(0, 0, 2.6));
          this.cameraC.clearColor = new Color('#0a1220');
          var lightNode = scene.getChildByName('Directional Light');

          if (lightNode) {
            var light = lightNode.getComponent(DirectionalLight);

            if (light) {
              light.illuminance = 90000;
            }
          }

          this.worldRoot = new Node('World');
          this.worldRoot.parent = this.node;
          (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
            error: Error()
          }), MeshKit) : MeshKit).template = this.stdMat;
          var boardNode = new Node('Board');
          boardNode.parent = this.worldRoot;
          this.board = boardNode.addComponent(_crd && BoardManager === void 0 ? (_reportPossibleCrUseOfBoardManager({
            error: Error()
          }), BoardManager) : BoardManager);
          this.board.build();
          var battleNode = new Node('Battle');
          battleNode.parent = this.node;
          this.battle = battleNode.addComponent(_crd && BattleManager === void 0 ? (_reportPossibleCrUseOfBattleManager({
            error: Error()
          }), BattleManager) : BattleManager);

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
          (_crd && FloatingText === void 0 ? (_reportPossibleCrUseOfFloatingText({
            error: Error()
          }), FloatingText) : FloatingText).camera = this.cameraC;
          (_crd && FloatingText === void 0 ? (_reportPossibleCrUseOfFloatingText({
            error: Error()
          }), FloatingText) : FloatingText).root = this.floatRoot;
          this.canvas.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
          this.canvas.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
          this.canvas.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
          this.canvas.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        }

        start() {
          this.hud = new (_crd && GameHUD === void 0 ? (_reportPossibleCrUseOfGameHUD({
            error: Error()
          }), GameHUD) : GameHUD)();
          this.hud.build(this.canvas, {
            onStartBattle: () => this.startBattle(),
            onRefresh: () => this.refreshShop(),
            onBuyEquip: i => this.buyEquip(i),
            onBuyUnit: i => this.buyUnit(i),
            onCombine: () => this.openCombine()
          });
          this.hud.setHudVisible(false);
          this.hud.showHome(() => this.startGame());
        } // ===================== 商店 =====================


        rollShop() {
          this.shopEquips = [];
          this.shopUnits = [];

          for (var i = 0; i < (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).SHOP_SLOTS; i++) {
            this.shopEquips.push((_crd && BASE_EQUIPS === void 0 ? (_reportPossibleCrUseOfBASE_EQUIPS({
              error: Error()
            }), BASE_EQUIPS) : BASE_EQUIPS)[Math.floor(Math.random() * (_crd && BASE_EQUIPS === void 0 ? (_reportPossibleCrUseOfBASE_EQUIPS({
              error: Error()
            }), BASE_EQUIPS) : BASE_EQUIPS).length)]);
            this.shopUnits.push((_crd && CHESS_LIST === void 0 ? (_reportPossibleCrUseOfCHESS_LIST({
              error: Error()
            }), CHESS_LIST) : CHESS_LIST)[Math.floor(Math.random() * (_crd && CHESS_LIST === void 0 ? (_reportPossibleCrUseOfCHESS_LIST({
              error: Error()
            }), CHESS_LIST) : CHESS_LIST).length)]);
          }

          this.hud.setShop(this.shopEquips, this.shopUnits);
        }

        refreshShop() {
          if (this.phase === Phase.Battle) {
            this.hud.toast('战斗阶段不能刷新商店');
            return;
          }

          if (this.gold < (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).COST) {
            this.hud.toast('金币不足');
            return;
          }

          this.gold -= (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).COST;
          this.rollShop();
          this.syncHud();
        }

        buyEquip(index) {
          if (this.phase === Phase.Battle) {
            this.hud.toast('战斗阶段不能购买');
            return;
          }

          if (this.gold < (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).COST) {
            this.hud.toast('金币不足');
            return;
          }

          if (this.bag.length >= (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).BAG_SIZE) {
            this.hud.toast('装备背包已满');
            return;
          }

          this.gold -= (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).COST;
          var id = this.shopEquips[index];
          this.bag.push(id); // 买走后从商店移除该牌

          this.shopEquips.splice(index, 1);
          this.hud.setShop(this.shopEquips, this.shopUnits);
          this.hud.setBag(this.bag);
          this.hud.setCombineEnabled(this.hasCombine());
          this.syncHud();
          this.hud.toast("\u8D2D\u4E70 " + (_crd && EQUIP_DEFS === void 0 ? (_reportPossibleCrUseOfEQUIP_DEFS({
            error: Error()
          }), EQUIP_DEFS) : EQUIP_DEFS)[id].name);
        }

        buyUnit(index) {
          if (this.phase === Phase.Battle) {
            this.hud.toast('战斗阶段不能购买');
            return;
          }

          if (this.gold < (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).COST) {
            this.hud.toast('金币不足');
            return;
          }

          var benchCount = this.roster.filter(u => u.row < 0).length;

          if (benchCount >= (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).BENCH_SIZE) {
            this.hud.toast('手牌已满，请先上阵');
            return;
          }

          var type = this.shopUnits[index];
          this.gold -= (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).COST;
          this.roster.push({
            uid: (_crd && nextUid === void 0 ? (_reportPossibleCrUseOfnextUid({
              error: Error()
            }), nextUid) : nextUid)(),
            type,
            star: 1,
            equips: [],
            col: -1,
            row: -1,
            team: (_crd && Team === void 0 ? (_reportPossibleCrUseOfTeam({
              error: Error()
            }), Team) : Team).Player
          });
          this.tryMerge(type);
          this.rebuildUnits(); // 买走后从商店移除该牌

          this.shopUnits.splice(index, 1);
          this.hud.setShop(this.shopEquips, this.shopUnits);
          this.hud.setBench(this.benchList());
          this.syncHud();
          this.hud.toast("\u8D2D\u4E70 " + (_crd && CHESS_DEFS === void 0 ? (_reportPossibleCrUseOfCHESS_DEFS({
            error: Error()
          }), CHESS_DEFS) : CHESS_DEFS)[type].role);
        }
        /** 购买后立即检测升星（3 个同名同星合成 1 个高星） */


        tryMerge(type) {
          var _this = this;

          var merged = true;

          while (merged) {
            merged = false;

            var _loop = function _loop(star) {
              var group = _this.roster.filter(u => u.type === type && u.star === star);

              if (group.length < (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
                error: Error()
              }), GameConfig) : GameConfig).MERGE_COUNT) {
                return 0; // continue
              } // 优先保留场上棋子


              group.sort((a, b) => (a.row >= 0 ? 0 : 1) - (b.row >= 0 ? 0 : 1));
              var keep = group[0];
              var removed = group.slice(1, (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
                error: Error()
              }), GameConfig) : GameConfig).MERGE_COUNT);

              for (var r of removed) {
                var idx = _this.roster.indexOf(r);

                if (idx >= 0) {
                  _this.roster.splice(idx, 1);
                }
              }

              keep.star = star + 1;

              _this.hud.toast((_crd && CHESS_DEFS === void 0 ? (_reportPossibleCrUseOfCHESS_DEFS({
                error: Error()
              }), CHESS_DEFS) : CHESS_DEFS)[type].role + " \u5347\u661F \u2192 " + keep.star + "\u2605");

              merged = true;
              return 1; // break
            },
                _ret;

            for (var star = 1; star <= 2; star++) {
              _ret = _loop(star);
              if (_ret === 0) continue;
              if (_ret === 1) break;
            }
          }
        } // ===================== 阶段 =====================


        startGame() {
          this.hud.hideHome();
          this.hud.setHudVisible(true);
          this.gold = 0;
          this.roundNo = 1;
          this.roster = [];
          this.bag = [];
          this.rollShop();
          this.enterPrep();
        }

        enterPrep() {
          this.phase = Phase.Prep;
          this.gold += (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).START_GOLD;
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
          this.hud.toast("\u51C6\u5907\u9636\u6BB5\u5F00\u59CB\uFF0C\u83B7\u5F97 " + (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).START_GOLD + " \u91D1\u5E01");
        }

        syncHud() {
          if (!this.hud) {
            return;
          }

          var phaseText = '准备阶段';
          var color = (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
            error: Error()
          }), C) : C).PLAYER;

          if (this.phase === Phase.Battle) {
            phaseText = '战斗阶段';
            color = (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
              error: Error()
            }), C) : C).ENEMY;
          } else if (this.phase === Phase.Result) {
            phaseText = '战斗结算';
            color = (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
              error: Error()
            }), C) : C).GOLD;
          }

          this.hud.setStatus(this.gold, this.roundNo, phaseText, color);
        }

        startBattle() {
          if (this.phase !== Phase.Prep) {
            return;
          }

          var boardCount = this.roster.filter(u => u.row >= 0).length;

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
          this.hud.setTimer('0s'); // 刷新双方状态（满血、清空统计）

          this.rebuildUnits();
          this.battle.begin();
        }

        onBattleFinish(winner, forced) {
          this.phase = Phase.Result;
          var rows = [];

          for (var u of this.units) {
            if (!u || !u.data) {
              continue;
            }

            var d = (_crd && CHESS_DEFS === void 0 ? (_reportPossibleCrUseOfCHESS_DEFS({
              error: Error()
            }), CHESS_DEFS) : CHESS_DEFS)[u.data.type];
            rows.push({
              name: (u.data.team === (_crd && Team === void 0 ? (_reportPossibleCrUseOfTeam({
                error: Error()
              }), Team) : Team).Player ? '我方' : '敌方') + " " + d.role + " " + u.data.star + "\u2605",
              color: u.data.team === (_crd && Team === void 0 ? (_reportPossibleCrUseOfTeam({
                error: Error()
              }), Team) : Team).Player ? '#8fd0ff' : '#ff9b9b',
              dmg: Math.round(u.dmgDealt),
              taken: Math.round(u.dmgTaken),
              heal: Math.round(u.healed)
            });
          }

          rows.sort((a, b) => {
            var pa = a.name.indexOf('我方') === 0 ? 0 : 1;
            var pb = b.name.indexOf('我方') === 0 ? 0 : 1;

            if (pa !== pb) {
              return pa - pb;
            }

            return b.dmg - a.dmg;
          });
          var title = winner === (_crd && Team === void 0 ? (_reportPossibleCrUseOfTeam({
            error: Error()
          }), Team) : Team).Player ? '战斗胜利' : '战斗失败';

          if (forced) {
            title += '（60 秒剩余血量判定）';
          }

          this.hud.setBattleMode(false);
          this.hud.setTimer("\u6218\u6597 " + Math.floor(this.battle.time) + "s");
          this.syncHud();
          this.hud.showResult(title, rows, () => this.nextRound(), () => this.restartGame());
        }

        nextRound() {
          this.hud.hideResult();
          this.roundNo++;
          this.rollShop();
          this.enterPrep();
        }

        restartGame() {
          this.hud.hideResult();
          this.startGame();
        } // ===================== 输入（拖拽为主，点击兜底） =====================

        /** 触摸点 → 画布本地坐标（以画布中心为原点，与 HUD 布局坐标一致） */


        localUI(event) {
          var ui = event.getUILocation();
          var vs = view.getVisibleSize();
          return new Vec2(ui.x - vs.width * 0.5, ui.y - vs.height * 0.5);
        }
        /** 触摸点是否落在顶栏或底部面板（画布本地 y） */


        inPanel(ly) {
          return ly > this.hud.H * 0.5 - 56 || ly < -this.hud.H * 0.5 + 250;
        }
        /** 触摸点 → 棋盘格子 */


        rayCell(event) {
          var loc = event.getLocation();
          var ray = this.cameraC.screenPointToRay(loc.x, loc.y, this.ray);

          if (Math.abs(ray.d.y) < 0.0001) {
            return null;
          }

          var t = -ray.o.y / ray.d.y;

          if (t <= 0) {
            return null;
          }

          return (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).worldToCell(ray.o.x + ray.d.x * t, ray.o.z + ray.d.z * t);
        }

        onTouchStart(event) {
          this.dragKind = null;
          this.dragIndex = -1;
          this.dragUid = -1;
          this.dragging = false;

          if (!this.hud || this.phase !== Phase.Prep || this.hud.isModalOpen) {
            return;
          }

          var p = this.localUI(event);
          this.dragFrom.set(p);
          var bagIdx = this.hud.bagIndexAt(p.x, p.y);

          if (bagIdx >= 0 && this.bag[bagIdx]) {
            this.dragKind = 'bag';
            this.dragIndex = bagIdx;
            return;
          }

          var bench = this.benchList();
          var benchIdx = this.hud.benchIndexAt(p.x, p.y);

          if (benchIdx >= 0 && bench[benchIdx]) {
            this.dragKind = 'unit';
            this.dragUid = bench[benchIdx].uid;
            return;
          } // 顶栏 / 底部面板区域不再取棋盘格


          if (this.inPanel(p.y)) {
            return;
          }

          var cell = this.rayCell(event);

          if (!cell) {
            return;
          }

          var u = this.roster.find(x => x.row === cell.row && x.col === cell.col);

          if (u) {
            this.dragKind = 'unit';
            this.dragUid = u.uid;
          }
        }

        onTouchMove(event) {
          if (!this.dragKind) {
            return;
          }

          var p = this.localUI(event);

          if (!this.dragging) {
            if (Math.abs(p.x - this.dragFrom.x) + Math.abs(p.y - this.dragFrom.y) < 8) {
              return;
            }

            this.dragging = true;

            if (this.dragKind === 'bag') {
              var def = (_crd && EQUIP_DEFS === void 0 ? (_reportPossibleCrUseOfEQUIP_DEFS({
                error: Error()
              }), EQUIP_DEFS) : EQUIP_DEFS)[this.bag[this.dragIndex]];
              this.hud.showDragGhost(def.id + " " + def.short, def.color);
            } else {
              var u = this.roster.find(x => x.uid === this.dragUid);

              if (u) {
                var _def = (_crd && CHESS_DEFS === void 0 ? (_reportPossibleCrUseOfCHESS_DEFS({
                  error: Error()
                }), CHESS_DEFS) : CHESS_DEFS)[u.type];
                this.hud.showDragGhost(_def.role + " " + u.star + "\u2605", _def.color);
              }
            }
          }

          this.hud.moveDragGhost(p.x, p.y);
        }

        onTouchEnd(event) {
          var kind = this.dragKind;
          var index = this.dragIndex;
          var uid = this.dragUid;
          var dragging = this.dragging;
          this.dragKind = null;
          this.dragIndex = -1;
          this.dragUid = -1;
          this.dragging = false;

          if (this.hud) {
            this.hud.hideDragGhost();
          } // 只有真拖拽才有落点结算，单纯点击不做任何操作


          if (kind && dragging) {
            this.resolveDrop(event, kind, index, uid);
          }
        }

        onTouchCancel() {
          this.dragKind = null;
          this.dragIndex = -1;
          this.dragUid = -1;
          this.dragging = false;

          if (this.hud) {
            this.hud.hideDragGhost();
          }
        }
        /** 拖拽落点结算 */


        resolveDrop(event, kind, index, uid) {
          var p = this.localUI(event);
          var cell = this.inPanel(p.y) ? null : this.rayCell(event);
          var bench = this.benchList();
          var benchIdx = this.hud.benchIndexAt(p.x, p.y);
          var onBench = benchIdx >= 0 && bench[benchIdx] ? bench[benchIdx] : null;
          var onBoard = cell ? this.roster.find(u => u.row === cell.row && u.col === cell.col) : null;
          var target = onBoard || onBench; // 装备拖到棋子身上穿戴（棋盘格子没命中时，取屏幕上离落点最近的己方棋子，放大判定区域）

          if (kind === 'bag') {
            var owner = onBench || onBoard || this.unitNear(event);

            if (!owner) {
              this.hud.toast('把装备拖到棋子身上才能穿戴');
              return;
            }

            this.equipSmart(owner, index);
            return;
          } // 棋子拖到格子上阵 / 换位


          var src = this.roster.find(u => u.uid === uid);

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

          if (!(_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).isPlayerRow(cell.row)) {
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
          this.hud.toast("\u4E0A\u9635 " + (_crd && CHESS_DEFS === void 0 ? (_reportPossibleCrUseOfCHESS_DEFS({
            error: Error()
          }), CHESS_DEFS) : CHESS_DEFS)[src.type].role + " " + src.star + "\u2605");
        }
        /** 落点附近最近的己方场上棋子（屏幕空间椭圆判定，拖装备时的宽松拾取） */


        unitNear(event) {
          var _this2 = this;

          var loc = event.getLocation();
          var best = null;
          var bestD = 1;

          var _loop2 = function _loop2(u) {
            if (u.row < 0) {
              return 0; // continue
            }

            var inst = _this2.units.find(x => x.data === u);

            if (!inst || !inst.isValid) {
              return 0; // continue
            }

            inst.node.getWorldPosition(_this2.tmpV); // 以棋子身体中部为判定中心（模型高约 1.16）

            _this2.tmpV.y += 0.8;

            _this2.cameraC.worldToScreen(_this2.tmpV, _this2.tmpScreen);

            var dx = (_this2.tmpScreen.x - loc.x) / 72;
            var dy = (_this2.tmpScreen.y - loc.y) / 110;
            var d = dx * dx + dy * dy;

            if (d < bestD) {
              bestD = d;
              best = u;
            }
          },
              _ret2;

          for (var u of this.roster) {
            _ret2 = _loop2(u);
            if (_ret2 === 0) continue;
          }

          return best;
        } // ===================== 手牌 / 背包 =====================


        benchList() {
          return this.roster.filter(u => u.row < 0);
        }

        equipTo(unit, bagIndex) {
          if (unit.equips.length >= (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).MAX_EQUIP) {
            this.hud.toast('该棋子 3 个装备槽已满');
            return;
          }

          var id = this.bag[bagIndex];

          if (!id) {
            return;
          }

          unit.equips.push(id);
          this.bag.splice(bagIndex, 1);
          this.hud.setBag(this.bag);
          this.hud.setCombineEnabled(this.hasCombine());
          this.hud.setBench(this.benchList());
          this.rebuildUnits();
          this.hud.toast((_crd && CHESS_DEFS === void 0 ? (_reportPossibleCrUseOfCHESS_DEFS({
            error: Error()
          }), CHESS_DEFS) : CHESS_DEFS)[unit.type].role + " \u88C5\u5907 " + (_crd && EQUIP_DEFS === void 0 ? (_reportPossibleCrUseOfEQUIP_DEFS({
            error: Error()
          }), EQUIP_DEFS) : EQUIP_DEFS)[id].name);
        }
        /** 拖拽穿戴：一级装备 + 该棋子已有的一级装备 → 弹合成预览确认框 */


        equipSmart(unit, bagIndex) {
          var id = this.bag[bagIndex];

          if (!id) {
            return;
          }

          var base = unit.equips.find(e => (_crd && BASE_EQUIPS === void 0 ? (_reportPossibleCrUseOfBASE_EQUIPS({
            error: Error()
          }), BASE_EQUIPS) : BASE_EQUIPS).indexOf(e) >= 0);

          if (base && (_crd && BASE_EQUIPS === void 0 ? (_reportPossibleCrUseOfBASE_EQUIPS({
            error: Error()
          }), BASE_EQUIPS) : BASE_EQUIPS).indexOf(id) >= 0) {
            var result = (_crd && combineEquip === void 0 ? (_reportPossibleCrUseOfcombineEquip({
              error: Error()
            }), combineEquip) : combineEquip)(base, id);

            if (result) {
              var def = (_crd && EQUIP_DEFS === void 0 ? (_reportPossibleCrUseOfEQUIP_DEFS({
                error: Error()
              }), EQUIP_DEFS) : EQUIP_DEFS)[result];
              this.hud.showConfirm("\u5408\u6210\u9884\u89C8\uFF1A" + def.name, [(_crd && EQUIP_DEFS === void 0 ? (_reportPossibleCrUseOfEQUIP_DEFS({
                error: Error()
              }), EQUIP_DEFS) : EQUIP_DEFS)[base].name + " + " + (_crd && EQUIP_DEFS === void 0 ? (_reportPossibleCrUseOfEQUIP_DEFS({
                error: Error()
              }), EQUIP_DEFS) : EQUIP_DEFS)[id].name + " \u2192 " + def.name, def.special || '', '确认后两件一级装备合成为一件，直接穿戴在该棋子身上', '取消则不穿戴'], () => this.equipCombined(unit, bagIndex, base, result), '确认穿戴');
              return;
            }
          }

          this.equipTo(unit, bagIndex);
        }
        /** 确认后：棋子身上的一级装备 + 背包里的一级装备合成为高级装备并穿戴 */


        equipCombined(unit, bagIndex, base, result) {
          var i = unit.equips.indexOf(base);

          if (i >= 0) {
            unit.equips.splice(i, 1);
          }

          unit.equips.push(result);
          this.bag.splice(bagIndex, 1);
          this.hud.setBag(this.bag);
          this.hud.setCombineEnabled(this.hasCombine());
          this.hud.setBench(this.benchList());
          this.rebuildUnits();
          this.hud.toast((_crd && CHESS_DEFS === void 0 ? (_reportPossibleCrUseOfCHESS_DEFS({
            error: Error()
          }), CHESS_DEFS) : CHESS_DEFS)[unit.type].role + " \u7A7F\u6234 " + (_crd && EQUIP_DEFS === void 0 ? (_reportPossibleCrUseOfEQUIP_DEFS({
            error: Error()
          }), EQUIP_DEFS) : EQUIP_DEFS)[result].name);
        } // ===================== 合成 =====================


        hasCombine() {
          var count = {};

          for (var id of this.bag) {
            count[id] = (count[id] || 0) + 1;
          } // 两件散件即可尝试合成（同件需 2 个）


          var kinds = 0;

          for (var _id of _crd && BASE_EQUIPS === void 0 ? (_reportPossibleCrUseOfBASE_EQUIPS({
            error: Error()
          }), BASE_EQUIPS) : BASE_EQUIPS) {
            if ((count[_id] || 0) >= 1) {
              kinds++;
            }
          }

          return kinds >= 2 || (_crd && BASE_EQUIPS === void 0 ? (_reportPossibleCrUseOfBASE_EQUIPS({
            error: Error()
          }), BASE_EQUIPS) : BASE_EQUIPS).some(id => (count[id] || 0) >= 2);
        }

        openCombine() {
          var count = {};

          for (var id of this.bag) {
            count[id] = (count[id] || 0) + 1;
          }

          var combos = [];

          for (var a of _crd && BASE_EQUIPS === void 0 ? (_reportPossibleCrUseOfBASE_EQUIPS({
            error: Error()
          }), BASE_EQUIPS) : BASE_EQUIPS) {
            for (var b of _crd && BASE_EQUIPS === void 0 ? (_reportPossibleCrUseOfBASE_EQUIPS({
              error: Error()
            }), BASE_EQUIPS) : BASE_EQUIPS) {
              if (a > b) {
                continue;
              }

              var need = a === b ? 2 : 1;

              if ((count[a] || 0) < need) {
                continue;
              }

              if ((count[b] || 0) < need) {
                continue;
              }

              var result = (_crd && combineEquip === void 0 ? (_reportPossibleCrUseOfcombineEquip({
                error: Error()
              }), combineEquip) : combineEquip)(a, b);

              if (result) {
                combos.push({
                  a,
                  b,
                  result
                });
              }
            }
          }

          this.hud.showCombos(combos, (a, b) => this.previewCombine(a, b));
        }

        previewCombine(a, b) {
          var result = (_crd && combineEquip === void 0 ? (_reportPossibleCrUseOfcombineEquip({
            error: Error()
          }), combineEquip) : combineEquip)(a, b);

          if (!result) {
            return;
          }

          this.hud.hideCombos();
          var def = (_crd && EQUIP_DEFS === void 0 ? (_reportPossibleCrUseOfEQUIP_DEFS({
            error: Error()
          }), EQUIP_DEFS) : EQUIP_DEFS)[result];
          this.hud.showConfirm("\u5408\u6210\u9884\u89C8\uFF1A" + result + " " + def.name, [(_crd && EQUIP_DEFS === void 0 ? (_reportPossibleCrUseOfEQUIP_DEFS({
            error: Error()
          }), EQUIP_DEFS) : EQUIP_DEFS)[a].name + " + " + (_crd && EQUIP_DEFS === void 0 ? (_reportPossibleCrUseOfEQUIP_DEFS({
            error: Error()
          }), EQUIP_DEFS) : EQUIP_DEFS)[b].name + " \u2192 " + def.name, def.special || '', '确认后消耗两件散件（不可二次合成）'], () => this.doCombine(a, b));
        }

        doCombine(a, b) {
          var result = (_crd && combineEquip === void 0 ? (_reportPossibleCrUseOfcombineEquip({
            error: Error()
          }), combineEquip) : combineEquip)(a, b);

          if (!result) {
            return;
          }

          var i1 = this.bag.indexOf(a);

          if (i1 >= 0) {
            this.bag.splice(i1, 1);
          }

          var i2 = this.bag.indexOf(b);

          if (i2 >= 0) {
            this.bag.splice(i2, 1);
          }

          this.bag.push(result);
          this.hud.setBag(this.bag);
          this.hud.setCombineEnabled(this.hasCombine());
          this.hud.toast("\u5408\u6210\u6210\u529F\uFF1A" + (_crd && EQUIP_DEFS === void 0 ? (_reportPossibleCrUseOfEQUIP_DEFS({
            error: Error()
          }), EQUIP_DEFS) : EQUIP_DEFS)[result].name);
        } // ===================== 棋子实例 =====================


        rebuildUnits() {
          for (var u of this.units) {
            if (u && u.isValid) {
              u.dispose();
            }
          }

          this.units = [];
          this.battle.reset();

          for (var data of this.roster) {
            if (data.row >= 0) {
              this.spawnUnit(data);
            }
          }

          for (var _data of this.enemyRoster) {
            this.spawnUnit(_data);
          }
        }

        spawnUnit(data) {
          var n = new Node('Unit');
          n.parent = this.unitsRoot;
          var u = n.addComponent(_crd && ChessUnit === void 0 ? (_reportPossibleCrUseOfChessUnit({
            error: Error()
          }), ChessUnit) : ChessUnit);
          u.init(data, this.cameraC, this.floatRoot);
          this.units.push(u);
          this.battle.addUnit(u);
        }

        generateEnemies() {
          this.enemyRoster = [];
          var count = Math.min(6, 2 + this.roundNo);
          var used = [];

          for (var i = 0; i < count; i++) {
            var type = (_crd && CHESS_LIST === void 0 ? (_reportPossibleCrUseOfCHESS_LIST({
              error: Error()
            }), CHESS_LIST) : CHESS_LIST)[Math.floor(Math.random() * (_crd && CHESS_LIST === void 0 ? (_reportPossibleCrUseOfCHESS_LIST({
              error: Error()
            }), CHESS_LIST) : CHESS_LIST).length)];
            var star = this.roundNo >= 5 && Math.random() < 0.4 ? 2 : 1;
            var cell = this.pickEnemyCell(type, used);
            used.push(cell.col + "," + cell.row);
            this.enemyRoster.push({
              uid: (_crd && nextUid === void 0 ? (_reportPossibleCrUseOfnextUid({
                error: Error()
              }), nextUid) : nextUid)(),
              type,
              star,
              equips: [],
              col: cell.col,
              row: cell.row,
              team: (_crd && Team === void 0 ? (_reportPossibleCrUseOfTeam({
                error: Error()
              }), Team) : Team).Enemy
            });
          }
        }
        /** 敌方布阵：坦克/刺客（近战）优先前排，射手/治疗师（远程）优先后排 */


        pickEnemyCell(type, used) {
          var frontRows = [(_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).EMPTY_ROW - 1, (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).EMPTY_ROW - 2, 0];
          var backRows = [0, 1, (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).EMPTY_ROW - 1];
          var near = type === 'A' || type === 'B';

          for (var row of near ? frontRows : backRows) {
            var free = [];

            for (var col = 0; col < (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).COLS; col++) {
              if (used.indexOf(col + "," + row) < 0) {
                free.push(col);
              }
            }

            if (free.length > 0) {
              return {
                col: free[Math.floor(Math.random() * free.length)],
                row
              };
            }
          }

          return {
            col: Math.floor(Math.random() * (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).COLS),
            row: 0
          };
        } // ===================== 每帧 =====================


        update(dt) {
          if (!this.hud) {
            return;
          }

          if (this.phase === Phase.Battle) {
            var t = Math.floor(this.battle.time);
            this.hud.setTimer("\u6218\u6597 " + t + "s / 60s");

            if (this.battle.time >= (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).SPEED_UP_TIME) {
              this.hud.setSpeed('战斗加速 x2');
            }
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "stdMat", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=7803d1bc343d3c38faf78008485e8744f7d4b762.js.map