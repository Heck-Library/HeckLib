import { Vec2 } from "../../../../util/vec";
import { IBaseCustomData } from "./IBaseCustomData";


export interface INoteCustomData extends IBaseCustomData {
    /**
     * ## Flip
     *
     * `Flip` is a `Vec2` that represents the flip animation of the note.
     * 
     * This can be placed on `Note`, `Bomb`, and `BurstSlider` objects.
     *
     * The flip animation is the animation you see when two notes spawn at inverse positions and flip to their correct positions. (Mostly seen with crossover patterns)
     *
     * The first value of the `Vec2` represents the initial spawn position of the note.
     *
     * The second value of the `Vec2` represents the jump height of the note when flipping to its correct position. (This CAN be negative)
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * notes.forEach(note => {
     *     note.CustomData.Flip = [2, 2];
     * });
     * ```
     *
     * This will set the flip animation of all notes to have a flip animation that starts at position 2 and jumps to a height of 2.
     */
    Flip?: Vec2;
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
    /**
     * ## DisableNoteLook
     *
     * `DisableNoteLook` is a `boolean` that determines if the note will look at the player or not.
     * 
     * This can be placed on `Note`, `Bomb`, and `BurstSlider` objects.
     *
     * When true, notes will no longer look at the player.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * notes.forEach(note => {
     *     note.CustomData.DisableNoteLook = true;
     * });
     * ```
     */
    DisableNoteLook?: boolean;
    /**
     * ## DisableBadCutDirection
     *
     * `DisableBadCutDirection` is a `boolean` that determines if the note can be bad cut due to cutting in the wrong direction.
     * 
     * This can be placed on `Note`, `Bomb`, and `BurstSlider` objects.
     *
     * When true, notes will no longer bad cut due to cutting in the wrong direction.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * notes.forEach(note => {
     *     note.CustomData.DisableBadCutDirection = true;
     * });
     * ```
     */
    DisableBadCutDirection?: boolean;
    /**
     * ## DisableBadCutSpeed
     *
     * `DisableBadCutSpeed` is a `boolean` that determines if the note can be bad cut due to cutting too slow.
     * 
     * This can be placed on `Note`, `Bomb`, and `BurstSlider` objects.
     *
     * When true, notes will no longer bad cut due to slow speed.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * notes.forEach(note => {
     *     note.CustomData.DisableBadCutSpeed = true;
     * });
     */
    DisableBadCutSpeed?: boolean;
    /**
     * ## DisableBadCutSaberType
     *
     * `DisableBadCutSaberType` is a `boolean` that determines if the note can be bad cut due to cutting with the wrong saber.
     * 
     * This can be placed on `Note`, `Bomb`, and `BurstSlider` objects.
     *
     * When true, notes will no longer bad cut due to cutting with the wrong saber.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * notes.forEach(note => {
     *     note.CustomData.DisableBadCutSaberType = true;
     * });
     */
    DisableBadCutSaberType?: boolean;
    /**
     * ## DisableNoteDebris
     *
     * `DisableNoteDebris` is a `boolean` that determines if the note will spawn debris when cut.
     * 
     * This can be placed on `Note`, `Bomb`, and `BurstSlider` objects.
     *
     * When true, notes will no longer spawn debris when cut.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * notes.forEach(note => {
     *     note.CustomData.DisableNoteDebris = true;
     * });
     */
    DisableNoteDebris?: boolean;
    /**
     * ## SpawnEffect
     *
     * `SpawnEffect` is a `boolean` that determines if the note will have a spawn effect or not.
     * 
     * This can be placed on `Note`, `Bomb`, and `BurstSlider` objects.
     *
     * The spawn effect is the flash you see when a note spawns.
     *
     * When false, notes will not have a spawn effect.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * notes.forEach(note => {
     *     note.CustomData.SpawnEffect = true;
     * });
     */
    SpawnEffect?: boolean;
    /**
     * ## Link
     *
     * `Link` is a `string` that represents what notes get automatically cut when one of the linked notes is cut.
     * 
     * This can be placed on `Note`, `Bomb`, and `BurstSlider` objects.
     *
     * The string can be literally anything, but it is recommended to think of a format and sticking to it.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * notes.forEach(note => {
     *     note.CustomData.Link = `${note.Beat},${note.X},${note.Y}`;
     *
     *     const dupe = note.Duplicate();
     *     dupe.Beat += 1;
     *     dupe.CustomData.Uninteractable = true;
     *     fakeNotes.Push(dupe);
     * });
     * ```
     *
     * This will apply a link to each note individually and then duplicate it with a beat offset of 1 and make it uninteractable.
     * Because the link was defined before the duplication, the duplicated note will also have the same link and thus will be cut when the original note is cut.
     */
    Link?: string;
}
