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
          const cam = camera.camera;
          const visible = view.getVisibleSize();
          camera.worldToScreen(worldPos, out);
          const w = cam && cam.width > 0 ? cam.width : visible.width;
          const h = cam && cam.height > 0 ? cam.height : visible.height;
          out.set((out.x / w - 0.5) * visible.width, (out.y / h - 0.5) * visible.height, 0);
          return out;
        }

        static toColor(v) {
          return typeof v === 'string' ? new Color(v) : v;
        }
        /** 创建 UI 节点（含 UITransform，UI_2D 层级） */


        static node(parent, name, w, h, anchorX = 0.5, anchorY = 0.5) {
          const n = new Node(name);
          n.layer = Layers.Enum.UI_2D;
          const ut = n.addComponent(UITransform);
          ut.setContentSize(w, h);
          ut.setAnchorPoint(anchorX, anchorY);

          if (parent) {
            n.parent = parent;
          }

          return n;
        }
        /** 纯色圆角矩形 */


        static rect(parent, name, w, h, color, radius = 8) {
          const n = this.node(parent, name, w, h);
          const g = n.addComponent(Graphics);
          g.fillColor = this.toColor(color);
          const r = Math.max(0, Math.min(radius, w * 0.5, h * 0.5));

          if (r > 0.5) {
            g.roundRect(-w * 0.5, -h * 0.5, w, h, r);
          } else {
            g.rect(-w * 0.5, -h * 0.5, w, h);
          }

          g.fill();
          return n;
        }
        /** 带描边的圆角矩形 */


        static frame(parent, name, w, h, fill, stroke, lineWidth = 2, radius = 8) {
          const n = this.rect(parent, name, w, h, fill, radius);
          const g = n.getComponent(Graphics) || n.addComponent(Graphics);
          g.strokeColor = this.toColor(stroke);
          g.lineWidth = lineWidth;
          const r = Math.max(0, Math.min(radius, w * 0.5, h * 0.5));
          g.roundRect(-w * 0.5, -h * 0.5, w, h, r);
          g.stroke();
          return n;
        }
        /** 文字 */


        static label(parent, name, text, size, color, bold = false, maxWidth = 0) {
          const w = maxWidth > 0 ? maxWidth : size * text.length + 8;
          const n = this.node(parent, name, w, size * 1.4);
          const lb = n.addComponent(Label);
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
          const n = this.rect(parent, name, w, h, bg, 10);
          const btn = n.addComponent(Button);
          btn.transition = Button.Transition.SCALE;
          btn.zoomScale = 0.94;
          this.label(n, 'txt', text, fontSize, textColor, true, w - 8);
          n.on(Button.EventType.CLICK, onClick, n);
          return n;
        }
        /** 血条 / 蓝条：返回 root 与可缩放的 fill */


        static bar(parent, name, w, h, bgColor, fillColor) {
          const root = this.node(parent, name, w, h);
          this.rect(root, 'bg', w, h, bgColor, h * 0.5);
          const fill = this.node(root, 'fill', w, h, 0, 0.5);
          fill.setPosition(-w * 0.5, 0, 0);
          const g = fill.addComponent(Graphics);
          g.fillColor = this.toColor(fillColor);
          g.rect(0, -h * 0.5, w, h);
          g.fill();
          return {
            root,
            fill,
            setRatio: r => {
              const k = Math.max(0, Math.min(1, r));
              fill.setScale(new Vec3(k, 1, 1));
            }
          };
        }
        /** 全屏遮罩，阻挡点击穿透 */


        static mask(parent, name, alpha = 185, w = 3000, h = 3000) {
          const n = this.node(parent, name, w, h);
          const g = n.addComponent(Graphics);
          g.fillColor = new Color(4, 8, 16, alpha);
          g.rect(-w * 0.5, -h * 0.5, w, h);
          g.fill();
          n.addComponent(BlockInputEvents);
          return n;
        }

        static clearChildren(node) {
          const children = node.children.slice();

          for (const c of children) {
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