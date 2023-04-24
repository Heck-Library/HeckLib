import IObjectAnimation from "../interfaces/customData/animationData";
import ICustomData from "../interfaces/customData/customNoteData";
import IChain from "../interfaces/objects/chain";
import { chains } from "../map/variables";
import cutDirection from "../types/cutDirection";

type chainProperties = {
    time: number;
    x?: number;
    y?: number;
    type?: 0 | 1;
    direction?: cutDirection;
    endTime: number;
    endX?: number;
    endY?: number;
    segments?: number;
    squish?: number;
    data?: ICustomData;
    anim?: IObjectAnimation;
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

    public time: number;
    public x: number;
    public y: number;
    public type: 0 | 1;
    public direction: cutDirection;
    public endTime: number;
    public endX: number;
    public endY: number;
    public segments: number;
    public squish: number;
    public data: ICustomData;
    public anim: IObjectAnimation;

    constructor();
    constructor(chain: number);
    constructor(chain: chainProperties);
    constructor(chain: chainProperties, data: ICustomData);
    constructor(chain: chainProperties, data: ICustomData, anim: IObjectAnimation);
    constructor(chain?: chainProperties | number, data?: ICustomData, anim?: IObjectAnimation) {
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
        this.data = {};
        this.anim = {};

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
            if (chain.data) this.data = chain.data;
            if (chain.anim) this.anim = chain.anim;
        }

        if (data) this.data = data;
        if (anim) this.anim = anim;

        return this;
    }

    push() : void {
        chains.push(this);
    }
}