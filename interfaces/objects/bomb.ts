import { bombs } from "../../map/variables";
import lineIndex from "../../types/lineIndex";
import lineLayer from "../../types/lineLayer";
import IObjectAnimation from "../customData/animationData";
import ICustomData from "../customData/customNoteData";


type bombProperties = {
    /**
     * ### Time
     * 
     * The time in beats at which the bomb is placed at.
     * 
     * Type: `number`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "b": number
     * ```
     */
    time: number;
    /**
     * ### X
     * 
     * The line index of the bomb.
     * 
     * You can use the `LINE_INDEX` enum for setting this value.
     * 
     * Type: `lineIndex`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "x": lineIndex
     * ```
     */
    x?: lineIndex;
    /**
     * ### Y
     * 
     * The line layer of the bomb.
     * 
     * You can use the `LINE_LAYER` enum for setting this value.
     * 
     * Type: `lineLayer`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "y": lineLayer
     * ```
     */
    y?: lineLayer;
    /**
     * ### Custom Data
     * 
     * The custom data of the bomb.
     * 
     * Type: `ICustomData`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "customData": { ... }
     * ```
     */
    customData?: ICustomData;
    /**
     * ### Animation
     * 
     * The animation of the bomb.
     * 
     * Type: `IObjectAnimation`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "customData": { "_animation": { ... } }
     * ```
     */
    animation?: IObjectAnimation;
};

enum LINE_INDEX {
    LEFT,
    LEFT_MIDDLE,
    RIGHT_MIDDLE,
    RIGHT
}

enum LINE_LAYER {
    BOTTOM,
    MIDDLE,
    TOP
}

export default class Bomb {

    public static readonly LINE_INDEX = LINE_INDEX;

    public static readonly LINE_LAYER = LINE_LAYER;

    
    /**
     * ### Time
     * 
     * The time in beats at which the bomb is placed at.
     * 
     * Type: `number`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "b": number
     * ```
     */
    time: number;
    /**
     * ### X
     * 
     * The line index of the bomb.
     * 
     * You can use the `LINE_INDEX` enum for setting this value.
     * 
     * Type: `lineIndex`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "x": lineIndex
     * ```
     */
    x: lineIndex;
    /**
     * ### Y
     * 
     * The line layer of the bomb.
     * 
     * You can use the `LINE_LAYER` enum for setting this value.
     * 
     * Type: `lineLayer`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "y": lineLayer
     * ```
     */
    y: lineLayer;
    /**
     * ### Custom Data
     * 
     * The custom data of the bomb.
     * 
     * Type: `ICustomData`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "customData": { ... }
     * ```
     */
    customData: ICustomData;
    /**
     * ### Animation
     * 
     * The animation of the bomb.
     * 
     * Type: `IObjectAnimation`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "customData": { "_animation": { ... } }
     * ```
     */
    animation: IObjectAnimation;

    /**
     * ### Bomb
     * 
     * Creates a bomb object with a time value.
     */
    constructor(bomb: number);
    /**
     * ### Bomb
     * 
     * Creates a bomb object with a given properties.
     */
    constructor(bomb: bombProperties);
    /**
     * ### Bomb
     * 
     * Creates a bomb object with a given properties and custom data.
     */
    constructor(bomb: bombProperties, data: ICustomData);
    /**
     * ### Bomb
     * 
     * Creates a bomb object with a given properties, custom data and animation data.
     */
    constructor(bomb: bombProperties, data: ICustomData, anim: IObjectAnimation);
    constructor(bomb?: bombProperties | number, data?: ICustomData, anim?: IObjectAnimation) {
        this.time = 0;
        this.x = 0;
        this.y = 0;
        this.customData = {};
        this.animation = {};
        if (bomb) {
            if (typeof bomb === "number") {
                this.time = bomb;
                return this;
            }
            if (bomb.time) this.time = bomb.time;
            if (bomb.x) this.x = bomb.x;
            if (bomb.y) this.y = bomb.y;
            if (bomb.customData) this.customData = bomb.customData;
            if (bomb.animation) this.animation = bomb.animation;
            if (data) this.customData = data;
            if (anim) this.animation = anim;
        }
        return this;
    }

    push() {
        bombs.push(this);
    }
}