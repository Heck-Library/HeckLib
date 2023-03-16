import { animationData, customNoteData } from "../consts/mod";
import { chains } from "../map/initialize";

type direction = 0|1|2|3|4|5|6|7;
type chainData = {
    time: number,
    x?: number,
    y?: number,
    color?: 0 | 1;
    direction?: direction,
    endTime?: number,
    endX?: number,
    endY?: number,
    segments?: number,
    squish?: number
}
interface IChain {
    c: chainData,
    cD: customNoteData,
    aD: animationData
}

export default class Chain {
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
    private json: IChain
    constructor(chainData: chainData, customData?: customNoteData, animationData?: animationData) {
        let cData = {};
        let aData = {};
        if (customData) cData = customData;
        if (animationData) aData = animationData;
        this.json = {
            c: chainData,
            cD: cData,
            aD: aData
        };
        const c = this.json.c;
        const d = chainData;

        if (customData) this.json.cD = customData;
        if (animationData) this.json.aD = animationData;

        if (!d.color) c.color = 0;
        if (!d.direction) c.direction = 0;
        if (!d.endX) c.endX = 0;
        if (!d.endY) c.endY = 0;
        if (!d.endTime) c.endTime = d.time + 0.25;
        if (!d.segments) c.segments = 2;
        if (!d.squish) c.squish = 0.5;
        if (!d.x) c.x = 0;
        if (!d.y) c.y = 0;

        return this;
    }
    set color(color: 0 | 1) { this.json.c.color = color; }
    get color(): 0 | 1 { return this.json.c.color; }

    set direction(direction: direction) { this.json.c.direction = direction; }
    get direction(): direction { return this.json.c.direction; }

    set endTime(endTime: number) { if (endTime < this.json.c.time) throw new Error("endTime cannot be smaller than time."); this.json.c.endTime = endTime; }
    get endTime(): number { return this.json.c.endTime; }

    set endX(endX: number) { this.json.c.endX = endX; }
    get endX(): number { return this.json.c.endX; }

    set endY(endY: number) { this.json.c.endY = endY; }
    get endY(): number { return this.json.c.endY; }

    set segments(segments: number) { this.json.c.segments = segments; }
    get segments(): number { return this.json.c.segments; }

    set squish(squish: number) { this.json.c.squish = squish; }
    get squish(): number { return this.json.c.squish; }

    set x(x: number) { this.json.c.x = x; }
    get x(): number { return this.json.c.x; }

    set y(y: number) { this.json.c.y = y; }
    get y(): number { return this.json.c.y; }
    
    set time(time: number) { this.json.c.time = time; }
    get time(): number { return this.json.c.time; }

    set data(data: customNoteData) { this.json.cD = data; }
    get data(): customNoteData { return this.json.cD; }
    
    set anim(anim: animationData) { this.json.aD = anim; }
    get anim(): animationData { return this.json.aD; }

    push() {
        chains.push(this);
        return this;
    }
}