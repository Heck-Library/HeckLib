import { readFileSync, writeFileSync } from "fs";
import { BeatmapCharacteristic, PLUGIN } from "../util/enums";
import { IInfo, IDifficultyBeatmap, IDifficultyBeatmapCustomData, ISettings } from "./IInfo";
import { Settings } from "../v3/map/settings/Settings";
import { log } from "../util/logs";

export interface IDifficultyBeatmapSet {
    BeatmapCharacteristicName: BeatmapCharacteristic;
    DifficultyBeatmaps: DifficultyBeatmap[];
}

enum Diff {
    Easy = "Easy",
    Normal = "Normal",
    Hard = "Hard",
    Expert = "Expert",
    ExpertPlus = "ExpertPlus"
}

enum DiffRank {
    Easy = 1,
    Normal = 3,
    Hard = 5,
    Expert = 7,
    ExpertPlus = 9
}

export class DifficultyBeatmapSet implements IDifficultyBeatmapSet {
    private _beatmapCharacteristicName: BeatmapCharacteristic = BeatmapCharacteristic.Standard;
    private _difficultyBeatmaps: DifficultyBeatmap[] = [];

    set BeatmapCharacteristicName(beatmapCharacteristicName: BeatmapCharacteristic) { this._beatmapCharacteristicName = beatmapCharacteristicName; }
    set DifficultyBeatmaps(difficultyBeatmaps: DifficultyBeatmap[]) { this._difficultyBeatmaps = difficultyBeatmaps; }

    get BeatmapCharacteristicName(): BeatmapCharacteristic { return this._beatmapCharacteristicName; }
    get DifficultyBeatmaps(): DifficultyBeatmap[] { return this._difficultyBeatmaps; }

    constructor(difficultyBeatmapSet: IDifficultyBeatmapSet) {
        this.BeatmapCharacteristicName = difficultyBeatmapSet.BeatmapCharacteristicName;
        this.DifficultyBeatmaps = difficultyBeatmapSet.DifficultyBeatmaps;
    }
}

interface IRGB {
    r: number;
    g: number;
    b: number;
}

type RGBVec = [number, number, number];

export class DifficultyBeatmapCustomData implements IDifficultyBeatmapCustomData {
    private _oneSaber?: boolean;
    private _showRotationNoteSpawnLines?: boolean;
    private _editorOffset?: number;
    private _editorOldOffset?: number;
    private _difficultyLabel?: string;
    private _settings?: Settings;
    private _colorLeft?: IRGB;
    private _colorRight?: IRGB;
    private _envColorLeft?: IRGB;
    private _envColorRight?: IRGB;
    private _envColorWhite?: IRGB;
    private _envColorLeftBoost?: IRGB;
    private _envColorRightBoost?: IRGB;
    private _envColorWhiteBoost?: IRGB;
    private _obstacleColor?: IRGB;
    private _warnings?: string[];
    private _information?: string[];
    private _suggestions?: string[] | PLUGIN[];
    private _requirements?: string[] | PLUGIN[];

    private static ifVecRGBVecToIRGB(color?: RGBVec | IRGB): undefined | IRGB {
        if (color === undefined) return;
        return Array.isArray(color) ? {r: color[0], g: color[1], b: color[2]} : color;
    }

    set OneSaber(oneSaber: boolean) {
        this._oneSaber = oneSaber;
        log.change("Difficulty", "OneSaber", oneSaber, "boolean");
    }

    set ShowRotationNoteSpawnLines(showRotationNoteSpawnLines: boolean) {
        this._showRotationNoteSpawnLines = showRotationNoteSpawnLines;
        log.change("Difficulty", "ShowRotationNoteSpawnLines", showRotationNoteSpawnLines, "boolean");
    }

