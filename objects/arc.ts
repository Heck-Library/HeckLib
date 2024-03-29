import IObjectAnimation from "../interfaces/customData/animationData";
import ICustomSliderData from "../interfaces/customData/customSliderData";
import IArc from "../interfaces/objects/arc";
import cutDirection from "../types/cutDirection";
import lineIndex from "../types/lineIndex";
import lineLayer from "../types/lineLayer";

/**
 * Contains all the fake arcs in the map.
 */
export const fakeArcs: Record<string, any>[] = [];
/**
 * Contains all the arcs in the map.
 */
export const arcs: Arc[] = [];
interface arcProperties {
    /**
     * ### Time
     * 
     * The time in beats at which the arc starts.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "b": number }
     * ```
     */
    time: number;
    /**
     * ### X
     * 
     * An integer number, from 0 to 3, which represents the column where the head of the arc is located. The far left column is located at index 0, and increases to the far right column located at index 3.
     * 
     * You can use the `LINE_INDEX` enum to set this value.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "x": number }
     * ```
     */
    x?: lineIndex;
    /**
     * ### Y
     * 
     * An integer number, from 0 to 2, which represents the layer where the head of the arc is located. The bottommost layer is located at layer 0, and inceases to the topmost layer located at index 2.
     * 
     * You can use the `LINE_LAYER` enum to set this value.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "y": number }
     * ```
     */
    y?: lineLayer;
    /**
     * ### Type
     * 
     * The type of the arc. (Red/Blue)
     * 
     * You can use the `TYPE` enum to set this value.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "c": number }
     * ```
     */
    type?: 0 | 1;
    /**
     * ### Direction
     * 
     * The direction of the arc's startpoint.
     * 
     * You can use the `DIRECTION` enum to set this value.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "d": number }
     * ```
     */
    direction?: cutDirection;
    /**
     * ### Multiplier
     * 
     * A float which represents how far the arc goes from the head of the arc. If head direction is a dot, this does nothing.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "mu": number }
     * ```
     */
    multiplier?: number;
    /**
     * ### End Time
     * 
     * The time in beats at which the arc ends.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "tb": number }
     * ```
     */
    endTime: number;
    /**
     * ### End X
     * 
     * An integer number, from 0 to 3, which represents the column where the tail of the arc is located. The far left column is located at index 0, and increases to the far right column located at index 3.
     * 
     * You can use the `LINE_INDEX` enum to set this value.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "tx": number }
     * ```
     */
    endX?: lineIndex;
    /**
     * ### End Y
     * 
     * An integer number, from 0 to 2, which represents the layer where the tail of the arc is located. The bottommost layer is located at layer 0, and inceases to the topmost layer located at index 2.
     * 
     * You can use the `LINE_LAYER` enum to set this value.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "ty": number }
     * ```
     */
    endY?: lineLayer;
    /**
     * ### End Direction
     * 
     * The direction of the arc's endpoint.
     * 
     * You can use the `DIRECTION` enum to set this value.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "tc": number } // why is it tc and not td?
     * ```
     */
    endDirection?: cutDirection;
    /**
     * ### End Multiplier
     * 
     * A float which represents how far the arc goes from the tail of the arc. If tail direction is a dot, this does nothing.
     * 
     * You can use the `MULTIPLIER` enum to set this value.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "tmu": number }
     * ```
     */
    endMultiplier?: number;
    /**
     * ### Anchor
     * 
     * The anchor type of the arc. (Straight/CW/CCW)
     * 
     * An integer number which represents how the arc curves from the head to the mid point of the arc under certain conditions:
     * - Head and tail x are equal; and
     * - Head and tail cut direction are equal OR their angle difference is 180
     * 
     * You can use the `ANCHOR` enum to set this value.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "m": number }
     * ```
     */
    anchor?: 0 | 1 | 2;
    /**
     * ### Custom Data
     * 
     * The custom data of the arc.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "customData": {} }
     * ```
     */
    customData?: ICustomSliderData;
    /**
     * ### Animation
     * 
     * The animation data of the arc.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { 
     *     "customData":{
     *         "animation": {}
     *     } 
     * }
     * ```
     */
    animation?: IObjectAnimation;
}

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

enum TYPE {
    RED,
    BLUE
}

enum ANCHOR {
    STRAIGHT,
    CW,
    CCW
}

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

export default class Arc implements IArc {

    public static readonly DIRECTION = DIRECTION;

    public static readonly TYPE = TYPE;

    public static readonly ANCHOR = ANCHOR;

    public static readonly LINE_INDEX = LINE_INDEX;

