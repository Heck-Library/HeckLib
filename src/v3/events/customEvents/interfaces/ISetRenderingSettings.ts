import { AmbientMode, AnistropicFiltering, AntiAliasing, FogMode, ReflectionMode, ShadowmaskMode, ShadowProjection, ShadowResolution, Shadows } from "../../../../util/enums";
import { Vec4 } from "../../../../util/vec";

export interface IRenderSettings {
    AmbientEquatorColor: Vec4;
    AmbientGroundColor: Vec4;
    AmbientIntensity: number;
    AmbientLight: Vec4;
    AmbientMode: AmbientMode;
    AmbientSkyColor: Vec4;
    DefaultReflectionMode: ReflectionMode;
    DefaultReflectionResolution: number;
    FlareFadeSpeed: number;
    FlareStrength: number;
    Fog: boolean;
    FogColor: Vec4;
    FogDensity: number;
    FogEndDistance: number;
    FogMode: FogMode;
    HaloStrength: number;
    ReflectionBounces: number;
    ReflectionIntensity: number;
    Skybox: string;
    SubtractiveShadowColor: Vec4;
    Sun: string;
}

export interface IQualitySettings {
    AnistropicFiltering: AnistropicFiltering;
    AntiAliasing: AntiAliasing;
    PixelLightCount: number;
    RealtimeReflectionProbes: boolean;
    ShadowCascades: (0 | 2 | 4);
    ShadowDistance: number;
    ShadowmaskMode: ShadowmaskMode;
    ShadowNearPlaneOffset: number;
    ShadowProjection: ShadowProjection;
    ShadowResolution: ShadowResolution;
    Shadows: Shadows;
    SoftParticles: boolean;
}

export interface IXRSettings {
    UseOcclusionMesh: boolean;
}