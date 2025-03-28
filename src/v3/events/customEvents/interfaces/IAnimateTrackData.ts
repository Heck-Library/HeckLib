import { PositionAnimation, Vec1Animation, Vec3Animation } from "../../../../util/vec";
import { IBaseAnimationEventData } from "./IBaseAnimationEventData";

export interface IAnimateTrackData extends IBaseAnimationEventData {
    /**
     * ## Track
     *
     * Tracks are a powerful tool integrated by Heck that allow you to group objects together and control them.
     * Tracks hold information in the form of properties,
     * then anything on the track can use that information to control,for example, their position or rotation.
     *
     * `track` is a `string` property in the customData of the object you want to give said track to.
     *
     * It can be placed on any object in the `obstacles`, `colorNotes`, `bombNotes`, `sliders`, or `burstSliders` arrays.
     *
     * An object can belong to multiple tracks at the same time by using arrays, and be affected by multiple track animations or path animations concurrently.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * notes.select({startBeat: 0, endBeat: 16}).forEach(n => {
     *     n.customData.track = "track1";
     *     // Or
     *     n.customData.track = ["track1", "testTrack2", ...]; // You can have multiple tracks
     * });
     *
     * new AnimateTrack(0, {
     *     Track: "track1",
     *     Duration: 4,
     *     Scale: [
     *         [2, 2, 2, 0],
     *         [1, 1, 1, 1, Ease.OutCirc]
     *     ]
     * }).Push();
     * ```
     *
     * This would scale all notes in the `notes` array that have the track `track1` from 2x size to normal size in 4 beats.
     */
    Track: string | string[];
    /**
     * ## Repeat
     *
     * `Repeat` is a `number` property in the customData of an event that specifies how many times the animation should repeat. Excluding the first play, this means the animation will play `Repeat + 1` times.
     *
     * If not specified, the value will default to 0 and the animation will play only once.
     */
    Repeat?: number;
    /**
     * ## [Time](https://heck.aeroluna.dev/animation/properties/#time)
     * 
     * `Time` may only be used in `AnimateTrack`
     * 
     * `Time` is relatively advanced so make sure to have a solid understanding of Noodle Extensions before delving into time.
     * `Time` can only be used in AnimateTrack as it lets you control what point in the note's "lifespan" it is at a given time.
     * 
     * `Time` is a `Vec1Animation` that represents the time of the note.
     * 
     * It is worth noting that every object on one track will get the same time values when animating this property. This means they would suddenly appear to all be at the same point. It is recommended for every object to have its own track when using `time`
     */
    Time?: Vec1Animation;
    Position?: PositionAnimation;
    Rotation?: Vec3Animation;
}
