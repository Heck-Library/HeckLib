import IDifficultyCustomData from "./difficultyCustomdata";

export default interface IDifficultyBeatmap {
    /**
     * ### Difficulty
     * 
     * The difficulty of the map.
     * 
     * **Example:** `"ExpertPlus"`
     * 
     * Possible values:
     * 
     * - `"Easy"`
     * - `"Normal"`
     * - `"Hard"`
     * - `"Expert"`
     * - `"ExpertPlus"`
     */
    difficulty: string;
    /**
     * ### Difficulty Rank
     * 
     * The difficulty rank of the map. This is used for sorting maps in the game. This is a number from 1 to 9 by increments of 2.
     * 
     * - 1 = Easy
     * - 3 = Normal
     * - 5 = Hard
     * - 7 = Expert
     * - 9 = ExpertPlus
     */
    difficultyRank: 1 | 3 | 5 | 7 | 9;
    /**
     * ### Beatmap Filename
     * 
     * The filename of the beatmap. This is the file that contains the notes and obstacles. This is usually in the format of
     * 
     * `"<Difficulty><BeatMapCharacteristicName>.dat"`
     * 
     * **Example:** `"ExpertPlusStandard.dat"`
     */
    beatmapFilename: string;
    /**
     * ### Note Jump Movement Speed
     * 
     * The note jump movement speed of the map. This is the speed at which the notes move towards you.
     */
    noteJumpMovementSpeed: number;
    /**
     * ### Note Jump Start Beat Offset
     * 
     * The note jump start beat offset of the map. This is the offset at which the notes start spawning.
     */
    noteJumpStartBeatOffset: number;
    /**
     * ### Custom Data
     * 
     * The custom data of the map. This is used for custom data that is not part of the base game. This is usually used for options such as
     * 
     * - Settings setter
     * - Requirements
     * - Suggestions
     * - Warnings
     * - Information
     * - Collaborators
     */
    customData?: IDifficultyCustomData;
}