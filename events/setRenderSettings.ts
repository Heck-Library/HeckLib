import ISetRenderSettingsData from "../interfaces/events/eventData/ISetRenderSettingsData";
import { MyBaseEvent } from "./baseEvent";

export default class SetRenderingSettings extends MyBaseEvent {
    public readonly type: string = "SetRenderingSettings";
    declare data: ISetRenderSettingsData;

    constructor(time: number);
    constructor(time: number, data: ISetRenderSettingsData);
    constructor(time: number, data?: ISetRenderSettingsData) {
        super(time, data);
        this.type = "SetRenderingSettings";
    }
}