import IFogTrackData from "../interfaces/events/eventData/IFogTrackData";
import { MyBaseEvent } from "./baseEvent";

export default class AssignFogTrack extends MyBaseEvent {
    /**
     * ## Type
     * 
     * The type of the event.
     * 
     * This is a `readonly` property, it can't and shouldn't be set manually. It will always be `"AssignFogTrack"`.
     */
    public readonly type: string = "AssignFogTrack";
    /**
     * ## Data
     * 
     * The data of the event.
     * 
     * This is a `readonly` property. Please use the setters provided to change the values.s
     */
    readonly declare data: IFogTrackData;

    //#region Getters and setters

    get track(): string | string[] { return this.data.track; }
    set track(value: string | string[]) { this.data.track = value; }

    //#endregion

    constructor(time: number);
    constructor(time: number, data: IFogTrackData | string);
    constructor(time: number, data?: IFogTrackData | string) {
        if (typeof data === 'string') {
            data = { track: data };
        }
        super(time, data)
        this.type = "AssignFogTrack";
    }
}