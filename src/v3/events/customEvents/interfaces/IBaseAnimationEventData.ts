import { Ease } from "../../../../util/easings";
import { PositionAnimation, Vec3Animation, Vec1Animation, ColorAnimation } from "../../../../util/vec";

export interface IBaseAnimationEventData {
    /**
     * ## Duration
     *
     * `duration` is a `number` property in the customData of an event that specifies how long the animation should last. (in beats)
     */
    Duration?: number;
    /**
     * ## Easing
     *
     * `easing` is an `Ease` property in the customData of an event that specifies the easing function to use for the animation.
     *
     * If not specified, the animation will be linear.
     *
     * ---
     *
     * ### Values
     *
     * The values can be previewed at [easings.net](https://easings.net/).
     *
     * These are all the possible values for `easing` from the `Ease` enum:
     *
     * - `Ease.InQuad`
     * - `Ease.OutQuad`
     * - `Ease.InOutQuad`
     * - `Ease.InCubic`
     * - `Ease.OutCubic`
     * - `Ease.InOutCubic`
     * - `Ease.InQuart`
     * - `Ease.OutQuart`
     * - `Ease.InOutQuart`
     * - `Ease.InQuint`
     * - `Ease.OutQuint`
     * - `Ease.InOutQuint`
     * - `Ease.InSine`
     * - `Ease.OutSine`
     * - `Ease.InOutSine`
     * - `Ease.InExpo`
     * - `Ease.OutExpo`
     * - `Ease.InOutExpo`
     * - `Ease.InCirc`
     * - `Ease.OutCirc`
     * - `Ease.InOutCirc`
     * - `Ease.InElastic`
     * - `Ease.OutElastic`
     * - `Ease.InOutElastic`
     * - `Ease.InBack`
     * - `Ease.OutBack`
     * - `Ease.InOutBack`
     * - `Ease.InBounce`
     * - `Ease.OutBounce`
     * - `Ease.InOutBounce`
     * - `Ease.Step`
     * - `Ease.Linear`
     */
    Easing?: Ease;
    /**
     * ## [OffsetPosition](https://heck.aeroluna.dev/animation/properties/#offsetposition)
     *
     * `OffsetPosition` is a PositionAnimation property in the customData of an event that specifies the position offset of the object.
     *
     * This is a relative position offset, meaning it will move the object from its current position.
     *
     * **Note:** Even though the position is relative, assigning multiple `AnimateTracks` with `OffsetPosition` will not stack the offsets and will only use the last one.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * new AnimateTrack(0, {
     *     Track: "track1",
     *     Duration: 4,
     *     OffsetPosition: [
     *         [0, -4, -10, 0],
     *         [0, 0, 0, 0.475, Ease.OutBack]
     *     ]
     * }).Push(); // This would move the object from its current position to 4 units down and 10 units back and return back to its original position in 4 beats.
     * ```
     */
    OffsetPosition?: PositionAnimation;
    /**
     * ## [OffsetWorldRotation](https://heck.aeroluna.dev/animation/properties/#offsetworldrotation)
     *
     * `OffsetWorldRotation` is a Vec3Animation property in the customData of an event that specifies the world rotation offset of the object.
     *
     * As the name suggests, this property is relative to the world origin and not the object's current rotation.
     *
     * **Note:** Even though the rotation is relative, assigning multiple `AnimateTracks` with `OffsetWorldRotation` will not stack the offsets and will only use the last one.
     *
     * ---
     *
     * ### Warning
     *
     * Rotations are internally calculated quaternions to prevent gimbal lock. Rather than representing a set of rotations like euler, quaternions represent an orientation. In other words, [[0, 0, 0, 0], [360, 360, 360, 1]] will have no movement at all, as both points are identical internally.
     *
     * This can be fixed by splitting your rotation into multiple parts, for example instead of:
     *
     * ```ts
     * [
     *     [0, 120, 0, 0],
     *     [0, 720, 0, 1]
     * ]
     * ```
     *
     * You can use a formula to calculate the rotation where:
     *
     * ```ts
     * const r = 120;                  // start rotation (only needed if not 0)
     * const d = 720 - r;              // difference (where 720 is the final rotation)
     * const n = Math.floor(d / 90);   // number of keyframes
     * const s = d / n;                // step (how much to rotate each keyframe)
     *
     * const keyframes = [];
     * for (let i = 0; i <= n; i++) {
     *     keyframes.push([0, r + i * s, 0, i / n]);
     * }
     * ```
     *
     * Output:
     *
     * ```ts
     * keyframes = [
     *   [ 120, 0, 0, 0 ],
     *   [ 220, 0, 0, 0.166 ],
     *   [ 320, 0, 0, 0.333 ],
     *   [ 420, 0, 0, 0.5 ],
     *   [ 520, 0, 0, 0.666 ],
     *   [ 620, 0, 0, 0.833 ],
     *   [ 720, 0, 0, 1 ]
     * ]
     * ```
     *
     * This would generate an array of keyframes that rotate the object from its current rotation to 720 degrees from a start rotation of 120 and assign it to the variable `keyframes`.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * new AnimateTrack(0, {
     *     Track: "track1",
     *     Duration: 4,
     *     OffsetWorldRotation: [
     *         [0, 0, 0, 0],
     *         [0, 180, 0, 0.475, Ease.OutCirc]
     *     ]
     * }).Push(); // This would rotate the object 180 degrees around the Y axis in 4 beats.
     * ```
     */
    OffsetWorldRotation?: Vec3Animation;
    /**
     * ## [LocalRotation](https://heck.aeroluna.dev/animation/properties/#localrotation)
     *
     * `LocalRotation` is a Vec3Animation property in the customData of an event that describes the local rotation offset of an object. This means it is rotated with itself as the origin. Uses euler values. Do note that the note spawn effect will be rotated accordlingly.
     *
     * ---
     *
     * ### Warning
     *
     * Rotations are internally calculated quaternions to prevent gimbal lock. Rather than representing a set of rotations like euler, quaternions represent an orientation. In other words, [[0, 0, 0, 0], [360, 360, 360, 1]] will have no movement at all, as both points are identical internally.
     *
     * This can be fixed by splitting your rotation into multiple parts, for example instead of:
     *
     * ```ts
     * [
     *     [0, 120, 0, 0],
     *     [0, 720, 0, 1]
     * ]
     * ```
     *
     * You can use a formula to calculate the rotation where:
     *
     * ```ts
     * const r = 120;                  // start rotation (only needed if not 0)
     * const d = 720 - r;              // difference (where 720 is the final rotation)
     * const n = Math.floor(d / 90);   // number of keyframes
     * const s = d / n;                // step (how much to rotate each keyframe)
     *
     * const keyframes = [];
     * for (let i = 0; i <= n; i++) {
     *     keyframes.push([0, r + i * s, 0, i / n]);
     * }
     * ```
     *
     * Output:
     *
     * ```ts
     * keyframes = [
     *   [ 120, 0, 0, 0 ],
     *   [ 220, 0, 0, 0.166 ],
     *   [ 320, 0, 0, 0.333 ],
     *   [ 420, 0, 0, 0.5 ],
     *   [ 520, 0, 0, 0.666 ],
     *   [ 620, 0, 0, 0.833 ],
     *   [ 720, 0, 0, 1 ]
     * ]
     * ```
     *
     * This would generate an array of keyframes that rotate the object from its current rotation to 720 degrees from a start rotation of 120 and assign it to the variable `keyframes`.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * new AnimateTrack(0, {
     *     Track: "track1",
     *     Duration: 1,
     *     LocalRotation: [
     *         [0, 0, 0, 0],
     *         [0, 0, 90, 0.5],
     *         [0, 0, 180, 1]
     *     ]
     * }).Push(); // This would rotate the object from its default rotation to facing upsode down in 1 beat.
     * ```
     */
    LocalRotation?: Vec3Animation;
    /**
     * ## [Scale](https://heck.aeroluna.dev/animation/properties/#scale)
     *
     * `Scale` is a Vec3Animation property in the customData of an event that specifies the scale of the object.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * new AnimateTrack(0, {
     *     Track: "track1",
     *     Duration: 4,
     *     Scale: [
     *         [2, 2, 2, 0],
     *         [1, 1, 1, 1, Ease.OutCirc]
     *     ]
     * }).Push(); // This would scale the object from 2x size to normal size in 4 beats.
     * ```
     */
    Scale?: Vec3Animation;
    /**
     * ## [Dissolve](https://heck.aeroluna.dev/animation/properties/#dissolve)
     *
     * `Dissolve` is a Vec1Animation property in the customData of an event that specifies the dissolve value of the object.
     *
     * **Note:** This property will not dissolve the arrow of a note, use `DissolveArrow` for that.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * new AnimateTrack(0, {
     *     Track: "track1",
     *     Duration: 4,
     *     Dissolve: [
     *         [1, 0],
     *         [0, 1]
     *     ]
     * }).Push(); // This would dissolve the object from fully opaque to fully transparent in 4 beats.
     * ```
     */
    Dissolve?: Vec1Animation;
    /**
     * ## [DissolveArrow](https://heck.aeroluna.dev/animation/properties/#dissolvearrow)
     *
     * `DissolveArrow` is a Vec1Animation property in the customData of an event that specifies the dissolve value of the arrow of a note.
     *
     * **Note:** This property will not dissolve the note itself, use `Dissolve` for that.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * new AnimateTrack(0, {
     *     Track: "track1",
     *     Duration: 4,
     *     DissolveArrow: [
     *         [1, 0],
     *         [0, 1]
     *     ]
     * }).Push(); // This would dissolve the arrow of the object from fully opaque to fully transparent in 4 beats.
     * ```
     */
    DissolveArrow?: Vec1Animation;
    /**
     * ## [Color](https://heck.aeroluna.dev/animation/properties/#color)
     *
     * `Color` is a ColorAnimation property in the customData of an event that specifies the color of the object.
     * 
     * Describes the color of an object. Will override any other color the object may have had.
     * 
     * `Color` is on a scale from 0 to 1, and NOT 0 to 255.
     * 
     * Multiple of this property will be multiplied together.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * new AnimateTrack(0, {
     *     Track: "track1",
     *     Duration: 4,
     *     Color: [
     *         [1, 0, 0, 1],
     *         [0, 1, 0, 1, Ease.OutCirc]
     *     ]
     * }).Push(); // This would change the color of the object from red to green in 4 beats.
     * ```
     */
    Color?: ColorAnimation;
    /**
     * ## [Interactable](https://heck.aeroluna.dev/animation/properties/#interactable)
     *
     * `Interactable` may be used in both `AnimateTrack` and `AssignPathAnimation`
     *
     * This property controls whether or not the player can interact with the note/wall.
     *
     * `interactable` either is or isn't, there is no in-between. When greater than or equal to 1, the object can fully be interacted with. When less than 1, the object cannot be interacted with at all.
     *
     * Multiple of this property will be multiplied together.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * new AnimateTrack(0, {
     *     Track: "track1",
     *     Duration: 4,
     *     Interactable: [
     *         [1, 0],
     *         [0, 1, Ease.Step]
     *     ]
     * }).Push(); // This would make the object not interactable in 4 beats.
     * ```
     */
    Interactable?: Vec1Animation;
}
