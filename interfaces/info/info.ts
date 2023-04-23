import IDifficultyBeatmapSet from "./difficultyBeatmapSet";

export default interface IInfo {
    _version: string;
    _songName: string;
    _songSubName: string;
    _songAuthorName: string;
    _levelAuthorName: string;
    _beatsPerMinute: number;
    _shuffle: number;
    _shufflePeriod: number;
    _previewStartTime: number;
    _previewDuration: number;
    _songFileName: string;
    _coverImageFileName: string;
    _environmentName: string;
    _allDirectionsEnvironmentName: string;
    _songTimeOffset: number;
    _customData?: Record<string, any>;
    _difficultyBeatmapSets: IDifficultyBeatmapSet[];
}