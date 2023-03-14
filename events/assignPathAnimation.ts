import { pathAnimData } from "../consts/types/animation";
import { events } from "../map/initialize";

export default class AssignPathAnimation {
    private json: {
        time: number
        type: "AssignPathAnimation"
        data: pathAnimData
    };
    /**
     * Creates an AssignPathAnimation event.
     * ```ts
     * new AssignPathAnimation(0, {
     *     track: "foo",
     *     dissolve: [
     *         [1, 0],
     *         [0, 0.5, ease.Out.Circ]
     *     ]
     * }).push();
     * ```
     */
    constructor(time: number, eventData: pathAnimData) {
        this.json = {
            time: time,
            type: "AssignPathAnimation",
            data: eventData
        }
    }
    set time(time: number) { this.json.time = time; }
    get time(): number { return this.json.time; }

    get type(): string { return this.json.type; }

    set data(data: pathAnimData) { this.json.data = data; }
    get data(): pathAnimData { return this.json.data; }
    
    push() {
        events.push(this);
        return this;
    }
}