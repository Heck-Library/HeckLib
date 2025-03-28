import { Vec2 } from "../../../../util/vec";
import { IBaseCustomData } from "./IBaseCustomData";


export interface ISliderCustomData extends IBaseCustomData {
    /**
     * ## TailCoordinates
     *
     * `TailCoordinates` is a `Vec2` that represents the position of the tail of the slider.
     *
     * This can be placed on `Slider` objects.
     *
     * ---
     *
     * #### Since this acts the same as `Coordinates` except for the tail, you should check the `Coordinates` property for more information.
     */
    TailCoordinates?: Vec2;
    /**
     * ## DisableNoteGravity
     *
     * `DisableNoteGravity` is a `boolean` that determines if the object has a spawning animation or not.
     *
     * This can be placed on `Note`, `Bomb`, `Slider`, and `BurstSlider` objects.
     *
     * When true, objects will no longer do their animation where they float up.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * notes.forEach(note => {
     *     note.CustomData.DisableNoteGravity = true;
     * });
     * ```
     */
    DisableNoteGravity?: boolean;
}
