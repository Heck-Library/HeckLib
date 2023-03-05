import { playerTrackType } from "../consts/types/animation";
import { Track } from "../consts/types/objects";
import BaseEvent from "./baseEvent";

export default class AssignPlayerToTrack extends BaseEvent{
    declare json: {
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
        super()
        this.json = {
            time: time,
            type: "AssignPlayerToTrack",
            data: {
                track: track
            }
        }
    }
}