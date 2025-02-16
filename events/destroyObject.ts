import { MyBaseEvent } from "./baseEvent";
import IDestroyObjectData from "../interfaces/events/eventData/IDestroyObjectData";

export default class DestroyObject extends MyBaseEvent {
    public readonly type: string = "DestroyObject";
    declare data: IDestroyObjectData;

    constructor(time: number);
    constructor(time: number, data: IDestroyObjectData | string | string[]);
    constructor(time?: number, data?: IDestroyObjectData | string | string[]) {
        if (typeof data === 'undefined') data = {
            id: ""
        }
        if (typeof data === 'string' || Array.isArray(data)) data = { id : data };
        super(time, data);
        this.type = "DestroyObject";
    }
}