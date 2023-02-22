import { parentTrackType } from "../consts/types/animation.ts";
import { events } from "../src/mapHandler.ts";

export default class AssignTrackParent {
    json: {
        time: number
        type: string
        data: parentTrackType
    }
    
    constructor(time: number, eventData: parentTrackType) {
        this.json = {
            time: time,
            type: "AssignTrackParent",
            data: eventData
        }
    }
    
    set time(time: number) { this.json.time = time; }
    get time(): number { return this.json.time; }

    get type(): string { return this.json.type; }

    set data(data: parentTrackType) { this.json.data = data; }
    get data(): parentTrackType { return this.json.data; }
    
    /**
     * Push the track parent to the map data.
     */
    push () {
        events.push(this);
        return this;
    }
}