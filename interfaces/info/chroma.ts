export default interface IChromaSettings {
    /**
     * ### Disable Chroma Events
     * 
     * Disables Chroma entirely.
     */
    disableChromaEvents?: boolean;
    /**
     * ### Disable Environment Enhancements
     * 
     * Disables the environment enhancements that come with Chroma.
     */
    disableEnvironmentEnhancements?: boolean;
    /**
     * ### Disable Note Coloring
     * 
     * Disables note coloring.
     */
    disableNoteColoring?: boolean;
    /**
     * ### Force Zen Mode Walls
     * 
     * Forces walls on in Zen Mode. Useful if you want to watch a wall map in Zen Mode.
     */
    forceZenModeWalls?: boolean;
}