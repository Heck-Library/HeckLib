
import IUnknownEvent from "../interfaces/events/eventData/ICustomEvent";
import { events } from "../map/variables";
import unknownProperty from "../types/unknownProperty";

export abstract class MyBaseEvent implements IUnknownEvent {
    time: number;
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

    push() : void {
        events.push(this);
    }
}
