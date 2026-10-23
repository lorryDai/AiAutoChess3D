import { Color, Node, Vec3, tween } from 'cc';
import { MeshKit } from '../core/MeshKit';

/** 远程攻击的投掷物 / 子弹 */
export class Projectile {
    public static shoot(worldRoot: Node, from: Vec3, to: Vec3, color: Color, duration = 0.22) {
        if (!worldRoot || !worldRoot.isValid) {
            return;
        }
        const n = new Node('projectile');
        n.parent = worldRoot;
        n.setPosition(from);
        MeshKit.part(n, 'ball', MeshKit.sphere(0.075), color, new Vec3(), 1.2);

        const target = new Vec3(to.x, to.y, to.z);
        tween(n)
            .to(duration, { position: target }, { easing: 'linear' })
            .call(() => {
                if (n.isValid) {
                    n.destroy();
                }
            })
            .start();
    }
}
