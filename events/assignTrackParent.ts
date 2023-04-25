import IParentTrackData from "../interfaces/events/eventData/IParentTrackData";
import { MyBaseEvent } from "./baseEvent";

export default class AssignTrackParent extends MyBaseEvent {
    /**
     * ## Type
     * 
     * The type of the event.
     * 
     * This is a `readonly` property, it can't and shouldn't be set manually. It will always be `"AssignTrackParent"`.
     */
    public readonly type: string = "AssignTrackParent";
    /**
     * ## Data
     * 
     * The data of the event.
     * 
     * This is a `readonly` property. Please use the setters provided to change the values.
     */
    declare data: IParentTrackData;

    //#region Getters and setters

    get parentTrack(): string { return this.data.parentTrack; }
    set parentTrack(value: string) { this.data.parentTrack = value; }

    get childrenTracks(): string[] { return this.data.childrenTracks; }
    set childrenTracks(value: string[]) { this.data.childrenTracks = value; }

    //#endregion

    
    /**
     * Creates a new AssignTrackParent event.
     * @param time The time of the event.
     * @param parent The parent track.
     * @param children The children tracks.
     * ```ts
     * new AssignTrackParent(0, "foo", ["bar", "baz"]).push();
     * ```
     */
    constructor(time: number, parent: string, children: string[]);
    /**
     * Creates a new AssignTrackParent event.
     * @param time The time of the event.
     * @param parent The track parent parameters.
     * ```ts
     * new AssignTrackParent(0, {
     *     parentTrack: "foo",
     *     childrenTracks: ["bar", "baz"],
     * }).push();
     * ```
     */
    constructor(time: number, parent: IParentTrackData); 
    constructor(time: number, parent: string | IParentTrackData, children?: string[]) {
        if (typeof parent === 'string') {
            parent = {
                parentTrack: parent,
                childrenTracks: children || []
            }
        }
        super(time, parent);
        this.type = "AssignTrackParent";
    }
}