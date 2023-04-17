import IObjectAnimation from "../interfaces/customData/animationData";
import ICustomData from "../interfaces/customData/customData";
import INote from "../interfaces/objects/note";
import { notes } from "../map/initialize";
import cutDirection from "../types/cutDirection";
import lineIndex from "../types/lineIndex";
import lineLayer from "../types/lineLayer";
import noteType from "../types/noteType";

type noteProperties = {
    time: number;
    x?: lineIndex;
    y?: lineLayer;
    type?: noteType;
    direction?: cutDirection;
    angle?: number;
    data?: ICustomData;
    anim?: IObjectAnimation;
};

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
    public data: ICustomData;
    public anim: IObjectAnimation;

    constructor();
    constructor(note: number);
    constructor(note: noteProperties);
    constructor(note: noteProperties, data: ICustomData);
    constructor(note: noteProperties, data: ICustomData, anim: IObjectAnimation);
    constructor(note?: noteProperties | number) {
        this.time = 0;
        this.x = 0;
        this.y = 0;
        this.type = 0;
        this.direction = 0;
        this.angle = 0;
        this.data = {};
        this.anim = {};
        if (note) {
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
            if (note.data) this.data = note.data;
            if (note.anim) this.anim = note.anim;
        }
        return this;
    }

    push() {
        notes.push(this);
    }
}