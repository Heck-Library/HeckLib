import { BPMEvent } from "../events/BpmEvent";
import { Bomb, BombArray } from "../objects/Bomb";
import { BurstSlider, BurstSliderArray } from "../objects/BurstSlider";
import { Note, NoteArray } from "../objects/Note";
import { Obstacle, ObstacleArray } from "../objects/Obstacle";
import { Slider, SliderArray } from "../objects/Slider";
import { Info, DifficultyBeatmap } from "../../info/Info200";
import { createWriteStream, readFileSync } from "fs";
import { RotationEvent } from "../events/RotationEvent";
import { IInitParameters } from "./interfaces/IInitParameters";
import { IDifficulty } from "./interfaces/IDifficulty";
import { CustomEventArray } from "../events/customEvents/CustomEventArray";
import { Lawless, Legacy, Lightshow, NoArrows, OneSaber, PLUGIN, Standard } from "../../util/enums";
import { V3Map } from "./V3Map";
import { BaseBeatmapEvent } from "../events/BasicBeatMapEvent";
import { ColorBoostBeatmapEvent } from "../events/ColorBoostBeatmapEvent";
import { log, LogLevel } from "../../util/logs";
import { IDifficultyBeatmap } from "../../info/IInfo";
import { HSVtoRGB, Random } from "../../util/functions";
import { AnyAnimation } from "../../util/vec";
import { Environment } from "../environment/Environment";

type mapJSON = {
    version: string,
    bpmEvents: BPMEvent[],
    rotationEvents: RotationEvent[],
    colorBoostBeatmapEvents: ColorBoostBeatmapEvent[],
    basicBeatmapEvents: BaseBeatmapEvent[],
    colorNotes: Note[],
    bombNotes: Bomb[],
    obstacles: Obstacle[],
    sliders: Slider[],
    burstSliders: BurstSlider[],
    waypoints: object[],
    lightColorEventBoxGroups: object[],
    lightRotationEventBoxGroups: object[],
    lightTranslationEventBoxGroups: object[],
    vfxEventBoxGroups: object[],
    _fxEventsCollection: object[],
    basicEventTypesWithKeywords: object[],
    useNormalEventsAsCompatibleEvents: boolean,
    customData: Record<string, number 
        | object[] 
        | Record<string, any>
        | Map<"materials", object> 
        | Map<"pointDefinitions", AnyAnimation>
    >
};

type BundleInfo = {
    materials: Record<string, {
        path: string,
        properties: Record<string, {
            value: any,
            type: Record<string, null>
        }>
    }>,
    prefabs: Record<string, string>,
    bundleFiles: string[],
    bundleCRCs: Record<string, number>,
    isCompressed: boolean
};

type DifficultyFile = Standard | NoArrows | OneSaber | Lawless | Legacy | Lightshow;

