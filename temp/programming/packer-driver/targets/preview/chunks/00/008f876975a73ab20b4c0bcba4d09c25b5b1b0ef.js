System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Color, Material, MeshRenderer, Node, Vec3, primitives, utils, MeshKit, _crd;

  _export("MeshKit", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Color = _cc.Color;
      Material = _cc.Material;
      MeshRenderer = _cc.MeshRenderer;
      Node = _cc.Node;
      Vec3 = _cc.Vec3;
      primitives = _cc.primitives;
      utils = _cc.utils;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3c4d55veotMnY4fKjtMXW5/", "MeshKit", undefined);

      /** 运行时网格 / 材质缓存，避免重复创建 */
      __checkObsolete__(['Color', 'Material', 'Mesh', 'MeshRenderer', 'Node', 'Vec3', 'primitives', 'utils']);

      _export("MeshKit", MeshKit = class MeshKit {
        static box(w, h, l) {
          var key = "box_" + w + "_" + h + "_" + l;
          var m = this.meshCache.get(key);

          if (!m) {
            m = utils.createMesh(primitives.box({
              width: w,
              height: h,
              length: l
            }));
            this.meshCache.set(key, m);
          }

          return m;
        }

        static sphere(r) {
          var key = "sph_" + r;
          var m = this.meshCache.get(key);

          if (!m) {
            m = utils.createMesh(primitives.sphere(r, {
              segments: 16
            }));
            this.meshCache.set(key, m);
          }

          return m;
        }

        static cylinder(rt, rb, h) {
          var key = "cyl_" + rt + "_" + rb + "_" + h;
          var m = this.meshCache.get(key);

          if (!m) {
            m = utils.createMesh(primitives.cylinder(rt, rb, h, {
              radialSegments: 20
            }));
            this.meshCache.set(key, m);
          }

          return m;
        }

        static capsule(rt, rb, h) {
          var key = "cap_" + rt + "_" + rb + "_" + h;
          var m = this.meshCache.get(key);

          if (!m) {
            m = utils.createMesh(primitives.capsule(rt, rb, h, {
              sides: 16
            }));
            this.meshCache.set(key, m);
          }

          return m;
        }
        /** 颜色材质（builtin-standard） */


        static mat(color, emissive) {
          if (emissive === void 0) {
            emissive = 0;
          }

          var col = typeof color === 'string' ? new Color(color) : color;
          var key = col.r + "_" + col.g + "_" + col.b + "_" + emissive;
          var m = this.matCache.get(key);

          if (m) {
            return m;
          }

          var effect = this.template ? this.template.effectAsset : null;
          m = new Material();
          m.initialize(effect ? {
            effectAsset: effect
          } : {
            effectName: 'builtin-standard'
          });
          m.setProperty('mainColor', col);
          m.setProperty('roughness', 0.8);
          m.setProperty('metallic', 0.05);

          if (emissive > 0) {
            m.setProperty('emissive', new Color(col.r, col.g, col.b, 255));
            m.setProperty('emissiveScale', new Vec3(emissive, emissive, emissive));
          }

          this.matCache.set(key, m);
          return m;
        }
        /** 在指定节点下创建网格子节点 */


        static part(parent, name, mesh, color, pos, emissive) {
          if (pos === void 0) {
            pos = new Vec3();
          }

          if (emissive === void 0) {
            emissive = 0;
          }

          var n = new Node(name);
          n.parent = parent;
          n.setPosition(pos);
          var mr = n.addComponent(MeshRenderer);
          mr.mesh = mesh;
          mr.material = this.mat(color, emissive);
          mr.shadowCastingMode = 0;
          return mr;
        }

      });

      /** 场景中预加载的标准材质（用于保证 builtin-standard 的 effect 已被注册） */
      MeshKit.template = null;
      MeshKit.meshCache = new Map();
      MeshKit.matCache = new Map();

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=008f876975a73ab20b4c0bcba4d09c25b5b1b0ef.js.map