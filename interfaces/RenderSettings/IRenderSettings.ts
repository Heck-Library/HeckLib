import { vec4 } from "../../types/vectors";

export default interface IRenderSettings {
    ambientEquatorColor: vec4;
    ambientGroundColor: vec4;
    ambientIntensity: number;
    ambientLight: vec4;
    ambientMode: 0 | 1 | 3| 4;
    ambientSkyColor: vec4;
    defaultReflectionMode: 0|1;
    defaultReflectionResolution: number;
    flareFadeSpeed: number;
    flareStrength: number;
    fog: 0 | 1;
    fogColor: vec4;
    fogDensity: number;
    fogEndDistance: number;
    fogMode: 1|2|3;
    haloStrength: number;
    reflectionBounces: number;
    reflectionIntensity: number;
    skybox: string;
    subtractiveShadowColor: vec4;
    sun: string;
}