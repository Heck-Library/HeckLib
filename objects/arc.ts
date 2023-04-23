import IObjectAnimation from "../interfaces/customData/animationData";
import ICustomData from "../interfaces/customData/customNoteData";
import IArc from "../interfaces/objects/arc";
import { arcs } from "../map/variables";
import cutDirection from "../types/cutDirection";
import lineIndex from "../types/lineIndex";
import lineLayer from "../types/lineLayer";

type arcProperties = {
    time: number;
    x?: lineIndex;
    y?: lineLayer;
    type?: 0 | 1;
    direction?: cutDirection;
    multiplier?: number;
    endTime: number;
    endX?: lineIndex;
    endY?: lineLayer;
    endDirection?: cutDirection;
    endMultiplier?: number;
    anchor?: 0 | 1 | 2;
    data?: ICustomData;
    anim?: IObjectAnimation;
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
    DOT = 8
}

enum TYPE {
    RED = 0,
    BLUE = 1
}

enum ANCHOR {
    STRAIGHT = 0,
    CW = 1,
    CCW = 2
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

export default class Arc implements IArc {

    public static readonly DIRECTION = DIRECTION;

    public static readonly TYPE = TYPE;

    public static readonly ANCHOR = ANCHOR;

    public static readonly LINE_INDEX = LINE_INDEX;

    public static readonly LINE_LAYER = LINE_LAYER;

    time: number;
    x: lineIndex;
    y: lineLayer;
    type: 0 | 1;
    direction: cutDirection;
    multiplier: number;
    endTime: number;
    endX: lineIndex;
    endY: lineLayer;
    endDirection: cutDirection;
    endMultiplier: number;
    anchor: 0 | 1 | 2;
    data: ICustomData;
    anim: IObjectAnimation;

    constructor();
    constructor(arc: number);
    constructor(arc: arcProperties);
    constructor(arc: arcProperties, data: ICustomData);
    constructor(arc: arcProperties, data: ICustomData, anim: IObjectAnimation);
    constructor(arc?: arcProperties | number, data?: ICustomData, anim?: IObjectAnimation) {
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
        this.data = {};
        this.anim = {};	
        
        if (arc) {
            if (typeof arc === "number") {
                this.time = arc;
                return this;
            }
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
            if (arc.data) this.data = arc.data;
            if (arc.anim) this.anim = arc.anim;
        }

        if (data) this.data = data;
        if (anim) this.anim = anim;

        return this;
    }

    push() : void {
        arcs.push(this);
    }
}