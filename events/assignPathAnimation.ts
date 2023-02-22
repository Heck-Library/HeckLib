import { pathAnimData } from "../consts/types/animation.ts";
import { events } from "../src/mapHandler.ts";

export default class AssignPathAnimation {
    json: {
        time: number
        type: string
        data: pathAnimData
    };
    constructor(time: number, eventData: pathAnimData) {
        this.json = {
            time: time,
            type: "AssignPathAnimation",
            data: eventData
        }
    }
    set time(time: number) { this.json.time = time}
    get time(): number { return this.json.time; }

    get type(): string { return this.json.type; }

    set data(data: pathAnimData) { this.json.data = data; }
    get data(): pathAnimData { return this.json.data; }

    push() {
        events.push(this)
        return this;
    }
}