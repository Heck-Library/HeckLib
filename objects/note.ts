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

    public static readonly TYPE = TYPE;
    
    public static readonly DIRECTION = DIRECTION;

    public static readonly LINE_INDEX = LINE_INDEX;

    public static readonly LINE_LAYER = LINE_LAYER;

    public time: number;
    public x: lineIndex;
    public y: lineLayer;
    public type: noteType;
    public angle: number;
    public direction: cutDirection;
    public customData: ICustomData;
    public animation: IObjectAnimation;

    constructor();
    constructor(note: number);
    constructor(note: v3noteProperties);
    constructor(note: v3noteProperties, data: v3customData);
    constructor(note: v3noteProperties, data: v3customData, anim: v3objectAnimation);
    constructor(note: noteProperties);
    constructor(note: noteProperties, data: ICustomData);
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