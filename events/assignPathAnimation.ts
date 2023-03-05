import { pathAnimData } from "../consts/types/animation";
import BaseEvent from "./baseEvent";

export default class AssignPathAnimation extends BaseEvent {
    declare json: {
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
        super();
        this.json = {
            time: time,
            type: "AssignPathAnimation",
            data: eventData
        }
    }
}