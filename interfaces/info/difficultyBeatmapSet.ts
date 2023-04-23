import IDifficultyBeatmap from "./difficultyBeatmap";

export default interface IDifficultyBeatmapSet {
    _beatmapCharacteristicName: string;
    _difficultyBeatmaps: IDifficultyBeatmap[];
}