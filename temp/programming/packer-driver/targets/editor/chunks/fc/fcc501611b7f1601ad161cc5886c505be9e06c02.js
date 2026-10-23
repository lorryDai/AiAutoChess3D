System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Node, Vec3, tween, MeshKit, Projectile, _crd;

  function _reportPossibleCrUseOfMeshKit(extras) {
    _reporterNs.report("MeshKit", "../core/MeshKit", _context.meta, extras);
  }

  _export("Projectile", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Node = _cc.Node;
      Vec3 = _cc.Vec3;
      tween = _cc.tween;
    }, function (_unresolved_2) {
      MeshKit = _unresolved_2.MeshKit;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5e6f7qLnA1OH4o7TF1uf4CR", "Projectile", undefined);

      __checkObsolete__(['Color', 'Node', 'Vec3', 'tween']);

      /** 远程攻击的投掷物 / 子弹 */
      _export("Projectile", Projectile = class Projectile {
        static shoot(worldRoot, from, to, color, duration = 0.22) {
          if (!worldRoot || !worldRoot.isValid) {
            return;
          }

          const n = new Node('projectile');
          n.parent = worldRoot;
          n.setPosition(from);
          (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
            error: Error()
          }), MeshKit) : MeshKit).part(n, 'ball', (_crd && MeshKit === void 0 ? (_reportPossibleCrUseOfMeshKit({
            error: Error()
          }), MeshKit) : MeshKit).sphere(0.075), color, new Vec3(), 1.2);
          const target = new Vec3(to.x, to.y, to.z);
          tween(n).to(duration, {
            position: target
          }, {
            easing: 'linear'
          }).call(() => {
            if (n.isValid) {
              n.destroy();
            }
          }).start();
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=fcc501611b7f1601ad161cc5886c505be9e06c02.js.map