import { MyBaseEvent } from "../events/baseEvent";
import ISetCamPropData from "../interfaces/events/eventData/ISetCamPropData";
import DepthTextureMode from "../types/depthTextMode";


export default class SetCameraProperty extends MyBaseEvent {
    public readonly type: string = "SetCameraProperty";
    declare data: ISetCamPropData;

    constructor(time: number);
    constructor(time: number, data: DepthTextureMode[]);
    constructor(time: number, data: ISetCamPropData)
    constructor(time: number, data?: DepthTextureMode[] | ISetCamPropData) {
        if (typeof data === 'undefined') data = {
            depthTextureMode: ["Depth"]
        };
        if (Array.isArray(data)) data = { depthTextureMode: data };

        super(time, data);
        this.type = "SetCameraProperty";
    }
}