import { animateTrackData } from "../consts/types/animation";
import BaseEvent from "./baseEvent";

export default class AnimateTrack extends BaseEvent {
    declare json: { time: number; type: "AnimateTrack"; data: animateTrackData; };
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