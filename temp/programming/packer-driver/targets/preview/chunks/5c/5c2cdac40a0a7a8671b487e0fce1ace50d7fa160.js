System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, BlockInputEvents, Button, Color, Graphics, Label, Layers, Node, UITransform, Vec3, view, UIUtil, _crd;

  _export("UIUtil", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      BlockInputEvents = _cc.BlockInputEvents;
      Button = _cc.Button;
      Color = _cc.Color;
      Graphics = _cc.Graphics;
      Label = _cc.Label;
      Layers = _cc.Layers;
      Node = _cc.Node;
      UITransform = _cc.UITransform;
      Vec3 = _cc.Vec3;
      view = _cc.view;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "9c0d14vOktMXY5vcIGSo7TF", "UIUtil", undefined);

      /** 纯代码 UI 构建工具（不依赖任何美术资源） */
      __checkObsolete__(['BlockInputEvents', 'Button', 'Camera', 'Color', 'Graphics', 'Label', 'Layers', 'Node', 'UITransform', 'Vec3', 'view']);

      _export("UIUtil", UIUtil = class UIUtil {
        /**
         * 3D 世界坐标 → Canvas 本地 UI 坐标。
         * 场景里 Canvas 位于 UI 世界原点，UI 本地坐标以屏幕中心为原点，
         * 因此按相机画面比例换算到中心相对坐标（不要用 convertToUINode，它返回左下角原点坐标）。
         */
        static worldToUI(camera, worldPos, out) {
          var cam = camera.camera;
          var visible = view.getVisibleSize();
          camera.worldToScreen(worldPos, out);
          var w = cam && cam.width > 0 ? cam.width : visible.width;
          var h = cam && cam.height > 0 ? cam.height : visible.height;
          out.set((out.x / w - 0.5) * visible.width, (out.y / h - 0.5) * visible.height, 0);
          return out;
        }

        static toColor(v) {
          return typeof v === 'string' ? new Color(v) : v;
        }
        /** 创建 UI 节点（含 UITransform，UI_2D 层级） */


        static node(parent, name, w, h, anchorX, anchorY) {
          if (anchorX === void 0) {
            anchorX = 0.5;
          }

          if (anchorY === void 0) {
            anchorY = 0.5;
          }

          var n = new Node(name);
          n.layer = Layers.Enum.UI_2D;
          var ut = n.addComponent(UITransform);
          ut.setContentSize(w, h);
          ut.setAnchorPoint(anchorX, anchorY);

          if (parent) {
            n.parent = parent;
          }

          return n;
        }
        /** 纯色圆角矩形 */


        static rect(parent, name, w, h, color, radius) {
          if (radius === void 0) {
            radius = 8;
          }

          var n = this.node(parent, name, w, h);
          var g = n.addComponent(Graphics);
          g.fillColor = this.toColor(color);
          var r = Math.max(0, Math.min(radius, w * 0.5, h * 0.5));

          if (r > 0.5) {
            g.roundRect(-w * 0.5, -h * 0.5, w, h, r);
          } else {
            g.rect(-w * 0.5, -h * 0.5, w, h);
          }

          g.fill();
          return n;
        }
        /** 带描边的圆角矩形 */


        static frame(parent, name, w, h, fill, stroke, lineWidth, radius) {
          if (lineWidth === void 0) {
            lineWidth = 2;
          }

          if (radius === void 0) {
            radius = 8;
          }

          var n = this.rect(parent, name, w, h, fill, radius);
          var g = n.getComponent(Graphics) || n.addComponent(Graphics);
          g.strokeColor = this.toColor(stroke);
          g.lineWidth = lineWidth;
          var r = Math.max(0, Math.min(radius, w * 0.5, h * 0.5));
          g.roundRect(-w * 0.5, -h * 0.5, w, h, r);
          g.stroke();
          return n;
        }
        /** 文字 */


        static label(parent, name, text, size, color, bold, maxWidth) {
          if (bold === void 0) {
            bold = false;
          }

          if (maxWidth === void 0) {
            maxWidth = 0;
          }

          var w = maxWidth > 0 ? maxWidth : size * text.length + 8;
          var n = this.node(parent, name, w, size * 1.4);
          var lb = n.addComponent(Label);
          lb.string = text;
          lb.fontSize = size;
          lb.lineHeight = size * 1.25;
          lb.color = this.toColor(color);
          lb.isBold = bold;
          lb.horizontalAlign = Label.HorizontalAlign.CENTER;
          lb.verticalAlign = Label.VerticalAlign.CENTER;

          if (maxWidth > 0) {
            lb.overflow = Label.Overflow.SHRINK;
          }

          return lb;
        }
        /** 按钮（背景 + 文字 + 点击缩放） */


        static button(parent, name, text, w, h, bg, textColor, fontSize, onClick) {
          var n = this.rect(parent, name, w, h, bg, 10);
          var btn = n.addComponent(Button);
          btn.transition = Button.Transition.SCALE;
          btn.zoomScale = 0.94;
          this.label(n, 'txt', text, fontSize, textColor, true, w - 8);
          n.on(Button.EventType.CLICK, onClick, n);
          return n;
        }
        /** 血条 / 蓝条：返回 root 与可缩放的 fill */


        static bar(parent, name, w, h, bgColor, fillColor) {
          var root = this.node(parent, name, w, h);
          this.rect(root, 'bg', w, h, bgColor, h * 0.5);
          var fill = this.node(root, 'fill', w, h, 0, 0.5);
          fill.setPosition(-w * 0.5, 0, 0);
          var g = fill.addComponent(Graphics);
          g.fillColor = this.toColor(fillColor);
          g.rect(0, -h * 0.5, w, h);
          g.fill();
          return {
            root,
            fill,
            setRatio: r => {
              var k = Math.max(0, Math.min(1, r));
              fill.setScale(new Vec3(k, 1, 1));
            }
          };
        }
        /** 全屏遮罩，阻挡点击穿透 */


        static mask(parent, name, alpha, w, h) {
          if (alpha === void 0) {
            alpha = 185;
          }

          if (w === void 0) {
            w = 3000;
          }

          if (h === void 0) {
            h = 3000;
          }

          var n = this.node(parent, name, w, h);
          var g = n.addComponent(Graphics);
          g.fillColor = new Color(4, 8, 16, alpha);
          g.rect(-w * 0.5, -h * 0.5, w, h);
          g.fill();
          n.addComponent(BlockInputEvents);
          return n;
        }

        static clearChildren(node) {
          var children = node.children.slice();

          for (var c of children) {
            c.destroy();
          }
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5c2cdac40a0a7a8671b487e0fce1ace50d7fa160.js.map