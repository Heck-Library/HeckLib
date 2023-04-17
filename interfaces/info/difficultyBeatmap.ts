import IDifficultyCustomData from "./difficultyCustomdata";

export default interface IDifficultyBeatmap {
    difficulty: difficultyType;
    difficultyRank: 1 | 3 | 5 | 7 | 9;
    beatmapFilename: string;
    noteJumpMovementSpeed: number;
    noteJumpStartBeatOffset: number;
    customData?: IDifficultyCustomData;
}