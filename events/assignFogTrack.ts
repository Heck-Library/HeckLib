import IFogTrackData from "../interfaces/events/eventData/IFogTrackData";
import MyBaseEvent from "./baseEvent";

export default class AssignFogTrack extends MyBaseEvent {
    public readonly type: string = "AssignFogTrack";
    declare data: IFogTrackData;

    constructor(time: number);
    constructor(time: number, data: IFogTrackData | string);
    constructor(time: number, data?: IFogTrackData | string) {
        if (typeof data === 'string') {
            data = { track: data };
        }
        super(time, data)
        this.type = "AssignFogTrack";
    }
}