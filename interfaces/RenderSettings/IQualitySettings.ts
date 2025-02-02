export default interface IQualitySettings {
    anisotropicFiltering: 0|1|2;
    antiAliasing: 0|2|4|8;
    pixelLightCount: number;
    realtimeReflectionProbes: 0|1;
    shadowCascades: 0|2|4;
    shadowDistance: number;
    shadowmaskMode: 0|1;
    shadowNearPlaneOffset: number;
    shadowProjection: 0|1;
    shadowResolution: 0|1|2|3;
    shadows: 0|1|2;
    softParticles: 0|1;
}