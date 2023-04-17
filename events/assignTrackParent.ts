import IParentTrackData from "../interfaces/events/eventData/IParentTrackData";
import MyBaseEvent from "./baseEvent";

export default class AssignTrackParent extends MyBaseEvent {
    public readonly type: string;

    constructor();
    constructor(time: IParentTrackData)
    constructor(time: number);
    constructor(time: number, data: IParentTrackData);
    constructor(time?: number | IParentTrackData, data?: IParentTrackData) {
        if (typeof time === 'undefined') time = 0;
        if (typeof time !== 'number' && typeof time !== 'undefined') {
            data = time;
            time = 0;
        }
        if (typeof data === 'undefined') data = {
            parentTrack: "",
            childrenTracks: []
        } || time;

        super(time, data);
        this.type = "AssignTrackParent";
    }
}