    set EditorOffset(editorOffset: number) {
        log.change("Difficulty", "EditorOffset", editorOffset, "number", "object", false);
        this._editorOffset = editorOffset;
    }
    set EditorOldOffset(editorOldOffset: number) {
        log.change("Difficulty", "EditorOldOffset", editorOldOffset, "number", "object", false);
        this._editorOldOffset = editorOldOffset;
    }

    set DifficultyLabel(difficultyLabel: string) {
        this._difficultyLabel = difficultyLabel;
        log.change("Difficulty", "DifficultyLabel", difficultyLabel, "string");
    }
    
    set Settings(settings: ISettings) { this._settings = new Settings(settings); }

    set ColorLeft(color: RGBVec | IRGB) {
        this._colorLeft = DifficultyBeatmapCustomData.ifVecRGBVecToIRGB(color);
        log.change("Difficulty", "ColorLeft", color, "color");
    }
    set ColorRight(color: RGBVec | IRGB) {
        this._colorRight = DifficultyBeatmapCustomData.ifVecRGBVecToIRGB(color);
        log.change("Difficulty", "ColorRight", color, "color");
    }

    set EnvColorLeft(color: RGBVec | IRGB) {
        this._envColorLeft = DifficultyBeatmapCustomData.ifVecRGBVecToIRGB(color);
        log.change("Difficulty", "EnvColorLeft", color, "color");
    }
    set EnvColorRight(color: RGBVec | IRGB) {
        this._envColorRight = DifficultyBeatmapCustomData.ifVecRGBVecToIRGB(color);
        log.change("Difficulty", "EnvColorRight", color, "color");
    }
    set EnvColorWhite(color: RGBVec | IRGB) {
        this._envColorWhite = DifficultyBeatmapCustomData.ifVecRGBVecToIRGB(color);
        log.change("Difficulty", "EnvColorWhite", color, "color");
    }

    set EnvColorLeftBoost(color: RGBVec | IRGB) {
        this._envColorLeftBoost = DifficultyBeatmapCustomData.ifVecRGBVecToIRGB(color);
        log.change("Difficulty", "EnvColorLeftBoost", color, "color");
    }
    set EnvColorRightBoost(color: RGBVec | IRGB) {
        this._envColorRightBoost = DifficultyBeatmapCustomData.ifVecRGBVecToIRGB(color);
        log.change("Difficulty", "EnvColorRightBoost", color, "color");
    }
    set EnvColorWhiteBoost(color: RGBVec | IRGB) {
        this._envColorWhiteBoost = DifficultyBeatmapCustomData.ifVecRGBVecToIRGB(color);
        log.change("Difficulty", "EnvColorWhiteBoost", color, "color");
    }

    set ObstacleColor(color: RGBVec | IRGB) {
        this._obstacleColor = DifficultyBeatmapCustomData.ifVecRGBVecToIRGB(color);
        log.change("Difficulty", "ObstacleColor", color, "color");
    }

    set Warnings(warnings: string[]) { 
        this._warnings = warnings;
        log.change("Difficulty", "Warnings", warnings, "array"); 
    }
    set Information(information: string[]) { 
        this._information = information;
        log.change("Difficulty", "Information", information, "array"); 
    }
    
    set Suggestions(suggestions: string[] | PLUGIN[]) { 
        this._suggestions = suggestions;
        log.change("Difficulty", "Suggestions", suggestions, "array"); 
    }
    set Requirements(requirements: string[] | PLUGIN[]) {
        this._requirements = requirements;
        log.change("Difficulty", "Requirements", requirements, "array"); 
    }
    
