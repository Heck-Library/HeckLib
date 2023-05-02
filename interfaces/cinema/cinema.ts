export default interface ICinemaConfig {
    videoUrl: string;
    title?: string;
    author?: string;
    videoFile: string;
    duration?: number;
    offset?: number;
    configByMapper?: boolean;
    environmentName?: string;
    playbackSpeed?: number;
    loop?: boolean;
    endVideoAt?: number;
    screenPosition?: {
        x: number;
        y: number;
        z: number;
    };
    screenRotation?: {
        x: number;
        y: number;
        z: number;
    };
    screenHeight?: number;
    screenCurvature?: number;
    screenSubsurfaces?: number;
    allowCustomPlatform?: boolean;
    disableDefaultModifications?: boolean;
    forceEnvironmentModifications?: boolean;
    mergePropGroups?: boolean;
    transparency?: boolean;
    bloom?: number;
    colorCorrection?: {
        brightness?: number;
        contrast?: number;
        saturation?: number;
        exposure?: number;
        gamma?: number;
        hue?: number;
    };
    vignette?: {
        type?: "elliptical" | "rectangular";
        radius?: number;
        softness?: number;
    };
    additionalScreens?: {
        position: {
            x: number;
            y: number;
            z: number;
        };
        rotation: {
            x: number;
            y: number;
            z: number;
        };
    }[];
}