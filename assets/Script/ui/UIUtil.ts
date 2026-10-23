import { BlockInputEvents, Button, Camera, Color, Graphics, Label, Layers, Node, UITransform, Vec3, view } from 'cc';

/** 纯代码 UI 构建工具（不依赖任何美术资源） */
export class UIUtil {
    /**
     * 3D 世界坐标 → Canvas 本地 UI 坐标。
     * 场景里 Canvas 位于 UI 世界原点，UI 本地坐标以屏幕中心为原点，
     * 因此按相机画面比例换算到中心相对坐标（不要用 convertToUINode，它返回左下角原点坐标）。
     */
    public static worldToUI(camera: Camera, worldPos: Vec3, out: Vec3): Vec3 {
        const cam = camera.camera;
        const visible = view.getVisibleSize();
        camera.worldToScreen(worldPos, out);
        const w = cam && cam.width > 0 ? cam.width : visible.width;
        const h = cam && cam.height > 0 ? cam.height : visible.height;
        out.set((out.x / w - 0.5) * visible.width, (out.y / h - 0.5) * visible.height, 0);
        return out;
    }

    public static toColor(v: string | Color): Color {
        return typeof v === 'string' ? new Color(v) : v;
    }

    /** 创建 UI 节点（含 UITransform，UI_2D 层级） */
    public static node(parent: Node | null, name: string, w: number, h: number,
        anchorX = 0.5, anchorY = 0.5): Node {
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
    public static rect(parent: Node | null, name: string, w: number, h: number,
        color: string | Color, radius = 8): Node {
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
    public static frame(parent: Node | null, name: string, w: number, h: number,
        fill: string | Color, stroke: string | Color, lineWidth = 2, radius = 8): Node {
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
    public static label(parent: Node | null, name: string, text: string, size: number,
        color: string | Color, bold = false, maxWidth = 0): Label {
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
    public static button(parent: Node | null, name: string, text: string, w: number, h: number,
        bg: string | Color, textColor: string | Color, fontSize: number, onClick: () => void): Node {
        const n = this.rect(parent, name, w, h, bg, 10);
        const btn = n.addComponent(Button);
        btn.transition = Button.Transition.SCALE;
        btn.zoomScale = 0.94;
        this.label(n, 'txt', text, fontSize, textColor, true, w - 8);
        n.on(Button.EventType.CLICK, onClick, n);
        return n;
    }

    /** 血条 / 蓝条：返回 root 与可缩放的 fill */
    public static bar(parent: Node | null, name: string, w: number, h: number,
        bgColor: string | Color, fillColor: string | Color): { root: Node; fill: Node; setRatio: (r: number) => void } {
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
            setRatio: (r: number) => {
                const k = Math.max(0, Math.min(1, r));
                fill.setScale(new Vec3(k, 1, 1));
            },
        };
    }

    /** 全屏遮罩，阻挡点击穿透 */
    public static mask(parent: Node | null, name: string, alpha = 185, w = 3000, h = 3000): Node {
        const n = this.node(parent, name, w, h);
        const g = n.addComponent(Graphics);
        g.fillColor = new Color(4, 8, 16, alpha);
        g.rect(-w * 0.5, -h * 0.5, w, h);
        g.fill();
        n.addComponent(BlockInputEvents);
        return n;
    }

    public static clearChildren(node: Node) {
        const children = node.children.slice();
        for (const c of children) {
            c.destroy();
        }
    }
}
