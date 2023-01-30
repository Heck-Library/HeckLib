// deno-lint-ignore-file no-explicit-any

import { isArr } from "./general.ts";
import { bombs, fakeWalls, fakeNotes, notes, V3, walls } from "./mapHandler.ts";
import {
    animationData,
    customNoteData,
    customWallData,
    lineIndex,
    lineLayer,
    NOTE,
    noteData,
    noteDir,
    noteType,
    Track,
    WALL,
    wallData,
wallType
} from "./types.ts";

/**
 * @param obj The objects to filter.
 * @param start What the start beat to filter should be.
 * @param end What the end beat to filter should be.
 * @param type What the type to filter should be.
 * @returns The filtered objects.
 */
export function filter(obj: WALL[], start: number, end: number, type?: 0|1): WALL[]
/**
 * @param obj The objects to filter.
 * @param start What the start beat to filter should be.
 * @param end What the end beat to filter should be.
 * @param type What the type to filter should be.
 * @param direction What the direction to filter should be.
 * @returns The filtered objects.
 */
export function filter(obj: NOTE[], start: number, end: number, type?: 0|1|3, direction?: number): NOTE[] {
    if (obj == fakeNotes || obj == notes) {
        const f: (NOTE)[] = obj.filter((n: NOTE) => n.time >= start && n.time <= end)
        if (type && !direction) return f.filter((n: NOTE) => n.type == type);
        if (!type && direction) return f.filter((n: NOTE) => n.direction == direction);
        if (type && direction) return f.filter((n: NOTE) => n.direction == direction && n.type == type);
        return f;
    }
    if (obj == fakeWalls || obj == walls) {
        return obj.filter((w: WALL) => w.time >= start && w.time <= end);
    }
    return [];
}

/**
 * Assign a track to notes or walls.
 * @param obj The array of objects that the track should be assigned to.
 * @param track The array of tracks or the name of the track that should be assigned.
 */
export function track(obj: NOTE[]|WALL[], track: Track): void {
    obj.forEach((x: Record<string, any>) => {
        const d = x.data;
        if (!d.track) {
            d.track = track;
            return;
        }
        if (!isArr(d.track)) {
            if (isArr(track)) {
                const a = [...track, d.track];
                d.track = a;
            } else d.track = [d.track, track];
            return;
        }
        const tracks = d.track;
        if (isArr(track)) tracks.push(...track);
        else tracks.push(track);
    });
}

export class Note {
    /**
     * Arrow direction values.
     * @example Note.Direction.Down returns 1
     */
    static Direction: Record<string, noteDir> = {
        Up: 0,
        Down: 1,
        Left: 2,
        Right: 3,
        UpL: 4,
        UpR: 5,
        DownL: 6,
        DownR: 7,
        Dot: 8
    }
    static Type: Record<string, noteType> = {
        Red: 0,
        Blue: 1,
        /**
         * Bomb type is a V2 only feature
         */
        Bomb: 3
    }
    private json: {
        nD: noteData,
        cD: customNoteData,
        aD: animationData
    }
    constructor(noteData: noteData, customData?: customNoteData, animatinoData?: animationData) {
        this.json = {nD: noteData, cD: {}, aD: {}};
        if (customData) this.json.cD = customData;
        if (animatinoData) this.json.aD = animatinoData;

        if (!noteData.time) this.json.nD.time = 0;
        if (!noteData.type) this.json.nD.type = 0;
        if (!noteData.direction) this.json.nD.direction = 0;
        if (!noteData.x) this.json.nD.x = 0;
        if (!noteData.y) this.json.nD.y = 0;
    }

    //#region getters and setters-
    /**
     * Sets the time value of the note.
     */
    set time(time: number) { this.json.nD.time = time }
    /**
     * Gets the time value of the note.
     */
    get time(): number { return this.json.nD.time; }

    /**
     * Sets the type value of the note.
     */
    set type(type: noteType) { this.json.nD.type = type }
    /**
     * Gets the type value of the note.
     */
    get type(): noteType { if (this.json.nD.type) return this.json.nD.type; return 0; }

    /**
     * Sets the horizontal position value of the note.
     */
    set x(x: lineIndex) { this.json.nD.x = x }
    /**
     * Gets the horizontal position value of the note.
     */
    get x(): lineIndex { if (this.json.nD.x) return this.json.nD.x; return 0; }

    /**
     * Sets the vertical position value of the note.
     */
    set y(y: lineLayer) { this.json.nD.y = y }
    /**
     * Gets the vertical position value of the note.
     */
    get y(): lineLayer { if (this.json.nD.y) return this.json.nD.y; return 0; }

    /**
     * Sets the arrow direction value of the note.
     */
    set direction(direction: noteDir) { this.json.nD.direction = direction }
    /**
     * Gets the arrow direction value of the note.
     */
    get direction(): noteDir { if (this.json.nD.direction) return this.json.nD.direction; return 0; }

    /**
     * Sets the data values of the note.
     */
    set data(param: customNoteData) { this.json.cD = param }
    /**
     * Gets the data values of the note.
     */
    get data(): customNoteData { return this.json.cD }

    /**
     * Sets the animation values of the note.
     */
    set anim(param: animationData) { this.json.aD = param}
    /**
     * Gets the animation values of the note.
     */
    get anim(): animationData { return this.json.aD }
    //#endregion
    
    /**
     * Pushes the note to the map as a class.
     * @returns Note
     */
    push() {
        if (V3 && this.type == 3) {
            bombs.push(this);
            return this;
        }
        notes.push(this);
        return this;
    }
}

export class Wall {
    /**
     * These only work with V2
    */
    static Type: Record<string, wallType> = {
        Full: 0,
        Crouch: 1
    }
    private json: {
        wD: wallData
        cD: customWallData
        aD: animationData
    }
    constructor(wallData: wallData, customData?: customWallData, animationData?: animationData) {
        this.json = {wD: wallData, cD: {}, aD: {}};
        if (customData) this.json.cD = customData;
        if (animationData) this.json.aD = animationData;

        if (!wallData.time) this.json.wD.time = 0;
        if (!wallData.duration) this.json.wD.duration = 1;
        if (!wallData.width) this.json.wD.width = 1;
        if (!wallData.height) this.json.wD.height = 1;
        if (!wallData.x) this.json.wD.x = 0;
        if (!wallData.y) this.json.wD.y = 0;

        return this
    }

    //#region getters and setters
    set time(time: number) { this.json.wD.time = time; }
    get time(): number { return this.json.wD.time; }

    set duration(duration: number) { this.json.wD.duration = duration; }
    get duration(): number { if (this.json.wD.duration) return this.json.wD.duration; return 0; }

    set width(width: number) { this.json.wD.width = width; }
    get width(): number { if (this.json.wD.width) return this.json.wD.width; return 0; }

    set height(height: number) { this.json.wD.height = height; }
    get height(): number { if (this.json.wD.height) return this.json.wD.height; return 0; }

    set x(x: lineIndex) { this.json.wD.x = x; }
    get x(): lineIndex { if (this.json.wD.x) return this.json.wD.x; return 0; }

    set y(y: lineLayer) { this.json.wD.y = y; }
    get y(): lineLayer { if (this.json.wD.y) return this.json.wD.y; return 0; }

    set data(param: any) { this.json.cD = param; }
    get data(): customWallData { return this.json.cD; }
    
    set anim(param: any) { this.json.aD = param; }
    get anim(): animationData { return this.json.aD; }
    //#endregion
    push() {
        walls.push(this);
        return this;
    }
}
