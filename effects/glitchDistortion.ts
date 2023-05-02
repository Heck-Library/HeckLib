import ease from "../consts/easing";
import Environment from "../environment/environment";
import AnimateTrack from "../events/animateTrack";
import AssignPlayerToTrack from "../events/assignPlayerTrack";
import AssignTrackParent from "../events/assignTrackParent";
import filter from "../functions/filter";
import track from "../functions/track";
import { V3 } from "../map/initialize";
import { notes, walls, bombs, arcs, chains } from "../map/variables";

let firstDistortion = true;

/**
 * Properties for the Distortion effect
 * ```ts
 * start: number;      // The start time of the distortion
 * end: number;        // The end time of the distortion
 * intensity: number;  // The intensity of the distortion
 * ```
 */
interface IDistortion {
    start: number;
    end: number;
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
    
    public push() : void {
        const { start, end, intensity } = this.options;
        const distTrack = `distortionFrom${start}to${end}`;
        const i = Math.pow(10, intensity + 3);
        new AssignPlayerToTrack(start, distTrack).push();
        track(filter(notes, start, end + 4), distTrack);
        track(filter(walls, start, end + 4), distTrack);
        if (V3) {
            track(filter(bombs, start, end + 4), distTrack);
            track(filter(arcs, start, end + 4), distTrack);
            track(filter(chains, start, end + 4), distTrack);
        }
        if (firstDistortion) {
            new Environment({
                id: /Gamecore|Environment|.*/,
                track: "DistortionEnvironment"
            }).push();
            new AssignTrackParent(start, {
                parentTrack: "distEnvParent",
                childrenTracks: [`DistortionEnvironment`],
                worldPositionStays: true,
            }).push();
            firstDistortion = false;
        }
        new AnimateTrack(start, {
            track: [distTrack, "distEnvParent"],
            duration: end - start,
            position: [
                [i, i, i, 0],
                [0, 0, 0, 1, ease.Step]
            ]
        }).push();
    }
}