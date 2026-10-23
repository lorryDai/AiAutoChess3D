import { _decorator, Component } from 'cc';
import { GameConfig } from '../config/GameConfig';
import { Team } from '../data/GameData';
import { ChessUnit } from '../unit/ChessUnit';

const { ccclass } = _decorator;

/** 战斗管理：自动战斗、寻敌、走位、40 秒加速、60 秒强制结算 */
@ccclass('BattleManager')
export class BattleManager extends Component {
    public units: ChessUnit[] = [];
    public running = false;
    public time = 0;
    public speed = 1;
    public introTimer = 0;

    public onFinish: ((winner: Team, forced: boolean) => void) = null!;
    public onSpeedUp: (() => void) = null!;

    public addUnit(u: ChessUnit) {
        this.units.push(u);
    }

    public reset() {
        this.units.length = 0;
        this.running = false;
        this.time = 0;
        this.speed = 1;
        this.introTimer = 0;
    }

    public begin() {
        this.time = 0;
        this.speed = 1;
        this.introTimer = GameConfig.BATTLE_INTRO_TIME;
        this.running = true;
        this.refreshContext();
    }

    public stop() {
        this.running = false;
    }

    update(dt: number) {
        if (!this.running) {
            return;
        }
        this.time += dt;

        if (this.speed < GameConfig.SPEED_SCALE && this.time >= GameConfig.SPEED_UP_TIME) {
            this.speed = GameConfig.SPEED_SCALE;
            if (this.onSpeedUp) {
                this.onSpeedUp();
            }
        }
        if (this.time >= GameConfig.FORCE_END_TIME) {
            this.finish(true);
            return;
        }

        const sdt = dt * this.speed;
        for (const u of this.units) {
            if (u && u.isValid && u.alive) {
                u.updateFrame(sdt);
            }
        }

        if (this.introTimer > 0) {
            this.introTimer -= dt;
            return;
        }

        this.refreshContext();

        for (const u of this.units) {
            if (!u || !u.isValid || !u.alive || u.moving) {
                continue;
            }
            u.tryCastSkill();
            this.think(u);
        }

        // 一方全灭直接结束
        const p = this.aliveOf(Team.Player).length;
        const e = this.aliveOf(Team.Enemy).length;
        if (p === 0 || e === 0) {
            this.finish(false);
        }
    }

    private refreshContext() {
        const players: ChessUnit[] = [];
        const enemies: ChessUnit[] = [];
        for (const u of this.units) {
            if (!u || !u.isValid || !u.alive) {
                continue;
            }
            if (u.data.team === Team.Player) {
                players.push(u);
            } else {
                enemies.push(u);
            }
        }
        for (const u of players) {
            u.setContext(players, enemies);
        }
        for (const u of enemies) {
            u.setContext(enemies, players);
        }
    }

    public aliveOf(team: Team): ChessUnit[] {
        return this.units.filter(u => u && u.isValid && u.alive && u.data.team === team);
    }

    private think(u: ChessUnit) {
        const target = this.pickTarget(u);
        if (!target) {
            return;
        }
        const dist = this.dist(u, target);
        if (dist <= u.range) {
            if (!u.disarmed && u.attackCd <= 0) {
                u.attack(target);
                u.attackCd = 1 / u.atkSpeed;
            }
        } else {
            this.stepToward(u, target);
        }
    }

    private pickTarget(u: ChessUnit): ChessUnit | null {
        let best: ChessUnit = null;
        let bestD = 9999;
        let bestHp = 999999;
        for (const e of this.units) {
            if (!e || !e.isValid || !e.alive || e.data.team === u.data.team) {
                continue;
            }
            const d = this.dist(u, e);
            if (d < bestD || (d === bestD && e.hp < bestHp)) {
                best = e;
                bestD = d;
                bestHp = e.hp;
            }
        }
        return best;
    }

