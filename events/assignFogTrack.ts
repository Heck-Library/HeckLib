import { fogTrackData } from "../consts/types/animation";
import { Track } from "../consts/types/objects";
import BaseEvent from "./baseEvent";

export default class AssignFogTrack extends BaseEvent {
    declare json: { time: number; type: "AssignFogTrack"; data: fogTrackData };
    /**
     * Assigns the track for the fog
     * ```ts
     * new AssignFogTrack(0, 'fogTrack').push();
     * ```
     */
    constructor(time: number, track: Track) {
        super()
        this.json = {
            time: time,
            type: "AssignFogTrack",
            data: {
                track: track
            }
        }
    }
}