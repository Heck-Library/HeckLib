import { animComponentData } from "../consts/types/animation.ts";
import { V3 } from "../src/mapHandler.ts";

export default class AnimateComponent {
    json: {
        time: number,
        type: "AnimateComponent",
        data: animComponentData
    }
    constructor(time: number, eventData: animComponentData) {
        if (!V3) throw new Error('AnimateComponent is a V3 feature');
        this.json = {
            time: time,
            type: "AnimateComponent",
            data: eventData
        }
    }
    set time(time: number) { this.json.time = time; }
    get time(): number { return this.json.time; }

    get type(): string { return this.type; }

    set data(data: animComponentData) { this.json.data = data; }
    get data(): animComponentData { return this.json.data;}
}