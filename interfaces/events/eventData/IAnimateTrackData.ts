import { vec1anim, vec3anim, vec4anim } from "../../../types/vectors";

export default interface IAnimateTrackData {
    /**
     * ## Track
     * 
     * The track to be used for controlling the object with events.
     * 
     * This can be a string or an array of strings.
     * 
     * Usage:
     * ```ts
     * const event = new AnimateTrack(0);
     * const d = event.data;
     * d.track = "track1";
     * d.track = ["track1", "track2"];
     * ```
     * or
     * ```ts
     * new AnimateTrack(0, {
     *     track: "track1"
     * }).push();
     * ```
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
    track: string | string[];
    /**
     * ## Duration
     * 
     * Duration of the animation in beats.
     * 
     * This can be a number above 0.
     * 
     * Usage:
     * ```ts
     * event.data.duration = 1;
     * ```
     * or
     * ```ts
     * new AnimateTrack(0, {
     *    duration: 1
     * }).push();
     * ```
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
    duration?: number;
    /**
     * ## Easing
     * 
     * The easing used for the animation.
     * 
     * This can be a string from the `ease` enum or an easing string.
     * 
     * Usage:
     * ```ts
     * event.data.easing = "easeOutQuad";
     * event.data.easing = ease.Out.Quad;
     * ```
     * or
     * ```ts
     * new AnimateTrack(0, {
     *    easing: "easeOutQuad"
     * }).push();
     * ```
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
    easing?: string;
    /**
     * ## Position
     * 
     * In V2 this is the position offset of the object or the absolute position of an environment object.
     * In V3 this is just for environment objects.
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
    position?: vec3anim;
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
    offsetPosition?: vec3anim;
    /**
     * The local position animation.
     */
    localPosition?: vec3anim;
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
    rotation?: vec3anim;
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
    offsetWorldRotation?: vec3anim;
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
    localRotation?: vec3anim;
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
    scale?: vec3anim;
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
    color?: vec4anim;
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
    dissolve?: vec1anim;
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
    dissolveArrow?: vec1anim;
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
    interactable?: vec1anim;
    /**
     * The time animation.
     */
    time?: vec1anim;
    /**
     * The fog's startY value.
     */
    startY?: vec1anim;
    /**
     * Fog attenuation.
     */
    attenuation?: vec1anim;
    /**
     * Fog offset
     */
    offset?: vec1anim;
    /**
     * Fog height
     */
    height?: vec1anim;
};