    get OneSaber(): undefined | boolean { return this._oneSaber; }
    get ShowRotationNoteSpawnLines(): undefined | boolean { return this._showRotationNoteSpawnLines; }
    get EditorOffset(): undefined | number { return this._editorOffset; }
    get EditorOldOffset(): undefined | number { return this._editorOldOffset; }
    get DifficultyLabel(): undefined | string { return this._difficultyLabel; }
    get Settings(): undefined | ISettings { return this._settings; }
    get ColorLeft(): undefined | IRGB { return this._colorLeft; }
    get ColorRight(): undefined | IRGB { return this._colorRight; }
    get EnvColorLeft(): undefined | IRGB { return this._envColorLeft; }
    get EnvColorRight(): undefined | IRGB { return this._envColorRight; }
    get EnvColorWhite(): undefined | IRGB { return this._envColorWhite; }
    get EnvColorLeftBoost(): undefined | IRGB { return this._envColorLeftBoost; }
    get EnvColorRightBoost(): undefined | IRGB { return this._envColorRightBoost; }
    get EnvColorWhiteBoost(): undefined | IRGB { return this._envColorWhiteBoost; }
    get ObstacleColor(): undefined | IRGB { return this._obstacleColor; }
    get Warnings(): undefined | string[] { return this._warnings; }
    get Information(): undefined | string[] { return this._information; }
    get Suggestions(): undefined | string[] | PLUGIN[] { return this._suggestions; }
    get Requirements(): undefined | string[] | PLUGIN[] { return this._requirements; }

    constructor(difficultyBeatmapCustomData: IDifficultyBeatmapCustomData = {} as IDifficultyBeatmapCustomData) {
        const vecToIRGB = DifficultyBeatmapCustomData.ifVecRGBVecToIRGB;

        this._oneSaber = difficultyBeatmapCustomData.OneSaber;
        this._showRotationNoteSpawnLines = difficultyBeatmapCustomData.ShowRotationNoteSpawnLines;
        this._editorOffset = difficultyBeatmapCustomData.EditorOffset;
        this._editorOldOffset = difficultyBeatmapCustomData.EditorOldOffset;
        this._difficultyLabel = difficultyBeatmapCustomData.DifficultyLabel;
        this._settings = new Settings(difficultyBeatmapCustomData.Settings);
        this._colorLeft = vecToIRGB(difficultyBeatmapCustomData.ColorLeft);
        this._colorRight = vecToIRGB(difficultyBeatmapCustomData.ColorRight);
        this._envColorLeft = vecToIRGB(difficultyBeatmapCustomData.EnvColorLeft);
        this._envColorRight = vecToIRGB(difficultyBeatmapCustomData.EnvColorRight);
        this._envColorLeftBoost = vecToIRGB(difficultyBeatmapCustomData.EnvColorLeftBoost);
        this._envColorRightBoost = vecToIRGB(difficultyBeatmapCustomData.EnvColorRightBoost);
        this._obstacleColor = vecToIRGB(difficultyBeatmapCustomData.ObstacleColor);
        this._warnings = difficultyBeatmapCustomData.Warnings;
        this._information = difficultyBeatmapCustomData.Information;
        this._suggestions = difficultyBeatmapCustomData.Suggestions;
        this._requirements = difficultyBeatmapCustomData.Requirements;
    }
}

export class DifficultyBeatmap implements IDifficultyBeatmap {
    public static readonly DIFFICULTY = Diff;

    private _difficulty: Diff = DifficultyBeatmap.DIFFICULTY.ExpertPlus;
    private _difficultyRank: DiffRank = DiffRank.ExpertPlus;
    private _beatmapFilename: string = "ExpertPlus.dat";
    private _noteJumpMovementSpeed: number = 10;
    private _noteJumpStartBeatOffset: number = 0;
    private _beatmapColorSchemeIdx: number = 0;
    private _environmentNameIdx: number = 0;
    private _customData: DifficultyBeatmapCustomData = new DifficultyBeatmapCustomData();

