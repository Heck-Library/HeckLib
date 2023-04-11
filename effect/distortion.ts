import ease from "../consts/ease";
import AnimateTrack from "../events/animateTrack";
import AssignPlayerToTrack from "../events/assignPlayerToTrack";

interface IDistortion {
    /**
     * The start time of the distortion
     */
    start: number;
    /**
     * The end time of the distortion
     */
    end: number;
    /**
     * The intensity of the distortion
     */
    intensity: number;
}

/**
 * Distorts the game using floating point errors.
 */
export default class Distortion {
    private options: IDistortion;
    /**
     * Distorts the game using floating point errors.
     * ```ts
     * new Effect.Distortion({
     *     start: 0,       // The start time of the distortion
     *     end: 10,        // The end time of the distortion
     *     intensity: 0.5  // The intensity of the distortion
     * }).push();          // Pushes the effect to the map
     * ```
     */
    constructor(properties: IDistortion) {
        this.options = properties;
    }
    
    public push() {
        const { start, end, intensity } = this.options;
        const track = `distortionFrom${start}to${end}`;
        const i = intensity * 10000;
        new AssignPlayerToTrack(start, track).push();
        new AnimateTrack(start, {
            track: track,
            duration: end - start,
            position: [
                [i, i, i, 0],
                [0, 0, 0, 1, ease.Step]
            ]
        }).push();
    }
}