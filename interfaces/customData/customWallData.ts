import { vec2, vec3, vec4 } from "../../types/vectors";

export default interface ICustomWallData {
    /**
     * The track to be used for controlling the wall with events.
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
    track?: string | string[];
    /**
     * The color of the wall.
     * 
     * Usage: `[r, g, b, a]`
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_color": [number, number, number, number] }
     * ```
     * #### V3
     * ```json
     * { "color": [number, number, number, number] }
     * ```
     */
    color?: vec4;
    /**
     * The position of the wall.
     * 
     * Usage: `[x, y]`
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_position": [number, number] }
     * ```
     * #### V3
     * ```json
     * { "coordinates": [number, number] }
     * ```
     */
    position?: vec2;
    /**
     * The rotation of the wall relative to the world origin.
     * 
     * Usage: `[pitch, yaw, roll]`
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_rotation": [number, number, number] }
     * ```
     * #### V3
     * ```json
     * { "worldRotation": [number, number, number] }
     * ```
     */
    rotation?: vec3;
    /**
     * The rotation of the wall relative to the wall's origin.
     * 
     * Usage: `[pitch, yaw, roll]`
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_localRotation": [number, number, number] }
     * ```
     * #### V3
     * ```json
     * { "localRotation": [number, number, number] }
     * ```
     */
    localRotation?: vec3;
    /**
     * The absolute size of the wall.
     * 
     * Usage: `[x, y, z]`
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_scale": [number, number, number] }
     * ```
     * #### V3
     * ```json
     * { "scale": [number, number, number] }
     * ```
     */
    scale?: vec3;
    /**
     * The njs of the wall.
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_noteJumpMovementSpeed": number }
     * ```
     * #### V3
     * ```json
     * { "noteJumpMovementSpeed": number }
     * ```
     */
    njs?: number;
    /**
     * The spawn offset of the wall.
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_noteJumpStartBeatOffset": number }
     * ```
     * #### V3
     * ```json
     * { "noteJumpStartBeatOffset": number }
     * ```
     */
    offset?: number;
    /**
     * Whether the waöö is fake or not.
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_fake": boolean }
     * ```
     * #### V3
     * In V3, this will move the note to the `fakeColorNotes` array under the `customData` object of the map.
     */
    fake?: boolean;
    /**
     * Whether the wall is interactable or not.
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_interactable": boolean }
     * ```
     * #### V3
     * ```json
     * { "uninteractable": !boolean }
     * ```
     * *PLEASE NOTE*: The `!` means that the value will be inverted in the JSON file. For example, if you set `interactable` to `false`, the JSON file will have `uninteractable` set to `true`.
     */
    interactable?: boolean;
} 