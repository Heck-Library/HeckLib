import { animateTrackData } from "../consts/types/animation";
import { events } from "../map/initialize";
export default class AnimateTrack {
    private json: { time: number; type: string; data: any;};
    /**
     * Creates an AnimateTrack event.
     * ```ts
     * new AnimateTrack(0, {
     *     track: "foo",
     *     duration: 1,
     *     dissolve: [
     *         [1, 0],
     *         [0, 1]
     *     ]
     * }).push();
     * ```
     */
    constructor(time: number, eventData: animateTrackData) {
        this.json = {
            time: time,
            type: "AnimateTrack",
            data: eventData
        }
        return this;
    }
    set time(time: number) { this.json.time = time; }
    get time(): number { return this.json.time; }

    get type(): string { return this.json.type; }

    set data(data: animateTrackData) { this.json.data = data; }
    get data(): animateTrackData { return this.json.data; }
    
    push() {
        events.push(this);
        return this;
    }
}