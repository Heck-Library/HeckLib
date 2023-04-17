/**
 * Interface for the TubeBloom component.
 * @interface
 * @name ITubeBloomPrePassLight
 * 
 * @property {number} [colorAlphaMultiplier] The color alpha multiplier of the TubeBloom component.
 * @property {number} [bloomFogIntensityMultiplier] The bloom fog intensity multiplier of the TubeBloom component.
 */
export default interface ITubeBloomPrePassLight {
    colorAlphaMultiplier?: number;
    bloomFogIntensityMultiplier?: number;
}