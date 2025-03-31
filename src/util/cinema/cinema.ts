import { VignetteType } from "../enums";
import { ICinema, ICinemaColorCorrection, ICinemaEnvironment, ICinemaVignette } from "./interfaces/ICinema";
import { ICinemaColorCorrectionJSON, ICinemaEnvironmentJSON, ICinemaJSON, ICinemaVignetteJSON } from "./interfaces/ICinemaJSON";
import { writeFile } from "fs/promises";
import { log } from "util/logs";
import { writeFileSync } from "fs";

type xyz = Record<"x" | "y" | "z", number>;
type XYZ = Record<"X" | "Y" | "Z", number>;

const ytRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(?:-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/;

function xyzToXYZ(xyz?: xyz, defX: number = 0, defY: number = defX, defZ: number = defY): XYZ | undefined {
    if (xyz === undefined && defX == 0 && defY == 0 && defZ == 0) return undefined;

    const obj = {} as XYZ;

    obj.X = xyz?.x ?? defX;
    obj.Y = xyz?.y ?? defY;
    obj.Z = xyz?.z ?? defZ;

    return obj;
}
function XYZToxyz(XYZ?: XYZ, defX: number = 0, defY: number = defX, defZ: number = defY): xyz | undefined {
    if (XYZ === undefined && defX == 0 && defY == 0 && defZ == 0) return undefined;

    const obj = {} as xyz;

    obj.x = XYZ?.X ?? defX;
    obj.y = XYZ?.Y ?? defY;
    obj.z = XYZ?.Z ?? defZ;

    return obj;
}

class CinemaColorCorrection implements ICinemaColorCorrection {
    private brightness?: number;
    private contrast?: number;
    private saturation?: number;
    private exposure?: number;
    private gamma?: number;
    private hue?: number;

    public set Brightness(brightness: undefined | number) { this.brightness = brightness; }
    public set Contrast(contrast: undefined | number) { this.contrast = contrast; }
    public set Saturation(saturation: undefined | number) { this.saturation = saturation; }
    public set Exposure(exposure: undefined | number) { this.exposure = exposure; }
    public set Gamma(gamma: undefined | number) { this.gamma = gamma; }
    public set Hue(hue: undefined | number) { this.hue = hue; }

    public get Brightness(): number { return this.brightness ?? 1; }
    public get Contrast(): number { return this.contrast ?? 1; }
    public get Saturation(): number { return this.saturation ?? 1; }
    public get Exposure(): number { return this.exposure ?? 1; }
    public get Gamma(): number { return this.gamma ?? 1; }
    public get Hue(): number { return this.hue ?? 0; }

    public toJSON(): Partial<ICinemaColorCorrectionJSON> {
        return {
            brightness: this.brightness,
            contrast: this.contrast,
            saturation: this.saturation,
            exposure: this.exposure,
            gamma: this.gamma,
            hue: this.hue
        };
    }

    constructor(params?: Partial<ICinemaColorCorrection>) {
        if (params === undefined) return;

        this.brightness = params.Brightness;
        this.contrast = params.Contrast;
        this.saturation = params.Saturation;
        this.exposure = params.Exposure;
        this.gamma = params.Gamma;
        this.hue = params.Hue;
    }
}

class CinemaVignette implements ICinemaVignette {
    private type?: VignetteType;
    private radius?: number;
    private softness?: number;

    public set Type(type: undefined | VignetteType | keyof typeof VignetteType) { this.type = type as VignetteType; }
    public set Radius(radius: undefined | number) { this.radius = radius; }
    public set Softness(softness: undefined | number) { this.softness = softness; }

    public get Type(): VignetteType { return this.type ?? VignetteType.rectangular; }
    public get Radius(): number { return this.radius ?? 1; }
    public get Softness(): number { return this.softness ?? .005; }

    public toJSON(): Partial<ICinemaVignetteJSON> {
        return {
            type: this.type,
            radius: this.radius,
            softness: this.softness
        };
    }

    constructor(params?: Partial<ICinemaVignette>) {
        if (params === undefined) return;

        this.type = params.Type as VignetteType;
        this.radius = params.Radius;
        this.softness = params.Softness;
    }
}

class CinemaEnvironment implements ICinemaEnvironment {
    private name: string = "";
    private parentName?: string;
    private cloneFrom?: string;
    private active?: boolean;
    private position?: xyz;
    private rotation?: xyz;
    private scale?: xyz;

    public set Name(name: string) { this.name = name; }
    public set ParentName(name: undefined | string) { this.parentName = name; }
    public set CloneFrom(name: undefined | string) { this.cloneFrom = name; }
    public set Active(active: undefined | boolean) { this.active = active; }
    public set Position(position: undefined | XYZ) { this.position = XYZToxyz(position) }
    public set Rotation(rotation: undefined | XYZ) { this.rotation = XYZToxyz(rotation) }
    public set Scale(scale: undefined | XYZ) { this.scale = XYZToxyz(scale, 1) }

    public get Name(): string { return this.name; }
    public get ParentName(): string | undefined { return this.parentName; }
    public get CloneFrom(): string | undefined { return this.cloneFrom; }
    public get Active(): boolean | undefined { return this.active; }
    public get Position(): XYZ | undefined { return xyzToXYZ(this.position); }
    public get Rotation(): XYZ | undefined { return xyzToXYZ(this.rotation); }
    public get Scale(): XYZ | undefined { return xyzToXYZ(this.scale, 1); }

    constructor(params?: ICinemaEnvironment) {
        if (params === undefined) return;

        this.name = params.Name ?? this.name;
        this.parentName = params.ParentName;
        this.cloneFrom = params.CloneFrom;
        this.active = params.Active;
        this.Position = params.Position;
        this.Rotation = params.Rotation;
        this.Scale = params.Scale;
    }

    public toJSON(): ICinemaEnvironmentJSON {
        return {
            name: this.name,
            parentName: this.parentName,
            cloneFrom: this.cloneFrom,
            active: this.active,
            position: this.position,
            rotation: this.rotation,
            scale: this.scale
        };
    }
}

export class Cinema implements Partial<ICinema> {
    private videoID?: string;
    private videoUrl?: string;
    private title?: string;
    private author?: string;
    private videoFile: string = "video.mp4";
    private duration?: number;
    private offset?: number;
    private configByMapper?: boolean = true;
    private environmentName?: string;
    private playbackSpeed?: number;
    private loop?: boolean;
    private endVideoAt?: number;
    private screenPosition?: xyz;
    private screenRotation?: xyz;
    private screenHeight?: number;
    private screenCurvature?: number;
    private screenSubsurfaces?: number;
    private allowCustomPlatform?: boolean;
    private disableDefaultModifications?: boolean;
    private forceEnvironmentModifications?: boolean;
    private mergePropGroups?: boolean;
    private transparency?: boolean;
    private bloom?: number;
    private colorCorrection?: CinemaColorCorrection;
    private vignette?: CinemaVignette;
    private additionalScreens?: Record<"position" | "rotation", xyz>[];
    private environment?: CinemaEnvironment[];

    public set URL(url: string) {
        const match = url.match(ytRegex);
        if (match) {
            this.videoID = match[5];
            return;
        }
        this.videoUrl = url;
    }
    public set Title(title: undefined | string) { this.title = title; }
    public set Author(author: undefined | string) { this.author = author; }
    public set VideoFile(file: string) { this.videoFile = file; }
    public set Duration(duration: undefined | number) { this.duration = Math.floor(duration ?? 0) || undefined; }
    public set Offset(offset: undefined | number) { this.offset = Math.floor(offset ?? 0) || undefined; }
    public set ConfigByMapper(config: undefined | boolean) { this.configByMapper = config; }
    public set EnvironmentName(name: undefined | string) { this.environmentName = name; }
    public set PlaybackSpeed(speed: undefined | number) { this.playbackSpeed = speed; }
    public set Loop(loop: undefined | boolean) { this.loop = loop; }
    public set EndVideoAt(end: undefined | number) { this.endVideoAt = end; }
    public set ScreenPosition(position: undefined | XYZ) { this.screenPosition = XYZToxyz(position) }
    public set ScreenRotation(rotation: undefined | XYZ) { this.screenRotation = XYZToxyz(rotation) }
    public set ScreenHeight(height: undefined | number) { this.screenHeight = height; }
    public set ScreenCurvature(curvature: undefined | number) { this.screenCurvature = curvature; }
    public set ScreenSubsurfaces(subsurfaces: undefined | number) { this.screenSubsurfaces = subsurfaces; }
    public set AllowCustomPlatform(allow: undefined | boolean) { this.allowCustomPlatform = allow; }
    public set DisableDefaultModifications(disable: undefined | boolean) { this.disableDefaultModifications = disable; }
    public set ForceEnvironmentModifications(force: undefined | boolean) { this.forceEnvironmentModifications = force; }
    public set MergePropGroups(merge: undefined | boolean) { this.mergePropGroups = merge; }
    public set Transparency(transparency: undefined | boolean) { this.transparency = transparency; }
    public set Bloom(bloom: undefined | number) { this.bloom = bloom; }
    public set ColorCorrection(color: undefined | Partial<ICinemaColorCorrection> | CinemaColorCorrection) { this.colorCorrection = color instanceof CinemaColorCorrection ? color : new CinemaColorCorrection(color); }
    public set Vignette(vignette: undefined | Partial<ICinemaVignette> | CinemaVignette) { this.vignette = vignette instanceof CinemaVignette ? vignette : new CinemaVignette(vignette); }
    public set AdditionalScreens(screens: undefined | Record<"Position" | "Rotation", XYZ>[]) {
        this.IfNoAddScreenInit();

        screens?.forEach((screen) => this.additionalScreens?.push({
            position: XYZToxyz(screen.Position) as xyz,
            rotation: XYZToxyz(screen.Rotation) as xyz
        }));
    }
    public set Environment(env: ICinemaEnvironment[]) {
        this.IfNoEnvInit();

        env.forEach((env) => {
            const newEnv = new CinemaEnvironment();

            newEnv.Name = env.Name;
            newEnv.ParentName = env.ParentName;
            newEnv.CloneFrom = env.CloneFrom;
            newEnv.Active = env.Active;
            newEnv.Position = env.Position;
            newEnv.Rotation = env.Rotation;
            newEnv.Scale = env.Scale;

            this.environment?.push(newEnv);
        });
    }

    public get URL(): string { return this.videoID ?? this.videoUrl ?? "https://www.youtube.com/watch?v=dQw4w9WgXcQ"; }
    public get Title(): string { return this.title ?? "Unknown Title"; }
    public get Author(): string { return this.author ?? "Unknown Author"; }
    public get VideoFile(): string { return this.videoFile; }
    public get Duration(): number { return this.duration ?? 0; }
    public get Offset(): number { return this.offset ?? 0; }
    public get ConfigByMapper(): boolean { return this.configByMapper ?? true; }
    public get EnvironmentName(): string { return this.environmentName ?? ""; }
    public get PlaybackSpeed(): number { return this.playbackSpeed ?? 1; }
    public get Loop(): boolean { return this.loop ?? false; }
    public get EndVideoAt(): number | undefined { return this.endVideoAt; }
    public get ScreenPosition(): XYZ { return xyzToXYZ(this.screenPosition, 0, 12.4, 67.8) as XYZ; }
    public get ScreenRotation(): XYZ { return xyzToXYZ(this.screenRotation, -8, 0) as XYZ; }
    public get ScreenHeight(): number { return this.screenHeight ?? 25; }
    public get ScreenCurvature(): number | undefined { return this.screenCurvature; }
    public get ScreenSubsurfaces(): number { return this.screenSubsurfaces ?? 32; }
    public get AllowCustomPlatform(): boolean { return this.allowCustomPlatform ?? false; }
    public get DisableDefaultModifications(): boolean { return this.disableDefaultModifications ?? false; }
    public get ForceEnvironmentModifications(): boolean { return this.forceEnvironmentModifications ?? false; }
    public get MergePropGroups(): boolean { return this.mergePropGroups ?? false; }
    public get Transparency(): boolean { return this.transparency ?? true; }
    public get Bloom(): number { return this.bloom ?? 1; }
    public get ColorCorrection(): ICinemaColorCorrection {
        this.IfNoCCInit();
        return this.colorCorrection as CinemaColorCorrection; 
    }
    public get Vignette(): ICinemaVignette {
        this.IfNoVignetteInit();
        return this.vignette as CinemaVignette;
    }
    public get AdditionalScreens(): Record<"Position" | "Rotation", XYZ>[] {
        this.IfNoAddScreenInit();

        const tempScreens = [] as Record<"Position" | "Rotation", XYZ>[];

        this.additionalScreens?.forEach((screen) => tempScreens.push({
            Position: xyzToXYZ(screen.position, 0, 0, 0) as XYZ,
            Rotation: xyzToXYZ(screen.rotation, 0, 0, 0) as XYZ
        }));

        return tempScreens;
    }
    public get Environment(): ICinemaEnvironment[] {
        this.IfNoEnvInit();
        return this.environment as ICinemaEnvironment[];
    }

    private IfNoEnvInit(): void {
        if(this.environment === undefined) this.environment = [];
    }
    private IfNoCCInit(): void {
        if(this.colorCorrection === undefined) this.colorCorrection = new CinemaColorCorrection();
    }
    private IfNoVignetteInit(): void {
        if(this.vignette === undefined) this.vignette = new CinemaVignette();
    }
    private IfNoAddScreenInit(): void {
        if(this.additionalScreens === undefined) this.additionalScreens = [];
    }

    public AddScreen(...Screens: { Position: XYZ, Rotation: XYZ }[]): void {
        this.IfNoAddScreenInit();

        Screens.forEach((screen) => this.additionalScreens?.push({
            position: XYZToxyz(screen.Position) as xyz,
            rotation: XYZToxyz(screen.Rotation) as xyz
        }));
    }
    public AddEnvironment(...env: ICinemaEnvironment[]): void {
        this.IfNoEnvInit();

        env.forEach((env) => {
            const newEnv = new CinemaEnvironment();

            newEnv.Name = env.Name;
            newEnv.ParentName = env.ParentName;
            newEnv.CloneFrom = env.CloneFrom;
            newEnv.Active = env.Active;
            newEnv.Position = env.Position;
            newEnv.Rotation = env.Rotation;
            newEnv.Scale = env.Scale;

            this.environment?.push(newEnv);
        });
    }

    public toJSON(): Partial<ICinemaJSON> {
        const json: Partial<ICinemaJSON> = {
            title: this.title,
            author: this.author,
            videoFile: this.videoFile,
            duration: this.duration,
            offset: this.offset,
            configByMapper: this.configByMapper,
            environmentName: this.environmentName,
            playbackSpeed: this.playbackSpeed,
            loop: this.loop,
            endVideoAt: this.endVideoAt,
            screenPosition: this.screenPosition,
            screenRotation: this.screenRotation,
            screenHeight: this.screenHeight,
            screenCurvature: this.screenCurvature,
            screenSubsurfaces: this.screenSubsurfaces,
            allowCustomPlatform: this.allowCustomPlatform,
            disableDefaultModifications: this.disableDefaultModifications,
            forceEnvironmentModifications: this.forceEnvironmentModifications,
            mergePropGroups: this.mergePropGroups,
            transparency: this.transparency,
            bloom: this.bloom,
            colorCorrection: this.colorCorrection?.toJSON(),
            vignette: this.vignette?.toJSON(),
            additionalScreens: this.additionalScreens?.length ? this.additionalScreens : undefined,
            environment: this.environment?.length ? this.environment.map(env => env.toJSON()) : undefined
        };

        if (this.videoID) {
            json.videoID = this.videoID;
            return json;
        }
        
        json.videoUrl = this.videoUrl;
        return json;
    }

    /**
     * ## Push
     * 
     * Writes the Cinema JSON to your map folder.
     */
    public async Push(): Promise<void> {
        const START = performance.now();

        const fileContent = JSON.stringify(this.toJSON(), null, 4);
        const fileName = "cinema-video.json";
        const filePath = process.cwd() + "\\" + fileName;

        writeFile(filePath, fileContent, { encoding: "utf-8" });
        
        log.success(`Saved ${log.console.FILE_MSG(fileName)}`, { StartTime: START });
    }

    constructor(params?: Partial<ICinema>) {
        if (params === undefined) return;

        this.URL = params.URL ?? "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        this.title = params.Title;
        this.author = params.Author;
        this.videoFile = params.VideoFile ?? "video.mp4";
        this.duration = params.Duration;
        this.offset = params.Offset;
        this.environmentName = params.EnvironmentName;
        this.playbackSpeed = params.PlaybackSpeed;
        this.loop = params.Loop;
        this.endVideoAt = params.EndVideoAt;
        this.ScreenPosition = params.ScreenPosition;
        this.ScreenRotation = params.ScreenRotation;
        this.screenHeight = params.ScreenHeight ?? 25;
        this.screenCurvature = params.ScreenCurvature;
        this.screenSubsurfaces = params.ScreenSubsurfaces ?? 32;
        this.allowCustomPlatform = params.AllowCustomPlatform ?? false;
        this.disableDefaultModifications = params.DisableDefaultModifications ?? false;
        this.forceEnvironmentModifications = params.ForceEnvironmentModifications ?? false;
        this.mergePropGroups = params.MergePropGroups ?? false;
        this.transparency = params.Transparency ?? true;
        this.bloom = params.Bloom ?? 1;
        this.colorCorrection = new CinemaColorCorrection(params.ColorCorrection);
        this.vignette = new CinemaVignette(params.Vignette);
    }
}