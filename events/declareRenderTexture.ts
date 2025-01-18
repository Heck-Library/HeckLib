import { MyBaseEvent } from "../events/baseEvent";
import IRenderTextData from "../interfaces/events/eventData/IRenderTextData";

export default class DeclareRenderTexture extends MyBaseEvent {
    public readonly type: string = "DeclareRenderTexture";
    declare data: IRenderTextData;

    constructor(time: number);
    constructor(time: number, data: IRenderTextData);
    constructor(time: number, data?: IRenderTextData) {
        if (typeof data === 'undefined') data = {
            name: ""
        };

        super(time, data);
        this.type = "DeclareRenderTexture";
    }
}