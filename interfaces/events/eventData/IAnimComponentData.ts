import IBloomFogEnvironmentAnimation from "../../animatable/fog";
import ITubeBloomPrePassLightAnimation from "../../animatable/tubeBloom";

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
    BloomFogEnvironment?: IBloomFogEnvironmentAnimation
    TubeBloomPrePassLight?: ITubeBloomPrePassLightAnimation
}
