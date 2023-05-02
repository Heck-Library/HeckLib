import IObjectAnimation from "../interfaces/customData/animationData";
import ICustomData from "../interfaces/customData/customNoteData";
import ICustomSliderData from "../interfaces/customData/customSliderData";
import IChain from "../interfaces/objects/chain";
import { chains } from "../map/variables";
import cutDirection from "../types/cutDirection";

interface IChainProperties {
    /**
     * ### Time
     * 
     * The time in beats at which the chain starts.
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
     * An integer number, from 0 to 3, which represents the column where the head of the chain is located. The far left column is located at index 0, and increases to the far right column located at index 3.
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
    x?: number;
    /**
     * ### Y
     * 
     * An integer number, from 0 to 2, which represents the layer where the head of the chain is located. The bottommost layer is located at layer 0, and inceases to the topmost layer located at index 2.
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
    y?: number;
    /**
     * ### Type
     * 
     * The type of the chain. (Red/Blue)
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
     * An integer number which represents the head direction of the chain.
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
     * ### End Time
     * 
     * The time in beats at which the chain ends.
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
     * An integer number, from 0 to 3, which represents the column where the tail of the chain is located. The far left column is located at index 0, and increases to the far right column located at index 3.
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
    endX?: number;
    /**
     * ### End Y
     * 
     * An integer number, from 0 to 2, which represents the layer where the tail of the chain is located. The bottommost layer is located at layer 0, and inceases to the topmost layer located at index 2.
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
    endY?: number;
    /**
     * ### Segments
     * 
     * An integer number, greater than 0, which represents the number of segments in the burst slider. The head counts as a segment.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "sc": number }
     * ```
     */
    segments?: number;
    /**
     * ### Squish
     * 
     * A float which represents squish factor. This is the proportion of how much of the path from (x,y) to (endX, endY) is used by the chain. This does not alter the shape of the path. Values greater than 1 will extend the path beyond the specified end point.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "s": number }
     * ```
     */
    squish?: number;
    /**
     * ### Custom Data
     * 
     * A custom data object which can be used to store custom data.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "customData": object }
     * ```
     */
    customData?: ICustomData;
    /**
     * ### Animation
     * 
     * An object which contains animation data. This will go under the `customData` object in the JSON file.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "customData": { "animation": object }
     * ```
     */
    animation?: IObjectAnimation;
}

enum TYPE {
    RED,
    BLUE
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

export default class Chain implements IChain {

    public static readonly TYPE = TYPE;

    public static readonly DIRECTION = DIRECTION;

    public static readonly LINE_INDEX = LINE_INDEX;

    public static readonly LINE_LAYER = LINE_LAYER;

    /**
     * ### Time
     * 
     * The time in beats at which the chain starts.
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
     * An integer number, from 0 to 3, which represents the column where the head of the chain is located. The far left column is located at index 0, and increases to the far right column located at index 3.
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
    x: number;
    /**
     * ### Y
     * 
     * An integer number, from 0 to 2, which represents the layer where the head of the chain is located. The bottommost layer is located at layer 0, and inceases to the topmost layer located at index 2.
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
    y: number;
    /**
     * ### Type
     * 
     * The type of the chain. (Red/Blue)
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
    type: 0 | 1;
    /**
     * ### Direction
     * 
     * An integer number which represents the head direction of the chain.
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
    direction: cutDirection;
    /**
     * ### End Time
     * 
     * The time in beats at which the chain ends.
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
     * An integer number, from 0 to 3, which represents the column where the tail of the chain is located. The far left column is located at index 0, and increases to the far right column located at index 3.
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
    endX: number;
    /**
     * ### End Y
     * 
     * An integer number, from 0 to 2, which represents the layer where the tail of the chain is located. The bottommost layer is located at layer 0, and inceases to the topmost layer located at index 2.
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
    endY: number;
    /**
     * ### Segments
     * 
     * An integer number, greater than 0, which represents the number of segments in the burst slider. The head counts as a segment.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "sc": number }
     * ```
     */
    segments: number;
    /**
     * ### Squish
     * 
     * A float which represents squish factor. This is the proportion of how much of the path from (x,y) to (endX, endY) is used by the chain. This does not alter the shape of the path. Values greater than 1 will extend the path beyond the specified end point.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "s": number }
     * ```
     */
    squish: number;
    /**
     * ### Custom Data
     * 
     * A custom data object which can be used to store custom data.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "customData": object }
     * ```
     */
    customData: ICustomData;
    /**
     * ### Animation
     * 
     * An object which contains animation data. This will go under the `customData` object in the JSON file.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "customData": { "animation": object }
     * ```
     */
    animation: IObjectAnimation;

    /**
     * ### Chain
     * 
     * Creates a new chain object using a time value.
     */
    constructor(chain: number);
    /**
     * ### Chain
     * 
     * Creates a new chain object using given parametets.
     */
    constructor(chain: IChainProperties);
    /**
     * ### Chain
     * 
     * Creates a new chain object using given parametets and custom data.
     */
    constructor(chain: IChainProperties, data: ICustomSliderData);
    /**
     * ### Chain
     * 
     * Creates a new chain object using given parametets, custom data and animation data.
     */
    constructor(chain: IChainProperties, data: ICustomSliderData, anim: IObjectAnimation);
    constructor(chain?: IChainProperties | number, data?: ICustomData, anim?: IObjectAnimation) {
        this.time = 0;
        this.x = 0;
        this.y = 0;
        this.type = 0;
        this.direction = 0;
        this.endTime = 0;
        this.endX = 0;
        this.endY = 0;
        this.segments = 0;
        this.squish = 0;
        this.customData = {};
        this.animation = {};

        if (chain) {
            if (typeof chain === "number") {
                this.time = chain;
                return this;
            }
            if (chain.time) this.time = chain.time;
            if (chain.x) this.x = chain.x;
            if (chain.y) this.y = chain.y;
            if (chain.type) this.type = chain.type;
            if (chain.direction) this.direction = chain.direction;
            if (chain.endTime) this.endTime = chain.endTime;
            if (chain.endX) this.endX = chain.endX;
            if (chain.endY) this.endY = chain.endY;
            if (chain.segments) this.segments = chain.segments;
            if (chain.squish) this.squish = chain.squish;
            if (chain.customData) this.customData = chain.customData;
            if (chain.animation) this.animation = chain.animation;
        }

        if (data) this.customData = data;
        if (anim) this.animation = anim;

        return this;
    }

    push() : void {
        chains.push(this);
    }
}