
import ICustomEvent from "../interfaces/events/eventData/ICustomEvent";
import { events } from "../map/initialize";
import customEventData from "../types/customEventData";

export default abstract class MyBaseEvent implements ICustomEvent {
    public time: number;
    public type: string;
    public data: customEventData;

    constructor();
    constructor(time: number);
    constructor(time: number, data: customEventData);
    constructor(time?: number, data?: customEventData) {
        this.time = 0;
        this.type = "";
        this.data = {};
        if (time) {
            this.time = time;
            if (data) {
                this.data = data;
            }
        }
    }

    push() : void {
        events.push(this);
    }
}