import Environment from "../environment/environment";
import IBloomFogEnvironmentAnimation from "../interfaces/animatable/fog";
import ITubeBloomPrePassLightAnimation from "../interfaces/animatable/tubeBloom";
import IBloomFogEnvironment from "../interfaces/components/fog";
import ITubeBloomPrePassLight from "../interfaces/components/tubeBloom";
import IAnimComponentData from "../interfaces/events/eventData/IAnimComponentData";
import { MyBaseEvent } from "./baseEvent";

let fogDone = false;

export default class AnimateComponent extends MyBaseEvent {
    readonly type: string = "AnimateComponent";
    readonly declare data: IAnimComponentData;
    
    /**
     * ## Track
     * 
     * The track to be used for controlling the object with events.
     * 
     * This can be a string or an array of strings.
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_track": string | string[] }
     * ```
     * #### V3
     * ```json
     * { "track": string | string[] }
     * ```
     */
    get track(): string | string[] { return this.data.track; }
    set track(value: string | string[]) { this.data.track = value; }

    /**
     * ## Easing
     * 
     * The easing of the animation.
     * 
     * This can be a string which is a valid easing function.
     * 
     * You can find a list of valid easing functions [here](https://easings.net/). Or in the `ease` object.
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_easing": string }
     * ```
     * #### V3
     * ```json
     * { "easing": string }
     * ```
     */
    get easing(): string { return this.data.easing; }
    set easing(value: string) { this.data.easing = value; }
        
    /**
     * ## Duration
     * 
     * Duration of the animation in beats.
     * 
     * This can be a number above 0.
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_duration": number }
     * ```
     * #### V3
     * ```json
     * { "duration": number }
     * ```
     */
    get duration(): number { return this.data.duration; }
    set duration(value: number) { this.data.duration = value; }

    get bloomFogEnvironment(): IBloomFogEnvironmentAnimation { return this.data.BloomFogEnvironment; }
    set bloomFogEnvironment(value: IBloomFogEnvironmentAnimation) {
        if (!fogDone) {
            const e = new Environment()
            e.id = /\[0\]Environment$/
            e.track = "FOG_TRACK";
            e.lookupMethod = "Regex";
            e.active = true;
            e.push();
            
            this.track = e.track;
        }
        fogDone = true;
        this.data.BloomFogEnvironment = value;
    }

    get tubeBloomPrePassLight(): ITubeBloomPrePassLightAnimation { return this.data.TubeBloomPrePassLight; }
    set tubeBloomPrePassLight(value: ITubeBloomPrePassLightAnimation) { this.data.TubeBloomPrePassLight = value; }

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