import { readFileSync } from "fs";
import { WALL,Track } from "../consts/types/objects";
import { vec3anim,vec4 } from "../consts/types/vec";
import AnimateTrack from "../events/animateTrack";
import Wall from "../objects/wall";
import { walls } from "../src/mapHandler";
import { JsonModel } from "../consts/types/JsonModel";

export default class ModelWall {
    walls: WALL[] = [];
    constructor(time: number, filePath: string) {
        const model = JSON.parse(readFileSync(filePath, 'utf-8'))
        model.forEach((x: JsonModel) => {
            const col = x.color;
            const s: [number, number, number] = x.scale;
            const r: [number, number, number] = x.rotation;
            r[0] = Math.round((r[0] / 6.2832 - 180) * 1000) / 1000;
            r[1] = Math.round((r[1] / 6.2832 - 180) * 1000) / 1000;
            r[2] = Math.round((r[2] / 6.2832 - 180) * 1000) / 1000;

            const p: [number, number, number] = x.position
            p[0] = Math.round((p[0] / 1.666 - s[0] / 2 - (r[0] / 360 * s[0])) * 1000) / 1000;
            p[1] = Math.round((p[1] / 1.666 - s[1] / 2 - (r[1] / 360 * s[1])) * 1000) / 1000;
            p[2] = Math.round((p[2] / 1.666 - s[2] / 2 - (r[2] / 360 * s[2])) * 1000) / 1000;

            p[0] += r[2] / 360;
            p[0] -= r[1] / 360;

            p[1] += r[2] / 360;
            p[1] += r[0] / 360;

            p[2] += r[0] / 360;
            p[2] += r[1] / 360;

            const w: WALL = new Wall({
                time: time,
                duration: 1
            }, {
                fake: true,
                interactable: false,
                color: [...col],
                position: [0, 0],
                localRotation: r,
                scale: s
            }, {
                definitePosition: p,
            })
            this.walls.push(w);
        });
    }
    track(track: Track) {
        this.walls.forEach((x: WALL) => {
            x.data.track = track;
        })
        return this;
    }
    alpha(alpha: number) {
        this.walls.forEach((x: WALL) => {
            if (x.data.color) x.data.color[3] = alpha;
        })
        return this;
    }
    position(pos: vec3anim, duration?: number) {
        const fw = this.walls[0].data;
        if (fw.track) {
            let track: Track;
            let d = 0;
            if (duration) d = duration;
            if (Array.isArray(fw.track)) track = fw.track[fw.track.length - 1];
            else track = fw.track;
            new AnimateTrack(0, {
                track: track,
                duration: d,
                position: pos
            }).push();
        }
        return this;
    }
    duration(duration: number) {
        this.walls.forEach(x => {
            x.duration = duration;
        })
        return this;
    }
    color(color: vec4) {
        this.walls.forEach(x => {
            x.data.color = color;
        })
        return this;
    }
    outline(thickness: number) {
        this.walls.forEach(x => {
                if (x.data.scale) {
                x.data.scale[0] /= thickness;
                x.data.scale[1] /= thickness;
                x.data.scale[2] /= thickness;
                x.anim.scale = [thickness, thickness, thickness];
            }
        })
        return this;
    }
    push() {
        this.walls.forEach(x => {
            walls.push(x);
        })
        return this;
    }
}