import { PositionAnimation } from "../../../../util/vec";
import { IBaseAnimationEventData } from "./IBaseAnimationEventData";

export interface IPathAnimationData extends IBaseAnimationEventData {
    /**
     * ## [DefinitePosition](https://heck.aeroluna.dev/animation/properties/#definiteposition)
     *
     * `DefinitePosition` may only be used in `AssignPathAnimation`
     *
     * Describes the definite position of an object. Will completely overwrite the object's default movement. However, this does still take into account x/y and world rotation.
     *
     * An object with with `DefinitePosition` will still be offset by the `OffsetPosition` property.
     */
    DefinitePosition?: PositionAnimation;
}

export interface IAssignPathAnimationData extends IPathAnimationData{
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
}
