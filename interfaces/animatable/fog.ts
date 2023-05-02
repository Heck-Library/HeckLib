import { vec1anim } from "../../types/vectors";

/**
 * ### Bloom Fog Environment Animation
 * 
 * Interface for the fog component.
 * 
 * `attenuation` The attenuation of the fog.
 * `offset` The offset of the fog.
 * `startY` The start Y position of the fog.
 * `height` The height of the fog.
 */
export default interface IBloomFogEnvironmentAnimation {
    /**
     * ### Attenuation
     * 
     * The attenuation of the fog. This is the distance from the camera where the fog starts to fade in.
     * 
     * Type: `vec1anim`
     * 
     * ---
     * 
     * #### Usage
     * 
     * ```ts
     * attenuation = [
     *     [0, 0],
     *     [1, 1]
     * ];
     * ```
     */
    attenuation?: vec1anim;
    /**
     * ### Offset
     * 
     * The offset of the fog. No clue what it does, as it's not documented in the source code.
     * 
     * Type: `vec1anim`
     * 
     * ---
     * 
     * #### Usage
     * 
     * ```ts
     * offset = [
     *     [0, 0],
     *     [1, 1]
     * ];
     * ```
     */
    offset?: vec1anim;
    /**
     * ### Start Y
     * 
     * The start Y position of the fog. This is the Y position where the fog starts to fade in.
     * 
     * Type: `vec1anim`
     * 
     * ---
     * 
     * #### Usage
     * 
     * ```ts
     * startY = [
     *     [0, 0],
     *     [-1727, 1]
     * ];
     */
    startY?: vec1anim;
    /**
     * ### Height
     * 
     * The height of the fog.
     * 
     * Type: `vec1anim`
     * 
     * ---
     * 
     * #### Usage
     * 
     * ```ts
     * height = [
     *    [100, 0],
     *    [0, 1]
     * ];
     * ```
     */
    height?: vec1anim;
}