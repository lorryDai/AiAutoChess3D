System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Color, Component, Node, Tween, Vec3, tween, GameConfig, ChessType, CHESS_DEFS, EQUIP_DEFS, Team, MeshKit, FloatingText, Projectile, UIUtil, _dec, _class, _crd, ccclass, LUNGE_TIME, GOLD, HUD_HEIGHT, ChessUnit;

  function _reportPossibleCrUseOfGameConfig(extras) {
    _reporterNs.report("GameConfig", "../config/GameConfig", _context.meta, extras);
  }

  function _reportPossibleCrUseOfChessDef(extras) {
    _reporterNs.report("ChessDef", "../data/GameData", _context.meta, extras);
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

  function _reportPossibleCrUseOfTeam(extras) {
    _reporterNs.report("Team", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUnitData(extras) {
    _reporterNs.report("UnitData", "../data/GameData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMeshKit(extras) {
    _reporterNs.report("MeshKit", "../core/MeshKit", _context.meta, extras);
  }

  function _reportPossibleCrUseOfFloatingText(extras) {
    _reporterNs.report("FloatingText", "../fx/FloatingText", _context.meta, extras);
  }

  function _reportPossibleCrUseOfProjectile(extras) {
    _reporterNs.report("Projectile", "../fx/Projectile", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUIUtil(extras) {
    _reporterNs.report("UIUtil", "../ui/UIUtil", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Color = _cc.Color;
      Component = _cc.Component;
      Node = _cc.Node;
      Tween = _cc.Tween;
      Vec3 = _cc.Vec3;
      tween = _cc.tween;
    }, function (_unresolved_2) {
      GameConfig = _unresolved_2.GameConfig;
    }, function (_unresolved_3) {
      ChessType = _unresolved_3.ChessType;
      CHESS_DEFS = _unresolved_3.CHESS_DEFS;
      EQUIP_DEFS = _unresolved_3.EQUIP_DEFS;
      Team = _unresolved_3.Team;
    }, function (_unresolved_4) {
      MeshKit = _unresolved_4.MeshKit;
    }, function (_unresolved_5) {
      FloatingText = _unresolved_5.FloatingText;
    }, function (_unresolved_6) {
      Projectile = _unresolved_6.Projectile;
    }, function (_unresolved_7) {
      UIUtil = _unresolved_7.UIUtil;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0d1e286S1xNbp9wgZKjtMXW", "ChessUnit", undefined);

      __checkObsolete__(['_decorator', 'Camera', 'Color', 'Component', 'Label', 'MeshRenderer', 'Node', 'Tween', 'Vec3', 'tween']);

      ({
        ccclass
      } = _decorator);
      LUNGE_TIME = 0.16;
      GOLD = '#ffd24a';
      /** 血条 / 蓝条相对棋子节点的挂点高度（棋子模型顶部约 1.16） */

      HUD_HEIGHT = 1.5;
      /** 棋盘上的一个棋子：属性、3D 外观、血条蓝条、攻击/受击/技能表现 */

      _export("ChessUnit", ChessUnit = (_dec = ccclass('ChessUnit'), _dec(_class = class ChessUnit extends Component {
        constructor(...args) {
          super(...args);
          this.data = null;
          this.def = null;
          this.alive = true;
          this.hp = 0;
          this.mp = 0;
          this.now = 0;
          this.attackCd = 0;
          this.moving = false;
          this.col = 0;
          this.row = 0;
          this.dmgDealt = 0;
          this.dmgTaken = 0;
          this.healed = 0;
          this.cameraRef = null;
          this.hudLayer = null;
          this.allies = [];
          this.enemies = [];
          this.visual = null;
          this.hud = null;
          this.hpFill = null;
          this.mpFill = null;
          this.statsLabel = null;
          this.flashParts = [];
          this.flashColors = [];
          this.flashT = 0;
          this.moveFrom = new Vec3();
          this.moveTo = new Vec3();
          this.moveT = 0;
          this.moveDur = 0;
          this.lungeT = 0;
          this.lungeDir = new Vec3();
          this.faceAngle = 0;
          this.faceTarget = 0;
          this.buffs = [];
          this.skillUntil = 0;
          this.skillType = null;
          this.nextSkillAt = 0;
          this.gUsed = false;
          this.mUsed = false;
          this.lastHpText = '';
          this.lastMpText = '';
          this.tmpV = new Vec3();
          this.tmpV2 = new Vec3();
          this.tmpEuler = new Vec3();
        }

        /** 初始化（创建 3D 外观与血条） */
        init(data, camera, hudLayer) {
          this.data = data;
          this.def = (_crd && CHESS_DEFS === void 0 ? (_reportPossibleCrUseOfCHESS_DEFS({
            error: Error()
          }), CHESS_DEFS) : CHESS_DEFS)[data.type];
          this.cameraRef = camera;
          this.hudLayer = hudLayer;
          this.col = data.col;
          this.row = data.row;
          this.node.name = `${this.def.role}_${data.uid}`;
          (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).cellToWorld(data.col, data.row, this.tmpV);
          this.node.setPosition(this.tmpV);
          this.hp = this.maxHp;
          this.mp = 0;
          this.buildBody();
          this.buildHud();
          this.updateHud();
        } // ===================== 外观 =====================


        buildBody() {
          const isEnemy = this.data.team === (_crd && Team === void 0 ? (_reportPossibleCrUseOfTeam({
            error: Error()
          }), Team) : Team).Enemy;
          const mainColor = isEnemy ? this.def.enemyColor : this.def.color;
          this.visual = new Node('visual');
          this.visual.parent = this.node;
          const s = 1 + (this.data.star - 1) * 0.14;
          this.visual.setScale(new Vec3(s, s, s)); // 阵营光环

          this.addPart('ring', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
            error: Error()
          }), MeshKit) : MeshKit).cylinder(0.42, 0.42, 0.05), isEnemy ? '#ff5a5a' : '#3fa9f5', new Vec3(0, 0.03, 0), 0.7);

          switch (this.data.type) {
            case (_crd && ChessType === void 0 ? (_reportPossibleCrUseOfChessType({
              error: Error()
            }), ChessType) : ChessType).Tank:
              {
                this.addPart('body', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                  error: Error()
                }), MeshKit) : MeshKit).box(0.58, 0.5, 0.4), mainColor, new Vec3(0, 0.44, 0));
                this.addPart('head', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                  error: Error()
                }), MeshKit) : MeshKit).sphere(0.2), '#cfd8e6', new Vec3(0, 0.82, 0));
                this.addPart('shield', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                  error: Error()
                }), MeshKit) : MeshKit).box(0.1, 0.46, 0.36), '#9aa8bb', new Vec3(0.36, 0.5, 0.05));
                this.addPart('armL', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                  error: Error()
                }), MeshKit) : MeshKit).box(0.14, 0.3, 0.2), mainColor, new Vec3(-0.36, 0.5, 0));
                this.addPart('armR', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                  error: Error()
                }), MeshKit) : MeshKit).box(0.14, 0.3, 0.2), mainColor, new Vec3(0.32, 0.5, -0.06));
                break;
              }

            case (_crd && ChessType === void 0 ? (_reportPossibleCrUseOfChessType({
              error: Error()
            }), ChessType) : ChessType).Assassin:
              {
                this.addPart('body', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                  error: Error()
                }), MeshKit) : MeshKit).capsule(0.16, 0.15, 0.5), mainColor, new Vec3(0, 0.4, 0));
                this.addPart('head', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                  error: Error()
                }), MeshKit) : MeshKit).sphere(0.18), '#cfd8e6', new Vec3(0, 0.78, 0));
                this.addPart('hood', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                  error: Error()
                }), MeshKit) : MeshKit).box(0.26, 0.14, 0.26), '#2b2f3d', new Vec3(0, 0.88, 0));
                const b1 = this.addPart('bladeL', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                  error: Error()
                }), MeshKit) : MeshKit).box(0.04, 0.38, 0.05), '#d9e2ff', new Vec3(-0.27, 0.42, 0));
                b1.node.setRotationFromEuler(0, 0, 18);
                const b2 = this.addPart('bladeR', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                  error: Error()
                }), MeshKit) : MeshKit).box(0.04, 0.38, 0.05), '#d9e2ff', new Vec3(0.27, 0.42, 0));
                b2.node.setRotationFromEuler(0, 0, -18);
                break;
              }

            case (_crd && ChessType === void 0 ? (_reportPossibleCrUseOfChessType({
              error: Error()
            }), ChessType) : ChessType).Ranger:
              {
                this.addPart('body', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                  error: Error()
                }), MeshKit) : MeshKit).cylinder(0.16, 0.22, 0.5), mainColor, new Vec3(0, 0.35, 0));
                this.addPart('head', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                  error: Error()
                }), MeshKit) : MeshKit).sphere(0.18), '#e8d7b8', new Vec3(0, 0.72, 0));
                this.addPart('cape', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                  error: Error()
                }), MeshKit) : MeshKit).box(0.42, 0.34, 0.05), '#24455c', new Vec3(0, 0.5, -0.18));
                this.addPart('bow', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                  error: Error()
                }), MeshKit) : MeshKit).box(0.05, 0.46, 0.05), '#c9a227', new Vec3(0.3, 0.5, 0.02));
                this.addPart('quiver', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                  error: Error()
                }), MeshKit) : MeshKit).box(0.1, 0.28, 0.1), '#3d5a3d', new Vec3(-0.26, 0.46, -0.1));
                break;
              }

            case (_crd && ChessType === void 0 ? (_reportPossibleCrUseOfChessType({
              error: Error()
            }), ChessType) : ChessType).Healer:
            default:
              {
                this.addPart('body', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                  error: Error()
                }), MeshKit) : MeshKit).cylinder(0.2, 0.26, 0.55), mainColor, new Vec3(0, 0.36, 0));
                this.addPart('head', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                  error: Error()
                }), MeshKit) : MeshKit).sphere(0.18), '#f0e2c8', new Vec3(0, 0.75, 0));
                this.addPart('hood', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                  error: Error()
                }), MeshKit) : MeshKit).box(0.36, 0.1, 0.3), '#f0f0f0', new Vec3(0, 0.9, 0));
                this.addPart('orb', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                  error: Error()
                }), MeshKit) : MeshKit).sphere(0.1), '#ffe08a', new Vec3(0.3, 0.62, 0.12), 1.6);
                break;
              }
          } // 星级宝石


          for (let i = 0; i < this.data.star; i++) {
            const x = (i - (this.data.star - 1) * 0.5) * 0.17;
            this.addPart('star' + i, (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
              error: Error()
            }), MeshKit) : MeshKit).sphere(0.055), GOLD, new Vec3(x, 1.16, 0), 1.4);
          }
        }

        addPart(name, mesh, color, pos, emissive = 0) {
          const mr = (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
            error: Error()
          }), MeshKit) : MeshKit).part(this.visual, name, mesh, color, pos, emissive);
          this.flashParts.push(mr);
          this.flashColors.push(color);
          return mr;
        } // ===================== 血条 =====================


        buildHud() {
          if (!this.hudLayer) {
            return;
          }

          const isEnemy = this.data.team === (_crd && Team === void 0 ? (_reportPossibleCrUseOfTeam({
            error: Error()
          }), Team) : Team).Enemy;
          const n = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).node(this.hudLayer, 'UnitHud', 132, 50);
          this.hud = n;
          const nameLb = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).label(n, 'name', `${this.def.role} ${this.data.star}★`, 12, isEnemy ? '#ff9a9a' : '#a9d8ff', true, 128);
          nameLb.node.setPosition(0, 20);
          this.statsLabel = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).label(n, 'stats', '', 10, '#dfe9f7', false, 128);
          this.statsLabel.node.setPosition(0, 7);
          const hpBar = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).bar(n, 'hp', 98, 5, '#101827', '#5ce07a');
          hpBar.root.setPosition(0, -5);
          this.hpFill = hpBar.fill;
          const mpBar = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).bar(n, 'mp', 98, 4, '#101827', '#4a7dff');
          mpBar.root.setPosition(0, -12);
          this.mpFill = mpBar.fill;
        }

        updateHud() {
          if (!this.hud || !this.hud.isValid || !this.cameraRef) {
            return;
          } // 血条 / 蓝条固定挂在棋子头顶：世界坐标 → 画布中心相对 UI 坐标


          const wp = this.node.worldPosition;
          this.tmpV2.set(wp.x, wp.y + HUD_HEIGHT, wp.z);
          (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).worldToUI(this.cameraRef, this.tmpV2, this.tmpV);
          this.hud.setPosition(this.tmpV);
          this.hpFill.setScale(new Vec3(Math.max(0.001, this.hp / this.maxHp), 1, 1));
          this.mpFill.setScale(new Vec3(Math.max(0, this.mp / (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).MANA_MAX), 1, 1));
          const hpTxt = `${Math.ceil(this.hp)}/${this.maxHp}`;
          const mpTxt = `${Math.floor(this.mp)}/${(_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).MANA_MAX}`;

          if (hpTxt !== this.lastHpText || mpTxt !== this.lastMpText) {
            this.lastHpText = hpTxt;
            this.lastMpText = mpTxt;
            this.statsLabel.string = `HP ${hpTxt}  MP ${mpTxt}`;
          }
        } // ===================== 属性 =====================


        hasEquip(id) {
          return this.data.equips.indexOf(id) >= 0;
        }

        starMult() {
          return (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).STAR_MULT[this.data.star] || 1;
        }

        get maxHp() {
          let hp = this.def.hp * this.starMult();

          for (const e of this.data.equips) {
            hp += (_crd && EQUIP_DEFS === void 0 ? (_reportPossibleCrUseOfEQUIP_DEFS({
              error: Error()
            }), EQUIP_DEFS) : EQUIP_DEFS)[e].hp || 0;
          }

          return Math.round(hp);
        }

        get atk() {
          let base = this.def.atk * this.starMult();

          for (const e of this.data.equips) {
            base += (_crd && EQUIP_DEFS === void 0 ? (_reportPossibleCrUseOfEQUIP_DEFS({
              error: Error()
            }), EQUIP_DEFS) : EQUIP_DEFS)[e].atk || 0;
          }

          let mul = 1;
          let flat = 0;

          for (const b of this.buffs) {
            if (b.until > this.now) {
              mul *= b.atkMul || 1;
              flat += b.flatAtk || 0;
            }
          }

          mul = Math.min(mul, 3.2);
          return Math.max(1, Math.round(base * mul + flat));
        }

        get defense() {
          let base = this.def.def * this.starMult();

          for (const e of this.data.equips) {
            base += (_crd && EQUIP_DEFS === void 0 ? (_reportPossibleCrUseOfEQUIP_DEFS({
              error: Error()
            }), EQUIP_DEFS) : EQUIP_DEFS)[e].def || 0;
          }

          let mul = 1;

          for (const b of this.buffs) {
            if (b.until > this.now) {
              mul *= b.defMul || 1;
            }
          }

          return Math.max(0, Math.round(base * mul));
        }

        get atkSpeed() {
          let mul = 1;

          for (const e of this.data.equips) {
            mul += (_crd && EQUIP_DEFS === void 0 ? (_reportPossibleCrUseOfEQUIP_DEFS({
              error: Error()
            }), EQUIP_DEFS) : EQUIP_DEFS)[e].atkSpeed || 0;
          }

          for (const b of this.buffs) {
            if (b.until > this.now) {
              mul *= b.atkSpeedMul || 1;
            }
          }

          return Math.max(0.1, this.def.atkSpeed * mul);
        }

        get moveSpeed() {
          let mul = 1;

          for (const e of this.data.equips) {
            mul += (_crd && EQUIP_DEFS === void 0 ? (_reportPossibleCrUseOfEQUIP_DEFS({
              error: Error()
            }), EQUIP_DEFS) : EQUIP_DEFS)[e].moveSpeed || 0;
          }

          for (const b of this.buffs) {
            if (b.until > this.now) {
              mul *= b.moveSpeedMul || 1;
            }
          }

          return Math.max(0.15, this.def.moveSpeed * mul);
        }

        get range() {
          let r = this.def.range;

          for (const e of this.data.equips) {
            r += (_crd && EQUIP_DEFS === void 0 ? (_reportPossibleCrUseOfEQUIP_DEFS({
              error: Error()
            }), EQUIP_DEFS) : EQUIP_DEFS)[e].range || 0;
          }

          for (const b of this.buffs) {
            if (b.until > this.now) {
              r += b.rangeAdd || 0;
            }
          }

          return r;
        }

        get disarmed() {
          for (const b of this.buffs) {
            if (b.disarm && b.until > this.now) {
              return true;
            }
          }

          return false;
        }

        skillActive() {
          return this.now < this.skillUntil;
        } // ===================== Buff =====================


        addSelfBuff(entry, duration) {
          const e = entry;
          e.until = this.now + duration;
          this.buffs.push(e);
        }

        addDebuff(tag, entry, duration) {
          for (const b of this.buffs) {
            if (b.tag === tag && b.until > this.now) {
              return; // 同类特效不可叠加
            }
          }

          const e = entry;
          e.tag = tag;
          e.until = this.now + duration;
          this.buffs.push(e);
        } // ===================== 战斗行为 =====================


        setContext(allies, enemies) {
          this.allies = allies;
          this.enemies = enemies;
        }

        startMove(col, row, duration) {
          this.col = col;
          this.row = row;
          this.moveFrom.set(this.node.position);
          (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).cellToWorld(col, row, this.moveTo);
          this.moveT = 0;
          this.moveDur = Math.max(0.08, duration);
          this.moving = true;
          this.faceTo(this.moveTo, true);
        }

        attack(target) {
          if (!this.alive || !target || !target.alive) {
            return;
          }

          this.faceTo(target.node.position, true);
          this.lungeTo(target.node.position);

          if (this.range > 1) {
            (_crd && Projectile === void 0 ? (_reportPossibleCrUseOfProjectile({
              error: Error()
            }), Projectile) : Projectile).shoot(this.node.parent, this.muzzlePos(), target.hitPos(), new Color(this.data.team === (_crd && Team === void 0 ? (_reportPossibleCrUseOfTeam({
              error: Error()
            }), Team) : Team).Player ? '#9fe0ff' : '#ffb27a'), 0.22);
          }

          this.strike(target, true); // 射手技能：同时攻击 2 个目标

          if (this.data.type === (_crd && ChessType === void 0 ? (_reportPossibleCrUseOfChessType({
            error: Error()
          }), ChessType) : ChessType).Ranger && this.skillActive() && this.skillType === (_crd && ChessType === void 0 ? (_reportPossibleCrUseOfChessType({
            error: Error()
          }), ChessType) : ChessType).Ranger) {
            const second = this.findSecondTarget(target);

            if (second) {
              (_crd && Projectile === void 0 ? (_reportPossibleCrUseOfProjectile({
                error: Error()
              }), Projectile) : Projectile).shoot(this.node.parent, this.muzzlePos(), second.hitPos(), new Color('#b8ffb0'), 0.22);
              this.strike(second, false);
            }
          }
        }

        findSecondTarget(exclude) {
          let best = null;
          let bestD = 999;

          for (const e of this.enemies) {
            if (!e || !e.alive || e === exclude) {
              continue;
            }

            const d = Math.abs(e.col - this.col) + Math.abs(e.row - this.row);

            if (d < bestD) {
              bestD = d;
              best = e;
            }
          }

          return best;
        }

        strike(target, primary) {
          const dmg = target.takeDamage(this.atk, this);
          this.dmgDealt += dmg;

          if (primary) {
            this.mp = Math.min((_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).MANA_MAX, this.mp + (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
              error: Error()
            }), GameConfig) : GameConfig).MANA_ON_ATTACK);
            this.applyOnHit(target);
          }
        }
        /** 蓝量满后释放技能 */


        tryCastSkill() {
          if (!this.alive || this.mp < (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).MANA_MAX || this.now < this.nextSkillAt) {
            return;
          }

          this.mp = 0;
          this.nextSkillAt = this.now + 1.0;
          this.skillType = this.data.type;
          (_crd && FloatingText === void 0 ? (_reportPossibleCrUseOfFloatingText({
            error: Error()
          }), FloatingText) : FloatingText).show(this.topPos(new Vec3()), this.def.shout, new Color(GOLD), 26);

          switch (this.data.type) {
            case (_crd && ChessType === void 0 ? (_reportPossibleCrUseOfChessType({
              error: Error()
            }), ChessType) : ChessType).Tank:
              this.skillUntil = this.now + 8;
              this.addSelfBuff({
                defMul: 2.0
              }, 8);
              break;

            case (_crd && ChessType === void 0 ? (_reportPossibleCrUseOfChessType({
              error: Error()
            }), ChessType) : ChessType).Assassin:
              this.skillUntil = this.now + 2;
              this.addSelfBuff({
                atkMul: 2.0,
                moveSpeedMul: 1.6
              }, 2);
              break;

            case (_crd && ChessType === void 0 ? (_reportPossibleCrUseOfChessType({
              error: Error()
            }), ChessType) : ChessType).Ranger:
              this.skillUntil = this.now + 2;
              this.addSelfBuff({
                atkSpeedMul: 2.2
              }, 2);
              break;

            case (_crd && ChessType === void 0 ? (_reportPossibleCrUseOfChessType({
              error: Error()
            }), ChessType) : ChessType).Healer:
            default:
              {
                this.skillUntil = this.now + 1;

                for (const ally of this.allies) {
                  if (ally && ally.alive) {
                    ally.heal(ally.maxHp * 0.1, this);
                  }
                }

                break;
              }
          }
        }
        /** 返回实际造成的伤害 */


        takeDamage(raw, from) {
          if (!this.alive || raw <= 0) {
            return 0;
          }

          const dmg = Math.max(1, Math.round(raw * 100 / (100 + this.defense)));
          this.hp = Math.max(0, this.hp - dmg);
          this.dmgTaken += dmg;
          this.mp = Math.min((_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).MANA_MAX, this.mp + (_crd && GameConfig === void 0 ? (_reportPossibleCrUseOfGameConfig({
            error: Error()
          }), GameConfig) : GameConfig).MANA_ON_HIT);
          this.flash();
          (_crd && FloatingText === void 0 ? (_reportPossibleCrUseOfFloatingText({
            error: Error()
          }), FloatingText) : FloatingText).show(this.topPos(new Vec3()), `-${dmg}`, new Color('#ff6b6b'), 22);

          if (from && from.alive) {
            if (this.hasEquip('K')) {
              from.addDebuff('K', {
                atkMul: 0.85
              }, 3);
            }

            if (this.hasEquip('I')) {
              const back = from.takeDamage(dmg * 0.1, null);
              this.dmgDealt += back;
            }
          }

          if (this.hp <= 0) {
            this.die();
          }

          return dmg;
        }

        heal(amount, creditTo) {
          if (!this.alive || amount <= 0) {
            return;
          }

          const real = Math.min(amount, this.maxHp - this.hp);

          if (real < 1) {
            return;
          }

          this.hp += real;
          (creditTo || this).healed += real;
          (_crd && FloatingText === void 0 ? (_reportPossibleCrUseOfFloatingText({
            error: Error()
          }), FloatingText) : FloatingText).show(this.topPos(new Vec3()), `+${Math.round(real)}`, new Color('#5ce07a'), 20);
        }

        applyOnHit(target) {
          if (this.hasEquip('F')) {
            target.addDebuff('F', {
              atkSpeedMul: 0.8
            }, 3);
          }

          if (this.hasEquip('H')) {
            target.addDebuff('H', {
              defMul: 0.8
            }, 3);
          }

          if (this.hasEquip('J')) {
            target.addDebuff('J', {
              moveSpeedMul: 0.65
            }, 3);
          }

          if (this.hasEquip('G') && !this.gUsed) {
            this.gUsed = true;
            target.addDebuff('G', {
              disarm: true
            }, 3);
            (_crd && FloatingText === void 0 ? (_reportPossibleCrUseOfFloatingText({
              error: Error()
            }), FloatingText) : FloatingText).show(target.topPos(new Vec3()), '禁攻 3s', new Color('#7de0c0'), 18);
          }

          if (this.hasEquip('L')) {
            this.heal(this.maxHp * 0.1);
          }

          if (this.hasEquip('M') && !this.mUsed) {
            this.mUsed = true;
            this.addSelfBuff({
              flatAtk: this.maxHp * 0.1
            }, 9999);
          }

          if (this.hasEquip('N')) {
            this.addSelfBuff({
              atkMul: 1.1
            }, 9999);
          }
        }
        /** 回收（重开 / 下一回合时清理节点与血条） */


        dispose() {
          if (this.visual && this.visual.isValid) {
            Tween.stopAllByTarget(this.visual);
          }

          if (this.hud && this.hud.isValid) {
            this.hud.destroy();
          }

          if (this.node && this.node.isValid) {
            this.node.destroy();
          }
        }

        die() {
          if (!this.alive) {
            return;
          }

          this.alive = false;
          this.moving = false;

          if (this.hud && this.hud.isValid) {
            this.hud.active = false;
          }

          const v = this.visual;
          tween(v).to(0.32, {
            scale: new Vec3(0.01, 0.01, 0.01)
          }, {
            easing: 'backIn'
          }).call(() => {
            // 只隐藏不销毁：结算界面仍需读取该棋子的战斗数据，下一回合 rebuildUnits 再统一清理
            if (this.node && this.node.isValid) {
              this.node.active = false;
            }
          }).start();
        } // ===================== 表现 =====================


        flash() {
          this.flashT = 0.12;
          const white = (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
            error: Error()
          }), MeshKit) : MeshKit).mat('#ffffff', 0.8);

          for (const mr of this.flashParts) {
            if (mr && mr.isValid) {
              mr.material = white;
            }
          }
        }

        restoreFlash() {
          for (let i = 0; i < this.flashParts.length; i++) {
            const mr = this.flashParts[i];

            if (mr && mr.isValid) {
              mr.material = (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
                error: Error()
              }), MeshKit) : MeshKit).mat(this.flashColors[i]);
            }
          }
        }

        lungeTo(pos) {
          const p = this.node.position;
          const dx = pos.x - p.x;
          const dz = pos.z - p.z;
          const len = Math.sqrt(dx * dx + dz * dz) || 1;
          this.lungeDir.set(dx / len, 0, dz / len);
          this.lungeT = LUNGE_TIME;
        }

        faceTo(pos, instant = false) {
          const p = this.node.position;
          const dx = pos.x - p.x;
          const dz = pos.z - p.z;

          if (Math.abs(dx) < 0.001 && Math.abs(dz) < 0.001) {
            return;
          }

          this.faceTarget = Math.atan2(dx, dz) * 180 / Math.PI;

          if (instant) {
            this.faceAngle = this.faceTarget;
          }
        }

        topPos(out) {
          const p = this.node.position;
          return out.set(p.x, p.y + 1.55, p.z);
        }

        hitPos() {
          const p = this.node.position;
          return new Vec3(p.x, p.y + 0.55, p.z);
        }

        muzzlePos() {
          const p = this.node.position;
          return new Vec3(p.x + this.lungeDir.x * 0.3, p.y + 0.72, p.z + this.lungeDir.z * 0.3);
        } // ===================== 帧更新 =====================

        /** 准备阶段也每帧刷新头顶血条（战斗中由 updateFrame 驱动逻辑） */


        update() {
          if (this.alive) {
            this.updateHud();
          }
        }

        updateFrame(dt) {
          if (!this.alive) {
            return;
          }

          this.now += dt;

          if (this.attackCd > 0) {
            this.attackCd -= dt;
          }

          if (this.flashT > 0) {
            this.flashT -= dt;

            if (this.flashT <= 0) {
              this.restoreFlash();
            }
          } // 格子间移动


          if (this.moving) {
            this.moveT += dt;
            const k = this.moveDur > 0 ? Math.min(1, this.moveT / this.moveDur) : 1;
            const p = this.node.position;
            this.node.setPosition(this.moveFrom.x + (this.moveTo.x - this.moveFrom.x) * k, this.moveFrom.y, this.moveFrom.z + (this.moveTo.z - this.moveFrom.z) * k);

            if (k >= 1) {
              this.moving = false;
            }
          } // 视觉偏移：移动起伏 / 攻击前冲


          if (this.visual && this.visual.isValid) {
            if (this.moving) {
              const k = this.moveDur > 0 ? Math.min(1, this.moveT / this.moveDur) : 1;
              this.visual.setPosition(new Vec3(0, Math.sin(k * Math.PI) * 0.1, 0));
            } else if (this.lungeT > 0) {
              this.lungeT = Math.max(0, this.lungeT - dt);
              const k = this.lungeT / LUNGE_TIME;
              this.visual.setPosition(new Vec3(this.lungeDir.x * 0.3 * k, 0, this.lungeDir.z * 0.3 * k));
            } else {
              this.visual.setPosition(Vec3.ZERO);
            } // 面向平滑


            let diff = this.faceTarget - this.faceAngle;

            while (diff > 180) {
              diff -= 360;
            }

            while (diff < -180) {
              diff += 360;
            }

            this.faceAngle += diff * Math.min(1, dt * 10);
            this.visual.setRotationFromEuler(0, this.faceAngle, 0);
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4b0fce19ecd31740b6a43a59b6168842fbee0ad1.js.map