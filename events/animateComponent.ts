import IAnimComponentData from "../interfaces/events/eventData/IAnimComponentData";
import MyBaseEvent from "./baseEvent";

export default class AnimateComponent extends MyBaseEvent {
    public readonly type: string = "AnimateComponent";
    declare data: IAnimComponentData;

    /**
     * Creates a new AnimateComponent event.
     */
    constructor();
    /**
     * Creates a new AnimateComponent event.
     * @param time The time of the event.
     */
    constructor(time: number);
    /**
     * Creates a new AnimateComponent event.
     * @param time The time of the event.
     * @param data Components to animate.
     * ```ts
     * new AnimateComponent(0, {
     *     track: "foo",
     *     duration: 1,
     *     components: {
     *         BloomFogEnvironment: {
     *             attenuation: [
     *                 [0, 0],
     *                 [0.5, 1]
     *             ]
     *         }
     *     }
     * }).push();
     * ```
     */
    constructor(time: number, data: IAnimComponentData);
    constructor(time?: number, data?: IAnimComponentData) {
        if (typeof data === 'undefined') data = {
            track: "",
            duration: 1
        };

        super(time, data);
        this.type = "AnimateComponent";
    }
}