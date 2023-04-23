import IAnimateTrackData from "../interfaces/events/eventData/IAnimateTrackData";
import { MyBaseEvent } from "./baseEvent";

export default class AnimateTrack extends MyBaseEvent {
    public readonly type: string = "AnimateTrack";
    declare data: IAnimateTrackData;

    constructor(time: number);
    constructor(time: number, data: IAnimateTrackData);
    constructor(time: number, data?: IAnimateTrackData) {
        if (typeof data === 'undefined') data = {
            track: "",
            duration: 1
        };

        super(time, data);

        this.type = "AnimateTrack";
    }
}