    set Difficulty(difficulty: Diff) {
        this._difficulty = difficulty;
        this._difficultyRank = DiffRank[Diff[difficulty]];
        log.change("Difficulty", "Difficulty", difficulty, "string", "object", false);
    }
    set BeatmapFilename(beatmapFilename: string) { 
        log.change("Difficulty", "BeatmapFilename", beatmapFilename, "string", "object", false);
        this._beatmapFilename = beatmapFilename; 
    }
    set NJS(noteJumpMovementSpeed: number) {
        log.change("Difficulty", "NJS", noteJumpMovementSpeed, "number", "object", false);
        this._noteJumpMovementSpeed = noteJumpMovementSpeed;
    }
    set Offset(noteJumpStartBeatOffset: number) {
        log.change("Difficulty", "Offset", noteJumpStartBeatOffset, "number", "object", false);
        this._noteJumpStartBeatOffset = noteJumpStartBeatOffset;
    }
    set BeatmapColorSchemeIdx(beatmapColorSchemeIdx: number) {
        log.change("Difficulty", "BeatmapColorSchemeIdx", beatmapColorSchemeIdx, "number", "object", false);
        this._beatmapColorSchemeIdx = beatmapColorSchemeIdx;
    }
    set EnvironmentNameIdx(environmentNameIdx: number) {
        log.change("Difficulty", "EnvironmentNameIdx", environmentNameIdx, "number", "object", false);
        this._environmentNameIdx = environmentNameIdx;
    }
    set CustomData(customData: IDifficultyBeatmapCustomData) { this._customData = new DifficultyBeatmapCustomData(customData); }

    get Difficulty(): Diff { return this._difficulty; }
    get DifficultyRank(): DiffRank { return this._difficultyRank; }
    get BeatmapFilename(): string { return this._beatmapFilename; }
    get NJS(): number { return this._noteJumpMovementSpeed; }
    get Offset(): number { return this._noteJumpStartBeatOffset; }
    get BeatmapColorSchemeIdx(): number { return this._beatmapColorSchemeIdx; }
    get EnvironmentNameIdx(): number { return this._environmentNameIdx; }
    get CustomData(): IDifficultyBeatmapCustomData { return this._customData; }

    constructor(difficultyBeatmap?: IDifficultyBeatmap) {
        if (!difficultyBeatmap) difficultyBeatmap = {} as IDifficultyBeatmap;

        this._difficulty = difficultyBeatmap.Difficulty ?? DifficultyBeatmap.DIFFICULTY.ExpertPlus;
        this._difficultyRank = difficultyBeatmap.DifficultyRank ?? DiffRank.ExpertPlus;
        this._beatmapFilename = difficultyBeatmap.BeatmapFilename ?? "ExpertPlusLawless.dat";
        this._noteJumpMovementSpeed = difficultyBeatmap.NJS ?? 16;
        this._noteJumpStartBeatOffset = difficultyBeatmap.Offset ?? 0;
        this._customData = new DifficultyBeatmapCustomData(difficultyBeatmap.CustomData);
    }
}

export class Info implements IInfo {
    private _version: string = "2.0.0";
    private _songName: string = ""; 
    private _songSubName: string = ""; 
    private _songAuthorName: string = ""; 
    private _levelAuthorName: string = "";
    private _beatsPerMinute: number = 0;
    private _songTimeOffset: number = 0;
    private _shuffle: number = 0;
    private _shufflePeriod: number = 0;
    private _previewStartTime: number = 0;
    private _previewDuration: number = 0;
    private _songFilename: string = "song.ogg";
    private _coverImageFilename: string = "cover.png";
    private _environmentName: string = "DefaultEnvironment";
    private _allDirectionsEnvironmentName: string = "GlassDesertEnvironment";
    private _customData: Record<string, any> = {};
    private _difficultyBeatmapSets: DifficultyBeatmapSet[] = [];

