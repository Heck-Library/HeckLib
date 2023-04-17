import IPathAnimData from "../interfaces/events/eventData/IPathAnimData";
import MyBaseEvent from "./baseEvent";

export default class AssignPathAnimation extends MyBaseEvent {
    public readonly type: string;

    constructor();
    constructor(time: number);
    constructor(time: number, data: IPathAnimData);
    constructor(time?: number, data?: IPathAnimData) {
        if (typeof time === 'undefined') time = 0;
        if (typeof data === 'undefined') data = {
            track: "foo",
        };

        super(time, data);
        this.type = "AssignPathAnimation";
    }
}