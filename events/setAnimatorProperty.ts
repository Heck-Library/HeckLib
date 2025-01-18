import { MyBaseEvent } from "../events/baseEvent";
import ISetAnimatorPropertyData from "../interfaces/events/eventData/ISetAnimatorPropertyData";

export default class SetAnimatorProperty extends MyBaseEvent {
    public readonly type: string = "SetAnimatorProperty";
    declare data: ISetAnimatorPropertyData;

    constructor(time: number);
    constructor(time: number, data: ISetAnimatorPropertyData);
    constructor(time: number, data?: ISetAnimatorPropertyData) {
        if (typeof data === 'undefined') data = {
            id: "",
            properties: []
        };

        super(time, data);
        this.type = "SetAnimatorProperty";
    }
}