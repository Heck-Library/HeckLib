import { animateTrackData } from "../consts/types/animation";
import { events } from "../src/mapHandler";

export default class AnimateTrack {
    json: {
        time: number,
        type: "AnimateTrack",
        data: animateTrackData
    }
    constructor(time: number, eventData: animateTrackData) {
        this.json = {
            time: time,
            type: "AnimateTrack",
            data: eventData
        };
        return this;
    }

    //#region getters and setters
    set time(time: number) { this.json.time = time}
    get time(): number { return this.json.time; }

    get type(): string { return this.json.type; }

    set data(data: animateTrackData) { this.json.data = data; }
    get data(): animateTrackData { return this.json.data; }

    push() {
        events.push(this)
        return this;
    }
}