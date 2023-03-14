import { parentTrackType } from "../consts/types/animation";
import { events } from "../map/initialize";

export default class AssignTrackParent{
    private json: {
        time: number
        type: "AssignTrackParent"
        data: parentTrackType
    }
    /**
     * Creates an AssignTrackParent event.
     * ```ts
     * new AssignTrackParent(0, {
     *     parentTrack: "parent",
     *     childrenTrack: [
     *         "track1",
     *         "track2",
     *         "track3"
     *     ]
     * }).push();
     * ```
     */
    constructor(time: number, eventData: parentTrackType) {
        this.json = {
            time: time,
            type: "AssignTrackParent",
            data: eventData
        }
    }
    set time(time: number) { this.json.time = time; }
    get time(): number { return this.json.time; }

    get type(): string { return this.json.type; }

    set data(data: parentTrackType) { this.json.data = data; }
    get data(): parentTrackType { return this.json.data; }
    
    push() {
        events.push(this);
        return this;
    }
}