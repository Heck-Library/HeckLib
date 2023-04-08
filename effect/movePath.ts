import ease from "../consts/ease";
import { NOTE, Track, vec3, vec3anim } from "../consts/mod";
import AssignPathAnimation from "../events/assignPathAnimation";
import filter from "../functions/filter";
import lerp from "../functions/lerp";
import track from "../functions/track";
import { notes } from "../map/initialize";

type movePathProperties = {
    /**
     * The starting time of the animation
     */
    time: number;
    /**
     * The duration of the animation
     */
    duration: number;
    /**
     * Additional track(s) added to the notes controlled
     * 
     * This is optional, by default the track will be `movePathAt<TIME>`. If a track is provided this will be overriden and the first track given will be the one controlled by the events.
     * 
     * The tracks will be assigned ONLY to the notes that are between the `time` value and `duration` amount of beats after that, nothing else! If you want the effect to last after the movement has ended, assign the tracks manually by using the `track()` function or editing the `data` properties of an object.
     */
    track?: Track;
    /**
     * The `position` to be interpolated in the following format:
     * ```ts
     * position: [
     *     [0, 0, 0], // The starting point of the animation
     *     [16, 0, 16] // The ending point of the animation
     * ]
     * ```
     */
    position?: animation;
    /**
     * The `rotation` to be interpolated in the following format:
     * ```ts
     * rotation: [
     *     [0, 0, 0], // The starting point of the animation
     *     [16, 0, 16] // The ending point of the animation
     * ]
     * ```
     */
    rotation?: animation;
    /**
     * The `localRotation` to be interpolated in the following format:
     * ```ts
     * localRotation: [
     *     [0, 0, 0], // The starting point of the animation
     *     [16, 0, 16] // The ending point of the animation
     * ]
     * ```
     */
    localRotation?: animation;
    /**
     * The offset of the notes.
     * 
     * Default: `2`
     */
    offset?: number;
}

type animation = [vec3, vec3]

export default class MovePath {
    /**
     * The starting time of the animation
     */
    time: number;
    /**
     * The duration of the animation
     */
    duration: number;
    /**
     * Additional track(s) added to the notes controlled
     * 
     * This is optional, by default the track will be `movePathAt<TIME>`. If a track is provided this will be overriden and the first track given will be the one controlled by the events.
     * 
     * The tracks will be assigned ONLY to the notes that are between the `time` value and `duration` amount of beats after that, nothing else! If you want the effect to last after the movement has ended, assign the tracks manually by using the `track()` function or editing the `data` properties of an object.
     */
    track?: Track;
    /**
     * The `position` to be interpolated in the following format:
     * ```ts
     * position = [
     *     [0, 0, 0], // The starting point of the animation
     *     [16, 0, 16] // The ending point of the animation
     * ];
     * ```
     */
    position?: animation;
    /**
     * The `rotation` to be interpolated in the following format:
     * ```ts
     * rotation = [
     *     [0, 0, 0], // The starting point of the animation
     *     [16, 0, 16] // The ending point of the animation
     * ];
     * ```
     */
    rotation?: animation;
    /**
     * The `localRotation` to be interpolated in the following format:
     * ```ts
     * localRotation = [
     *     [0, 0, 0], // The starting point of the animation
     *     [16, 0, 16] // The ending point of the animation
     * ];
     * ```
     */
    localRotation?: animation;
    /**
     * The offset of the notes.
     * 
     * Default: `2`
     */
    offset: number;
    
    /**
     * Gradually moves the notes' path starting point values towards another location over the time of the `duration` starting from the `time`
     * 
     * Example below would animate the starting position of the notes from `[0, 0, 0]` to `[16, 8, 4]` over the course of `16` beats, starting at beat `2`.
     * ```ts
     * new MovePath({
     *     time: 2, // Starts at this beat number
     *     duration: 16, // Transfer lasts for this many beats
     *     position: [
     *         [0, 0, 0], // Starting values
     *         [16, 8, 4] // End values
     *     ]
     * }).push(); // Pushes the effect
     * ```
     */
    constructor(properties: movePathProperties) {
        const p = properties;

        this.time = p.time;
        this.duration = p.duration;
        this.offset = 2;

        if (typeof p.position !== 'undefined') this.position = p.position;
        if (typeof p.rotation !== 'undefined') this.rotation = p.rotation;
        if (typeof p.localRotation !== 'undefined') this.localRotation = p.localRotation;
        if (typeof p.track !== 'undefined') this.track = p.track;
        if (typeof p.offset !== 'undefined') this.offset = p.offset;
    }

    private assignCustomData() : void {
        filter(notes, this.time, this.time + this.duration).forEach((n: NOTE) => {
            const d = n.data;
            d.offset = this.offset;
            d.disableNoteGravity = true;
            d.disableSpawnEffect = true;
            d.disableNoteLook = true;
        });
    }
    private setTracks(tracks: Track) : void {
        track(filter(notes, this.time, this.time + this.duration), tracks);
    }
    private generateAnimation(startFrame: vec3, endFrame: vec3, currentTime: number) : vec3anim {
        const animation: vec3anim = [
            [
                lerp(startFrame[0], endFrame[0], (currentTime - this.time) / this.duration),
                lerp(startFrame[1], endFrame[1], (currentTime - this.time) / this.duration),
                lerp(startFrame[2], endFrame[2], (currentTime - this.time) / this.duration),
                0
            ],
            [0, 0, 0, 0.4785, ease.Out.Circ]
        ];

        return animation;
    }
    push() : void {
        let controlledTrack: Track = `movePathAt${this.time}`;
        if (typeof this.track !== 'undefined') {
            this.setTracks(this.track);
            if (Array.isArray(this.track)) controlledTrack = this.track[0];
            else controlledTrack = this.track;
        } else {
            this.setTracks(`movePathAt${this.time}`);
        }

        this.assignCustomData();

        for (let i = this.time; i <= this.time + this.duration; i += 1/16) {
            const animation = new AssignPathAnimation(i, {
                track: controlledTrack
            });

            if (typeof this.position !== 'undefined') {
                animation.data.position = this.generateAnimation(this.position[0], this.position[1], i);
            }
            if (typeof this.rotation !== 'undefined') {
                animation.data.rotation = this.generateAnimation(this.rotation[0], this.rotation[1], i);
            }
            if (typeof this.localRotation !== 'undefined') {
                animation.data.localRotation = this.generateAnimation(this.localRotation[0], this.localRotation[1], i);
            }
            if (Object.keys(animation.data).length <= 1) {
                return;
            }

            animation.push();
        }
    }
}