    set SongName(songName: string) {
        this._songName = songName;
        log.change("Map", "SongName", songName, "string", "object", false); }
    set SongSubName(songSubName: string) {
        this._songSubName = songSubName;
        log.change("Map", "SongSubName", songSubName, "string", "object", false); }
    set SongAuthorName(songAuthorName: string) {
        this._songAuthorName = songAuthorName;
        log.change("Map", "SongAuthorName", songAuthorName, "string", "object", false); }
    set LevelAuthorName(levelAuthorName: string) {
        this._levelAuthorName = levelAuthorName;
        log.change("Map", "LevelAuthorName", levelAuthorName, "string", "object", false); }
    set BPM(beatsPerMinute: number) {
        this._beatsPerMinute = beatsPerMinute;
        log.change("Map", "BPM", beatsPerMinute, "string", "object", false); }
    set Offset(songTimeOffset: number) {
        this._songTimeOffset = songTimeOffset;
        log.change("Map", "Offset", songTimeOffset, "string", "object", false); }
    set Shuffle(shuffle: number) {
        this._shuffle = shuffle;
        log.change("Map", "Shuffle", shuffle, "string", "object", false); }
    set ShufflePeriod(shufflePeriod: number) {
        this._shufflePeriod = shufflePeriod;
        log.change("Map", "ShufflePeriod", shufflePeriod, "string", "object", false); }
    set PreviewStartTime(previewStartTime: number) {
        this._previewStartTime = previewStartTime;
        log.change("Map", "PreviewStartTime", previewStartTime, "string", "object", false); }
    set PreviewDuration(previewDuration: number) {
        this._previewDuration = previewDuration;
        log.change("Map", "PreviewDuration", previewDuration, "string", "object", false); }
    set SongFilename(songFilename: string) {
        this._songFilename = songFilename;
        log.change("Map", "SongFilename", songFilename, "string", "object", false); }
    set CoverImageFilename(coverImageFilename: string) {
        this._coverImageFilename = coverImageFilename;
        log.change("Map", "CoverImageFilename", coverImageFilename, "string", "object", false); }
    set EnvironmentName(environmentName: string) {
        this._environmentName = environmentName;
        log.change("Map", "EnvironmentName", environmentName, "string", "object", false); }
    set AllDirectionsEnvironmentName(allDirectionsEnvironmentName: string) {
        this._allDirectionsEnvironmentName = allDirectionsEnvironmentName;
        log.change("Map", "AllDirectionsEnvironmentName", allDirectionsEnvironmentName, "string", "object", false); }
    set CustomData(customData: Record<string, any>) {
        this._customData = customData;
        log.change("Map", "CustomData", customData, "object", "custom");
    }
    set DifficultyBeatmapSets(difficultyBeatmapSets: IDifficultyBeatmapSet[]) {
        this._difficultyBeatmapSets = difficultyBeatmapSets.map(set => new DifficultyBeatmapSet(set));
        log.change("Map", "DifficultyBeatmapSets", difficultyBeatmapSets, "Map", "custom");
    }

    get Version(): string { return this._version; }
    get SongName(): string { return this._songName; }
    get SongSubName(): string { return this._songSubName; }
    get SongAuthorName(): string { return this._songAuthorName; }
    get LevelAuthorName(): string { return this._levelAuthorName; }
    get BPM(): number { return this._beatsPerMinute; }
    get Offset(): number { return this._songTimeOffset; }
    get Shuffle(): number { return this._shuffle; }
    get ShufflePeriod(): number { return this._shufflePeriod; }
    get PreviewStartTime(): number { return this._previewStartTime; }
    get PreviewDuration(): number { return this._previewDuration; }
    get SongFilename(): string { return this._songFilename; }
    get CoverImageFilename(): string { return this._coverImageFilename; }
    get EnvironmentName(): string { return this._environmentName; }
    get AllDirectionsEnvironmentName(): string { return this._allDirectionsEnvironmentName; }
    get CustomData(): Record<string, any> { return this._customData; }
    get DifficultyBeatmapSets(): IDifficultyBeatmapSet[] { return this._difficultyBeatmapSets; }

