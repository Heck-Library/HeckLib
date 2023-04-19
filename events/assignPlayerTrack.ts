import IPlayerTrackData from "../interfaces/events/eventData/IPlayerTrackData";
import MyBaseEvent from "./baseEvent";

export default class AssignPlayerToTrack extends MyBaseEvent {
    public readonly type: string = "AssignPlayerToTrack";
    declare data: IPlayerTrackData;

    /**
     * Creates a new AssignPlayerToTrack event.
     * @param time The time of the event.
     */
    constructor(time: number);
    constructor(time: number | string);
    constructor(time: number, data: IPlayerTrackData | string);
    constructor(time: number | string, data?: IPlayerTrackData | string) {
        if (typeof time === 'undefined' || typeof time === 'string') time = 0.001;
        if (typeof time === 'string') data = { track: time }
        if (typeof data === 'undefined' || typeof data === 'string') {
            data = {
                track: data || "",
            }
        }

        super(time, data);
        this.type = "AssignPlayerToTrack";
    }
}