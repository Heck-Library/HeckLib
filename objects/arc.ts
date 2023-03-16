import { animationData, customNoteData } from "../consts/mod";
import { arcs } from "../map/initialize";

type direction = 0|1|2|3|4|5|6|7;
type arcData = {
    time: number,
    x?: number,
    y?: number,
    color?: 0 | 1;
    direction?: direction,
    multiplier?: number,
    endTime: number,
    endX?: number,
    endY?: number,
    endDirection?: direction,
    endMultiplier?: number,
    segments?: number,
    anchor?: 0 | 1 | 2,
}
interface IArc {
    a: arcData,
    cD: customNoteData,
    aD: animationData
}

export default class Arc {
    static Anchor : Record <string, 0 | 1 | 2> = {
        Straight: 0,
        CW: 1,
        CCW: 2
    }
    static Direction : Record <string, direction> = {
        Up: 0,
        Down: 1,
        Left: 2,
        Right: 3,
        UpLeft: 4,
        UpRight: 5,
        DownLeft: 6,
        DownRight: 7	
    }
    private json: IArc
    constructor(arcData: arcData, customData?: customNoteData, animationData?: animationData) {
        let cData = {};
        let aData = {};
        if (customData) cData = customData;
        if (animationData) aData = animationData;
        this.json = {
            a: arcData,
            cD: cData,
            aD: aData
        };
        const c = this.json.a;
        const d = arcData;

        if (customData) this.json.cD = customData;
        if (animationData) this.json.aD = animationData;

        if (!d.color) c.color = 0;
        if (!d.direction) c.direction = 0;
        if (!d.multiplier) c.multiplier = 1;
        if (!d.endX) c.endX = 0;
        if (!d.endY) c.endY = 0;
        if (!d.endDirection) c.endMultiplier = 0;
        if (!d.endMultiplier) c.endMultiplier = 1;
        if (!d.segments) c.segments = 2;
        if (!d.anchor) c.anchor = 0;
        if (!d.x) c.x = 0;
        if (!d.y) c.y = 0;

        return this;
    }
    set color(color: 0 | 1) { this.json.a.color = color; }
    get color(): 0 | 1 { return this.json.a.color; }

    set direction(direction: direction) { this.json.a.direction = direction; }
    get direction(): direction { return this.json.a.direction; }

    set endTime(endTime: number) { if (endTime < this.json.a.time) throw new Error("endTime cannot be smaller than time."); this.json.a.endTime = endTime; }
    get endTime(): number { return this.json.a.endTime; }

    set endX(endX: number) { this.json.a.endX = endX; }
    get endX(): number { return this.json.a.endX; }

    set endY(endY: number) { this.json.a.endY = endY; }
    get endY(): number { return this.json.a.endY; }

    set segments(segments: number) { this.json.a.segments = segments; }
    get segments(): number { return this.json.a.segments; }

    set anchor(anchor: 0 | 1 | 2) { this.json.a.anchor = anchor; }
    get anchor(): 0 | 1 | 2 { return this.json.a.anchor; }

    set x(x: number) { this.json.a.x = x; }
    get x(): number { return this.json.a.x; }

    set y(y: number) { this.json.a.y = y; }
    get y(): number { return this.json.a.y; }
    
    set time(time: number) { this.json.a.time = time; }
    get time(): number { return this.json.a.time; }

    set data(data: customNoteData) { this.json.cD = data; }
    get data(): customNoteData { return this.json.cD; }
    
    set anim(anim: animationData) { this.json.aD = anim; }
    get anim(): animationData { return this.json.aD; }

    push() {
        arcs.push(this);
        return this;
    }
}