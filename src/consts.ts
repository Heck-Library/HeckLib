




export const Spline = "splineCatmullRom";

export const mapDir = "./temp/map"

export const notes = "note";
export const walls = "wall";
export const events = "event";


export namespace Ease {
    export enum In {
        Sine = "easeInSine",
        Cubic = "easeInCubic",
        Quint = "easeInQuint",
        Circ = "easeInCirc",
        Elastic = "easeInElastic",
        Quad = "easeInQuad",
        Quart = "easeInQuart",
        SinExpo = "easeInExpo",
        Back = "easeInBack",
        Bounce = "easeInBounce"
    }
    export enum Out {
        Sine = "easeOutSine",
        Cubic = "easeOutCubic",
        Quint = "easeOutQuint",
        Circ = "easeOutCirc",
        Elastic = "easeOutElastic",
        Quad = "easeOutQuad",
        Quart = "easeOutQuart",
        SinExpo = "easeOutExpo",
        Back = "easeOutBack",
        Bounce = "easeOutBounce"
    }
    export enum InOut {
        Sine = "easeInOutSine",
        Cubic = "easeInOutCubic",
        Quint = "easeInOutQuint",
        Circ = "easeInOutCirc",
        Elastic = "easeInOutElastic",
        Quad = "easeInOutQuad",
        Quart = "easeInOutQuart",       
        SinExpo = "easeInOutExpo",
        Back = "easeInOutBack",
        Bounce = "easeInOutBounce"
    }
    export const Step = "easeStep"
}

export namespace ObjectProp {
    export namespace Note {
        export enum Type {
            Red = 0,
            Blue = 1,
            Bomb = 3
        }
        export enum Direction {
            Up = 0,
            Down = 1,
            Left = 2,
            Right = 3,
            UpL = 4,
            UpR = 5,
            DownL = 6,
            DownR = 7,
            Dot = 8
        }
    }
    export namespace Wall {
        export enum Type {
            Full = 0,
            Crouch = 1
        }
    }
}