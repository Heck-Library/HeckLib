import { MyBaseEvent } from "../events/baseEvent";
import IMatPropertyData from "../interfaces/events/eventData/IMatPropertyData";

export default class SetMaterialProperty extends MyBaseEvent {
    public readonly type: string = "SetMaterialProperty";
    declare data: IMatPropertyData;

    constructor(time: number);
    constructor(time: number, data: IMatPropertyData);
    constructor(time: number, data?: IMatPropertyData) {
        if (typeof data === 'undefined') data = {
            asset: "",
            duration: 1,
            properties: []
        }; 

        super(time, data);

        this.type = "SetMaterialProperty";
    }
}