export class Difficulty implements IDifficulty {
    //#region Static properties
    /**
     * ## Difficulty.Standard
     * 
     * An enumerator that contains all possible default file names for a Standard difficulty.
     * 
     * ---
     * 
     * ### Values
     * 
     * - `Easy` - EasyStandard.dat
     * - `Normal` - NormalStandard.dat
     * - `Hard` - HardStandard.dat
     * - `Expert` - ExpertStandard.dat
     * - `ExpertPlus` - ExpertPlusStandard.dat
     * 
     * ---
     * 
     * ### Example
     * 
     * ```typescript
     * Difficulty.STANDARD.ExpertPlus // "ExpertPlusStandard.dat"
     * ```
     */
    public static readonly STANDARD = Standard;
    /**
     * ## Difficulty.NoArrows
     * 
     * An enumerator that contains all possible default file names for a NoArrows difficulty.
     * 
     * ---
     * 
     * ### Values
     * 
     * - `Easy` - EasyNoArrows.dat
     * - `Normal` - NormalNoArrows.dat
     * - `Hard` - HardNoArrows.dat
     * - `Expert` - ExpertNoArrows.dat
     * - `ExpertPlus` - ExpertPlusNoArrows.dat
     * 
     * ---
     * 
     * ### Example
     * 
     * ```typescript
     * Difficulty.NOARROWS.ExpertPlus // "ExpertPlusNoArrows.dat"
     * ```
     */
    public static readonly NOARROWS = NoArrows;
    /**
     * ## Difficulty.OneSaber
     * 
     * An enumerator that contains all possible default file names for a OneSaber difficulty.
     * 
     * ---
     * 
     * ### Values
     * 
     * - `Easy` - EasyOneSaber.dat
     * - `Normal` - NormalOneSaber.dat
     * - `Hard` - HardOneSaber.dat
     * - `Expert` - ExpertOneSaber.dat
     * - `ExpertPlus` - ExpertPlusOneSaber.dat
     * 
     * ---
     * 
     * ### Example
     * 
     * ```typescript
     * Difficulty.ONESABER.ExpertPlus // "ExpertPlusOneSaber.dat"
     * ```
     */
    public static readonly ONESABER = OneSaber;
    /**
     * ## Difficulty.Lawless
     * 
     * An enumerator that contains all possible default file names for a Lawless difficulty.
     * 
     * ---
     * 
     * ### Values
     * 
     * - `Easy` - EasyLawless.dat
     * - `Normal` - NormalLawless.dat
     * - `Hard` - HardLawless.dat
     * - `Expert` - ExpertLawless.dat
     * - `ExpertPlus` - ExpertPlusLawless.dat
     * 
     * ---
     * 
     * ### Example
     * 
     * ```typescript
     * Difficulty.LAWLESS.ExpertPlus // "ExpertPlusLawless.dat"
     * ```
     */
    public static readonly LAWLESS = Lawless;
    /**
     * ## Difficulty.Legacy
     * 
     * An enumerator that contains all possible default file names for a Legacy difficulty.
     * 
     * ---
     * 
     * ### Values
     * 
     * - `Easy` - EasyLegacy.dat
     * - `Normal` - NormalLegacy.dat
     * - `Hard` - HardLegacy.dat
     * - `Expert` - ExpertLegacy.dat
     * - `ExpertPlus` - ExpertPlusLegacy.dat
     * 
     * ---
     * 
     * ### Example
     * 
     * ```typescript
     * Difficulty.LEGACY.ExpertPlus // "ExpertPlusLegacy.dat"
     * ```
     */
    public static readonly LEGACY = Legacy;
    /**
     * ## Difficulty.Lightshow
     * 
     * An enumerator that contains all possible default file names for a Lightshow difficulty.
     * 
     * ---
     * 
     * ### Values
     * 
     * - `Easy` - EasyLightshow.dat
     * - `Normal` - NormalLightshow.dat
     * - `Hard` - HardLightshow.dat
     * - `Expert` - ExpertLightshow.dat
     * - `ExpertPlus` - ExpertPlusLightshow.dat
     * 
     * ---
     * 
     * ### Example
     * 
     * ```typescript
     * Difficulty.LIGHTSHOW.ExpertPlus // "ExpertPlusLightshow.dat"
     * ```
     */
    public static readonly LIGHTSHOW = Lightshow;
    //#endregion

    private path: { input: DifficultyFile, output: DifficultyFile, info: string, infoBackup: string } = {
        info: "./info.dat",
        infoBackup: "./info.dat.bak",
        input: Standard.ExpertPlus,
        output: Lawless.ExpertPlus
    }
    private map = new V3Map();
    private info = new Info();

    private unhandledData: Record<string, any> = {};

    //#region Public setters and getters
    set Map(map: V3Map) { this.map = map; }
    set Info(info: Info) { this.info = info; }
    set DifficultyInfo(info: IDifficultyBeatmap) {
        let exists = false;
        
        this.info.DifficultyBeatmapSets.forEach(set => {
            const charRegex = /(Standard|NoArrows|OneSaber|Lawless|Legacy|Lightshow)/;
            const matchResult = this.path.output.match(charRegex);
            const characteristicSet = matchResult ? matchResult[0] : "";

            if (set.BeatmapCharacteristicName == characteristicSet) {
                set.DifficultyBeatmaps.forEach(diff => {
                    if (diff.BeatmapFilename == this.path.output) {
                        diff = new DifficultyBeatmap(info);
                        exists = true;
                    }
                });
            }
        });

        if (!exists) {
            log.error(`Could not find ${log.console.FILE_MSG(this.path.output)} in ${log.console.FILE_MSG("info.dat")}`);
        }

        const diff = this.fetchDiffInfo();

        diff.BeatmapColorSchemeIdx = info.BeatmapColorSchemeIdx;
        diff.BeatmapFilename = info.BeatmapFilename;
        diff.Difficulty = info.Difficulty;
        diff.EnvironmentNameIdx = info.EnvironmentNameIdx;
        diff.NJS = info.NJS;
        diff.Offset = info.Offset;
        diff.CustomData = info.CustomData;
    }

