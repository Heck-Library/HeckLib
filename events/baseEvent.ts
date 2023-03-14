import { animComponentData, animateTrackData, fogTrackData, parentTrackType, pathAnimData, playerTrackType, matPropertyData, ppData } from "../consts/types/animation";
import { events } from "../map/initialize";

export default abstract class BaseEvent {
    json: {
        time: number;
        type: string;
        data: any;
    };

    //#region getters and setters
    set time(time: number) { this.json.time = time; }
    get time(): number { return this.json.time; }

    get type(): string { return this.json.type; }

    set data(data: ppData | matPropertyData | fogTrackData | animateTrackData | pathAnimData | parentTrackType | playerTrackType | animComponentData) { this.json.data = data; }
    get data(): ppData | matPropertyData | fogTrackData | animateTrackData | pathAnimData | parentTrackType | playerTrackType | animComponentData { return this.json.data; }

    push() {
        events.push(this);
        return this;
    }
}
