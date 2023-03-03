import { writeFileSync } from "fs";
import { vec3 } from "../consts/types/vec";

export default class Cinema {
    config: {
        videoUrl: string
        title?: string
        author?: string
        videoFile: string
        duration?: number
        offset?: number
        configByMapper?: boolean
        environmentName?: string
        playbackSpeed?: number
        loop?: boolean
        endVideoAt?: number
        screenPosition?: {x:number, y:number, z:number}
        screenRotation?: {x:number, y:number, z:number}
        screenHeight?: number
        screenCurvature?: number
        screenSubsurfaces?: number
        allowCustomPlatform?: boolean
        disableDefaultModifications?: boolean
        forceEnvironmentModifications?: boolean
        mergePropGroups?: boolean
        transparency?: boolean
        bloom?: number
        colorCorrection?: {
            brightness?: number
            contrast?: number
            saturation?: number
            exposure?: number
            gamma?: number
            hue?: number
        }
        vignette?: {
            type?: "elliptical" | "rectangular"
            radius?: number
            softness?: number
        }
        additionalScreens?: {
            position: {
                x: number
                y: number
                z: number
            }
            rotation: {
                x: number
                y: number
                z: number
            }
        }[]
    }
    constructor(URL: string) {
        this.config = {
            videoUrl: URL,
            videoFile: "video.mp4"
        }
    }
    //#region general
    URL(x: string) { this.config.videoUrl = x; return this;}
    title(x: string) { this.config.title = x; return this;}
    author(x: string) { this.config.author = x; return this;}
    fileName(x: string) {
        if (x.includes(".mp4")) {
            this.config.videoFile = x;
            return this;
        }
        x += ".mp4";
        return this;
    }
    duration(x: number) { this.config.duration = x; return this;}
    offset(x: number) { this.config.offset = x; return this;}
    configByMapper(x: boolean) { this.config.configByMapper = x; return this;}
    environmentName(x: string) { this.config.environmentName = x; return this;}
    playbackSpeed(x: number) { this.config.playbackSpeed = x; return this;}
    loop(x: boolean) { this.config.loop = x; return this;}
    endVideoAt(x: number) { this.config.endVideoAt = x; return this;}
    position(pos: vec3) { this.config.screenPosition = {
        x: pos[0],
        y: pos[1],
        z: pos[2]
    }; return this;}
    rotation(rot: vec3) { this.config.screenRotation = {
        x: rot[0],
        y: rot[1],
        z: rot[2]
    }; return this;}
    height(x: number) { this.config.screenHeight = x; return this;}
    curvature(x: number) { this.config.screenCurvature = x; return this;}
    subsurfaces(x: number) { this.config.screenSubsurfaces = x; return this;}
    customPlatform(x: boolean) { this.config.allowCustomPlatform = x; return this;}
    disableDefaultModification(x: boolean) { this.config.disableDefaultModifications = x; return this;}
    forceEnvironmentMod(x: boolean) { this.config.forceEnvironmentModifications = x; return this;}
    mergePropGroups(x: boolean) { this.config.mergePropGroups = x; return this;}
    transparency(x: boolean) { this.config.transparency = x; return this;}
    bloom(x: number) { this.config.bloom = x; return this;}
    //#endregion

    //#region color correction
    brightness(x: number) { if (!this.config.colorCorrection) {
        this.config.colorCorrection = {}
    }
    this.config.colorCorrection.brightness = x;
    return this;
    }
    contrast(x: number) { if (!this.config.colorCorrection) {
        this.config.colorCorrection = {}
    }
    this.config.colorCorrection.contrast = x;
    return this;
    }
    saturation(x: number) { if (!this.config.colorCorrection) {
        this.config.colorCorrection = {}
    }
    this.config.colorCorrection.saturation = x;
    return this;
    }
    exposure(x: number) { if (!this.config.colorCorrection) {
        this.config.colorCorrection = {}
    }
    this.config.colorCorrection.exposure = x;
    return this;
    }
    gamma(x: number) { if (!this.config.colorCorrection) {
        this.config.colorCorrection = {}
    }
    this.config.colorCorrection.gamma = x;
    return this;
    }
    hue(x: number) { if (!this.config.colorCorrection) {
        this.config.colorCorrection = {}
    }
    this.config.colorCorrection.hue = x;
    return this;
    }
    //#endregion

    //#region vignette
    type(x: "elliptical" | "rectangular") { if (!this.config.vignette) {
        this.config.vignette = {}
    }
    this.config.vignette.type = x;
    return this;
    }
    radius(x: number) { if (!this.config.vignette) {
        this.config.vignette = {}
    }
    this.config.vignette.radius = x;
    return this;
    }
    softness(x: number) { if (!this.config.vignette) {
        this.config.vignette = {}
    }
    this.config.vignette.softness = x;
    return this;
    }
    //#endregion

    //#region additional screens
    addScreen(pos: vec3, rot: vec3) {
        if (!this.config.additionalScreens) this.config.additionalScreens = [];
        const screen = {
            position: {
                x: pos[0],
                y: pos[1],
                z: pos[2]
            },
            rotation: {
                x: rot[0],
                y: rot[1],
                z: rot[2]
            }
        }
        this.config.additionalScreens.push(screen);
        return this;
    }
    push() {
        writeFileSync('cinema-video.json', JSON.stringify(this.config, null, 4));
    }
    //#endregion
} 