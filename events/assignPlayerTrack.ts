import IPlayerTrackData from "../interfaces/events/eventData/IPlayerTrackData";
import MyBaseEvent from "./baseEvent";

export default class AssignPlayerToTrack extends MyBaseEvent {
    public readonly type: string;

    constructor();
    constructor(time: number);
    constructor(time: number | string);
    constructor(time: number, data: IPlayerTrackData | string);
    constructor(time?: number | string, data?: IPlayerTrackData | string) {
        if (typeof time === 'undefined' || typeof time === 'string') time = 0;
        if (typeof time === 'string') data = { track: time }
        if (typeof data === 'undefined' || typeof data === 'string') {
            data = {
                track: data || "",
            }
        }

        super(time, data);
        this.type = "AssignPlayerTrack";
    }
}