    get Map(): V3Map { return this.map; }
    get Info(): Info { return this.info; }
    get DifficultyInfo(): DifficultyBeatmap {
        return this.fetchDiffInfo();
    }

    private fetchDiffInfo(): DifficultyBeatmap {
        let selectedDiff: DifficultyBeatmap = new DifficultyBeatmap();
        let exists = false;

        this.info.DifficultyBeatmapSets.forEach(set => {
            const charRegex = /(Standard|NoArrows|OneSaber|Lawless|Legacy|Lightshow)/;
            const matchResult = this.path.output.match(charRegex);
            const characteristicSet = matchResult ? matchResult[0] : "";

            if (set.BeatmapCharacteristicName == characteristicSet) {
                set.DifficultyBeatmaps.forEach(diff => {
                    if (diff.BeatmapFilename == this.path.output) {
                        selectedDiff = diff;
                        exists = true;
                    }
                });
            }
        });

        if (!exists) {
            log.error(`Could not find ${log.console.FILE_MSG(this.path.output)} in ${log.console.FILE_MSG("info.dat")}`);
            return selectedDiff;
        }

        return selectedDiff;
    }
    //#endregion

    /**
     * ## Difficulty
     * 
     * The main class for editing Beat Saber difficulty files.
     * 
     * ---
     * 
     * ### Example
     * 
     * ```typescript
     * export const DIFF = new Difficulty(
     *     Difficulty.STANDARD.ExpertPlus,
     *     Difficulty.LAWLESS.ExpertPlus,
     *     {
     *         InitializeCustomDataFields: true,
     *         Logs: LogType.OnlyImportant,
     *         ForcedNJS: 18,
     *         ForcedOffset: 0
     *     }
     * );
     * ```
     * 
     * @param INPUT The input file to read from.
     * @param OUTPUT The output file to write to.
     * @param PROPERTIES Properties to initialize the difficulty with.
     * @param INFO_PATH Potential custom info file path.
     * @param INFO_BACKUP Potential Info.dat backup path.
     */
    constructor(
        INPUT: DifficultyFile,
        OUTPUT: DifficultyFile,
        PROPERTIES: IInitParameters = {},
        INFO_PATH: string = "./info.dat",
        INFO_BACKUP?: string
    ) {
        let heckColor: [number, number, number] = [20, 20, 255];
        let libColor: [number, number, number] = [255, 255, 255];

        if (PROPERTIES.LogoColors === undefined) heckColor = this.getLogoColor("random");
        else {
            PROPERTIES.LogoColors.Heck !== undefined && (heckColor = this.getLogoColor(PROPERTIES.LogoColors.Heck));
            PROPERTIES.LogoColors.Lib !== undefined && (libColor = this.getLogoColor(PROPERTIES.LogoColors.Lib));
        }

        !PROPERTIES.NoLogo && log.displayLogo(heckColor, libColor);
        log.logLevel = typeof PROPERTIES.Logs === "string" ? LogLevel[PROPERTIES.Logs] : PROPERTIES.Logs || LogLevel.Info;

        this.path.input = INPUT;
        this.path.output = OUTPUT;

        INFO_PATH && (this.path.info = INFO_PATH);
        INFO_BACKUP && (this.path.infoBackup = INFO_BACKUP);

        this.info.ReadInfo();
        this.map = this.readMapFile(PROPERTIES);
        
        log.pushToLogBuffer("\n ===== Map Debug Below =====\n");
        log.printLogBuffer();

        return this;
    }

