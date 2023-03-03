import { animComponentData, animateTrackData, fogTrackData, parentTrackType, pathAnimData, playerTrackType } from "../consts/types/animation";
import { events } from "../src/mapHandler";

export default class BaseEvent {
    json: {
        time: number;
        type: string;
        data: fogTrackData | animateTrackData | pathAnimData | parentTrackType | playerTrackType | animComponentData;
    };

    //#region getters and setters
    set time(time: number) { this.json.time = time; }
    get time(): number { return this.json.time; }

    get type(): string { return this.json.type; }

    set data(data: fogTrackData | animateTrackData | pathAnimData | parentTrackType | playerTrackType | animComponentData) { this.json.data = data; }
    get data(): fogTrackData | animateTrackData | pathAnimData | parentTrackType | playerTrackType | animComponentData { return this.json.data; }

    push() {
        events.push(this);
        return this;
    }
}
