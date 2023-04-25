import { vec1anim } from "../../types/vectors";

/**
 * Interface for the fog component.
 * @interface
 * @name IBloomFogEnvironment
 * 
 * @property {vec1anim} [attenuation] The attenuation of the fog.
 * @property {vec1anim} [offset] The offset of the fog.
 * @property {vec1anim} [startY] The start Y position of the fog.
 * @property {vec1anim} [height] The height of the fog.
 */
export default interface IBloomFogEnvironmentAnimation {
    attenuation?: vec1anim;
    offset?: vec1anim;
    startY?: vec1anim;
    height?: vec1anim;
}