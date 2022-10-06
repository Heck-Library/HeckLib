




export const Spline = "splineCatmullRom";

export const mapDir = "./temp/map"

export class Ease {
    static In = {
        Sine : "easeInSine",
        Cubic : "easeInCubic",
        Quint : "easeInQuint",
        Circ : "easeInCirc",
        Elastic : "easeInElastic",
        Quad : "easeInQuad",
        Quart : "easeInQuart",
        SinExpo : "easeInExpo",
        Back : "easeInBack",
        Bounce : "easeInBounce"
    }
    static Out = {
        Sine : "easeOutSine",
        Cubic : "easeOutCubic",
        Quint : "easeOutQuint",
        Circ : "easeOutCirc",
        Elastic : "easeOutElastic",
        Quad : "easeOutQuad",
        Quart : "easeOutQuart",
        SinExpo : "easeOutExpo",
        Back : "easeOutBack",
        Bounce : "easeOutBounce"
    }
    static InOut = {
        Sine : "easeInOutSine",
        Cubic : "easeInOutCubic",
        Quint : "easeInOutQuint",
        Circ : "easeInOutCirc",
        Elastic : "easeInOutElastic",
        Quad : "easeInOutQuad",
        Quart : "easeInOutQuart",       
        SinExpo : "easeInOutExpo",
        Back : "easeInOutBack",
        Bounce : "easeInOutBounce"
    }
    static step = "easeStep"
}

export class Note {
    static Type = {
        Red: 0,
        Blue: 1,
        Bomb: 3
    }
    static Direction = {
        Up: 0,
        Down: 1,
        Left: 2,
        Right: 3,
        UpL: 4,
        UpR: 5,
        DownL: 6,
        DownR: 7,
        Dot: 8
    }
}

export class Wall {
    static Type = {
        Full: 0,
        Crouch: 1
    }
}