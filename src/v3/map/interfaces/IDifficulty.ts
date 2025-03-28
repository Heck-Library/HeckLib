import { Info, DifficultyBeatmap } from "../../../info/Info200";
import { V3Map } from "../V3Map";

export interface IDifficulty {
    /**
     * ## Map
     * 
     * The map object that is being edited.
     * 
     * ---
     * 
     * ### Example
     * 
     * ```typescript
     * const notes = DIFF.Map.ColorNotes;
     * notes.forEach(n => {
     *     n.CustomData.Track = "UninteractableTrack";
     *     n.CustomData.Uninteractable = true;
     * });
     * ```
     */
    Map: V3Map
    /**
     * ## Info
     * 
     * The info object that is being edited.
     * 
     * ---
     * 
     * ### Example
     * 
     * ```typescript
     * const info = DIFF.Info;
     * info.LevelAuthorName = "Jevk"; // Set the level author name to "Jevk"
     * info.SongAuthor = "Camellia"; // Set the song author to "Camellia"
     * ```
     */
    Info: Info
    /**
     * ## DifficultyInfo
     * 
     * The difficulty info that is being edited.
     * 
     * This automatically will return the segment of the `Info.dat` that corresponds to the currently edited difficulty file.
     * 
     * ---
     * 
     * ### Example
     * 
     * ```typescript
     * const diff = DIFF.DifficultyInfo;
     * diff.NoteJumpMovementSpeed = 16; // Set the NJS to 16
     * diff.NoteJumpStartBeatOffset = 0; // Set the offset to 0
     * diff.CustomData.Requirements = [ // Set the requirements to the following plugins
     *     PLUGIN.Chroma,
     *     PLUGIN.NoodleExtensions,
     *     PLUGIN.Vivify
     * ];
     * DIFF.DifficultyInfo.CustomData.Warnings = [ // Set the warnings to the following
     *     "Flickering lights",
     *     "Player movement"
     * ];
     * ```
     */
    DifficultyInfo: DifficultyBeatmap

    /**
     * ## Difficulty.Push
     * 
     * Pushes the current difficulty data to the output file.
     * 
     * ---
     * 
     * ### Example
     * 
     * ```typescript
     * DIFF.Push({
     *     format: true // Optional, defaults to false because formatting is slow.
     * }).finally(() => console.log("Pushed changes to file."));
     * ```
     */
    Push(): void
}