    private dist(a: ChessUnit, b: ChessUnit): number {
        return Math.abs(a.col - b.col) + Math.abs(a.row - b.row);
    }

    private stepToward(u: ChessUnit, target: ChessUnit) {
        const next = this.findStep(u, target);
        if (next) {
            u.startMove(next.col, next.row, 1 / u.moveSpeed);
        }
    }

    /**
     * 寻路：优先沿目标方向直线前进，前方被其他棋子占位时自动绕行。
     * 4x7 格盘直接 BFS 到目标相邻格，返回第一步；同距离路径按方向优先级取，保证走直线。
     */
    private findStep(u: ChessUnit, target: ChessUnit): { col: number; row: number } | null {
        const COLS = GameConfig.COLS;
        const ROWS = GameConfig.ROWS;
        const total = COLS * ROWS;

        const blocked: boolean[] = new Array(total).fill(false);
        for (const o of this.units) {
            if (!o || !o.isValid || !o.alive || o === target) {
                continue;
            }
            blocked[o.row * COLS + o.col] = true;
        }
        const start = u.row * COLS + u.col;
        blocked[start] = false;

        // 方向优先级：先朝目标的主轴方向，尽量走直线，绕行时再走侧向
        const dc = Math.sign(target.col - u.col);
        const dr = Math.sign(target.row - u.row);
        const dirs: number[][] = [];
        const pushDir = (c: number, r: number) => {
            if (c === 0 && r === 0) {
                return;
            }
            for (const d of dirs) {
                if (d[0] === c && d[1] === r) {
                    return;
                }
            }
            dirs.push([c, r]);
        };
        pushDir(0, dr);
        pushDir(dc, 0);
        pushDir(0, 1);
        pushDir(0, -1);
        pushDir(1, 0);
        pushDir(-1, 0);

        const prev = new Int16Array(total).fill(-1);
        const seen = new Uint8Array(total);
        const queue: number[] = [start];
        seen[start] = 1;
        let found = -1;

        for (let head = 0; head < queue.length && found < 0; head++) {
            const cur = queue[head];
            const cc = cur % COLS;
            const cr = Math.floor(cur / COLS);
            if (Math.abs(cc - target.col) + Math.abs(cr - target.row) === 1) {
                found = cur;
                break;
            }
            for (const d of dirs) {
                const nc = cc + d[0];
                const nr = cr + d[1];
                if (nc < 0 || nc >= COLS || nr < 0 || nr >= ROWS) {
                    continue;
                }
                const ni = nr * COLS + nc;
                if (seen[ni] || blocked[ni]) {
                    continue;
                }
                seen[ni] = 1;
                prev[ni] = cur;
                queue.push(ni);
            }
        }

        if (found < 0 || prev[found] === -1) {
            return null;
        }
        // 回溯到起点后的第一步
        let cur = found;
        while (prev[cur] !== start && prev[cur] !== -1) {
            cur = prev[cur];
        }
        if (prev[cur] === -1) {
            return null;
        }
        return { col: cur % COLS, row: Math.floor(cur / COLS) };
    }

    private finish(forced: boolean) {
        if (!this.running) {
            return;
        }
        this.running = false;

        const players = this.aliveOf(Team.Player);
        const enemies = this.aliveOf(Team.Enemy);
        let winner: Team;

        if (!forced) {
            if (players.length === 0 && enemies.length === 0) {
                winner = Team.Enemy;
            } else {
                winner = players.length > 0 ? Team.Player : Team.Enemy;
            }
        } else {
            winner = this.hpRatio(players) >= this.hpRatio(enemies) ? Team.Player : Team.Enemy;
        }

        if (this.onFinish) {
            this.onFinish(winner, forced);
        }
    }

    private hpRatio(list: ChessUnit[]): number {
        let hp = 0;
        let max = 0;
        for (const u of list) {
            hp += Math.max(0, u.hp);
            max += u.maxHp;
        }
        return max > 0 ? hp / max : 0;
    }
}
