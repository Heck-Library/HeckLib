import { MyBaseEvent } from "./baseEvent";
import ICreateScreenTextureData from "../interfaces/events/eventData/ICreateScreenTextureData";

export default class CreateScreenTexture extends MyBaseEvent {
    public readonly type: string = "CreateScreenTexture";
    declare data: ICreateScreenTextureData;

    constructor(time: number);
    constructor(time: number, data: ICreateScreenTextureData);
    constructor(time: number, data?: ICreateScreenTextureData) {
        if (typeof data === 'undefined') data = {
            name: ""
        };

        super(time, data);
        this.type = "DeclareRenderTexture";
    }
}