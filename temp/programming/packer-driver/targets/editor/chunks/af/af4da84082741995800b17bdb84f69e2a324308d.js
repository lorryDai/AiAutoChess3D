System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, GameConfig, Team, _dec, _class, _crd, ccclass, BattleManager;

  function _reportPossibleCrUseOfGameConfig(extras) {
    _reporterNs.report("GameConfig", "../config/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTeam(extras) {
    _reporterNs.report("Team", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfChessUnit(extras) {
    _reporterNs.report("ChessUnit", "../unit/ChessUnit", _context.meta, extras);
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
    }, function (_unresolved_2) {
      GameConfig = _unresolved_2.GameConfig;
    }, function (_unresolved_3) {
      Team = _unresolved_3.Team;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6f7a8ucDR5PKptMXW5/gJGi", "BattleManager", undefined);

      __checkObsolete__(['_decorator', 'Component']);

      ({
        ccclass
      } = _decorator);
      /** 战斗管理：自动战斗、寻敌、走位、40 秒加速、60 秒强制结算 */

      _export("BattleManager", BattleManager = (_dec = ccclass('BattleManager'), _dec(_class = class BattleManager extends Component {
        constructor(...args) {
          super(...args);
          this.units = [];
          this.running = false;
          this.time = 0;
          this.speed = 1;
          this.introTimer = 0;
          this.onFinish = null;
          this.onSpeedUp = null;
        }

        addUnit(u) {
          this.units.push(u);
        }

        reset() {
          this.units.length = 0;
          this.running = false;
          this.time = 0;
          this.speed = 1;
          this.introTimer = 0;
        }

        begin() {
          this.time = 0;
          this.speed = 1;
          this.introTimer = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).BATTLE_INTRO_TIME;
          this.running = true;
          this.refreshContext();
        }

        stop() {
          this.running = false;
        }

        update(dt) {
          if (!this.running) {
            return;
          }

          this.time += dt;

          if (this.speed < (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).SPEED_SCALE && this.time >= (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).SPEED_UP_TIME) {
            this.speed = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).SPEED_SCALE;

            if (this.onSpeedUp) {
              this.onSpeedUp();
            }
          }

          if (this.time >= (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).FORCE_END_TIME) {
            this.finish(true);
            return;
          }

          const sdt = dt * this.speed;

          for (const u of this.units) {
            if (u && u.isValid && u.alive) {
              u.updateFrame(sdt);
            }
          }

          if (this.introTimer > 0) {
            this.introTimer -= dt;
            return;
          }

          this.refreshContext();

          for (const u of this.units) {
            if (!u || !u.isValid || !u.alive || u.moving) {
              continue;
            }

            u.tryCastSkill();
            this.think(u);
          } // 一方全灭直接结束


          const p = this.aliveOf((_crd && Team === void 0 ? (_reportPossibleCrUseOfTeam({
            error: Error()
          }), Team) : Team).Player).length;
          const e = this.aliveOf((_crd && Team === void 0 ? (_reportPossibleCrUseOfTeam({
            error: Error()
          }), Team) : Team).Enemy).length;

          if (p === 0 || e === 0) {
            this.finish(false);
          }
        }

        refreshContext() {
          const players = [];
          const enemies = [];

          for (const u of this.units) {
            if (!u || !u.isValid || !u.alive) {
              continue;
            }

            if (u.data.team === (_crd && Team === void 0 ? (_reportPossibleCrUseOfTeam({
              error: Error()
            }), Team) : Team).Player) {
              players.push(u);
            } else {
              enemies.push(u);
            }
          }

          for (const u of players) {
            u.setContext(players, enemies);
          }

          for (const u of enemies) {
            u.setContext(enemies, players);
          }
        }

        aliveOf(team) {
          return this.units.filter(u => u && u.isValid && u.alive && u.data.team === team);
        }

        think(u) {
          const target = this.pickTarget(u);

          if (!target) {
            return;
          }

          const dist = this.dist(u, target);

          if (dist <= u.range) {
            if (!u.disarmed && u.attackCd <= 0) {
              u.attack(target);
              u.attackCd = 1 / u.atkSpeed;
            }
          } else {
            this.stepToward(u, target);
          }
        }

        pickTarget(u) {
          let best = null;
          let bestD = 9999;
          let bestHp = 999999;

          for (const e of this.units) {
            if (!e || !e.isValid || !e.alive || e.data.team === u.data.team) {
              continue;
            }

            const d = this.dist(u, e);

            if (d < bestD || d === bestD && e.hp < bestHp) {
              best = e;
              bestD = d;
              bestHp = e.hp;
            }
          }

          return best;
        }

        dist(a, b) {
          return Math.abs(a.col - b.col) + Math.abs(a.row - b.row);
        }

        stepToward(u, target) {
          const next = this.findStep(u, target);

          if (next) {
            u.startMove(next.col, next.row, 1 / u.moveSpeed);
          }
        }
        /**
         * 寻路：优先沿目标方向直线前进，前方被其他棋子占位时自动绕行。
         * 4x7 格盘直接 BFS 到目标相邻格，返回第一步；同距离路径按方向优先级取，保证走直线。
         */


        findStep(u, target) {
          const COLS = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).COLS;
          const ROWS = (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).ROWS;
          const total = COLS * ROWS;
          const blocked = new Array(total).fill(false);

          for (const o of this.units) {
            if (!o || !o.isValid || !o.alive || o === target) {
              continue;
            }

            blocked[o.row * COLS + o.col] = true;
          }

          const start = u.row * COLS + u.col;
          blocked[start] = false; // 方向优先级：先朝目标的主轴方向，尽量走直线，绕行时再走侧向

          const dc = Math.sign(target.col - u.col);
          const dr = Math.sign(target.row - u.row);
          const dirs = [];

          const pushDir = (c, r) => {
            if (c === 0 && r === 0) {
              return;
            }

            for (const d of dirs) {
              if (d[0] === c && d[1] === r) {
                return;
              }
            }

            dirs.push([c, r]);
          };

          pushDir(0, dr);
          pushDir(dc, 0);
          pushDir(0, 1);
          pushDir(0, -1);
          pushDir(1, 0);
          pushDir(-1, 0);
          const prev = new Int16Array(total).fill(-1);
          const seen = new Uint8Array(total);
          const queue = [start];
          seen[start] = 1;
          let found = -1;

          for (let head = 0; head < queue.length && found < 0; head++) {
            const cur = queue[head];
            const cc = cur % COLS;
            const cr = Math.floor(cur / COLS);

            if (Math.abs(cc - target.col) + Math.abs(cr - target.row) === 1) {
              found = cur;
              break;
            }

            for (const d of dirs) {
              const nc = cc + d[0];
              const nr = cr + d[1];

              if (nc < 0 || nc >= COLS || nr < 0 || nr >= ROWS) {
                continue;
              }

              const ni = nr * COLS + nc;

              if (seen[ni] || blocked[ni]) {
                continue;
              }

              seen[ni] = 1;
              prev[ni] = cur;
              queue.push(ni);
            }
          }

          if (found < 0 || prev[found] === -1) {
            return null;
          } // 回溯到起点后的第一步


          let cur = found;

          while (prev[cur] !== start && prev[cur] !== -1) {
            cur = prev[cur];
          }

          if (prev[cur] === -1) {
            return null;
          }

          return {
            col: cur % COLS,
            row: Math.floor(cur / COLS)
          };
        }

        finish(forced) {
          if (!this.running) {
            return;
          }

          this.running = false;
          const players = this.aliveOf((_crd && Team === void 0 ? (_reportPossibleCrUseOfTeam({
            error: Error()
          }), Team) : Team).Player);
          const enemies = this.aliveOf((_crd && Team === void 0 ? (_reportPossibleCrUseOfTeam({
            error: Error()
          }), Team) : Team).Enemy);
          let winner;

          if (!forced) {
            if (players.length === 0 && enemies.length === 0) {
              winner = (_crd && Team === void 0 ? (_reportPossibleCrUseOfTeam({
                error: Error()
              }), Team) : Team).Enemy;
            } else {
              winner = players.length > 0 ? (_crd && Team === void 0 ? (_reportPossibleCrUseOfTeam({
                error: Error()
              }), Team) : Team).Player : (_crd && Team === void 0 ? (_reportPossibleCrUseOfTeam({
                error: Error()
              }), Team) : Team).Enemy;
            }
          } else {
            winner = this.hpRatio(players) >= this.hpRatio(enemies) ? (_crd && Team === void 0 ? (_reportPossibleCrUseOfTeam({
              error: Error()
            }), Team) : Team).Player : (_crd && Team === void 0 ? (_reportPossibleCrUseOfTeam({
              error: Error()
            }), Team) : Team).Enemy;
          }

          if (this.onFinish) {
            this.onFinish(winner, forced);
          }
        }

        hpRatio(list) {
          let hp = 0;
          let max = 0;

          for (const u of list) {
            hp += Math.max(0, u.hp);
            max += u.maxHp;
          }

          return max > 0 ? hp / max : 0;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=af4da84082741995800b17bdb84f69e2a324308d.js.map