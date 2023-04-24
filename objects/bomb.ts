
import IObjectAnimation from "../interfaces/customData/animationData";
import ICustomData from "../interfaces/customData/customNoteData";
import IBomb from "../interfaces/objects/bomb";
import lineIndex from "../types/lineIndex";
import lineLayer from "../types/lineLayer";

type bombProperties = {
    time: number;
    x?: lineIndex;
    y?: lineLayer;
    data?: ICustomData;
    anim?: IObjectAnimation;
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

export default class Bomb implements IBomb {

    public static readonly LINE_INDEX = LINE_INDEX;

    public static readonly LINE_LAYER = LINE_LAYER;

    public time: number;
    public x: lineIndex;
    public y: lineLayer;
    public data: ICustomData;
    public anim: IObjectAnimation;

    constructor();
    constructor(bomb: number);
    constructor(bomb: bombProperties);
    constructor(bomb: bombProperties, data: ICustomData);
    constructor(bomb: bombProperties, data: ICustomData, anim: IObjectAnimation);
    constructor(bomb?: bombProperties | number, data?: ICustomData, anim?: IObjectAnimation) {
        this.time = 0;
        this.x = 0;
        this.y = 0;
        this.data = {};
        this.anim = {};
        if (bomb) {
            if (typeof bomb === "number") {
                this.time = bomb;
                return this;
            }
            if (bomb.time) this.time = bomb.time;
            if (bomb.x) this.x = bomb.x;
            if (bomb.y) this.y = bomb.y;
            if (bomb.data) this.data = bomb.data;
            if (bomb.anim) this.anim = bomb.anim;
        }
        if (data) this.data = data;
        if (anim) this.anim = anim;
        return this;
    }

    push() {
        // bombs.push(this);
    }
}