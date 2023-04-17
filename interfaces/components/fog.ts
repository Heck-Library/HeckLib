
/**
 * Interface for the fog component.
 * @interface
 * @name IBloomFogEnvironment
 * 
 * @property {number} [attenuation] The attenuation of the fog.
 * @property {number} [offset] The offset of the fog.
 * @property {number} [startY] The start Y position of the fog.
 * @property {number} [height] The height of the fog.
 */
export default interface IBloomFogEnvironment {
    attenuation?: number;
    offset?: number;
    startY?: number;
    height?: number;
}