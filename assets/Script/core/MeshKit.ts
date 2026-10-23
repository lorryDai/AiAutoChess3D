import { Color, Material, Mesh, MeshRenderer, Node, Vec3, primitives, utils } from 'cc';

/** 运行时网格 / 材质缓存，避免重复创建 */
export class MeshKit {
    /** 场景中预加载的标准材质（用于保证 builtin-standard 的 effect 已被注册） */
    public static template: Material | null = null;

    private static meshCache: Map<string, Mesh> = new Map();
    private static matCache: Map<string, Material> = new Map();

    public static box(w: number, h: number, l: number): Mesh {
        const key = `box_${w}_${h}_${l}`;
        let m = this.meshCache.get(key);
        if (!m) {
            m = utils.createMesh(primitives.box({ width: w, height: h, length: l }));
            this.meshCache.set(key, m);
        }
        return m;
    }

    public static sphere(r: number): Mesh {
        const key = `sph_${r}`;
        let m = this.meshCache.get(key);
        if (!m) {
            m = utils.createMesh(primitives.sphere(r, { segments: 16 }));
            this.meshCache.set(key, m);
        }
        return m;
    }

    public static cylinder(rt: number, rb: number, h: number): Mesh {
        const key = `cyl_${rt}_${rb}_${h}`;
        let m = this.meshCache.get(key);
        if (!m) {
            m = utils.createMesh(primitives.cylinder(rt, rb, h, { radialSegments: 20 }));
            this.meshCache.set(key, m);
        }
        return m;
    }

    public static capsule(rt: number, rb: number, h: number): Mesh {
        const key = `cap_${rt}_${rb}_${h}`;
        let m = this.meshCache.get(key);
        if (!m) {
            m = utils.createMesh(primitives.capsule(rt, rb, h, { sides: 16 }));
            this.meshCache.set(key, m);
        }
        return m;
    }

    /** 颜色材质（builtin-standard） */
    public static mat(color: Color | string, emissive = 0): Material {
        const col = typeof color === 'string' ? new Color(color) : color;
        const key = `${col.r}_${col.g}_${col.b}_${emissive}`;
        let m = this.matCache.get(key);
        if (m) {
            return m;
        }
        const effect = this.template ? this.template.effectAsset : null;
        m = new Material();
        m.initialize(effect ? { effectAsset: effect } : { effectName: 'builtin-standard' });
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
    public static part(parent: Node, name: string, mesh: Mesh, color: Color | string,
        pos: Vec3 = new Vec3(), emissive = 0): MeshRenderer {
        const n = new Node(name);
        n.parent = parent;
        n.setPosition(pos);
        const mr = n.addComponent(MeshRenderer);
        mr.mesh = mesh;
        mr.material = this.mat(color, emissive);
        mr.shadowCastingMode = 0;
        return mr;
    }
}
