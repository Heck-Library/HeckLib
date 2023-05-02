import IPlayerTrackData from "../interfaces/events/eventData/IPlayerTrackData";
import { MyBaseEvent } from "./baseEvent";

export default class AssignPlayerToTrack extends MyBaseEvent {
    public readonly type: string = "AssignPlayerToTrack";
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