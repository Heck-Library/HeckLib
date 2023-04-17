import IAnimComponentData from "../interfaces/events/eventData/IAnimComponentData";
import MyBaseEvent from "./baseEvent";

export default class AnimateComponent extends MyBaseEvent {
    public readonly type: string;

    constructor();
    constructor(time: number);
    constructor(time: number, data: IAnimComponentData);
    constructor(time?: number, data?: IAnimComponentData) {
        if (typeof time === 'undefined') time = 0;
        if (typeof data === 'undefined') data = {
            track: "",
            duration: 1
        };

        super(time, data);
        this.type = "AnimateComponent";
    }
}