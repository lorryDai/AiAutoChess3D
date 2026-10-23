import { Camera, Color, Label, Node, UIOpacity, Vec3, tween } from 'cc';
import { UIUtil } from '../ui/UIUtil';

/** 3D 世界坐标处飘字（伤害红色 / 治疗绿色） */
export class FloatingText {
    public static camera: Camera = null;
    public static root: Node = null;

    public static show(worldPos: Vec3, text: string, color: Color, size = 24) {
        if (!this.camera || !this.root || !this.root.isValid) {
            return;
        }
        const uiPos = UIUtil.worldToUI(this.camera, worldPos, new Vec3());
        const n = UIUtil.node(this.root, 'float', 220, 40);
        n.setPosition(uiPos);

        const lb = n.addComponent(Label);
        lb.string = text;
        lb.fontSize = size;
        lb.lineHeight = size * 1.2;
        lb.color = color;
        lb.isBold = true;
        lb.horizontalAlign = Label.HorizontalAlign.CENTER;
        lb.verticalAlign = Label.VerticalAlign.CENTER;

        const op = n.addComponent(UIOpacity);
        op.opacity = 255;

        tween(n).by(0.75, { position: new Vec3(0, 52, 0) }, { easing: 'quadOut' }).start();
        tween(op).delay(0.2).to(0.55, { opacity: 0 }).call(() => {
            if (n.isValid) {
                n.destroy();
            }
        }).start();
    }
}
