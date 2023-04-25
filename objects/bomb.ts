
import IObjectAnimation from "../interfaces/customData/animationData";
import ICustomData from "../interfaces/customData/customNoteData";
import IBomb from "../interfaces/objects/bomb";
import lineIndex from "../types/lineIndex";
import lineLayer from "../types/lineLayer";

type bombProperties = {
    /**
     * ### Time
     * 
     * The time in beats at which the bomb is placed.
     */
    time: number;
    /**
     * ### X
     * 
     * The line index of the bomb.
     * 
     * You can use the `LINE_INDEX` enum to set this value.
     */
    x?: lineIndex;
    /**
     * ### Y
     * 
     * The line layer of the bomb.
     * 
     * You can use the `LINE_LAYER` enum to set this value.
     */
    y?: lineLayer;
    /**
     * ### Custom Data
     * 
     * Custom data for the bomb.
     */
    data?: ICustomData;
    /**
     * ### Animation
     * 
     * Animation data for the bomb.
     */
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