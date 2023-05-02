import IPlayerTrackData from "../interfaces/events/eventData/IPlayerTrackData";
import { MyBaseEvent } from "./baseEvent";

export default class AssignPlayerToTrack extends MyBaseEvent {
    /**
     * ### Type
     * 
     * The type of the event.
     * 
     * This is a `readonly` property, it can't and shouldn't be set manually. It will always be `"AssignPlayerToTrack"`.
     */
    public readonly type: string = "AssignPlayerToTrack";
    /**
     * ### Data
     * 
     * The data for the event.
     * 
     * This is a `readonly` property. Please use the setters provided to change the values.
     */
    public declare readonly data: IPlayerTrackData;

    /**
     * ### Track
     * 
     * The track to assign the player to.
     */
    get track(): string | string[] { return this.data.track; }
    set track(value: string | string[]) { this.data.track = value; }

    /**
     * Creates a new AssignPlayerToTrack event.
     * @param time The time of the event.
     */
    constructor(time: number);
    /**
     * Creates a new AssignPlayerToTrack event.
     * @param time The time of the event.
     * @param data The data of the event.
     */
    constructor(time: number, data: IPlayerTrackData | string);
    constructor(time: number, data?: IPlayerTrackData | string) {
        if (typeof time === 'undefined' || typeof time === 'string') time = 0.001;
        if (typeof data === 'undefined' || typeof data === 'string') {
            data = {
                track: data || "",
            }
        }

        super(time, data);
        this.type = "AssignPlayerToTrack";
    }
}