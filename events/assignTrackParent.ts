import IParentTrackData from "../interfaces/events/eventData/IParentTrackData";
import MyBaseEvent from "./baseEvent";

export default class AssignTrackParent extends MyBaseEvent {
    public readonly type: string = "AssignTrackParent";
    declare data: IParentTrackData;

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