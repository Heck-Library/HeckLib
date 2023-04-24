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
    duration: number;
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
     * Usage:
     * ```ts
     * event.data.position = [
     *     [0, 0, 0, 0],
     *     [0, 5, 0, 1, ease.Out.Cubic]
     * ];
     * ```
     * or
     * ```ts
     * new AnimateTrack(0, {
     *     position: [
     *         [0, 0, 0, 0],
     *         [0, 5, 0, 1, ease.Out.Cubic]
     *     ]
     * }).push();
     * ```
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
     * ## Offset Position
     */
    offsetPosition?: vec3anim;
    /**
     * The local position animation.
     */
    localPosition?: vec3anim;
    /**
     * The rotation animation.
     */
    rotation?: vec3anim;
    offsetWorldRotation?: vec3anim;
    /**
     * The local rotation animation.
     */
    localRotation?: vec3anim;
    /**
     * The scale animation.
     */
    scale?: vec3anim;
    /**
     * The color animation.
     */
    color?: vec4anim;
    /**
     * The dissolve animation.
     */
    dissolve?: vec1anim;
    /**
     * The dissolve arrow animation.
     */
    dissolveArrow?: vec1anim;
    /**
     * The interactable animation.
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
