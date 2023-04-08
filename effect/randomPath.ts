import ease from "../consts/ease";
import { NOTE, Track } from "../consts/mod";
import filter from "../functions/filter";
import random from "../functions/random";
import track from "../functions/track";
import { notes, pointDefinitions } from "../map/initialize";
import PointDefinition from "../map/pointDefinition";

type RandomPathProperties = {
    time: number;
    duration: number;
    track?: Track;
    offset?: number;
}

export default class RandomPath {
    time: number;
    duration: number;
    track?: Track;
    offset: number;

    constructor(properties: RandomPathProperties) {
        const p = properties;

        this.time = p.time;
        this.duration = p.duration;
        this.offset = 2;

        if (p.track) this.track = p.track;
        if (p.offset) this.offset = p.offset;
    }
    
    push() : void {
        if (!pointDefinitions.includes("randPos1")) {
            new PointDefinition("randDissolve", [
                [0, 0],
                [1, 0.125, ease.Out.Cubic]
            ]).push();
            for (let i = 1; i <= 20; i++) {
                new PointDefinition(`randPos${i}`, [
                    [random(-10, 10), random(-1, 7), 0, 0],
                    [0, 0, 0, 0.4785, ease.Out.Circ]
                ]).push();
                new PointDefinition(`randRot${i}`, [
                    [random(-20, 20), random(-90, 90), random(-40, 40), 0],
                    [0, 0, 0, 0.4785, ease.Out.Circ]
                ]).push();
            }
        }
        const f = filter(notes, this.time, this.time + this.duration)
        f.forEach((n: NOTE) => {
            const d = n.data;
            const a = n.anim;

            d.disableNoteGravity = true,
            d.disableNoteLook = true,
            d.disableSpawnEffect = true,
            d.offset = this.offset

            a.position = `randPos${random(1, 20, 0)}`;
            a.rotation = `randRot${random(1, 20, 0)}`;
            a.dissolve = "randDissolve";
            a.dissolveArrow = "randDissolve";
        });
        if (typeof this.track !== 'undefined') {
            track(f, this.track);
        }
    }
}