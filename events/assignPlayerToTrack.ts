import { playerTrackType } from "../consts/types/animation.ts";
import { Track } from "../consts/types/objects.ts";
import { events } from "../src/mapHandler.ts";

export default class AssignPlayerToTrack {
    json: {
        time: number
        type: "AssignPlayerToTrack"
        data: playerTrackType
    }

    constructor(time: number, track: Track) {
        this.json = {
            time: time,
            type: "AssignPlayerToTrack",
            data: {
                track: track
            }
        }
    }

    set time(time: number) { this.json.time = time; }
    get time(): number { return this.json.time; }

    get type(): string { return this.json.type; }

    set data(data: playerTrackType) { this.json.data = data; }
    get data(): playerTrackType { return this.json.data; }

    push() {
        events.push(this)
        return this;
    }
}