    public static readonly LINE_LAYER = LINE_LAYER;

    
    /**
     * ### Time
     * 
     * The time in beats at which the arc starts.
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
     * The line index of the arc's start point.
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
     * The line layer of the arc's start point.
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
     * ### Type
     * 
     * The type of the arc. (Red/Blue)
     * 
     * Type: `0 | 1`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "c": 0 | 1
     * ```
     */
    type: 0 | 1;
    /**
     * ### Direction
     * 
     * The direction of the arc's startpoint.
     * 
     * You can use the `DIRECTION` enum to set this value.
     * 
     * Type: `cutDirection`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "d": cutDirection
     * ```
     */
    direction: cutDirection;
    /**
     * ### Multiplier
     * 
     * The multiplier of the arc's startpoint.
     * 
     * Type: `number`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "mu": number
     * ```
     */
    multiplier: number;
    /**
     * ### End Time
     * 
     * The time in beats at which the arc ends.
     * 
     * Type: `number`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "tb": number
     * ```
     */
    endTime: number;
    /**
     * ### End X
     * 
     * The line index of the arc's end point.
     * 
     * Type: `lineIndex`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "tx": lineIndex
     * ```
     */
    endX: lineIndex;
    /**
     * ### End Y
     * 
     * The line layer of the arc's end point.
     * 
     * Type: `lineLayer`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "ty": lineLayer
     * ```
     */
    endY: lineLayer;
    /**
     * ### End Direction
     * 
     * The direction of the arc's endpoint.
     * 
     * You can use the `DIRECTION` enum to set this value.
     * 
     * Type: `cutDirection`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "tc": cutDirection
     * ```
     */
    endDirection: cutDirection;
    /**
     * ### End Multiplier
     * 
     * The multiplier of the arc's endpoint.
     * 
     * Type: `number`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "tmu": number
     * ```
     */
    endMultiplier: number;
    /**
     * ### Anchor
     * 
     * The anchor type of the arc. (Straight/CW/CCW)
     * 
     * You can use the `ANCHOR` enum to set this value.
     * 
     * Type: `0 | 1 | 2`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "m": 0 | 1 | 2
     * ```
     */
    anchor: 0 | 1 | 2;
    /**
     * ### Custom Data
     * 
     * The custom data of the arc.
     * 
     * Type: `ICustomSliderData`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "_customData": ICustomSliderData
     * ```
     */
    customData: ICustomSliderData;
    /**
     * ### Animation
     * 
     * The animation data of the arc.
     * 
     * Type: `IObjectAnimation`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "_customData": { "_animation": IObjectAnimation }
     * ```
     */
    animation: IObjectAnimation;

    /**
     * Creates a new `Arc`.
     */
    constructor();
    /**
     * Creates a new `Arc` with the given properties.
     */
    constructor(arc: arcProperties);
    /**
     * Creates a new `Arc` with the given properties and custom data.
     */
    constructor(arc: arcProperties, data: ICustomSliderData);
    /**
     * Creates a new `Arc` with the given properties, custom data, and animation data.
     */
    constructor(arc: arcProperties, data: ICustomSliderData, anim: IObjectAnimation);
    constructor(arc?: arcProperties, data?: ICustomSliderData, anim?: IObjectAnimation) {
        this.time = 0;
        this.x = 0;
        this.y = 0;
        this.type = 0;
        this.direction = 0;
        this.multiplier = 1;
        this.endTime = 0;
        this.endX = 0;
        this.endY = 0;
        this.endDirection = 0;
        this.endMultiplier = 1;
        this.anchor = 0;
        this.customData = {};
        this.animation = {};	
        
        if (arc) {
            if (arc.time) this.time = arc.time;
            if (arc.x) this.x = arc.x;
            if (arc.y) this.y = arc.y;
            if (arc.type) this.type = arc.type;
            if (arc.direction) this.direction = arc.direction;
            if (arc.multiplier) this.multiplier = arc.multiplier;
            if (arc.endTime) this.endTime = arc.endTime;
            if (arc.endX) this.endX = arc.endX;
            if (arc.endY) this.endY = arc.endY;
            if (arc.endDirection) this.endDirection = arc.endDirection;
            if (arc.endMultiplier) this.endMultiplier = arc.endMultiplier;
            if (arc.anchor) this.anchor = arc.anchor;
            if (arc.customData) this.customData = arc.customData;
            if (arc.animation) this.animation = arc.animation;
        }

        if (data) this.customData = data;
        if (anim) this.animation = anim;

        return this;
    }

    push() : void {
        arcs.push(this);
    }
    
    duplicate(): Arc {
        const a = new Arc();
        Object.assign(a, JSON.parse(JSON.stringify(this)));
        return a;
    }
}