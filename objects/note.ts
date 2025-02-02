import IObjectAnimation from "../interfaces/customData/animationData";
import ICustomData from "../interfaces/customData/customNoteData";
import INote from "../interfaces/objects/note";
import { V3 } from "../map/initialize";
import cutDirection from "../types/cutDirection";
import lineIndex from "../types/lineIndex";
import lineLayer from "../types/lineLayer";
import noteType from "../types/noteType";


/**
 * Contains all the fake notes in the map.
 */
export const fakeNotes: Note[] = [];
/**
 * Contains all the notes in the map. 
 */
export const notes: Note[] = [];

interface INoteProperties {
    /**
     * The time of the note.
     * 
     * This is the time in beats from the start of the song.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_time`
     * - V3: `b`
     */
    time: number;
    /**
     * The line index of the note.
     * 
     * An integer number, from 0 to 3, which represents the column where this note is located. The far left column is located at index 0, and increases to the far right column located at index 3.
     * 
     * - Left: 0
     * - Left Middle: 1
     * - Right Middle: 2
     * - Right: 3
     * 
     * You can also use the enumerator in the Note class.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_lineIndex`
     * - V3: `x`
     */
    x?: lineIndex;
    /**
     * The line layer of the note.
     * 
     * An integer number, from 0 to 2, which represents the layer where this note is located. The bottommost layer is located at layer 0, and inceases to the topmost layer located at index 2.
     * 
     * - Bottom: 0
     * - Middle: 1
     * - Top: 2
     * 
     * You can also use the enumerator in the Note class.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_lineLayer`
     * - V3: `y`
     */
    y?: lineLayer;
    /**
     * The type or the color of the note.
     * 
     * - Red: 0
     * - Blue: 1
     * - Bomb: 3 (Won't work in V3 due to bombs belonging to a separate array.)
     * 
     * You can also use the enumerator in the Note class.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_type`
     * - V3: `c`
    */
    type?: noteType;
    /**
     * An integer number which represents the additional counter-clockwise angle offset applied to the note's cut direction in degrees. This has no effect on angles created due to snapping (e.g. dot stack, slanted windows).
     * 
     * This only works in V3.
     * 
     * ---
     * 
     * ### JSON Values
     * - V3: `a`
     */
    angle?: number;
    /**
     * The cut direction of the note.
     * 
     * - Up: 0
     * - Down: 1
     * - Left: 2
     * - Right: 3
     * - Up Left: 4
     * - Up Right: 5
     * - Down Left: 6
     * - Down Right: 7
     * - Dot: 8
     * 
     * You can also use the enumerator in the Note class.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_cutDirection`
     * - V3: `d`
     */
    direction?: cutDirection;
};

/**
 * Direction enumerator, used for the direction of the note.
 * 
 * - Up: 0
 * - Down: 1
 * - Left: 2
 * - Right: 3
 * - Up Left: 4
 * - Up Right: 5
 * - Down Left: 6
 * - Down Right: 7
 * - Dot: 8
 */
enum DIRECTION {
    UP,
    DOWN,
    LEFT,
    RIGHT,
    UP_LEFT,
    UP_RIGHT,
    DOWN_LEFT,
    DOWN_RIGHT,
    DOT
}

/**
 * Type enumerator, used for the type of the note.
 * 
 * - Red: 0
 * - Blue: 1
 * - Bomb: 3 (Won't work in V3 due to bombs belonging to a separate array.)
 */
enum TYPE {
    /**
     * Red note type
     */
    RED,
    /**
     * Blue note type
     */
    BLUE,
    /**
     * Won't work in V3 due to bombs belonging to a separate array.
     */
    BOMB = 3
}

/**
 * Line index enumerator, used for the horizontal position of the note.
 * 
 * - Left: 0
 * - Left Middle: 1
 * - Right Middle: 2
 * - Right: 3
 */
enum LINE_INDEX {
    LEFT,
    LEFT_MIDDLE,
    RIGHT_MIDDLE,
    RIGHT
}

/**
 * Line layer enumerator, used for the vertical position of the note.
 * 
 * - Bottom: 0
 * - Middle: 1
 * - Top: 2
 */
enum LINE_LAYER {
    BOTTOM,
    MIDDLE,
    TOP
}

