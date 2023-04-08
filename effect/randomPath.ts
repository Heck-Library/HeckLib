import ease from "../consts/ease";
import { NOTE, Track } from "../consts/mod";
import filter from "../functions/filter";
import random from "../functions/random";
import track from "../functions/track";
import { notes, pointDefinitions } from "../map/initialize";
import PointDefinition from "../map/pointDefinition";

type RandomPathProperties = {
    /**
     * Start time of the effect
     */
    start: number;
    /**
     * End time of the effect
     */
    end: number;
    /**
     * Track to set for all the notes selected
     */
    track?: Track;
    /**
     * Offset to apply for all notes selected
     */
    offset?: number;
}

export default class RandomPath {
    /**
     * Start time of the effect
     */
    start: number;
    /**
     * End time of the effect
     */
    end: number;
    /**
     * Track to set for all the notes selected
     */
    track?: Track;
    /**
     * Offset to apply for all notes selected
     */
    offset: number;

    /**
     * Randomizes the path of all notes between the two time values: `start` and `end`.
     * 
     * ```ts
     * new Effect.RandomPath({
     *     start: 69,   // The effect's start beat
     *     end: 727,    // The effect's ending beat
     *     track: "foo",// The track applied to all selected notes
     *     offset: 2    // The offset applied to all selected notes
     * }).push();       // Pushes the effect to the map
     * ```
     */
    constructor(properties: RandomPathProperties) {
        const p = properties;

        this.start = p.start;
        this.end = p.end;
        this.offset = 2;

        if (p.track) this.track = p.track;
        if (p.offset) this.offset = p.offset;
    }
    
    /**
     * Pushes the effect to the map.
     */
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
        const f = filter(notes, this.start, this.start + this.end)
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