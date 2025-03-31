import { VignetteType } from "../../enums";

type vec3obj = Record<"x" | "y" | "z", number>;

export interface ICinemaVignetteJSON {
    type: VignetteType | keyof typeof VignetteType;
    radius: number;
    softness: number;
}

export interface ICinemaColorCorrectionJSON {
    brightness: number;
    contrast: number;
    saturation: number;
    exposure: number;
    gamma: number;
    hue: number;
}

export interface ICinemaEnvironmentJSON {
    name: string;
    parentName?: string;
    cloneFrom?: string;
    active?: boolean;
    position?: vec3obj;
    rotation?: vec3obj;
    scale?: vec3obj;
}

export interface ICinemaJSON {
    // Basic Properties
    videoID: string;
    videoUrl: string;
    title: string;
    author: string;
    videoFile: string;
    duration: number;
    offset: number;
    configByMapper: boolean;

    // Advanced Properties
    environmentName: string;
    playbackSpeed: number;
    loop: boolean;
    endVideoAt: number;
    screenPosition: vec3obj;
    screenRotation: vec3obj;
    screenHeight: number;
    screenCurvature: number;
    screenSubsurfaces: number;
    allowCustomPlatform: boolean;
    disableDefaultModifications: boolean;
    forceEnvironmentModifications: boolean;
    mergePropGroups: boolean;
    transparency: boolean;
    bloom: number;
    colorCorrection: Partial<ICinemaColorCorrectionJSON>;
    vignette: Partial<ICinemaVignetteJSON>;
    additionalScreens: Record<"position" | "rotation", vec3obj>[];
    environment: ICinemaEnvironmentJSON[];
}