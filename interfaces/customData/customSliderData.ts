import { vec2, vec3, vec4 } from "../../types/vectors";

export default interface ICustomSliderData {
    /**
     * The track to be used for controlling the slider with events.
     * 
     * This can be a string or an array of strings.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "track": string | string[] }
     * ```
     */
    track?: string | string[];
    /**
     * The color of the slider.
     * 
     * Usage: `[r, g, b, a]`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "color": [number, number, number, number] }
     * ```
     */
    color?: vec4;
    /**
     * The position of the slider.
     * 
     * Usage: `[x, y]`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "coordinates": [number, number] }
     * ```
     */
    position?: vec2;
    /**
     * The position of the slider tail.
     * 
     * Usage: `[x, y]`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "tailCoordinates": [number, number] }
     * ```
     */
    tailPosition?: vec2;
    /**
     * The rotation of the slider relative to the world origin.
     * 
     * Usage: `[pitch, yaw, roll]`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "worldRotation": [number, number, number] }
     * ```
     */
    rotation?: vec3;
    /**
     * The rotation of the slider relative to the slider's origin.
     * 
     * Usage: `[pitch, yaw, roll]`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "localRotation": [number, number, number] }
     * ```
     */
    localRotation?: vec3;
    /**
     * The scale of the slider.
     * 
     * Usage: `[x, y, z]`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "scale": [number, number, number] }
     * ```
     */
    scale?: vec3;
    /**
     * The note jump speed of the slider.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "noteJumpMovementSpeed": number }
     * ```
     */
    njs?: number;
    /**
     * The note jump start beat offset of the slider.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "noteJumpStartBeatOffset": number }
     * ```
     */
    offset?: number;
    /**
     * Whether the slider is fake or not.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * In V3, this will move the note to the `fakeColorNotes` array under the `customData` object of the map.
     */
    fake?: boolean;
    /**
     * Whether the slider is interactable or not.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "uninteractable": !boolean }
     * ```
     * *PLEASE NOTE*: The `!` means that the value will be inverted in the JSON file. For example, if you set `interactable` to `false`, the JSON file will have `uninteractable` set to `true`.
     */
    interactable?: boolean;
    /**
     * Disables the flash that appears upon spawning the note.
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_disableSpawnEffect": boolean }
     * ```
     * #### V3
     * ```json
     * { "spawnEffect": !boolean }
     * ```
     * *PLEASE NOTE*: The `!` means that the value will be inverted in the JSON file. For example, if you set `interactable` to `false`, the JSON file will have `uninteractable` set to `true`. 
     */
    disableSpawnEffect?: boolean;
}