import { MyBaseEvent } from "../events/baseEvent";
import ICullMaskData from "../interfaces/events/eventData/ICullMaskData";

export default class DeclareCullingMask extends MyBaseEvent {
    public readonly type: string = "DeclareCullingMask";
    declare data: ICullMaskData;

    constructor();
    constructor(time: number);
    constructor(time: number, data: ICullMaskData);
    constructor(time?: number, data?: ICullMaskData) {
        if (typeof data === 'undefined') data = {
            name: "",
            track: "",
        };

        super(time, data);
        this.type = "DeclareCullingMask";
    }
}