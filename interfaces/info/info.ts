import IDifficultyBeatmapSet from "./difficultyBeatmapSet";

export default interface IInfo {
    version: string;
    songName: string;
    songSubName: string;
    songAuthorName: string;
    levelAuthorName: string;
    beatsPerMinute: number;
    shuffle: number;
    shufflePeriod: number;
    previewStartTime: number;
    previewDuration: number;
    songFileName: string;
    coverImageFileName: string;
    environmentName: string;
    allDirectionsEnvironmentName: string;
    songTimeOffset: number;
    customData?: Record<string, any>;
    difficultyBeatmapSets: IDifficultyBeatmapSet[];
}