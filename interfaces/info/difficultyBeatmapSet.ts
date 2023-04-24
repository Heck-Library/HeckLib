import IDifficultyBeatmap from "./difficultyBeatmap";

export default interface IDifficultyBeatmapSet {
    beatmapCharacteristicName: string;
    difficultyBeatmaps: IDifficultyBeatmap[];
}