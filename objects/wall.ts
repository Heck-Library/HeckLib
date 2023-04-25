import IObjectAnimation from "../interfaces/customData/animationData";
import ICustomWallData from "../interfaces/customData/customWallData";
import IWall from "../interfaces/objects/wall";
import { walls } from "../map/variables";
import lineIndex from "../types/lineIndex";
import lineLayer from "../types/lineLayer";

type wallProperties = {
    time: number;
    x?: lineIndex;
    y?: lineLayer;
    duration?: number;
    width?: number;
    height?: number;
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

/**
 * Test
 */
export default class Wall implements IWall {
    
    public static readonly LINE_INDEX = LINE_INDEX;

    public static readonly LINE_LAYER = LINE_LAYER;

    /**
     * The time in seconds at which the wall will appear in beats.
     * 
     * --- 
     * 
     * ### JSON Values
     * - V2: `_time`
     * - V3: `b`
     */
    time: number;
    /**
     * The line index at which the wall will appear.
     * 
     * An integer number, from 0 to 3, which represents the column where this obstacle is located. The far left column is located at index 0, and increases to the far right column located at index 3.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_lineIndex`
     * - V3: `x`
     */
    x: lineIndex;
    /**
     * The line layer at which the wall will appear.
     * 
     * An integer number, from 0 to 2, which represents the layer where base of the obstacle is located. The bottommost layer is located at layer 0, and inceases to the topmost layer located at index 2.
     * 
     * **IN V2, THIS IS ONLY 0 OR 1.**
     * 
     * ---
     * 
     * | `y` | Result | V2     | V3     |
     * |-----|--------|--------|--------|
     * | 0   | Ground | `true` | `true` |
     * | 1   | Prone  | `true` | `true` |
     * | 2   | Crouch | `false`| `true` |
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_type`
     * - V3: `y`
     */
    y: lineLayer;
    /**
     * The time, in beats, that the obstacle extends for (duration). While `duration` can go into negative numbers, be aware that this has some unintended effects.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_duration`
     * - V3: `d`
     */
    duration: number;
    /**
     * An integer which which represents the width of the obstacle. While `width` can go into negative numbers, be aware that this has some unintended effects.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_width`
     * - V3: `w`
     */
    width: number;
    /**
     * An integer numbers from 1 to 5, which represents the height of the obstacle. While `height` can go into negative numbers, be aware that this has some unintended effects.
     * 
     * **DOES NOT WORK WITH V2**
     * 
     * ---
     * 
     * ### JSON Values
     * - V3: `h`
     */
    height: number;
    /**
     * The custom data of the wall.
     * 
     * This is used for adding custom data to the wall. Such as `color` or `scale`
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_customData`
     * - V3: `customData`
     */
    data: ICustomWallData;
    /**
     * The animation data of the wall.
     * 
     * This is used for adding animation to the wall.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_customData._animation`
     * - V3: `customData.animation`
     */
    anim: IObjectAnimation;

    /**
     * Creates a new wall object.
     */
    constructor();
    /**
     * Creates a new wall object with a time value.
     */
    constructor(wall: number);
    /**
     * Creates a new wall object with custom parameters.
     * ```ts
     * new Wall({
     *     time: number,
     *     x: number,
     *     y: number,
     *     duration: number,
     *     width: number,
     *     height: number
     * }).push();
     * ```
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * {
     *     "_time": number,
     *     "_lineIndex": number,
     *     "_type": number,
     *     "_duration": number,
     *     "_width": number
     *     // height doesn't exist.
     * }
     * ```
     * #### V3
     * ```json
     * {
     *     "b": number,
     *     "x": number,
     *     "y": number,
     *     "d": number,
     *     "w": number,
     *     "h": number
     * }
     * ```
     */
    constructor(wall: wallProperties);
    /**
     * Creates a new wall object with custom parameters and custom data.
     * ```ts
     * new Wall({
     *     // Vanilla data here
     * }, {
     *     track: string | string[],
     *     color: vec4,
     *     scale: vec3,
     *     position: vec2,
     *     rotation: vec3,
     *     localRotation: vec3,
     *     njs: number,
     *     offset: number,
     *     interactable: boolean,
     * }).push();
     * ```
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * {
     *     "_track": string | string[],
     *     "_color": [number, number, number, number],
     *     "_scale": [number, number, number],
     *     "_position": [number, number],
     *     "_rotation": [number, number, number],
     *     "_localRotation": [number, number, number],
     *     "_noteJumpMovementSpeed": number,
     *     "_noteJumpStartBeatOffset": number,
     *     "_interactable": boolean
     * }
     * ```
     * 
     * ---
     * 
     * #### V3
     * ```json
     * {
     *     "track": string | string[],
     *     "color": [number, number, number, number],
     *     "size": [number, number, number],
     *     "coordinates": [number, number],
     *     "worldRotation": [number, number, number],
     *     "localRotation": [number, number, number],
     *     "noteJumpMovementSpeed": number,
     *     "noteJumpStartBeatOffset": number,
     *     "uninteractable": !boolean // this value will be inverted in the json
     * }
     * ```
     */
    constructor(wall: wallProperties, data: ICustomWallData);
    /**
     * Creates a new wall object with custom parameters and animation data.
     * ```ts
     * new Wall({
     *    // Vanilla data here
     * }, {
     *    // Custom data here
     * }, {
     *     position: vec3anim,
     *     definitePosition: vec3anim,
     *     rotation: vec3anim,
     *     localRotation: vec3anim,
     *     scale: vec3anim,
     *     color: vec4anim,
     *     dissolve: vec1anim,
     *     dissolveArrow: vec1anim,
     *     interactable: vec1anim
     * }).push();
     * ```
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * {
     *     "_position": [number, number, number, string?, string?][],
     *     "_definitePosition": [number, number, number, string?, string?][],
     *     "_rotation": [number, number, number, string?, string?][],
     *     "_localRotation": [number, number, number, string?, string?][],
     *     "_scale": [number, number, number, string?, string?][],
     *     "_color": [number, number, number, number, string?, string?][],
     *     "_dissolve": [number, number, string?, string?][],
     *     "_dissolveArrow": [number, number, string?, string?][],
     *     "_interactable": [number, number, string?, string?][]
     * }
     * ```
     * 
     * ---
     * 
     * #### V3
     * ```json
     * {
     *     "offsetPosition": [number, number, number, string?, string?][],
     *     "offsetWorldRotation": [number, number, number, string?, string?][],
     *     "localRotation": [number, number, number, string?, string?][],
     *     "scale": [number, number, number, string?, string?][],
     *     "color": [number, number, number, number, string?, string?][],
     *     "dissolve": [number, number, string?, string?][],
     *     "dissolveArrow": [number, number, string?, string?][],
     *     "interactable": [number, number, string?, string?][]
     * }
     * ```
     */
    constructor(wall: wallProperties, data: ICustomWallData, anim: IObjectAnimation);
    constructor(wall?: wallProperties | number, data?: ICustomWallData, anim?: IObjectAnimation) {
        this.time = 0.001;
        this.x = 0;
        this.y = 0;
        this.duration = 0;
        this.width = 0;
        this.height = 0;
        this.data = {};
        this.anim = {};
        if (wall) {
            if (typeof wall === "number") {
                this.time = wall;
                return this;
            }
            if (wall.time) this.time = wall.time;
            if (wall.x) this.x = wall.x;
            if (wall.y) this.y = wall.y;
            if (wall.duration) this.duration = wall.duration;
            if (wall.width) this.width = wall.width;
            if (wall.height) this.height = wall.height;
            if (data) this.data = data;
            if (anim) this.anim = anim;
        }
        return this;
    }

    push() : void {
        walls.push(this);
    }
}