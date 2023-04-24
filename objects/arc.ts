import IObjectAnimation from "../interfaces/customData/animationData";
import ICustomData from "../interfaces/customData/customNoteData";
import ICustomSliderData from "../interfaces/customData/customSliderData";
import IArc from "../interfaces/objects/arc";
import { arcs } from "../map/variables";
import cutDirection from "../types/cutDirection";
import lineIndex from "../types/lineIndex";
import lineLayer from "../types/lineLayer";

interface arcProperties {
    /**
     * ### Time
     * 
     * The time in beats at which the arc starts.
     */
    time: number;
    /**
     * ### X
     * 
     * The line index of the arc's start point.
     */
    x?: lineIndex;
    /**
     * ### Y
     * 
     * The line layer of the arc's start point.
     */
    y?: lineLayer;
    /**
     * ### Type
     * 
     * The type of the arc. (Red/Blue)
     */
    type?: 0 | 1;
    /**
     * ### Direction
     * 
     * The direction of the arc's startpoint.
     * 
     * You can use the `DIRECTION` enum to set this value.
     */
    direction?: cutDirection;
    /**
     * ### Multiplier
     * 
     * The multiplier of the arc's startpoint.
     * 
     * You can use the `MULTIPLIER` enum to set this value.
     */
    multiplier?: number;
    /**
     * ### End Time
     * 
     * The time in beats at which the arc ends.
     */
    endTime: number;
    /**
     * ### End X
     * 
     * The line index of the arc's end point.
     */
    endX?: lineIndex;
    /**
     * ### End Y
     * 
     * The line layer of the arc's end point.
     */
    endY?: lineLayer;
    /**
     * ### End Direction
     * 
     * The direction of the arc's endpoint.
     * 
     * You can use the `DIRECTION` enum to set this value.
     */
    endDirection?: cutDirection;
    /**
     * ### End Multiplier
     * 
     * The multiplier of the arc's endpoint.
     * 
     * You can use the `MULTIPLIER` enum to set this value.
     */
    endMultiplier?: number;
    /**
     * ### Anchor
     * 
     * The anchor type of the arc. (Straight/CW/CCW)
     * 
     * You can use the `ANCHOR` enum to set this value.
     */
    anchor?: 0 | 1 | 2;
    /**
     * ### Custom Data
     * 
     * The custom data of the arc.
     */
    customData?: ICustomSliderData;
    /**
     * ### Animation
     * 
     * The animation data of the arc.
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
     */
    time: number;
    /**
     * ### X
     * 
     * The line index of the arc's start point.
     */
    x: lineIndex;
    /**
     * ### Y
     * 
     * The line layer of the arc's start point.
     */
    y: lineLayer;
    /**
     * ### Type
     * 
     * The type of the arc. (Red/Blue)
     */
    type: 0 | 1;
    /**
     * ### Direction
     * 
     * The direction of the arc's startpoint.
     * 
     * You can use the `DIRECTION` enum to set this value.
     */
    direction: cutDirection;
    /**
     * ### Multiplier
     * 
     * The multiplier of the arc's startpoint.
     * 
     * You can use the `MULTIPLIER` enum to set this value.
     */
    multiplier: number;
    /**
     * ### End Time
     * 
     * The time in beats at which the arc ends.
     */
    endTime: number;
    /**
     * ### End X
     * 
     * The line index of the arc's end point.
     */
    endX: lineIndex;
    /**
     * ### End Y
     * 
     * The line layer of the arc's end point.
     */
    endY: lineLayer;
    /**
     * ### End Direction
     * 
     * The direction of the arc's endpoint.
     * 
     * You can use the `DIRECTION` enum to set this value.
     */
    endDirection: cutDirection;
    /**
     * ### End Multiplier
     * 
     * The multiplier of the arc's endpoint.
     * 
     * You can use the `MULTIPLIER` enum to set this value.
     */
    endMultiplier: number;
    /**
     * ### Anchor
     * 
     * The anchor type of the arc. (Straight/CW/CCW)
     * 
     * You can use the `ANCHOR` enum to set this value.
     */
    anchor: 0 | 1 | 2;
    /**
     * ### Custom Data
     * 
     * The custom data of the arc.
     */
    customData: ICustomSliderData;
    /**
     * ### Animation
     * 
     * The animation data of the arc.
     */
    animation: IObjectAnimation;

    constructor();
    constructor(arc: arcProperties);
    constructor(arc: arcProperties, data: ICustomSliderData);
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
}