/**
 * The note class, used for creating notes.
 * 
 * You can create a note with default values.
 * ```ts
 * new Note();
 * ```
 * 
 * You can also create a note with the given time.
 * ```ts
 * new Note(0);
 * ```
 * 
 * You can also create a note with the given properties.
 * ```ts
 * new Note({
 *    time: number,
 *     x: lineIndex,
 *     y: lineLayer,
 *     type: noteType,
 *     direction: cutDirection,
 *     angle: number, // V3 only
 * });
 * ```
 * 
 * You can also create a note with the given properties and custom data.
 * ```ts
 * new Note({
 *    time: number // Vanilla properties here
 * }, {
 *    // This part will go under the custom data bracket of the note.
 *     track: string | string[],
 *     position: vec2,
 *     rotation: vec3, // V2 only
 *     worldRotation: vec3, // V3 only
 *     localRotation: vec3,
 *     fake: boolean,
 *     interactable: boolean,
 *     scale: vec3,
 *     flip: vec2,
 *     color: vec4,
 *     offset: number,
 *     njs: number,
 *     disableNoteGravity: boolean,
 *     disableNoteLook: boolean,
 *     disableSpawnEffect: boolean,
 * });
 * ```
 * 
 * You can also create a note with the given properties, custom data, and animation.
 * ```ts
 * new Note({
 *     time: number // Vanilla properties here
 * }, {
 *  // This part will go under the custom data bracket of the note.
 *     track: string | string[], // Custom data here
 * }, {
 * // This part will go under the animation bracket of the note inside the custom data.
 *     position: vec3anim, // V2 only
 *     offsetPosition: vec3anim, // V3 only
 *     rotation: vec3anim, // V2 only
 *     offsetWorldRotation: vec3anim, // V3 only
 *     dissolve: vec1anim,
 *     dissolveArrow: vec1anim,
 *     interactable: vec1anim,
 *     localRotation: vec3anim,
 *     scale: vec3anim,
 *     color: vec4anim,
 *     definitePosition: vec3anim
 * });
 * ```
 * 
 * To push the note, simply add `.push();` at the end of the note.
 * ```ts
 * new Note({
 *     time: 69
 * }).push();
 * ```
 */
export default class Note implements INote {

    /**
     * The note type enum.
     * 
     * Use this if you can't remember the types.
     * ```ts
     * Note.TYPE.RED; // 0
     * Note.TYPE.BLUE; // 1
     * Note.TYPE.BOMB; // 3
     * ```
     */
    public static readonly TYPE = TYPE;
    
    /**
     * The note direction enum.
     * 
     * Use this if you can't remember the directions.
     * ```ts
     * Note.DIRECTION.UP; // 0
     * Note.DIRECTION.DOWN; // 1
     * Note.DIRECTION.LEFT; // 2
     * Note.DIRECTION.RIGHT; // 3
     * Note.DIRECTION.UP_LEFT; // 4
     * Note.DIRECTION.UP_RIGHT; // 5
     * Note.DIRECTION.DOWN_LEFT; // 6
     * Note.DIRECTION.DOWN_RIGHT; // 7
     * Note.DIRECTION.DOT; // 8
     * ```
     */
    public static readonly DIRECTION = DIRECTION;

    /**
     * The line index enum.
     * 
     * Use this if you can't remember the line indexes.
     * ```ts
     * Note.LINE_INDEX.LEFT; // 0
     * Note.LINE_INDEX.LEFT_MIDDLE; // 1
     * Note.LINE_INDEX.RIGHT_MIDDLE; // 2
     * Note.LINE_INDEX.RIGHT; // 3
     * ```
     */
    public static readonly LINE_INDEX = LINE_INDEX;

    /**
     * The line layer enum.
     * 
     * Use this if you can't remember the line layers.
     * ```ts
     * Note.LINE_LAYER.BOTTOM; // 0
     * Note.LINE_LAYER.MIDDLE; // 1
     * Note.LINE_LAYER.TOP; // 2
     * ```
     */
    public static readonly LINE_LAYER = LINE_LAYER;