    private addHeckLibToEditors(): void {
        log.info(`Adding ${log.console.STR_MSG('HeckLib')} to ${log.console.FIELD_MSG("_editors")}...`);

        if (!this.CustomData) this.CustomData = {};
        
        if (!this.CustomData._editors) {
            this.CustomData._editors = {
                _lastEditedBy: "HeckLib",
                HeckLib: {
                    version: "3.0.0",
                    runCount: 1
                }
            };
            return;
        }

        this.CustomData._editors._lastEditedBy = "HeckLib";

        if (!this.CustomData._editors.HeckLib) this.CustomData._editors.HeckLib = {
            version: "3.0.0",
            runCount: 1
        }

        if (this.CustomData._editors.HeckLib) {
            this.CustomData._editors.HeckLib.runCount++;
        }
    }
    
    ReadInfo(path: string = "./info.dat", backupPath: string = "./info.bak"): void {
        const START = performance.now();
        let data: string;
        try {
            log.info(`Reading ${log.console.FILE_MSG("info.dat")}...`);
            data = readFileSync(path, "utf8");
            log.success(`Read ${log.console.FILE_MSG("info.dat")}`, { StartTime: START });
        } catch(e) {
            log.error(`Error reading ${log.console.FILE_MSG("info.dat")}: \x1b[31m${(e as Error).message ?? "Unknown error"}\n`);
            return;
        }

        writeFileSync(backupPath, data, "utf8");
        
        try {
            log.info(`Parsing ${log.console.FILE_MSG("info.dat")}...`);
            const json = JSON.parse(data);
            this._songName = json._songName;
            this._songSubName = json._songSubName;
            this._songAuthorName = json._songAuthorName;
            this._levelAuthorName = json._levelAuthorName;
            this._beatsPerMinute = json._beatsPerMinute;
            this._songTimeOffset = json._songTimeOffset;
            this._shuffle = json._shuffle;
            this._shufflePeriod = json._shufflePeriod;
            this._previewStartTime = json._previewStartTime;
            this._previewDuration = json._previewDuration;
            this._songFilename = json._songFilename;
            this._coverImageFilename = json._coverImageFilename;
            this._environmentName = json._environmentName;
            this._allDirectionsEnvironmentName = json._allDirectionsEnvironmentName;
            this._customData = json._customData;
    
            json._difficultyBeatmapSets.forEach((set: Record<string, any>) => {
                const diffBeatmaps: DifficultyBeatmap[] = [];
    
                set._difficultyBeatmaps.forEach((diffBeatmap: Record<string, any>) => {
                    const diff = new DifficultyBeatmap();

                    diff.Difficulty = diffBeatmap._difficulty;
                    diff.BeatmapFilename = diffBeatmap._beatmapFilename;
                    diff.NJS = diffBeatmap._noteJumpMovementSpeed;
                    diff.Offset = diffBeatmap._noteJumpStartBeatOffset;
                    diff.CustomData = diffBeatmap._customData;

                    diffBeatmaps.push(diff);
                });
    
                this.DifficultyBeatmapSets.push(new DifficultyBeatmapSet({
                    BeatmapCharacteristicName: set._beatmapCharacteristicName,
                    DifficultyBeatmaps: diffBeatmaps
                }));
            });

            log.success("Parsed " + log.console.FILE_MSG("info.dat"), { StartTime: START });
        } catch(e) {
            log.error(`Error parsing ${log.console.FILE_MSG("info.dat")}: \x1b[31m${(e as Error).message ?? "Unknown error"}\n`);
        }

        this.addHeckLibToEditors();
    }

    async WriteInfo() {
        log.info(`Writing ${log.console.FILE_MSG("info.dat")}...`);

        let start = performance.now();
        const json = JSON.stringify(this, null, 4);

        try {
            writeFileSync("./info.dat", json, "utf8");
            log.info(`Wrote ${log.console.FILE_MSG("info.dat")} in: ${log.console.TIME_MSG(start)}.\n`);
        } 
        catch (e) {
            log.error(`Error writing ${log.console.FILE_MSG("info.dat")}: \x1b[31m${(e as Error).message ?? "Unknown error"}\n`);
        }
    }

}