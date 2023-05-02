import { vec3, vec4 } from "../../types/vectors";

export default interface ILightCustomData {
    /**
     * ### Light ID
     * 
     * The ID(s) to control with the event.
     * 
     * Type: `number | number[]`
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * "_lightID": number | number[]
     * ```
     * #### V3
     * ```json
     * "lightID": number | number[]
     * ```
     */
    lightID?: number | number[];
    /**
     * ### Color
     * 
     * The color of the light event.
     * 
     * Type: `vec3 | vec4`
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * "_color": vec3 | vec4
     * ```
     * #### V3
     * ```json
     * "color": vec3 | vec4
     * ```
     */
    color?: vec3 | vec4;
    /**
     * ### Easing
     * 
     * The easing of the light event. (Used in laser movement only)
     * 
     * You can use the `ease` enum for setting this value.
     * 
     * Type: `string`
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * "_easing": string
     * ```
     * #### V3
     * ```json
     * "easing": string
     * ```
     */
    easing?: string;
    /**
     * ### Lerp Type
     * 
     * The lerp type of the light event.
     * 
     * Type: `"HSV" | "RGB"`
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * "_lerpType": "HSV" | "RGB"
     * ```
     * #### V3
     * ```json
     * "lerpType": "HSV" | "RGB"
     * ```
     */
    lerpType?: "HSV" | "RGB";
    /**
     * ### Lock position
     * 
     * Whether or not to lock the position of the light event. (This is used in laser movement only)
     * 
     * Type: `boolean`
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * "_lockPosition": boolean
     * ```
     * #### V3
     * ```json
     * "lockRotation": boolean
     * ```
     */
    lockPosition?: boolean;
    /**
     * ### Name Filter
     * 
     * The name filter of the light event.
     * 
     * Type: `string`
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * "_nameFilter": string
     * ```
     * #### V3
     * ```json
     * "nameFilter": string
     * ```
     */
    nameFilter?: string;
    /**
     * ### Rotation
     * 
     * The added rotation to the rings. (Used in ring rotation only)
     */
    rotation?: number;
    /**
     * ### Step
     * 
     * The step value of the ring event. This is used to control the distance between the rings. In other words, this is the distance between the rings.
     * 
     * In ring rotation, this is the rotation value between each ring.
     * 
     * In ring zoom, this is the distance between each ring.
     * 
     * Type: `number`
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * "_step": number
     * ```
     * #### V3
     * ```json
     * "step": number
     * ```
     */
    step?: number;
    /**
     * ### Prop
     * 
     * The prop value of the ring event. This is used to control the propagation of the rings. In other words, this controls how fast the next ring should be affected.
     * 
     * Type: `number`
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * "_prop": number
     * ```
     * #### V3
     * ```json
     * "prop": number
     * ```
     */
    prop?: number;
    /**
     * ### Speed
     * 
     * The speed value of the ring or laser event. This is used to control the speed of the rings or lasers.
     * 
     * Type: `number`
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * "_speed": number
     * ```
     * #### V3
     * ```json
     * "speed": number
     * ```
     */
    speed?: number;
    /**
     * ### Direction
     * 
     * The direction value of the ring or laser event. This is used to control the direction of the rings or lasers. (0 = clockwise, 1 = counter-clockwise)
     * 
     * You can use the `DIRECTION` enum for setting this value.
     * 
     * Type: `0 | 1`
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * "_direction": 0 | 1
     * ```
     * #### V3
     * ```json
     * "direction": 0 | 1
     * ```
     */
    direction?: 0 | 1;
};