    private getLogoColor(col: [number, number, number] | "random"): [number, number, number] {
        if (col === "random") {
            const [r, g, b] = HSVtoRGB(Random(0, 360, 0) / 360);
            return [r * 255, g * 255, b * 255];
        }
        return col.map(v => v * 255) as [number, number, number];
    }

    private getAssetBundleCRCs(path: string = "bundleinfo.json"): void {
        const bundleStart = performance.now();

        log.info(`AssetBundle CRCs not defined. Attempting to automatically add CRCs...`);

        let bundleinfo: BundleInfo = this.readJSON(path) as BundleInfo;

        if (Object.keys(bundleinfo).length === 0) return;

        try {
            log.info(`Adding AssetBundle CRCs to ${log.console.FILE_MSG("info.dat")}...`);

            const crcs = bundleinfo.bundleCRCs;
            this.Info.CustomData._assetBundle = crcs;
            
            log.info(`Added AssetBundle CRCs to ${log.console.FILE_MSG("info.dat")} in: ${log.console.TIME_MSG(bundleStart)}\n`);
        } catch (e) {
            log.error(`bundleCRCs could not be found from ${log.console.FILE_MSG("bundleinfo.json")}`);
            log.error(`Failed to automatically add AssetBundle CRCs to ${log.console.FILE_MSG("info.dat")}.`);
            return;
        }
    }

    private readJSON(path: string): Record<string, any> {
        try {
            const START = performance.now();
            log.info(`Reading ${log.console.FILE_MSG(path)}...`);
            const data = JSON.parse(readFileSync(path, "utf-8"));
            log.success(`Read ${log.console.FILE_MSG(path)}`, { StartTime: START });
            return data;
        } catch (e) {
            log.error(`Could not read ${log.console.FILE_MSG(path)}: ${(e as Error).message ?? "Unknown error"}`);
            return {};
        }
    }

    private pushFromJSONIfExists<T>(
        jsonArray: any[],
        targetArray: { push: (...args: T[]) => void },
        fromJSON: (...args: any[]) => T[], 
        key: string
    ): void {
        if (jsonArray?.length > 0) {
            targetArray.push(...fromJSON(...jsonArray));
        }
        this.unhandledData[key] = undefined;
    }    

