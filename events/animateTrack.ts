import { animateTrackData } from "../consts/types/animation";
import BaseEvent from "./baseEvent";
export default class AnimateTrack extends BaseEvent {
    declare json: { time: number; type: "AnimateTrack"; data: animateTrackData; };
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
        super();
        this.json = {
            time: time,
            type: "AnimateTrack",
            data: eventData
        }
        return this;
    }
}