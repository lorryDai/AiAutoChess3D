System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Vec3, C, GameConfig, MeshKit, _dec, _class, _crd, ccclass, BoardManager;

  function _reportPossibleCrUseOfC(extras) {
    _reporterNs.report("C", "../config/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameConfig(extras) {
    _reporterNs.report("GameConfig", "../config/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMeshKit(extras) {
    _reporterNs.report("MeshKit", "../core/MeshKit", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      C = _unresolved_2.C;
      GameConfig = _unresolved_2.GameConfig;
    }, function (_unresolved_3) {
      MeshKit = _unresolved_3.MeshKit;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7a8b9wNHi9KO4xdbn+AkaKz", "BoardManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3']);

      ({
        ccclass
      } = _decorator);
      /** 4 x 7 棋盘（3D 地块、选中光圈、可移动提示） */

      _export("BoardManager", BoardManager = (_dec = ccclass('BoardManager'), _dec(_class = class BoardManager extends Component {
        constructor(...args) {
          super(...args);
          this.selectMark = null;
          this.moveMarks = [];
          this.time = 0;
        }

        build() {
          const width = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).COLS * (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).CELL_X;
          const depth = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).ROWS * (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).CELL_Z; // 底座

          const base = new Node('Base');
          base.parent = this.node;
          (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
            error: Error()
          }), MeshKit) : MeshKit).part(base, 'plate', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
            error: Error()
          }), MeshKit) : MeshKit).box(width + 0.6, 0.3, depth + 0.8), (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
            error: Error()
          }), C) : C).BOARD_BASE, new Vec3(0, -0.15, 0), 0.12); // 边框

          const railY = 0.02;
          const railLong = (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
            error: Error()
          }), MeshKit) : MeshKit).box(0.1, 0.1, depth + 0.8);
          const railShort = (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
            error: Error()
          }), MeshKit) : MeshKit).box(width + 0.6, 0.1, 0.1);

          const mkRail = (name, mesh, pos) => {
            (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
              error: Error()
            }), MeshKit) : MeshKit).part(base, name, mesh, (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
              error: Error()
            }), C) : C).RAIL, pos, 0.35);
          };

          mkRail('railL', railLong, new Vec3(-width * 0.5 - 0.28, railY, 0));
          mkRail('railR', railLong, new Vec3(width * 0.5 + 0.28, railY, 0));
          mkRail('railB', railShort, new Vec3(0, railY, depth * 0.5 + 0.38));
          mkRail('railT', railShort, new Vec3(0, railY, -depth * 0.5 - 0.38)); // 四角立柱

          const px = width * 0.5 + 0.28;
          const pz = depth * 0.5 + 0.38;

          for (const sx of [-1, 1]) {
            for (const sz of [-1, 1]) {
              (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                error: Error()
              }), MeshKit) : MeshKit).part(base, 'pillar', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                error: Error()
              }), MeshKit) : MeshKit).box(0.16, 0.6, 0.16), (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
                error: Error()
              }), C) : C).RAIL, new Vec3(sx * px, 0.28, sz * pz), 0.45);
            }
          } // 地块


          const tileMesh = (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
            error: Error()
          }), MeshKit) : MeshKit).box((_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).CELL_X * 0.88, 0.06, (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).CELL_Z * 0.88);
          const p = new Vec3();

          for (let row = 0; row < (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).ROWS; row++) {
            for (let col = 0; col < (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).COLS; col++) {
              (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
                error: Error()
              }), GameConfig) : GameConfig).cellToWorld(col, row, p);
              let color = (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
                error: Error()
              }), C) : C).MID_TILE;

              if ((_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
                error: Error()
              }), GameConfig) : GameConfig).isPlayerRow(row)) {
                color = (row + col) % 2 === 0 ? (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
                  error: Error()
                }), C) : C).PLAYER_TILE_A : (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
                  error: Error()
                }), C) : C).PLAYER_TILE_B;
              } else if ((_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
                error: Error()
              }), GameConfig) : GameConfig).isEnemyRow(row)) {
                color = (row + col) % 2 === 0 ? (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
                  error: Error()
                }), C) : C).ENEMY_TILE_A : (_crd && C === void 0 ? (_reportPossibleCrUseOfC({
                  error: Error()
                }), C) : C).ENEMY_TILE_B;
              }

              (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                error: Error()
              }), MeshKit) : MeshKit).part(base, `tile_${col}_${row}`, tileMesh, color, new Vec3(p.x, 0.02, p.z), 0.05);
            }
          } // 选中光圈


          this.selectMark = new Node('SelectMark');
          this.selectMark.parent = this.node;
          (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
            error: Error()
          }), MeshKit) : MeshKit).part(this.selectMark, 'ring', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
            error: Error()
          }), MeshKit) : MeshKit).cylinder(0.5, 0.5, 0.04), '#ffd24a', new Vec3(0, 0.1, 0), 1.2);
          this.selectMark.active = false; // 可移动提示

          for (let i = 0; i < 12; i++) {
            const m = new Node('MoveMark' + i);
            m.parent = this.node;
            (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
              error: Error()
            }), MeshKit) : MeshKit).part(m, 'dot', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
              error: Error()
            }), MeshKit) : MeshKit).cylinder(0.13, 0.13, 0.04), '#5ce07a', new Vec3(0, 0.1, 0), 0.9);
            m.active = false;
            this.moveMarks.push(m);
          }
        }

        markSelect(col, row) {
          const p = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).cellToWorld(col, row);
          this.selectMark.setPosition(p.x, 0, p.z);
          this.selectMark.active = true;
        }

        clearSelect() {
          if (this.selectMark) {
            this.selectMark.active = false;
          }
        }

        showMoves(cells) {
          for (let i = 0; i < this.moveMarks.length; i++) {
            const mark = this.moveMarks[i];

            if (i < cells.length) {
              const p = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
                error: Error()
              }), GameConfig) : GameConfig).cellToWorld(cells[i].col, cells[i].row);
              mark.setPosition(p.x, 0, p.z);
              mark.active = true;
            } else {
              mark.active = false;
            }
          }
        }

        clearMoves() {
          for (const m of this.moveMarks) {
            m.active = false;
          }
        }

        update(dt) {
          this.time += dt;

          if (this.selectMark && this.selectMark.active) {
            const s = 1 + Math.sin(this.time * 5) * 0.07;
            this.selectMark.setScale(new Vec3(s, 1, s));
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=2cebcc963530cf6f37fc84e0b0287654e4b51b3b.js.map