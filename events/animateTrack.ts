import IAnimateTrackData from "../interfaces/events/eventData/IAnimateTrackData";
import { vec1anim, vec3anim, vec4anim } from "../types/vectors";
import { MyBaseEvent } from "./baseEvent";

export default class AnimateTrack extends MyBaseEvent {
    /**
     * ## Type
     * 
     * The type of the event.
     * 
     * This is a `readonly` property and cannot be changed. It will always be `"AnimateTrack"`.
     */
    public readonly type: string = "AnimateTrack";
    /**
     * ## Data
     * 
     * The data for the event.
     * 
     * This is a `readonly` property. Please use the setters provided to change the values.
     */
    declare readonly data: IAnimateTrackData;

    //#region Getters and setters

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

    /**
     * ## Position
     * 
     * In V2 this is the position offset of the object or the absolute position of an environment object.
     * In V3 this is just for environment objects.
     * 
     * This is a `vec3anim`. Meaning it can be a single `vec3` or an array of `vec3` and a `time` value.
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_position": vec3anim }
     * ```
     * #### V3
     * ```json
     * { "position": vec3anim }
     * ```
     */
    get position(): vec3anim { return this.data.position; }
    set position(value: vec3anim) { this.data.position = value; }

    /**
     * ## Local Position
     */
    get localPosition(): vec3anim { return this.data.localPosition; }
    set localPosition(value: vec3anim) { this.data.localPosition = value; }

    /**
     * Describes the position offset of an object. It will continue any normal movement and have this stacked on top of it.
     * Track `offsetPosition` and path `offsetPosition` will be added together.
     * 
     * Note: This is only available in V3. In V2 this is just `position`.
     * 
     * This is a `vec3anim`. Meaning it can be a single `vec3` or an array of `vec3` and a `time` value.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "offsetPosition": vec3anim }
     * ```
     */
    get offsetPosition(): vec3anim { return this.data.offsetPosition; }
    set offsetPosition(value: vec3anim) { this.data.offsetPosition = value; }

    /**
     * ## Rotation
     * 
     * In V2 this is the rotation offset of the object or the absolute rotation of an environment object.
     * In V3 this is just for environment objects.
     * 
     * Track `rotation` and path `rotation` will be added together.
     * 
     * This is a `vec3anim`. Meaning it can be a single `vec3` or an array of `vec3` and a `time` value.
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_rotation": vec3anim }
     * ```
     * #### V3
     * ```json
     * { "rotation": vec3anim }
     * ```
     */
    get rotation(): vec3anim { return this.data.rotation; }
    set rotation(value: vec3anim) { this.data.rotation = value; }

    /**
     * ## Local Rotation
     * 
     * This property describes the local rotation offset of an object. This means it is rotated with itself as the origin. Uses euler values. Do note that the note spawn effect will be rotated accordlingly. Notes attempting to look towards the player may look strange, you can disable their look with `disableNoteLook`.
     * 
     * Track `localRotation` and path `localRotation` will be added together.
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_localRotation": vec3anim }
     * ```
     * #### V3
     * ```json
     * { "localRotation": vec3anim }
     * ```
     */
    get localRotation(): vec3anim { return this.data.localRotation; }
    set localRotation(value: vec3anim) { this.data.localRotation = value; }

    /**
     * ## Offset World Rotation
     * 
     * This property describes the world rotation offset of an object. This means it is rotated with the world as the origin. Uses euler values. Think of 360 mode.
     * 
     * Note: This is only available in V3. In V2 this is just `rotation`.
     * 
     * Track `offsetWorldRotation` and path `offsetWorldRotation` will be added together.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "offsetWorldRotation": vec3anim }
     * ```
     */
    get offsetWorldRotation(): vec3anim { return this.data.offsetWorldRotation; }
    set offsetWorldRotation(value: vec3anim) { this.data.offsetWorldRotation = value; }

    /**
     * ## Dissolve
     * 
     * This property controls the dissolve effect on both notes and walls. It's the effect that happens when things go away upon failing a song. Keep in mind that notes and the arrows on notes have seperate dissolve properties, see {@link dissolveArrow `dissolveArrow`} for the arrow dissolve.
     * 
     * This is a `vec1anim`. Meaning it can be a single `number` in an array or an array of `number` and a `time` value.
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_dissolve": vec1anim }
     * ```
     * #### V3
     * ```json
     * { "dissolve": vec1anim }
     * ```
     */
    get dissolve(): vec1anim { return this.data.dissolve; }
    set dissolve(value: vec1anim) { this.data.dissolve = value; }

    /**
     * ## Dissolve Arrow
     * 
     * This property controls the dissolve effect on the arrows of notes. Similar to the look of the disappearing notes modifier. This property has no effect on walls.
     * 
     * This is a `vec1anim`. Meaning it can be a single `number` in an array or an array of `number` and a `time` value.
     * 
     * Track `dissolveArrow` and path `dissolveArrow` will be multiplied together.
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_dissolveArrow": vec1anim }
     * ```
     * #### V3
     * ```json
     * { "dissolveArrow": vec1anim }
     * ```
     */
    get dissolveArrow(): vec1anim { return this.data.dissolveArrow; }
    set dissolveArrow(value: vec1anim) { this.data.dissolveArrow = value; }

    /**
     * ## Scale
     * 
     * Decribes the scale of an object. This will be based off their initial size. A scale of 1 is equal to normal size, anything under is smaller, over is larger. 
     * 
     * This is a `vec3anim`. Meaning it can be a single `vec3` or an array of `vec3` and a `time` value.
     * 
     * Track `scale` and path `scale` will be multiplied together.
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_scale": vec3anim }
     * ```
     * #### V3
     * ```json
     * { "scale": vec3anim }
     * ```
     */
    get scale(): vec3anim { return this.data.scale; }
    set scale(value: vec3anim) { this.data.scale = value; }

