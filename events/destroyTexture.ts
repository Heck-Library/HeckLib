import { MyBaseEvent } from "../events/baseEvent";
import IDestroyTextureData from "../interfaces/events/eventData/IDestroyTexture";

export default class DestroyTexture extends MyBaseEvent {
    public readonly type: string = "DestroyTexture";
    declare data: IDestroyTextureData;

    constructor(time: number);
    constructor(time: number, data: string | string[]);
    constructor(time: number, data: string | { name: string | string[]})
    constructor(time: number, data?: string | string[] | { name: string | string[] }) {
        if (typeof data === 'undefined') data = {
            name: ""
        }
        if (typeof data === 'string' || Array.isArray(data)) data = { name: data };

        super(time, data);
        this.type = "DestroyTexture";
    }
}