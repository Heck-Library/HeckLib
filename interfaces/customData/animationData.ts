import { vec1anim, vec3anim, vec4anim } from "../../types/vectors";

export default interface IObjectAnimation {
    /**
     * The position offset of the object in `[x, y, z]` format.
     * 
     * Usage:
     * ```ts
     * position: [
     *     [0, 10, 0, 0],
     *     [0, 0, 0, 0.45, ease.Out.Circ]
     * ];
     * ```
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_position": [
     *     [0, 10, 0, 0],
     *     [0, 0, 0, 0.45, ease.Out.Circ]
     * ] }
     * ```
     * #### V3
     * ```json
     * { "offsetPosition": [
     *     [0, 10, 0, 0],
     *     [0, 0, 0, 0.45, ease.Out.Circ]
     * ] }
     * ```
     */
    position?: vec3anim;
    /**
     * The absolute position of the object in `[x, y, z]` format.
     * 
     * Usage:
     * ```ts
     * definitePosition: [
     *     [0, 10, 0, 0],
     *     [0, 0, 0, 0.45, ease.Out.Circ]
     * ];
     * ```
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_definitePosition": [
     *     [0, 10, 0, 0],
     *     [0, 0, 0, 0.45, ease.Out.Circ]
     * ] }
     * ```
     * #### V3
     * ```json
     * { "definitePosition": [
     *     [0, 10, 0, 0],
     *     [0, 0, 0, 0.45, ease.Out.Circ]
     * ] }
     * ```
     */
    definitePosition?: vec3anim;
    /**
     * The rotation offset of the object relative to the world origin in `[pitch, yaw, roll]` format.
     * 
     * Usage:
     * ```ts
     * rotation: [
     *     [0, 90, 0, 0],
     *     [0, 0, 0, 0.125, ease.Out.Circ]
     * ];
     * ```
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_rotation": [
     *     [0, 90, 0, 0],
     *     [0, 0, 0, 0.125, ease.Out.Circ]
     * ] }
     * ```
     * #### V3
     * ```json
     * { "offsetWorldRotation": [
     *     [0, 90, 0, 0],
     *     [0, 0, 0, 0.125, ease.Out.Circ]
     * ] }
     * ```
     */
    rotation?: vec3anim;
    /**
     * The rotation offset of the object relative to the object's origin in [pitch, yaw, roll] format.
     * 
     * Usage:
     * ```ts
     * localRotation: [
     *     [0, 90, 0, 0],
     *     [0, 0, 0, 0.25, ease.Out.Circ]
     * ];
     * ```
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_localRotation": [
     *     [0, 90, 0, 0],
     *     [0, 0, 0, 0.25, ease.Out.Circ]
     * ] }
     * ```
     * #### V3
     * ```json
     * { "localRotation": [
     *     [0, 90, 0, 0],
     *     [0, 0, 0, 0.25, ease.Out.Circ]
     * ] }
     * ```
     */
    localRotation?: vec3anim;
    /**
     * The scale of the object where the first 3 values are the scale and the last value is the time.
     * When the `x, y, z` values are all set to `1`, the object will be at its original size.
     * 
     * Usage:
     * ```ts
     * scale: [
     *     [2, 2, 2, 0],
     *     [1, 1, 1, 1, ease.Out.Circ]
     * ];
     * ```
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_scale": [
     *     [2, 2, 2, 0],
     *     [1, 1, 1, 1, ease.Out.Circ]
     * ] }
     * ```
     * #### V3
     * ```json
     * { "scale": [
     *     [2, 2, 2, 0],
     *     [1, 1, 1, 1, ease.Out.Circ]
     * ] }
     * ```
     */
    scale?: vec3anim;
    /**
     * The color of the object in `[r, g, b, a]` format.
     * 
     * Usage:
     * ```ts
     * color: [
     *     [1, 0, 0, 1, 0],
     *     [0, 1, 0, 1, 1, ease.Out.Cubic]
     * ];
     * ```
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_color": [
     *     [1, 0, 0, 1, 0],
     *     [0, 1, 0, 1, 1, ease.Out.Cubic]
     * ] }
     * ```
     * #### V3
     * ```json
     * { "color": [
     *     [1, 0, 0, 1, 0],
     *     [0, 1, 0, 1, 1, ease.Out.Cubic]
     * ] }
     * ```
     */
    color?: vec4anim;
    /**
     * Whether the object is interactable or not.
     * 
     * When the value is 0, the object is not interactable.
     * When the value is 1, the object is interactable.
     * Anything in between will be unpredictable and should not be used.
     * 
     * Because the in-between values cause unexpected behaviour, it is recommended to use the `ease.Step` easing.
     * 
     * Usage:
     * ```ts
     * interactable: [
     *     [0, 0],
     *     [1, 1, ease.Step]
     * ];
     * ```
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_interactable": [
     *     [0, 0],
     *     [1, 1, ease.Step]
     * ] }
     * ```
     * #### V3
     * ```json
     * { "interactable": [
     *     [0, 0],
     *     [1, 1, ease.Step]
     * ] }
     * ```
     */
    interactable?: vec1anim;
    /**
     * The opacity of the object in `[opacity, time]` format.
     * 
     * The opacity is a value between 0 and 1.
     * Anything outside of that range will be capped to 0 or 1 respectively.
     * However, because the range is capped, it is encouraged to stay between 0 and 1 if possible.
     * 
     * Usage:
     * ```ts
     * dissolve: [
     *     [0, 0],
     *     [1, 1, ease.Out.Sine]
     * ];
     * ```
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_dissolve": [
     *     [0, 0],
     *     [1, 1, ease.Out.Sine]
     * ] }
     * ```
     * #### V3
     * ```json
     * { "dissolve": [
     *     [0, 0],
     *     [1, 1, ease.Out.Sine]
     * ] }
     * ```
     */
    dissolve?: vec1anim;
    /**
     * The opacity of the object's arrow (if it has one) in `[opacity, time]` format.
     * 
     * The opacity is a value between 0 and 1.
     * Anything outside of that range will be capped to 0 or 1 respectively.
     * However, because the range is capped, it is encouraged to stay between 0 and 1 if possible.
     * 
     * Usage:
     * ```ts
     * dissolveArrow: [
     *     [0, 0],
     *     [1, 1, ease.InOut.Sine]
     * ];
     * ```
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_dissolveArrow": [
     *     [0, 0],
     *     [1, 1, ease.InOut.Sine]
     * ] }
     * ```
     * #### V3
     * ```json
     * { "dissolveArrow": [
     *     [0, 0],
     *     [1, 1, ease.InOut.Sine]
     * ] }
     * ```
     */
    dissolveArrow?: vec1anim;
}