    private readMapFile(properties: IInitParameters): V3Map {
        const START = performance.now();

        let json: Record<string, any> = this.readJSON(this.path.input);
        
        if (Object.keys(json).length === 0) return new V3Map();

        json.customData ??= {};

        let serialized: V3Map;
        
        const start = performance.now();
        
        log.info(`Serializing ${log.console.FILE_MSG(this.path.input)}...`);

        serialized = new V3Map();

        const sCustomData = serialized.CustomData;
        const jCustomData = json.customData;

        const push = this.pushFromJSONIfExists.bind(this);

        push(json.bpmEvents, serialized.BPMEvents, BPMEvent.fromJSON, "bpmEvents");
        push(json.rotationEvents, serialized.RotationEvents, RotationEvent.fromJSON, "rotationEvents");

        if (!properties.LightshowDifficulty) {
            push(json.colorBoostBeatmapEvents, serialized.ColorBoostBeatmapEvents, ColorBoostBeatmapEvent.fromJSON, "colorBoostBeatmapEvents");
            push(json.basicBeatmapEvents, serialized.BasicBeatmapEvents, BaseBeatmapEvent.fromJSON, "basicBeatmapEvents");
        }

        if (properties.LightshowDifficulty) {
            const lightshowDiff = this.readJSON(properties.LightshowDifficulty);
            
            push(lightshowDiff.BasicBeatmapEvents, serialized.ColorBoostBeatmapEvents, ColorBoostBeatmapEvent.fromJSON, "colorBoostBeatmapEvents");
            push(lightshowDiff.ColorBoostBeatmapEvents, serialized.ColorBoostBeatmapEvents, ColorBoostBeatmapEvent.fromJSON, "colorBoostBeatmapEvents");
        }

        push(json.colorNotes, serialized.ColorNotes, Note.fromJSON, "colorNotes");
        push(json.bombNotes, serialized.BombNotes, Bomb.fromJSON, "bombNotes");
        push(json.obstacles, serialized.Obstacles, Obstacle.fromJSON, "obstacles");
        push(json.sliders, serialized.Sliders, Slider.fromJSON, "sliders");
        push(json.burstSliders, serialized.BurstSliders, BurstSlider.fromJSON, "burstSliders");

        push(jCustomData.fakeColorNotes, (sCustomData.FakeColorNotes ?? new NoteArray(true)), Note.fromJSON, "fakeColorNotes");
        push(jCustomData.fakeBombNotes, (sCustomData.FakeBombNotes ?? new BombArray(true)), Bomb.fromJSON, "fakeBombNotes");
        push(jCustomData.fakeObstacles, (sCustomData.FakeObstacles ?? new ObstacleArray(true)), Obstacle.fromJSON, "fakeObstacles");
        push(jCustomData.fakeSliders, (sCustomData.FakeSliders ?? new SliderArray(true)), Slider.fromJSON, "fakeSliders");
        push(jCustomData.fakeBurstSliders, (sCustomData.FakeBurstSliders ?? new BurstSliderArray(true)), BurstSlider.fromJSON, "fakeBurstSliders");

        push(jCustomData.customEvents, (sCustomData.CustomEvents ?? []), CustomEventArray.fromJSON, "customEvents");
        push(jCustomData.environment, (sCustomData.Environment ?? []), Environment.fromJSON, "environment");

        sCustomData.Materials = new Map(Object.entries(jCustomData.materials || {}));
        sCustomData.PointDefinitions = new Map(Object.entries(jCustomData.pointDefinitions || {}));

        sCustomData.Time = jCustomData.time ?? 0;

        log.info(`Serialized ${log.console.FILE_MSG(this.path.input)} in: ${log.console.TIME_MSG(start)}`);
        log.success(`Loaded ${log.console.FILE_MSG(this.path.input)} in: ${log.console.TIME_MSG(START)}`);

        if (
            properties.InitializeCustomDataFields
            || properties.InitializeAnimationFields
            || properties.ForcedColors
            || properties.ForcedNJS
            || properties.ForcedOffset
        ) {
            try {
                log.info(`Initializing ${log.console.OBJ_MSG("CustomData")} fields...`);
                this.map.initMapCustomData(serialized, properties, this.DifficultyInfo.NJS, this.DifficultyInfo.Offset);
            } catch (e) {
                log.error(`Could not initialize ${log.console.OBJ_MSG("CustomData")} fields: ${(e as Error).message ?? "Unknown error"}`);
                log.error(`Failed to initialize ${log.console.OBJ_MSG("CustomData")} fields.`);
            }
        }

        log.success(`Read and initialized ${log.console.FILE_MSG(this.path.input)}`, { StartTime: START });

        return serialized;
    }

    private mapToObject(): mapJSON {
        const map: mapJSON = {} as mapJSON;

        try {
            const m = this.map;
            const d = m.CustomData;
            const u = this.unhandledData;
    
            map.version = m.Version ?? "3.3.0";
            map.bpmEvents = m.BPMEvents ?? [];
            map.rotationEvents = m.RotationEvents ?? [];
            map.colorBoostBeatmapEvents = m.ColorBoostBeatmapEvents ?? [];
            map.basicBeatmapEvents = m.BasicBeatmapEvents ?? [];
            map.colorNotes = m.ColorNotes ?? [];
            map.bombNotes = m.BombNotes ?? [];
            map.obstacles = m.Obstacles ?? [];
            map.sliders = m.Sliders ?? [];
            map.burstSliders = m.BurstSliders ?? [];

            map.waypoints = u.waypoints ?? [];
            map.lightColorEventBoxGroups = u.lightColorEventBoxGroups ?? [];
            map.lightRotationEventBoxGroups = u.lightRotationEventBoxGroups ?? [];
            map.lightTranslationEventBoxGroups = u.lightTranslationEventBoxGroups ?? [];
            map.vfxEventBoxGroups = u.vfxEventBoxGroups ?? [];
            map._fxEventsCollection = u._fxEventsCollection ?? [];
            map.basicEventTypesWithKeywords = u.basicEventTypesWithKeywords ?? [];
            map.useNormalEventsAsCompatibleEvents = u.useNormalEventsAsCompatibleEvents ?? true;
            map.customData = {} as Record<string, number | Record<string, any> | object[] | Map<"materials", object> | Map<"pointDefinitions", AnyAnimation>>;
    
            const cdEntries: [string, any][] = [
                ["customEvents", d.CustomEvents],
                ["materials", d.Materials?.size ? Object.fromEntries(d.Materials) : undefined],
                ["pointDefinitions", d.PointDefinitions?.size ? Object.fromEntries(d.PointDefinitions) : undefined],
                ["environment", d.Environment],
                ["time", d.Time],
                ["fakeColorNotes", d.FakeColorNotes],
                ["fakeBombNotes", d.FakeBombNotes],
                ["fakeObstacles", d.FakeObstacles],
                ["fakeSliders", d.FakeSliders],
                ["fakeBurstSliders", d.FakeBurstSliders],
            ];

            const cd = Object.fromEntries(
                cdEntries.filter(([, val]) => val !== undefined)
            );
    
            if (Object.keys(cd).length > 0) {
                map.customData = cd;
            }
    
            return map;
        } catch (e) {
            log.error(`Could not convert ${log.console.FILE_MSG(this.path.input)} to object: ${(e as Error).message ?? "Unknown error"}`);
            return map;
        }
    }    