    /**
     * The time of the note.
     * 
     * This is the time in beats from the start of the song.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_time`
     * - V3: `b`
     */
    public time: number;
    /**
     * The line index of the note.
     * 
     * This is the horizontal position of the note starting from left.
     * 
     * - Left: 0
     * - Left Middle: 1
     * - Right Middle: 2
     * - Right: 3
     * 
     * You can also use the enumerator in the Note class.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_lineIndex`
     * - V3: `x`
     */
    public x: lineIndex;
    /**
     * The line layer of the note.
     * 
     * This is the vertical position of the note starting from bottom.
     * 
     * - Bottom: 0
     * - Middle: 1
     * - Top: 2
     * 
     * You can also use the enumerator in the Note class.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_lineLayer`
     * - V3: `y`
     */
    public y: lineLayer;
    /**
     * The type or the color of the note.
     * 
     * - Red: 0
     * - Blue: 1
     * - Bomb: 3
     * 
     * You can also use the enumerator in the Note class.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_type`
     * - V3: `c`
    */
    public type: noteType;
    /**
     * The angle offset of the note in degrees.
     * 
     * This only works in V3.
     * 
     * ---
     * 
     * ### JSON Values
     * - V3: `a`
     */
    public angle: number;
    /**
     * The cut direction of the note.
     * 
     * - Up: 0
     * - Down: 1
     * - Left: 2
     * - Right: 3
     * - Up Left: 4
     * - Up Right: 5
     * - Down Left: 6
     * - Down Right: 7
     * - Dot: 8
     * 
     * You can also use the enumerator in the Note class.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_cutDirection`
     * - V3: `d`
     */
    public direction: cutDirection;
    /**
     * The custom data of the note.
     * 
     * This is used for adding custom data to the note. Such as `color` or `scale`
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_customData`
     * - V3: `customData`
     */
    public customData: ICustomData;
    /**
     * The animation of the note.
     * 
     * This is used for adding animations to the note. Such as `position` or `rotation`
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_customData._animation`
     * - V3: `customData.animation`
     */
    public animation: IObjectAnimation;

    /**
     * Creates a new note with default values.
     * ```ts
     * new Note();
     * ```
     */
    constructor();
    /**
     * Creates a new note with the given time.
     * @param note The time of the note.
     * ```ts
     * new Note(0);
     * ```
     */
    constructor(note: number);
    /**
     * Creates a new note with the given properties.
     * ```ts
     * new Note({
     *     time: number,
     *     x: lineIndex,
     *     y: lineLayer,
     *     type: noteType,
     *     direction: cutDirection,
     *     angle: number, // V3 only
     * });
     * ```
     */
    constructor(note: INoteProperties);
    /**
     * Creates a new note with the given properties and custom data.
     * ```ts
     * new Note({
     *     time: number // Vanilla properties here
     * }, {
     *     // This part will go under the custom data bracket of the note.
     *     track: string | string[],
     *     position: vec2,
     *     rotation: vec3,
     *     localRotation: vec3,
     *     scale: vec3,
     *     flip: vec2,
     *     color: vec4,
     *     njs: number,
     *     offset: number,
     *     disableNoteGravity: boolean,
     *     disableNoteLook: boolean,
     *     disableSpawnEffect: boolean,
     *     interactable: boolean,
     *     fake: boolean
     * });
     * ```
     */
    constructor(note: INoteProperties, data: ICustomData);
    /**
     * Creates a new note with the given properties, custom data, and animation.
     * ```ts
     * new Note({
     *     time: number // Vanilla properties here
     * }, {
     *     // This part will go under the custom data bracket of the note.
     *     track: string | string[], // Custom data here
     * }, {
     *     // This part will go under the animation bracket of the note inside the custom data.
     *     position: vec3anim,
     *     rotation: vec3anim,
     *     dissolve: vec1anim,
     *     dissolveArrow: vec1anim,
     *     interactable: vec1anim,
     *     localRotation: vec3anim,
     *     scale: vec3anim,
     *     color: vec4anim,
     *     definitePosition: vec3anim
     * });
     * ```
     */
    constructor(note: INoteProperties, data: ICustomData, anim: IObjectAnimation);
    constructor(note?: INoteProperties | number, data?: ICustomData, anim?: IObjectAnimation) {
        this.time = 0;
        this.x = 0;
        this.y = 0;
        this.type = 0;
        this.direction = 0;
        this.angle = 0;
        this.customData = {};
        this.animation = {};
        if (note) {
            if (typeof note === "number") {
                this.time = note;
                return this;
            }
            if (note.time) this.time = note.time;
            if (note.x) this.x = note.x;
            if (note.y) this.y = note.y;
            if (note.angle) this.angle = note.angle;
            if (note.type) this.type = note.type;
            if (note.direction) this.direction = note.direction;
            if (data) this.customData = data;
            if (anim) this.animation = anim;
        }
        return this;
    }

    /**
     * Pushes the note to the map.
     */
    push() {
        if (this.animation == null || this.animation == undefined) this.animation = {};
        if (V3 && this.type === TYPE.BOMB) throw new Error("Invalid bomb type in notes.");
        if (this.customData.fake) {
            delete this.customData.fake;
            fakeNotes.push(this);
            return;
        }
        notes.push(this);
    }

    duplicate(): Note {
        const n = new Note();
        Object.assign(n, JSON.parse(JSON.stringify(this)));
        return n;
    }
}