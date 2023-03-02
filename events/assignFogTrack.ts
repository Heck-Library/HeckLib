import { events, fogTrackData, Track } from "../mod";

export default class AssignFogTrack {
    json: {
        time: number
        type: string
        data: fogTrackData
    };
    constructor(time: number, track: Track) {
        this.json = {
            time: time,
            type: "AssignPathAnimation",
            data: {
                track: track
            }
        }
    }
    set time(time: number) { this.json.time = time}
    get time(): number { return this.json.time; }

    get type(): string { return this.json.type; }

    set data(data: fogTrackData) { this.json.data = data; }
    get data(): fogTrackData { return this.json.data; }

    push() {
        events.push(this)
        return this;
    }
}