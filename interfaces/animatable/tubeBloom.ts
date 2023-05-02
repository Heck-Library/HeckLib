import { vec1anim } from "../../types/vectors";

/**
 * ### Tube Bloom Pre-Pass Light Animation
 * 
 * Interface for the TubeBloom component.
 * 
 * `colorAlphaMultiplier` The color alpha multiplier of the tube bloom.
 * `bloomFogIntensityMultiplier` The bloom fog intensity multiplier of the tube bloom.
 */
export default interface ITubeBloomPrePassLightAnimation {
    /**
     * ### Color Alpha Multiplier
     * 
     * The color alpha multiplier of the tube bloom.
     * 
     * Type: `vec1anim`
     */
    colorAlphaMultiplier?: vec1anim;
    /**
     * ### Bloom Fog Intensity Multiplier
     * 
     * The bloom fog intensity multiplier of the tube bloom.
     * 
     * Type: `vec1anim`
     */
    bloomFogIntensityMultiplier?: vec1anim;
}