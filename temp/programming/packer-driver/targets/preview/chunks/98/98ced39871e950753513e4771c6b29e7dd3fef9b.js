System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Label, UIOpacity, Vec3, tween, UIUtil, FloatingText, _crd;

  function _reportPossibleCrUseOfUIUtil(extras) {
    _reporterNs.report("UIUtil", "../ui/UIUtil", _context.meta, extras);
  }

  _export("FloatingText", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Label = _cc.Label;
      UIOpacity = _cc.UIOpacity;
      Vec3 = _cc.Vec3;
      tween = _cc.tween;
    }, function (_unresolved_2) {
      UIUtil = _unresolved_2.UIUtil;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4d5e696i5xNDp8qO0xdbn+A", "FloatingText", undefined);

      __checkObsolete__(['Camera', 'Color', 'Label', 'Node', 'UIOpacity', 'Vec3', 'tween']);

      /** 3D 世界坐标处飘字（伤害红色 / 治疗绿色） */
      _export("FloatingText", FloatingText = class FloatingText {
        static show(worldPos, text, color, size) {
          if (size === void 0) {
            size = 24;
          }

          if (!this.camera || !this.root || !this.root.isValid) {
            return;
          }

          var uiPos = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).worldToUI(this.camera, worldPos, new Vec3());
          var n = (_crd && UIUtil === void 0 ? (_reportPossibleCrUseOfUIUtil({
            error: Error()
          }), UIUtil) : UIUtil).node(this.root, 'float', 220, 40);
          n.setPosition(uiPos);
          var lb = n.addComponent(Label);
          lb.string = text;
          lb.fontSize = size;
          lb.lineHeight = size * 1.2;
          lb.color = color;
          lb.isBold = true;
          lb.horizontalAlign = Label.HorizontalAlign.CENTER;
          lb.verticalAlign = Label.VerticalAlign.CENTER;
          var op = n.addComponent(UIOpacity);
          op.opacity = 255;
          tween(n).by(0.75, {
            position: new Vec3(0, 52, 0)
          }, {
            easing: 'quadOut'
          }).start();
          tween(op).delay(0.2).to(0.55, {
            opacity: 0
          }).call(() => {
            if (n.isValid) {
              n.destroy();
            }
          }).start();
        }

      });

      FloatingText.camera = null;
      FloatingText.root = null;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=98ced39871e950753513e4771c6b29e7dd3fef9b.js.map