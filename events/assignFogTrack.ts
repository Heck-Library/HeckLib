import { fogTrackData } from "../consts/types/animation";
import { Track } from "../consts/types/objects";
import { events } from "../map/initialize";

export default class AssignFogTrack {
    private json: { time: number; type: "AssignFogTrack"; data: fogTrackData };
    /**
     * Assigns the track for the fog
     * ```ts
     * new AssignFogTrack(0, 'fogTrack').push();
     * ```
     */
    constructor(time: number, track: Track) {
        this.json = {
            time: time,
            type: "AssignFogTrack",
            data: {
                track: track
            }
        }
    }
    set time(time: number) { this.json.time = time; }
    get time(): number { return this.json.time; }

    get type(): string { return this.json.type; }

    set data(data: fogTrackData) { this.json.data = data; }
    get data(): fogTrackData { return this.json.data; }
    
    push() {
        events .push(this);
        return this;
    }
}