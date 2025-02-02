import ICreateCameraData from "../interfaces/events/eventData/ICreateCameraData";
import IMatPropertyData from "../interfaces/events/eventData/IMatPropertyData";
import { MyBaseEvent } from "./baseEvent";
import SetMaterialProperty from "./setMaterialProperty";

export default class CreateCamera extends MyBaseEvent {
    readonly type: string = "SetGlobalProperty";
    declare data: ICreateCameraData;
    
    constructor(time: number);
    constructor(time: number, data: ICreateCameraData);
    constructor(time: number, data?: ICreateCameraData) {
        super(time, data);
        this.type = "SetGlobalProperty";
    }
}