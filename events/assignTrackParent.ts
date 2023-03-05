import { parentTrackType } from "../consts/types/animation";
import BaseEvent from "./baseEvent";

export default class AssignTrackParent extends BaseEvent{
    declare json: {
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
        super()
        this.json = {
            time: time,
            type: "AssignTrackParent",
            data: eventData
        }
    }
}