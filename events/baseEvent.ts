
import IUnknownEvent from "../interfaces/events/eventData/ICustomEvent";
import { events } from "../map/variables";
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

    /**
     * ## Push
     * 
     * Pushes the event to the map.
     */
    push() : void {
        events.push(this);
    }
}
