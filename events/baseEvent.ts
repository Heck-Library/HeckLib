
import IUnknownEvent from "../interfaces/events/eventData/ICustomEvent";
import IParentTrackData from "../interfaces/events/eventData/IParentTrackData";
import { events, trackParents } from "../map/variables";
import unknownProperty from "../types/unknownProperty";

export abstract class MyBaseEvent implements IUnknownEvent {
    /**
     * ## Time
     * 
     * The time of the event in beats.
     */
    time: number;
    /**
     * ## Type
     * 
     * The type of the event. This is used to determine what type of event it is. Classes that extend this class should set this value automatically and SHOULD **NOT** be set manually.
     */
    type: string;
    data: unknownProperty;

    constructor(beat: number);
    constructor(beat: number, data: unknownProperty);
    constructor(beat: number, data?: unknownProperty) {
        this.time = beat;
        this.type = "";
        this.data = {};
        if (data) {
            this.data = data;
        }
        return this;
    }

    private isTrackParentData(data: unknownProperty): data is IParentTrackData {
        return (data as IParentTrackData).parentTrack !== undefined;
    }

    /**
     * ## Push
     * 
     * Pushes the event to the map.
     */
    push() : void {
        if (this.isTrackParentData(this.data)) {
            if (!trackParents.includes(this.data.parentTrack)) {
                trackParents.push(this.data.parentTrack);
                events.push(this);
            }
        } else events.push(this);
    }
}
