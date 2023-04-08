import { NOTE, Track } from "../consts/mod";
import dupe from "../functions/dupe";
import filter from "../functions/filter";
import random from "../functions/random";
import { notes } from "../map/initialize";

function clamp(x: number) {
    return Math.min(Math.max(x, 0), 1);
}

type noteTrailProperties = {
    /**
     * The starting time of the effect.
     */
    start: number;
    /**
     * The ending time of the effect.
     */
    end: number;
    /**
     * The tracks to add to the trail.
     */
    track?: Track;
    /**
     * How many beats should the notes stretch as a trail
     */
    stretch?: number;
    /**
     * How much should the notes be dissolved.
     */
    dissolve?: number;
    /**
     * How many notes should the trail consist of.
     */
    noteCount?: number;
}

export default class NoteTrail {
    /**
     * The starting time of the effect.
     */
    start: number;
    /**
     * The ending time of the effect.
     */
    end: number;
    /**
     * The tracks to add to the trail.
     */
    track?: Track;
    /**
     * How many beats should the notes stretch as a trail
     */
    stretch: number;
    /**
     * How much should the notes be dissolved.
     */
    dissolve: number;
    /**
     * How many notes should the trail consist of.
     */
    noteCount: number;

    /**
     * Generates a trail of dissolved notes behind each note between `start` and `end` beats.
     * 
     * ```ts
     * new Effect.NoteTrail({
     *     start: 6,     // The trails start to generate on this beat.
     *     end: 69,      // The last beat the trails are generated on.
     *     stretch: 1,   // How many beats should the trail stretch behind the note.
     *     noteCount: 16 // How many notes should the trail consist of.
     * }).push();        // Pushes everything to the map.
     * ```
     */
    constructor(properties: noteTrailProperties) {
        const p = properties;
        
        this.start = p.start;
        this.end = p.end;
        this.stretch = 0.5;
        this.dissolve = 0.15;
        this.noteCount = 8;

        if (typeof p.stretch !== 'undefined') this.stretch = p.stretch;
        if (typeof p.dissolve !== 'undefined') this.dissolve = p.dissolve;
        if (typeof p.noteCount !== 'undefined') this.noteCount = p.noteCount;
        if (typeof p.track !== 'undefined') this.track = p.track;
    }

    /**
     * Pushes the trails to the map.
     */
    push() : void {
        filter(notes, this.start, this.end).forEach((n: NOTE) => {
            for (let i = this.stretch / this.noteCount; i <= this.stretch; i += this.stretch / this.noteCount) {
                n.data.disableNoteGravity = true;
                const duplicate = dupe(n);
                const d = duplicate.data;
                const a = duplicate.anim;

                duplicate.time += i;

                d.disableNoteLook = true;
                d.disableSpawnEffect = true;
                
                a.dissolve = [
                    [clamp(random(this.dissolve * 100 - 5, this.dissolve * 100 + 15, 0) / 100), 0],
                    [Math.round(clamp(random(0, this.dissolve * 100 / 2, 2) / 100) * 100) / 100, 1],
                ];
                a.dissolveArrow = JSON.parse(JSON.stringify(a.dissolve));
                a.dissolveArrow[0][0] /= 2;
                a.dissolveArrow[1][0] /= 2;

                notes.push(duplicate);
            }
        });
    }
}