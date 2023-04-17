import { vec1anim } from "../../../types/vectors";

export default interface IAnimComponentData {
    /**
     * The track to be controlled
     */
    track: string | string[];
    /**
     * Duration of the event in beats
     */
    duration: number;
    /**
     * Easing used for the event
     */
    easing?: string;
    BloomFogEnvironment?: {
        attenuation?: vec1anim;
        offset?: vec1anim;
        startY?: vec1anim;
        height?: vec1anim;
    };
    TubeBloomPrePassLight?: {
        colorAlphaMultiplier?: vec1anim;
        bloomFogIntensityMultiplier?: vec1anim;
    };
}
