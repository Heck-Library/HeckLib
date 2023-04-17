import IObjectAnimation from "../interfaces/customData/animationData";
import ICustomData from "../interfaces/customData/customData";
import IWall from "../interfaces/objects/wall";
import { walls } from "../map/initialize";
import lineIndex from "../types/lineIndex";
import lineLayer from "../types/lineLayer";

type wallProperties = {
    time: number;
    x?: lineIndex;
    y?: lineLayer;
    duration?: number;
    width?: number;
    height?: number;
    data?: ICustomData;
    anim?: IObjectAnimation;
};

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

export default class Wall implements IWall {

    public static readonly LINE_INDEX = LINE_INDEX;

    public static readonly LINE_LAYER = LINE_LAYER;

    time: number;
    x: lineIndex;
    y: lineLayer;
    duration: number;
    width: number;
    height: number;
    data: ICustomData;
    anim: IObjectAnimation;

    constructor();
    constructor(wall: number);
    constructor(wall: wallProperties);
    constructor(wall: wallProperties, data: ICustomData);
    constructor(wall: wallProperties, data: ICustomData, anim: IObjectAnimation);
    constructor(wall?: wallProperties | number) {
        this.time = 0;
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
            if (wall.data) this.data = wall.data;
            if (wall.anim) this.anim = wall.anim;
        }
        return this;
    }

    push() : void {
        walls.push(this);
    }
}