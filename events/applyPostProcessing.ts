import { MyBaseEvent } from "../events/baseEvent";
import IPPData from "../interfaces/events/eventData/IPPData";

export default class ApplyPostProcessing extends MyBaseEvent {
    public readonly type: string = "ApplyPostProcessing";
    declare data: IPPData;

    constructor(time: number);
    constructor(time: number, data: IPPData);
    constructor(time: number, data?: IPPData) {
        if (typeof data === 'undefined') data = {
            asset: "",
            duration: 1,
            properties: []
        }; 

        super(time, data);

        this.type = "ApplyPostProcessing";
    }
}