    /**
     * ## Color
     * 
     * Describes the color of an object. Will override any other color the object may have had.
     * 
     * Color is on a scale from 0 - 1, and NOT 0 - 255.
     * 
     * Track `color` and path `color` will be multiplied together.
     * 
     * This is a `vec4anim`. Meaning it can be a single `vec4` or an array of `vec4` and a `time` value.
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_color": vec4anim }
     * ```
     * #### V3
     * ```json
     * { "color": vec4anim }
     * ```
     */
    get color(): vec4anim { return this.data.color; }
    set color(value: vec4anim) { this.data.color = value; }

    /**
     * ## Interactable
     * 
     * This property controls whether or not the player can interact with the note/wall.
     * 
     * interactable either is or isn't, there is no inbetween. When great than or equal to 1, the object can fully be interacted with. When less than 1, the object cannot be interacted with at all.
     * 
     * This is good for making objects that are only interactable at certain times. Example of this would be randomized animations that make a note spawn behind the player so that the player can't accidentally hit it.
     * 
     * Track `interactable` and path `interactable` will be multiplied together.
     * 
     * This is a `vec1anim`. Meaning it can be a single `number` in an array or an array of `number` and a `time` value.
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_interactable": vec1anim }
     * ```
     * #### V3
     * ```json
     * { "interactable": vec1anim }
     * ```
     */
    get interactable(): vec1anim { return this.data.interactable; }
    set interactable(value: vec1anim) { this.data.interactable = value; }

    /**
     * ## Time Animation
     * 
     * `time` is relatively advanced so make sure to have a solid understanding of Noodle Extensions before delving into `time`. `time` can only be used in `AnimateTrack` as it lets you control what point in the note's "lifespan" it is at a given time using `AnimateTrack`.
     * 
     * It is worth noting that every object on one track will get the same time values when animating this property. This means they would suddenly appear to all be at the same point. **It is recommended for every object to have its own track when using `time`**.
     * 
     * Say you want a time AnimateTrack on an object that will make it behave normally for starters. You want the AnimateTrack to start right when the object spawns, meaning `time - halfJumpDuration` of the object. It's duration should be `halfJumpJuration * 2`. With this, the point definition of
     * ```ts
     * [
     *   [0, 0],
     *   [1, 1]
     * ]
     * ```
     * would behave as normal.
     * ```ts
     * [
     *   [0, 0],
     *   [0.45, 0.15],
     *   [0.15, 0.30],
     *   [0.5, 0.5],
     *   [1, 1]
     * ]
     * ```
     * would appear to go forwards, then backwards.
     * 
     * Note: If you intend to despawn an object using `time`, obstacles require a `time` that is `> 1` while note require a `time` that is `>= 1`.
     * 
     * This is a `vec1anim`. Meaning it can be a single `number` in an array or an array of `number` and a `time` value.
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_time": vec1anim }
     * ```
     * #### V3
     * ```json
     * { "time": vec1anim }
     * ```
     */
    get timeAnimation(): vec1anim { return this.data.time; }
    set timeAnimation(value: vec1anim) { this.data.time = value; }

    /**
     * ## Repeat
     * 
     * This property controls how many times the animation will repeat. This is useful for making animations that loop.
     * 
     * This is a number above 0. If this is not set, it will NOT repeat.
     */
    get repeat(): number { return this.data.repeat; }
    set repeat(value: number) { this.data.repeat = value; }
    //#endregion Getters and setters

    /**
     * ## AnimateTrack
     * 
     * AnimateTrack is an event that allows you to animate the properties of an object over time. This is done by using a `vec1anim`, `vec3anim`, or `vec4anim` to describe the property's value at a given time. It will control all events on the track simultaneously, if you want to have individual animations, use `AssignPathAnimation` or individually assign the animations with a `forEach` loop.
     * 
     * ---
     * 
     * Generates an `AnimateTrack` event using a time value.
     */
    constructor(time: number);
    /**
     * ## AnimateTrack
     * 
     * AnimateTrack is an event that allows you to animate the properties of an object over time. This is done by using a `vec1anim`, `vec3anim`, or `vec4anim` to describe the property's value at a given time. It will control all events on the track simultaneously, if you want to have individual animations, use `AssignPathAnimation` or individually assign the animations with a `forEach` loop.
     * 
     * ---
     * 
     * Generates an `AnimateTrack` event using a time value and a `IAnimateTrackData` object. `IAnimateTrackData` is used to describe the properties of the `AnimateTrack`. It includes the following properties:
     * 
     * - `track` - The name of the track to animate.
     * - `duration` - The duration of the animation.
     * - `localPosition` - The local position of the object.
     * - `position` - The position of the object.
     * - `offsetPosition` - The offset position of the object.
     * - `rotation` - The rotation of the object.
     * - `offsetWorldRotation` - The offset world rotation of the object.
     * - `localRotation` - The local rotation of the object.
     * - `dissolve` - The dissolve animation to assign to the track.
     * - `dissolveArrow` - The dissolve arrow animation to assign to the track.
     * - `scale` - The scale of the object.
     * - `color` - The color of the object.
     * - `interactable` - The interactability of the object.
     * - `time` - The time of the object. 
     */
    constructor(time: number, data: IAnimateTrackData);
    constructor(time: number, data?: IAnimateTrackData) {
        if (typeof data === 'undefined') data = {
            track: "",
            duration: 1
        };

        super(time, data);

        this.type = "AnimateTrack";
    }
}