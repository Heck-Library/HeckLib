import IObjectAnimation from "../interfaces/customData/animationData";
import ICustomData from "../interfaces/customData/customData";
import INote from "../interfaces/objects/note";
import { notes } from "../map/initialize";
import cutDirection from "../types/cutDirection";
import lineIndex from "../types/lineIndex";
import lineLayer from "../types/lineLayer";
import noteType from "../types/noteType";
import v3customData from "../interfaces/json/v3/v3customData";
import v3objectAnimation from "../interfaces/json/v3/v3objectAnimation";

interface noteProperties {
    time: number;
    x?: lineIndex;
    y?: lineLayer;
    type?: noteType;
    direction?: cutDirection;
    angle?: number;
    customData?: ICustomData;
    animation?: IObjectAnimation;
};

interface v3noteProperties {
    b: number;
    x?: lineIndex;
    y?: lineLayer;
    d?: cutDirection;
    c?: 0 | 1;
    a?: number;
}

enum DIRECTION {
    UP = 0,
    DOWN = 1,
    LEFT = 2,
    RIGHT = 3,
    UP_LEFT = 4,
    UP_RIGHT = 5,
    DOWN_LEFT = 6,
    DOWN_RIGHT = 7,
    DOT = 8,
}

enum TYPE {
    /**
     * Red note type
     */
    RED = 0,
    /**
     * Blue note type
     */
    BLUE = 1,
    /**
     * Won't work in V3 due to bombs belonging to a separate array.
     */
    BOMB = 3
}

enum LINE_INDEX {
    LEFT = 0,
    LEFT_MIDDLE = 1,
    RIGHT_MIDDLE = 2,
    RIGHT = 3
}

enum LINE_LAYER {
    BOTTOM = 0,
    MIDDLE = 1,
    TOP = 2
}

function isOfV3(object: any): object is v3noteProperties {
    return object.b !== undefined;
}

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

    public time: number;
    /**
     * The line index of the note.
     * 
     * - Left: 0
     * - Left Middle: 1
     * - Right Middle: 2
     * - Right: 3
     * 
     * You can also use the enumerator in the Note class.
     */
    public x: lineIndex;
    /**
     * The line layer of the note.
     * 
     * - Bottom: 0
     * - Middle: 1
     * - Top: 2
     * 
     * You can also use the enumerator in the Note class.
     */
    public y: lineLayer;
    /**
     * The type of the note.
     * 
     * - Red: 0
     * - Blue: 1
     * - Bomb: 3
     * 
     * You can also use the enumerator in the Note class.
    */
    public type: noteType;
    /**
     * The angle offset of the note in degrees.
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
     */
    public direction: cutDirection;
    /**
     * The custom data of the note.
     */
    public customData: ICustomData;
    /**
     * The animation of the note.
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
     * Creates a new note with v3 formatted properties.
     * ```ts
     * new Note({
     *     b: number,
     *     x: lineIndex,
     *     y: lineLayer,
     *     d: cutDirection,
     *     c: 0 | 1,
     *     a: number;
     * });
     * ```
     */
    constructor(note: v3noteProperties);
    /**
     * Creates a new note with v3 formatted properties and custom data.
     * ```ts
     * new Note({
     *     b: 0, // All the vanilla stuff here
     * }, {
     *     track: string | string[],
     *     coordinates: vec2,
     *     worldRotation: vec3,
     *     localRotation: vec3,
     *     scale: vec3,
     *     flip: vec2,
     *     color: vec4,
     *     njs: number,
     *     offset: number,
     *     disableNoteGravity: boolean,
     *     disableNoteLook: boolean,
     *     disableSpawnEffect: boolean,
     *     uninteractable: boolean,
     *     fake: boolean
     * });
     * ```
     */
    constructor(note: v3noteProperties, data: v3customData);
    /**
     * Creates a new note with v3 formatted properties, custom data, and animation.
     * ```ts
     * new Note({
     *     b: 0, // All the vanilla stuff here
     * }, {
     *     track: string | string[] // All the custom data here
     * }, {
     *     offsetPosition: vec3anim,
     *     offsetWorldRotation: vec3anim,
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
    constructor(note: v3noteProperties, data: v3customData, anim: v3objectAnimation);
    /**
     * Creates a new note with the given properties.
     * ```ts
     * new Note({
     *     time: number,
     *     x: lineIndex,
     *     y: lineLayer,
     *     type: noteType,
     *     direction: cutDirection,
     *     angle: number,
     * });
     * ```
     */
    constructor(note: noteProperties);
    /**
     * Creates a new note with the given properties and custom data.
     * ```ts
     * new Note({
     *     time: number // Vanilla properties here
     * }, {
     *     track: string | string[],
     *     coordinates: vec2,
     *     worldRotation: vec3,
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
    constructor(note: noteProperties, data: ICustomData);
    /**
     * Creates a new note with the given properties, custom data, and animation.
     * ```ts
     * new Note({
     *     time: number // Vanilla properties here
     * }, {
     *     track: string | string[], // Custom data here
     * }, {
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
    constructor(note: noteProperties, data: ICustomData, anim: IObjectAnimation);
    constructor(note?: noteProperties | v3noteProperties | number, data?: ICustomData | v3customData, anim?: IObjectAnimation | v3objectAnimation) {
        this.time = 0;
        this.x = 0;
        this.y = 0;
        this.type = 0;
        this.direction = 0;
        this.angle = 0;
        this.customData = {};
        this.animation = {};
        if (note) {
            if (isOfV3(note)) {
                const { b, x, y, d, c, a } = note;
                if (b) this.time = b;
                if (x) this.x = x;
                if (y) this.y = y;
                if (d) this.direction = d;
                if (c) this.type = c;
                if (a) this.angle = a;
                if (data) this.customData = data;
                if (anim) this.animation = anim;

                return this;
            }
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
            if (note.customData) this.customData = note.customData;
            if (note.animation) this.animation = note.animation;
        }
        return this;
    }

    push() {
        notes.push(this);
    }
}