import IFogTrackData from "../interfaces/events/eventData/IFogTrackData";
import MyBaseEvent from "./baseEvent";

export default class AssignFogTrack extends MyBaseEvent {
    public readonly type: string;

    constructor();
    constructor(time: string);
    constructor(time: number);
    constructor(time: number, data: IFogTrackData | string);
    constructor(time?: number | string, data?: IFogTrackData | string) {
        if (typeof time === 'undefined' || typeof time === 'string') time = 0;
        if (typeof time === 'string') data = { track: time }
        if (typeof data === 'undefined' || typeof data === 'string') {
            data = {
                track: data || "",
            }
        }

        super(time, data);
        this.type = "AnimateFog";
    }
}