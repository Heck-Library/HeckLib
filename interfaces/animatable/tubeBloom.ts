import { vec1anim } from "../../types/vectors";

/**
 * Interface for the TubeBloom component.
 * @interface
 * @name ITubeBloomPrePassLight
 * 
 * @property {vec1anim} [colorAlphaMultiplier] The color alpha multiplier of the TubeBloom component.
 * @property {vec1anim} [bloomFogIntensityMultiplier] The bloom fog intensity multiplier of the TubeBloom component.
 */
export default interface ITubeBloomPrePassLightAnimation {
    colorAlphaMultiplier?: vec1anim;
    bloomFogIntensityMultiplier?: vec1anim;
}