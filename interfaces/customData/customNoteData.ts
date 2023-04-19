import { vec2, vec3, vec4 } from "../../types/vectors";

export default interface ICustomData {
    /**
     * The track to be used for controlling the note with events.
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
     * The color of the note.
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
     * The position of the note.
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
     * The rotation of the note relative to the world origin.
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
     * The rotation of the note relative to the note's origin.
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
     * Kind of the same animation as the swapping on cross-overs.
     * 
     * Example here: {@link https://streamable.com/9o2puz}
     * 
     * Usage: `[flip lineIndex, flip jump]` where `flip lineIndex` is the line index where the note jumps from to the actual `lineIndex` and `flip jump` is how high the note jumps.
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_flip": [number, number] }
     * ```
     * #### V3
     * ```json
     * { "flip": [number, number] }
     * ```
     */
    flip?: vec2;
    /**
     * The size of the note.
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
     * The note jump speed of the note.
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
     * The note jump start beat offset of the note.
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
     * Whether the note is fake or not.
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
     * Whether the note is interactable or not.
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
    /**
     * Disables the note's spawning animation where it "jumps up" upon spawning.
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_disableNoteGravity": boolean }
     * ```
     * #### V3
     * ```json
     * { "disableNoteGravity": boolean }
     * ```
     */
    disableNoteGravity?: boolean;
    /**
     * Disables the note's look animation where it attempts to face the player at all times.
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * { "_disableNoteLook": boolean }
     * ```
     * #### V3
     * ```json
     * { "disableNoteLook": boolean }
     * ```
     */
    disableNoteLook?: boolean;
}