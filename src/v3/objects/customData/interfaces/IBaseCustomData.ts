import { Vec2, Vec3, Color } from "../../../../util/vec";
import { IPathAnimationData } from "../../../events/customEvents/interfaces/IPathAnimationData";


export interface IBaseCustomData {
    /**
     * ## Track
     *
     * Tracks are a powerful tool integrated by Heck that allow you to group objects together and control them.
     * Tracks hold information in the form of properties,
     * then anything on the track can use that information to control, for example, their position or rotation.
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
     * notes.select({StartBeat: 0, EndBeat: 16}).forEach(n => {
     *     n.CustomData.Track = "track1";
     *     // Or
     *     n.CustomData.Track = ["track1", "testTrack2", ...]; // You can have multiple tracks
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
    Track?: string | string[];
    /**
     * ## Coordinates
     *
     * `coordinates` is a `Vec2` property in the customData of the object you want to give said coordinates to.
     *
     * It can be placed on any object in the `obstacles`, `colorNotes`, `bombNotes`, `sliders`, or `burstSliders` arrays.
     *
     * This property is not the same as the `X` and `Y` properties of the object, which are used to determine the position of the object in the game.
     *
     * Coordinates are used to override the `X` and `Y` properties of the object to allow for more precise positioning of the object.
     *
     * This can be placed as high as the game can handle, but it is recommended to keep it between -2 and 2.
     *
     * This property is based off of the [BeatWalls](https://camo.githubusercontent.com/e4836972f913049b30d4ae2fc3c590e3510acd0018cd553dc70e731e2b6c0f76/68747470733a2f2f692e696d6775722e636f6d2f557a37614944672e706e673d31303078313030) coordinate system rather than the one made by Beat Games.
     * This means that the significant difference between the game's system and this system is that the X position is off by 2 units to the right.
     * This can be countered by subtracting 2 from the X position like this:
     *
     * ```ts
     * notes.select({startBeat: 0, endBeat: 16}).forEach(n => {
     *     n.customData.coordinates = [n.X - 2, n.Y];
     * });
     * ```
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * notes.select({
     *     StartBeat: 4,
     *     EndBeat: 18
     * }).forEach(n => {
     *     for (let i = -1; i <= 1; i += 2) {
     *         const dupe = n.Duplicate();
     *         dupe.CustomData.Coordinates = [n.X - 2 + (i * 4), n.Y];
     *         dupe.CustomData.Link = `${n.Beat},${n.X},${n.Y}`;
     *         dupe.CustomData.Uninteractable = true;
     *         fakeNotes.Push(dupe);
     *     }
     * });
     * ```
     *
     * This would duplicate all notes in the `notes` array that are between beats 4 and 18, then move them to the left and right by 4 units and make them uninteractable, linking them to the original note so that they also get cut when the original note is cut. And then push them to the `FakeColorNotes` array.
     *
     * #### Explanation
     *
     * - `notes.select({startBeat: 4, endBeat: 18})` selects all notes in the `notes` array that are between beats 4 and 18.
     * - `const dupe = n.Duplicate();` duplicates the note and assigns the duplicate to the `dupe` variable.
     * - `dupe.CustomData.Coordinates = [n.X - 2 + (i * 4), n.Y];` sets the coordinates of the duplicate to the original note's X position minus 2 plus the iteration value times 4 and the original note's Y position.
     * - `dupe.CustomData.Link = `${n.Beat},${n.X},${n.Y}`;` sets the link of the duplicate to the original note's beat, X position, and Y position.
     * - `dupe.CustomData.Uninteractable = true;` makes the duplicate uninteractable.
     * - `fakeNotes.Push(dupe);` pushes the note to the fake notes.
     */
    Coordinates?: Vec2;
    /**
     * ## World Rotation
     *
     * `worldRotation` is a `Vec3` or `number` property in the customData of the object you want to give said world rotation to.
     *
     * It can be placed on any object in the `obstacles`, `colorNotes`, `bombNotes`, `sliders`, or `burstSliders` arrays.
     *
     * This property is used to rotate the object in the world space. This means that the object will rotate around the center of the map rather than around it's own origin.
     * (If you're looking for a way to rotate the object around it's own origin, use the `LocalRotation` property instead.)
     *
     * The `Vec3` property is used to rotate the object in the X, Y, and Z axes.
     *
     * The `number` property is used to rotate the object in the Y axis alone.
     *
     * The rotation is in degrees.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * notes.select({startBeat: 0, endBeat: 16}).forEach(n => {
     *     n.CustomData.WorldRotation = 90;
     * });
     * ```
     *
     * This would rotate all notes in the `notes` array that are between beats 0 and 16 by 90 degrees to the right.
     */
    WorldRotation?: Vec3 | number;
    /**
     * ## Local Rotation
     *
     * `localRotation` is a `Vec3` property in the customData of the object you want to give said local rotation to.
     *
     * It can be placed on any object in the `obstacles`, `colorNotes`, `bombNotes`, `sliders`, or `burstSliders` arrays.
     *
     * This property is used to rotate the object in the local space. This means that the object will rotate around it's own origin rather than around the center of the map.
     * (If you're looking for a way to rotate the object in the world space, use the `WorldRotation` property instead.)
     *
     * The rotation is in degrees.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * notes.select({startBeat: 0, endBeat: 16}).forEach(n => {
     *     n.CustomData.LocalRotation = [Random(-180, 180), Random(-180, 180), Random(-180, 180)];
     * });
     * ```
     *
     * This would rotate all notes in the `notes` array that are between beats 0 and 16 by a random amount in the X, Y, and Z axes. The rotation would be different for each note.
     */
    LocalRotation?: Vec3;
    /**
     * ## Scale
     *
     * `scale` is a `Vec3` property in the customData of the object you want to give said scale to.
     *
     * It can be placed on any object in the `obstacles`, `colorNotes`, `bombNotes`, `sliders`, or `burstSliders` arrays.
     *
     * This property is used to scale the object in the X, Y, and Z axes.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * notes.select({startBeat: 0, endBeat: 16}).forEach(n => {
     *     n.CustomData.Scale = [2, 2, 2];
     * });
     * ```
     *
     * This would scale all notes in the `notes` array that have a start beat between 0 and 16 by 2x in all axes.
     */
    Scale?: Vec3;
    /**
     * ## Note Jump Speed
     *
     * `NJS` is a `number` property in the customData of the object you want to give said note jump speed to.
     *
     * It can be placed on any object in the `obstacles`, `colorNotes`, `bombNotes`, `sliders`, or `burstSliders` arrays.
     *
     * This property is used to set the note jump speed of the object.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * notes.select({startBeat: 0, endBeat: 16}).forEach(n => {
     *     n.CustomData.NJS = 10;
     * });
     * ```
     *
     * This would set the note jump speed of all notes in the `notes` array that are between beats 0 and 16 to 10.
     */
    NJS?: number;
    /**
     * ## Offset
     *
     * `Offset` is a `number` property in the customData of the object you want to give said note jump offset to.
     *
     * It can be placed on any object in the `obstacles`, `colorNotes`, `bombNotes`, `sliders`, or `burstSliders` arrays.
     *
     * This property is used to set the note jump start beat offset of the object.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * notes.select({startBeat: 0, endBeat: 16}).forEach(n => {
     *     n.CustomData.Offset = 4;
     * });
     * ```
     *
     * This would set the note jump start beat offset of all notes in the `notes` array that are between beats 0 and 16 to 4.
     */
    Offset?: number;
    /**
     * ## Uninteractable
     *
     * `Uninteractable` is a `boolean` property in the customData of the object you want to make uninteractable.
     *
     * It can be placed on any object in the `obstacles`, `colorNotes`, `bombNotes`, `sliders`, or `burstSliders` arrays.
     *
     * This property is used to make the object uninteractable.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * notes.select({startBeat: 0, endBeat: 16}).forEach(n => {
     *     n.CustomData.Uninteractable = true;
     * });
     * ```
     *
     * This would make all notes in the `notes` array that are between beats 0 and 16 uninteractable.
     */
    Uninteractable?: boolean;
    /**
     * ## Color
     *
     * `Color` is a `Color` property in the customData of the object you want to give said color to. `Color` is a custom type that is essentially a `vec4` with a few additional properties from an actual `vec4`.
     *
     * It can be placed on any object in the `obstacles`, `colorNotes`, `bombNotes`, `sliders`, or `burstSliders` arrays.
     *
     * This property is used to set the color of the object.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * notes.select({startBeat: 0, endBeat: 16}).forEach(n => {
     *     n.CustomData.Color = Color.Red;
     * });
     * ```
     *
     * This would set the color of all notes in the `notes` array that are between beats 0 and 16 to red.
     */
    Color?: Color;
    /**
     * ## Animation
     *
     * `Animation` is an `ObjectAnimationData` property in the customData of the object you want to give said animation to.
     *
     * It can be placed on any object in the `obstacles`, `colorNotes`, `bombNotes`, `sliders`, or `burstSliders` arrays.
     *
     * This property is used to animate the object.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * notes.select({startBeat: 0, endBeat: 16}).forEach(n => {
     *     n.CustomData.Animation = {
     *         Scale: [
     *             [2, 2, 2, 0],
     *             [1, 1, 1, 0.5, Ease.OutCirc]
     *         ]
     *     });
     *     // OR
     *     n.Animation.Scale = [
     *         [2, 2, 2, 0],
     *         [1, 1, 1, 0.5, Ease.OutCirc]
     *     ];
     * });
     * ```
     *
     * This would animate all notes in the `notes` array that are between beats 0 and 16 to scale from 2x size when they spawn to normal size by the time they reach the player.
     *
     * **Note:** The animation time is set to `0.5` because `1` represents the end of the object's life which is way past the player.
     */
    Animation?: Partial<IPathAnimationData>;
}
