import { playerTrackType } from "../consts/types/animation";
import { Track } from "../consts/types/objects";
import { events } from "../map/initialize";

export default class AssignPlayerToTrack {
    private json: {
        time: number
        type: "AssignPlayerToTrack"
        data: playerTrackType
    }
    /**
     * Creates an AssignPlayerToTrack event.
     * ```ts
     * new AssignPlayerToTrack(0, "playerTrack").push();
     * ```
     */
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
        events.push(this);
        return this;
    }
}