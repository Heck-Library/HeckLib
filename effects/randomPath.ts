import ease from "../consts/easing";
import filter from "../functions/filter";
import random from "../functions/random";
import track from "../functions/track";
import INote from "../interfaces/objects/note";
import PointDefinition from "../map/pointDefinition";
import { notes } from "../map/variables";

/**
 * Properties for the RandomPath effect
 * ```ts
 * start: number;       // Start time of the effect
 * end: number;         // End time of the effect
 * track?: Track;       // Track to set for all the notes selected
 * offset?: number;     // Offset to apply for all notes selected
 * opaqueBy?: number;   // The point of time where the notes will appear opaque (0 - 1)
 * ```
 * @interface RandomPathProperties
 */
interface RandomPathProperties {
    /**
     * ### Start Time
     * 
     * Start time of the effect
     */
    start: number;
    /**
     * ### End Time
     * 
     * End time of the effect
     */
    end: number;
    /**
     * ### Track
     * 
     * Track to set for all the notes selected
     */
    track?: string | string[];
    /**
     * ### Offset
     * 
     * Offset to apply for all notes selected
     */
    offset?: number;
    /**
     * ### Opaque By
     * 
     * The point of time where the notes will appear opaque (`dissolve: 1`)
     */
    opaqueBy?: number;
    /**
     * The maximum value of the x position of the notes.
     */
    xMax?: number;
    /**
     * The maximum value of the y position of the notes.
     */
    yMax?: number;
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
    track?: string | string[];
    /**
     * Offset to apply for all notes selected
     */
    offset: number;
    /**
     * The point of time where the notes will appear opaque (0 - 1)
     */
    opaqueBy?: number;
    /**
     * The maximum value of the x position of the notes.
     */
    xMax?: number;
    /**
     * The maximum value of the y position of the notes.
     */
    yMax?: number;

    /**
     * Creates a new instance of the RandomPath effect.
     */
    constructor();
    /**
     * Randomizes the path of all notes between the two time values: `start` and `end`.
     * 
     * ```ts
     * new Effect.RandomPath({
     *     start: 69,   // The effect's start beat
     *     end: 727,    // The effect's ending beat
     *     track: "foo",// The track applied to all selected notes
     *     offset: 2,   // The offset applied to all selected notes
     *     xMax: 10,    // The maximum value of the x position of the notes
     *     yMax: 10,    // The maximum value of the y position of the notes
     *     opaqueBy: 0.5// The point of time where the notes will appear opaque (0 - 1)
     * }).push();       // Pushes the effect to the map
     * ```
     */
    constructor(properties: RandomPathProperties);
    constructor(properties?: RandomPathProperties) {
        const { start, end, track, offset, xMax, yMax, opaqueBy } = properties;

        this.start = 0;
        this.end = 0;
        this.offset = 2;
        this.opaqueBy = 0.125;
        this.xMax = 10;
        this.yMax = 7;

        if (start) this.start = start;
        if (end) this.end = end;
        if (track) this.track = track;
        if (offset) this.offset = offset;
        if (opaqueBy) this.opaqueBy = opaqueBy;
        if (xMax) this.xMax = xMax;
        if (yMax) this.yMax = yMax;
    }
    
    /**
        * Pushes the effect to the map.
        */
    push() : void {
        new PointDefinition(`rDisOpBy${this.opaqueBy}`, [
            [0, 0],
            [1, this.opaqueBy, ease.Out.Cubic]
        ]).push();
        
        for (let i = 1; i <= 20; i++) {
            const xMaxRot = 45 * (this.xMax / 10);
            const yMaxRot = 20 * (this.yMax / 7);

            new PointDefinition(`randPos${i}`, [
                [random(-this.xMax, this.xMax), random(-1, this.yMax), 0, 0],
                [0, 0, 0, 0.4785, ease.Out.Circ]
            ]).push();
            new PointDefinition(`randRot${i}`, [
                [random(-yMaxRot, yMaxRot), random(-xMaxRot, xMaxRot), random(-40, 40), 0],
                [0, 0, 0, 0.4785, ease.Out.Circ]
            ]).push();
        }
        
        const f = filter(notes, this.start, this.start + this.end);
        f.forEach((n: INote) => {
            const d = n.customData;
            const a = n.animation;

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