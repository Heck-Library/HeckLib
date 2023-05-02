import { writeFileSync } from "fs";
import { vec3 } from "../types/vectors";
import ICinemaConfig from "../interfaces/cinema/cinema";
import { IColorCorrection } from "../interfaces/cinema/colorCorrection";
import { IVignette } from "../interfaces/cinema/vignette";
import { IAdditionalScreen } from "../interfaces/cinema/additionalScreen";

export default class Cinema implements ICinemaConfig {
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
    screenPosition?: { x: number; y: number; z: number; };
    screenRotation?: { x: number; y: number; z: number; };
    screenHeight?: number;
    screenCurvature?: number;
    screenSubsurfaces?: number;
    allowCustomPlatform?: boolean;
    disableDefaultModifications?: boolean;
    forceEnvironmentModifications?: boolean;
    mergePropGroups?: boolean;
    transparency?: boolean;
    bloom?: number;
    colorCorrection?: IColorCorrection;
    vignette?: IVignette;
    additionalScreens?: IAdditionalScreen[];
    
    constructor();
    constructor(video: string);
    constructor(video: ICinemaConfig);
    constructor(video?: string | ICinemaConfig) {
        if (typeof video === 'string') this.videoUrl = video;
        else if (typeof video === 'object') {
            this.videoUrl = video.videoUrl;

            if (video.title !== undefined) this.title = video.title;
            if (video.author !== undefined) this.author = video.author;
            if (video.videoFile !== undefined) this.videoFile = video.videoFile;
            if (video.duration !== undefined) this.duration = video.duration;
            if (video.offset !== undefined) this.offset = video.offset;
            if (video.configByMapper !== undefined) this.configByMapper = video.configByMapper;
            if (video.environmentName !== undefined) this.environmentName = video.environmentName;
            if (video.playbackSpeed !== undefined) this.playbackSpeed = video.playbackSpeed;
            if (video.loop !== undefined) this.loop = video.loop;
            if (video.endVideoAt !== undefined) this.endVideoAt = video.endVideoAt;
            if (video.screenPosition !== undefined) this.screenPosition = video.screenPosition;
            if (video.screenRotation !== undefined) this.screenRotation = video.screenRotation;
            if (video.screenHeight !== undefined) this.screenHeight = video.screenHeight;
            if (video.screenCurvature !== undefined) this.screenCurvature = video.screenCurvature;
            if (video.screenSubsurfaces !== undefined) this.screenSubsurfaces = video.screenSubsurfaces;
            if (video.allowCustomPlatform !== undefined) this.allowCustomPlatform = video.allowCustomPlatform;
            if (video.disableDefaultModifications !== undefined) this.disableDefaultModifications = video.disableDefaultModifications;
            if (video.forceEnvironmentModifications !== undefined) this.forceEnvironmentModifications = video.forceEnvironmentModifications;
            if (video.mergePropGroups !== undefined) this.mergePropGroups = video.mergePropGroups;
            if (video.transparency !== undefined) this.transparency = video.transparency;
            if (video.bloom !== undefined) this.bloom = video.bloom;
            if (video.colorCorrection !== undefined) this.colorCorrection = video.colorCorrection;
            if (video.vignette !== undefined) this.vignette = video.vignette;
            if (video.additionalScreens !== undefined) this.additionalScreens = video.additionalScreens;
        }
    }

    //#region additional screens
    addScreen(pos: vec3, rot: vec3) {
        if (!this.additionalScreens) this.additionalScreens = [];
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
        this.additionalScreens.push(screen);
        return this;
    }
    push() {
        writeFileSync('cinema-video.json', JSON.stringify(this, null, 4));
    }
    //#endregion
} 