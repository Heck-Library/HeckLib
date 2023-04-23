import IDifficultyCustomData from "./difficultyCustomdata";

export default interface IDifficultyBeatmap {
    _difficulty: string;
    _difficultyRank: 1 | 3 | 5 | 7 | 9;
    _beatmapFilename: string;
    _noteJumpMovementSpeed: number;
    _noteJumpStartBeatOffset: number;
    _customData?: IDifficultyCustomData;
}