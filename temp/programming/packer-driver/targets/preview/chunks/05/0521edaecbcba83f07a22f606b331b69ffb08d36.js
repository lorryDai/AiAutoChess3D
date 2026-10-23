System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Color, Node, UITransform, UIOpacity, tween, C, CHESS_DEFS, EQUIP_DEFS, UIUtil, GameHUD, _crd;

  function _reportPossibleCrUseOfC(extras) {
    _reporterNs.report("C", "../config/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfChessType(extras) {
    _reporterNs.report("ChessType", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfCHESS_DEFS(extras) {
    _reporterNs.report("CHESS_DEFS", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEQUIP_DEFS(extras) {
    _reporterNs.report("EQUIP_DEFS", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfEquipId(extras) {
    _reporterNs.report("EquipId", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUnitData(extras) {
    _reporterNs.report("UnitData", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUIUtil(extras) {
    _reporterNs.report("UIUtil", "./UIUtil", _context.meta, extras);
  }

  _export("GameHUD", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Color = _cc.Color;
      Node = _cc.Node;
      UITransform = _cc.UITransform;
      UIOpacity = _cc.UIOpacity;
      tween = _cc.tween;
    }, function (_unresolved_2) {
      C = _unresolved_2.C;
    }, function (_unresolved_3) {
      CHESS_DEFS = _unresolved_3.CHESS_DEFS;
      EQUIP_DEFS = _unresolved_3.EQUIP_DEFS;
    }, function (_unresolved_4) {
      UIUtil = _unresolved_4.UIUtil;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8b9c00eLzpLTJ1eb3qLnA0l", "GameHUD", undefined);

      __checkObsolete__(['Color', 'Label', 'Node', 'UITransform', 'UIOpacity', 'Vec3', 'tween']);

      /** 全部 2D 界面：顶栏、商店、手牌、背包、首页、结算、合成确认、飘提示 */
      _export("GameHUD", GameHUD = class GameHUD {
        constructor() {
          this.W = 960;
          this.H = 640;
          this.canvas = null;
          this.cb = null;
          this.topBar = null;
          this.bottom = null;
          this.goldLabel = null;
          this.roundLabel = null;
          this.phaseLabel = null;
          this.timerLabel = null;
          this.hintLabel = null;
          this.speedLabel = null;
          this.rowEquip = null;
          this.rowUnit = null;
          this.rowBench = null;
          this.rowBag = null;
          this.startBtn = null;
          this.refreshBtn = null;
          this.combineBtn = null;
          this.homeNode = null;
          this.resultNode = null;
          this.comboNode = null;
          this.confirmNode = null;
          this.toastNode = null;
          this.dragNode = null;
          this.shopEquips = [];
          this.shopUnits = [];
          this.bench = [];
          this.bag = [];
          this.selectedUid = -1;
          this.bagSel = -1;
          this.left = 0;
          this.cardW = 0;
        }

        build(canvas, cb) {
          this.canvas = canvas;
          this.cb = cb;
          var ut = canvas.getComponent(UITransform);

          if (ut && ut.width > 0) {
            this.W = ut.width;
            this.H = ut.height;
          }

          this.left = -(this.W - 12) * 0.5;
          var areaW = this.W - 12 - 56 - 140;
          this.cardW = areaW / 5 - 6;
          this.buildTopBar();
          this.buildBottom();
        } // ===================== 顶栏 =====================


        buildTopBar() {
          var W = this.W;
          var H = this.H;
          this.topBar = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).rect(this.canvas, 'TopBar', W, 54, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
            error: Error()
          }), C) : C).TOPBAR, 0);
          this.topBar.setPosition(0, H * 0.5 - 27);
          this.goldLabel = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).label(this.topBar, 'gold', '金币 0', 22, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
            error: Error()
          }), C) : C).GOLD, true);
          this.goldLabel.node.setPosition(-W * 0.5 + 96, 0);
          this.roundLabel = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).label(this.topBar, 'round', '第 1 回合', 18, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
            error: Error()
          }), C) : C).TEXT, true);
          this.roundLabel.node.setPosition(-W * 0.5 + 268, 0);
          this.phaseLabel = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).label(this.topBar, 'phase', '准备阶段', 20, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
            error: Error()
          }), C) : C).PLAYER, true);
          this.phaseLabel.node.setPosition(-30, 0);
          this.timerLabel = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).label(this.topBar, 'timer', '', 18, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
            error: Error()
          }), C) : C).TEXT_DIM, false);
          this.timerLabel.node.setPosition(150, 0);
          this.speedLabel = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).label(this.topBar, 'speed', '', 16, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
            error: Error()
          }), C) : C).GOLD, true);
          this.speedLabel.node.setPosition(258, 0);
          this.startBtn = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).button(this.topBar, 'start', '开始战斗', 124, 38, '#c0392b', '#ffffff', 20, () => this.cb.onStartBattle());
          this.startBtn.setPosition(W * 0.5 - 78, 0);
          this.hintLabel = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).label(this.canvas, 'hint', '', 15, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
            error: Error()
          }), C) : C).TEXT_DIM, false, W - 60);
          this.hintLabel.node.setPosition(0, H * 0.5 - 76);
        } // ===================== 底部面板 =====================


        buildBottom() {
          var W = this.W;
          var H = this.H;
          var bh = 236;
          this.bottom = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).rect(this.canvas, 'BottomPanel', W - 12, bh, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
            error: Error()
          }), C) : C).PANEL, 12);
          this.bottom.setPosition(0, -H * 0.5 + bh * 0.5 + 6); // 行标题

          var titles = [['装备', 84], ['棋子', 38], ['手牌', -12], ['背包', -54]];

          for (var t of titles) {
            var lb = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
              error: Error()
            }), UIUtil) : UIUtil).label(this.bottom, 'rowTitle', t[0], 13, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
              error: Error()
            }), C) : C).TEXT_DIM, false);
            lb.node.setPosition(this.left + 22, t[1]);
          }

          this.rowEquip = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).node(this.bottom, 'rowEquip', W - 12, 44);
          this.rowEquip.setPosition(0, 84);
          this.rowUnit = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).node(this.bottom, 'rowUnit', W - 12, 44);
          this.rowUnit.setPosition(0, 38);
          this.rowBench = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).node(this.bottom, 'rowBench', W - 12, 42);
          this.rowBench.setPosition(0, -12);
          this.rowBag = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).node(this.bottom, 'rowBag', W - 12, 36);
          this.rowBag.setPosition(0, -54); // 刷新按钮

          this.refreshBtn = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).button(this.bottom, 'refresh', '刷新 1金', 100, 36, '#2f4a6b', '#ffffff', 16, () => this.cb.onRefresh());
          this.refreshBtn.setPosition((W - 12) * 0.5 - 62, 61); // 合成按钮

          this.combineBtn = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).button(this.bottom, 'combine', '合成装备', 100, 36, '#6b5a2f', '#ffe9a8', 16, () => this.cb.onCombine());
          this.combineBtn.setPosition((W - 12) * 0.5 - 62, -30);
        } // ===================== 状态 =====================


        setStatus(gold, round, phase, phaseColor) {
          this.goldLabel.string = "\u91D1\u5E01 " + gold;
          this.roundLabel.string = "\u7B2C " + round + " \u56DE\u5408";
          this.phaseLabel.string = phase;
          this.phaseLabel.color = new Color(phaseColor);
        }

        setTimer(text) {
          this.timerLabel.string = text;
        }

        setSpeed(text) {
          this.speedLabel.string = text;
        }

        setHint(text) {
          this.hintLabel.string = text;
        }

        setBattleMode(on) {
          this.startBtn.active = !on;
          this.refreshBtn.active = !on;
        }

        setHudVisible(on) {
          this.topBar.active = on;
          this.bottom.active = on;
          this.hintLabel.node.active = on;
        } // ===================== 商店 / 手牌 / 背包 =====================


        setShop(equips, units) {
          this.shopEquips = equips;
          this.shopUnits = units;
          this.renderShop();
        }

        setBench(bench, selectedUid) {
          if (selectedUid === void 0) {
            selectedUid = -1;
          }

          this.bench = bench;
          this.selectedUid = selectedUid;
          this.renderBench();
        }

        setBag(bag, bagSel) {
          if (bagSel === void 0) {
            bagSel = -1;
          }

          this.bag = bag;
          this.bagSel = bagSel;
          this.renderBag();
        }

        setCombineEnabled(on) {
          this.combineBtn.active = on;
        } // ===================== 拖拽 =====================

        /** 手指位置（画布本地坐标）命中的手牌格，-1 表示未命中 */


        benchIndexAt(lx, ly) {
          var rowY = -this.H * 0.5 + 112;

          if (Math.abs(ly - rowY) > 24) {
            return -1;
          }

          return this.slotIndex(lx, this.left + 56 + 31, 66, 62, 8);
        }
        /** 手指位置命中的背包装备格，-1 表示未命中 */


        bagIndexAt(lx, ly) {
          var rowY = -this.H * 0.5 + 70;

          if (Math.abs(ly - rowY) > 20) {
            return -1;
          }

          return this.slotIndex(lx, this.left + 56 + 23, 49, 46, 10);
        }

        slotIndex(lx, startX, step, slotW, count) {
          var i = Math.round((lx - startX) / step);

          if (i < 0 || i >= count) {
            return -1;
          }

          if (Math.abs(lx - (startX + i * step)) > slotW * 0.5 + 2) {
            return -1;
          }

          return i;
        }

        showDragGhost(text, color) {
          this.hideDragGhost();
          var n = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).rect(this.canvas, 'DragGhost', 150, 34, '#0b1220e6', 17);
          (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).frame(n, 'ring', 152, 36, '#00000000', color, 2, 18);
          (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).label(n, 'txt', text, 15, color, true, 140);
          this.dragNode = n;
        }

        moveDragGhost(lx, ly) {
          if (this.dragNode && this.dragNode.isValid) {
            this.dragNode.setPosition(lx, ly + 36, 0);
          }
        }

        hideDragGhost() {
          if (this.dragNode && this.dragNode.isValid) {
            this.dragNode.destroy();
          }

          this.dragNode = null;
        }

        renderShop() {
          var _this = this;

          (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).clearChildren(this.rowEquip);
          (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).clearChildren(this.rowUnit);
          var startX = this.left + 56 + this.cardW * 0.5;

          var _loop = function _loop(i) {
            var id = _this.shopEquips[i];
            var def = (_crd && EQUIP_DEFS === void 0 ? (_reportPossibleCrUseOfEQUIP_DEFS({
              error: Error()
            }), EQUIP_DEFS) : EQUIP_DEFS)[id];

            var card = _this.makeCard(_this.rowEquip, _this.cardW, 40, id + " " + def.name, (def.special || '') + " \xB7 1\u91D1", '#22334a', def.color);

            card.setPosition(startX + i * (_this.cardW + 6), 0);
            card.on(Node.EventType.TOUCH_END, () => _this.cb.onBuyEquip(i), _this);
          };

          for (var i = 0; i < this.shopEquips.length; i++) {
            _loop(i);
          }

          var _loop2 = function _loop2(_i) {
            var type = _this.shopUnits[_i];
            var def = (_crd && CHESS_DEFS === void 0 ? (_reportPossibleCrUseOfCHESS_DEFS({
              error: Error()
            }), CHESS_DEFS) : CHESS_DEFS)[type];

            var card = _this.makeCard(_this.rowUnit, _this.cardW, 40, def.role + " " + def.name, def.hp + "\u8840 " + def.atk + "\u653B " + def.range + "\u683C \xB7 1\u91D1", '#22334a', def.color);

            card.setPosition(startX + _i * (_this.cardW + 6), 0);
            card.on(Node.EventType.TOUCH_END, () => _this.cb.onBuyUnit(_i), _this);
          };

          for (var _i = 0; _i < this.shopUnits.length; _i++) {
            _loop2(_i);
          }
        }

        makeCard(parent, w, h, title, sub, bg, accent) {
          var n = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).rect(parent, 'card', w, h, bg, 7);
          (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).rect(n, 'accent', 4, h - 8, accent, 2).setPosition(-w * 0.5 + 5, 0);
          var t = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).label(n, 'title', title, 14, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
            error: Error()
          }), C) : C).TEXT, true, w - 16);
          t.node.setPosition(4, 9);
          var s = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).label(n, 'sub', sub, 10, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
            error: Error()
          }), C) : C).TEXT_DIM, false, w - 16);
          s.node.setPosition(4, -10);
          return n;
        }

        renderBench() {
          (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).clearChildren(this.rowBench);
          var slotW = 62;
          var step = 66;
          var startX = this.left + 56 + slotW * 0.5;

          for (var i = 0; i < 8; i++) {
            var u = this.bench[i];
            var selected = u && u.uid === this.selectedUid;
            var bg = u ? '#243a52' : (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
              error: Error()
            }), C) : C).SLOT_EMPTY;
            var slot = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
              error: Error()
            }), UIUtil) : UIUtil).rect(this.rowBench, 'bench' + i, slotW, 40, bg, 6);
            slot.setPosition(startX + i * step, 0);

            if (selected) {
              (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
                error: Error()
              }), UIUtil) : UIUtil).frame(slot, 'sel', slotW + 2, 42, '#00000000', (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
                error: Error()
              }), C) : C).GOLD, 2, 6);
            }

            if (u) {
              var def = (_crd && CHESS_DEFS === void 0 ? (_reportPossibleCrUseOfCHESS_DEFS({
                error: Error()
              }), CHESS_DEFS) : CHESS_DEFS)[u.type];
              var lb = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
                error: Error()
              }), UIUtil) : UIUtil).label(slot, 'name', "" + def.role + (u.star > 1 ? ' ' + u.star + '★' : ''), 12, def.color, true, slotW - 6);
              lb.node.setPosition(0, 4);
              var eq = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
                error: Error()
              }), UIUtil) : UIUtil).label(slot, 'eq', u.equips.length > 0 ? u.equips.join('') : '未装备', 9, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
                error: Error()
              }), C) : C).TEXT_DIM, false, slotW - 6);
              eq.node.setPosition(0, -12);
            }
          }
        }

        renderBag() {
          (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).clearChildren(this.rowBag);
          var slotW = 46;
          var step = 49;
          var startX = this.left + 56 + slotW * 0.5;

          for (var i = 0; i < 10; i++) {
            var id = this.bag[i];
            var selected = i === this.bagSel;
            var slot = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
              error: Error()
            }), UIUtil) : UIUtil).rect(this.rowBag, 'bag' + i, slotW, 32, id ? '#2a3a2e' : (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
              error: Error()
            }), C) : C).SLOT_EMPTY, 6);
            slot.setPosition(startX + i * step, 0);

            if (selected) {
              (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
                error: Error()
              }), UIUtil) : UIUtil).frame(slot, 'sel', slotW + 2, 34, '#00000000', (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
                error: Error()
              }), C) : C).GOLD, 2, 6);
            }

            if (id) {
              var def = (_crd && EQUIP_DEFS === void 0 ? (_reportPossibleCrUseOfEQUIP_DEFS({
                error: Error()
              }), EQUIP_DEFS) : EQUIP_DEFS)[id];
              var lb = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
                error: Error()
              }), UIUtil) : UIUtil).label(slot, 'name', id + " " + def.short, 12, def.color, true, slotW - 4);
              lb.node.setPosition(0, 0);
            }
          }
        } // ===================== 提示 =====================


        toast(text) {
          if (this.toastNode && this.toastNode.isValid) {
            this.toastNode.destroy();
          }

          var n = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).rect(this.canvas, 'Toast', 420, 40, '#000000cc', 20);
          n.setPosition(0, this.H * 0.5 - 118);
          var lb = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).label(n, 'txt', text, 17, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
            error: Error()
          }), C) : C).GOLD, true, 400);
          var op = n.addComponent(UIOpacity);
          this.toastNode = n;
          tween(op).delay(0.9).to(0.5, {
            opacity: 0
          }).call(() => {
            if (n.isValid) {
              n.destroy();
            }
          }).start();
        } // ===================== 首页 =====================


        showHome(onStart) {
          if (this.homeNode && this.homeNode.isValid) {
            this.homeNode.active = true;
            return;
          }

          var m = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).mask(this.canvas, 'Home', 200);
          this.homeNode = m;
          var title = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).label(m, 'title', '金铲铲之战 · 3D 自走棋', 42, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
            error: Error()
          }), C) : C).GOLD, true);
          title.node.setPosition(0, 150);
          var lines = ['4 x 7 棋盘：上方 3 行敌方，下方 3 行我方，中间空行', '准备阶段：购买棋子 / 装备（各 1 金），拖动棋子布阵，同名棋子购买后自动升星', '装备可拖动到棋子身上穿戴；两件一级装备同穿一件会弹出合成确认', '战斗阶段：AI 自动战斗，40 秒加速，60 秒按剩余血量强制结算'];

          for (var i = 0; i < lines.length; i++) {
            var lb = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
              error: Error()
            }), UIUtil) : UIUtil).label(m, 'line', lines[i], 16, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
              error: Error()
            }), C) : C).TEXT, false, 700);
            lb.node.setPosition(0, 70 - i * 30);
          }

          var btn = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).button(m, 'play', '开始游戏', 210, 58, '#c0392b', '#ffffff', 24, onStart);
          btn.setPosition(0, -110);
          var tip = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).label(m, 'tip', '提示：点击商店购买 → 拖动棋子到我方格子上阵 → 拖动背包装备到棋子身上穿戴', 13, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
            error: Error()
          }), C) : C).TEXT_DIM, false, 760);
          tip.node.setPosition(0, -180);
        }

        hideHome() {
          if (this.homeNode && this.homeNode.isValid) {
            this.homeNode.active = false;
          }
        } // ===================== 结算 =====================


        showResult(title, rows, onNext, onRestart) {
          this.hideResult();
          var m = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).mask(this.canvas, 'Result', 210);
          this.resultNode = m;
          var panel = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).rect(m, 'panel', 660, 470, '#0b1220f5', 14);
          panel.setPosition(0, 0);
          var t = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).label(panel, 'title', title, 30, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
            error: Error()
          }), C) : C).GOLD, true);
          t.node.setPosition(0, 200);
          var head = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).label(panel, 'head', '棋子', 15, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
            error: Error()
          }), C) : C).TEXT_DIM, false);
          head.node.setPosition(-250, 162);
          var h2 = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).label(panel, 'h2', '造成伤害', 15, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
            error: Error()
          }), C) : C).TEXT_DIM, false);
          h2.node.setPosition(-80, 162);
          var h3 = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).label(panel, 'h3', '承受伤害', 15, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
            error: Error()
          }), C) : C).TEXT_DIM, false);
          h3.node.setPosition(70, 162);
          var h4 = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).label(panel, 'h4', '治疗量', 15, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
            error: Error()
          }), C) : C).TEXT_DIM, false);
          h4.node.setPosition(210, 162);
          var maxRows = Math.min(rows.length, 15);

          for (var i = 0; i < maxRows; i++) {
            var r = rows[i];
            var y = 134 - i * 19;
            var n1 = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
              error: Error()
            }), UIUtil) : UIUtil).label(panel, 'r' + i, r.name, 14, r.color, false, 220);
            n1.node.setPosition(-250, y);
            var n2 = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
              error: Error()
            }), UIUtil) : UIUtil).label(panel, 'd' + i, "" + r.dmg, 14, '#ff9b9b', false);
            n2.node.setPosition(-80, y);
            var n3 = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
              error: Error()
            }), UIUtil) : UIUtil).label(panel, 't' + i, "" + r.taken, 14, '#9fc8ff', false);
            n3.node.setPosition(70, y);
            var n4 = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
              error: Error()
            }), UIUtil) : UIUtil).label(panel, 'h' + i, "" + r.heal, 14, '#8cf0a4', false);
            n4.node.setPosition(210, y);
          }

          var next = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).button(panel, 'next', '下一回合', 160, 44, '#2f6b4a', '#ffffff', 19, onNext);
          next.setPosition(-95, -190);
          var restart = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).button(panel, 'restart', '重新开始', 160, 44, '#8a3a3a', '#ffffff', 19, onRestart);
          restart.setPosition(95, -190);
        }

        hideResult() {
          if (this.resultNode && this.resultNode.isValid) {
            this.resultNode.destroy();
            this.resultNode = null;
          }
        } // ===================== 合成 =====================


        showCombos(combos, onPick) {
          this.hideCombos();
          var m = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).mask(this.canvas, 'Combine', 200);
          this.comboNode = m;
          var panel = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).rect(m, 'panel', 540, 450, '#0b1220f5', 14);
          var t = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).label(panel, 'title', '装备合成（不可二次合成）', 22, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
            error: Error()
          }), C) : C).GOLD, true);
          t.node.setPosition(0, 196);

          if (combos.length === 0) {
            var lb = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
              error: Error()
            }), UIUtil) : UIUtil).label(panel, 'empty', '背包中没有可合成的散件组合', 16, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
              error: Error()
            }), C) : C).TEXT_DIM, false);
            lb.node.setPosition(0, 40);
          }

          var _loop3 = function _loop3() {
            var c = combos[i];
            var def = (_crd && EQUIP_DEFS === void 0 ? (_reportPossibleCrUseOfEQUIP_DEFS({
              error: Error()
            }), EQUIP_DEFS) : EQUIP_DEFS)[c.result];
            var txt = c.a + " + " + c.b + "  \u2192  " + c.result + " " + def.name + "   " + (def.special || '');
            var btn = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
              error: Error()
            }), UIUtil) : UIUtil).button(panel, 'c' + i, txt, 490, 30, '#1d2f45', def.color, 13, () => {
              onPick(c.a, c.b);
            });
            btn.setPosition(0, 150 - i * 32);
          };

          for (var i = 0; i < combos.length && i < 10; i++) {
            _loop3();
          }

          var close = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).button(panel, 'close', '取消', 120, 38, '#3a3a3a', '#ffffff', 16, () => this.hideCombos());
          close.setPosition(0, -192);
        }

        hideCombos() {
          if (this.comboNode && this.comboNode.isValid) {
            this.comboNode.destroy();
            this.comboNode = null;
          }
        }
        /** 二次确认弹窗（装备合成预览 / 棋子合成预览） */


        showConfirm(title, lines, onOk, okText) {
          if (okText === void 0) {
            okText = '确认合成';
          }

          if (this.confirmNode && this.confirmNode.isValid) {
            this.confirmNode.destroy();
          }

          var m = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).mask(this.canvas, 'Confirm', 210);
          this.confirmNode = m;
          var panel = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).rect(m, 'panel', 440, 240, '#0b1220f8', 14);
          var t = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).label(panel, 'title', title, 22, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
            error: Error()
          }), C) : C).GOLD, true, 400);
          t.node.setPosition(0, 82);

          for (var i = 0; i < lines.length; i++) {
            var lb = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
              error: Error()
            }), UIUtil) : UIUtil).label(panel, 'line', lines[i], 15, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
              error: Error()
            }), C) : C).TEXT, false, 400);
            lb.node.setPosition(0, 36 - i * 26);
          }

          var ok = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).button(panel, 'ok', okText, 130, 40, '#2f6b4a', '#ffffff', 17, () => {
            this.hideConfirm();
            onOk();
          });
          ok.setPosition(-80, -76);
          var cancel = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).button(panel, 'cancel', '取消', 130, 40, '#5a3a3a', '#ffffff', 17, () => this.hideConfirm());
          cancel.setPosition(80, -76);
        }

        hideConfirm() {
          if (this.confirmNode && this.confirmNode.isValid) {
            this.confirmNode.destroy();
            this.confirmNode = null;
          }
        }

        get isModalOpen() {
          return !!(this.resultNode && this.resultNode.isValid) || !!(this.comboNode && this.comboNode.isValid) || !!(this.confirmNode && this.confirmNode.isValid);
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0521edaecbcba83f07a22f606b331b69ffb08d36.js.map