    private async writeFileStream(indent: number | false = false) {
        const newMap = this.mapToObject();
        const stream = createWriteStream(this.path.output);
    
        const indentStr = typeof indent === "number" && indent > 0 ? " ".repeat(indent) : "";
        const newline = indentStr ? "\n" : "";
        const separator = indentStr ? ": " : ":";
    
        stream.write("{" + newline);
    
        const keys = Object.keys(newMap);
        keys.forEach((key, index) => {
            const value = JSON.stringify(newMap[key as keyof mapJSON], null, indent || 0);
            const line = indentStr
                ? indentStr + JSON.stringify(key) + separator + value
                : JSON.stringify(key) + separator + value;
    
            stream.write(line);
            if (index < keys.length - 1) {
                stream.write("," + newline);
            } else {
                stream.write(newline);
            }
        });
    
        stream.write("}");
        stream.end();
    }
    

    Push(params: {
        format?: boolean,
    } = {
        format: false
    }): void {
        log.pushToLogBuffer(" ===== Map Debug Above =====\n");
        log.printLogBuffer();

        let start = performance.now();
        if (this.DifficultyInfo.CustomData?.Requirements?.includes(PLUGIN.Vivify)) {
            try {
                log.info(`Attempting to get ${log.console.OBJ_MSG("AssetBundle")} CRCs...`);
                this.getAssetBundleCRCs();
            }
            catch (e) { log.error(`Could not get ${log.console.OBJ_MSG("AssetBundle")} CRCs: ${(e as Error).message ?? "Unknown error"}`); }
        }

        this.info.WriteInfo();

        try { // Clear empty CustomData from objects
            log.info(`Clearing empty ${log.console.OBJ_MSG("CustomData")} for all objects...`);

            const allObjects = [
                ...this.map.ColorNotes,
                ...this.map.Obstacles,
                ...this.map.BombNotes,
                ...this.map.Sliders,
                ...this.map.BurstSliders,
                ...(this.map.CustomData.FakeColorNotes ?? []),
                ...(this.map.CustomData.FakeBombNotes ?? []),
                ...(this.map.CustomData.FakeObstacles ?? []),
                ...(this.map.CustomData.FakeSliders ?? []),
                ...(this.map.CustomData.FakeBurstSliders ?? []),
            ];

            for (const object of allObjects) {
                object.ClearAllEmptyData();
            }
        } catch (e) { log.error(`Could not clear ${log.console.OBJ_MSG("CustomData")} for objects: ${(e as Error).message}`); }

        start = performance.now();

        log.info(`Saving changes to ${log.console.FILE_MSG(this.path.output)}...`);

        // If JSON should be saved as a fast stream
        this.writeFileStream(params.format ? 2 : false);
        
        log.success(`Saved ${log.console.FILE_MSG(this.path.output)} in: ${log.console.TIME_MSG(start)}`);
    }
}