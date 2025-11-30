import { PLUGIN } from "../util/enums";
import { IChromaSettings } from "../v3/map/settings/interfaces/IChroma";
import { IGraphicsSettings } from "../v3/map/settings/interfaces/IGraphicsSettings";
import { IModifierSettings } from "../v3/map/settings/Modifiers";
import { INoteTweaks } from "../v3/map/settings/mods/NoteTweaks";
import { IUITweaksSettings } from "../v3/map/settings/mods/UITweaks";
import { IPlayerOptions } from "../v3/map/settings/PlayerOptions";

type RGBVec = [number, number, number];

export interface IInfo {
    /**
     * ## Song Name
     * 
     * The name of the song.
     * 
     * ---
     * 
     * **_Note:_ This should not be edited using the script normally, and will produce a warning if it's set.**
     */
    SongName: string;
    /**
     * ## Song Subname
     * 
     * The subname of the song.
     * 
     * ---
     * 
     * **_Note:_ This should not be edited using the script normally, and will produce a warning if it's set.**
     */
    SongSubName: string;
    /**
     * ## Song Author Name
     * 
     * The name of the song's author.
     * 
     * ---
     * 
     * **_Note:_ This should not be edited using the script normally, and will produce a warning if it's set.**
     */
    SongAuthorName: string;
    /**
     * ## Level Author Name
     * 
     * The name of the level's author (you).
     * 
     * ---
     * 
     * **_Note:_ This should not be edited using the script normally, and will produce a warning if it's set.**
     */
    LevelAuthorName: string;
    /**
     * ## BPM
     * 
     * The BPM of the song.
     * 
     * ---
     * 
     * **_Note:_ This should not be edited using the script normally, and will produce a warning if it's set.**
     */
    BPM: number;
    /**
     * ## Offset
     * 
     * The offset of the song.
     * 
     * ---
     * 
     * **_Note:_ This should not be edited using the script normally, and will produce a warning if it's set.**
     */
    Offset: number;
    /**
     * ## Shuffle
     * 
     * no clue what this does lol
     * 
     * ---
     * 
     * **_Note:_ This should not be edited using the script normally, and will produce a warning if it's set.**
     */
    Shuffle: number;
    /**
     * ## Shuffle Period
     * 
     * no clue what this does either lol
     * 
     * ---
     * 
     * **_Note:_ This should not be edited using the script normally, and will produce a warning if it's set.**
     */
    ShufflePeriod: number;
    /**
     * ## Preview Start Time
     * 
     * The time in the song to start the preview at.
     * 
     * ---
     * 
     * **_Note:_ This should not be edited using the script normally, and will produce a warning if it's set.**
     */
    PreviewStartTime: number;
    /**
     * ## Preview Duration
     * 
     * The duration of the preview.
     * 
     * ---
     * 
     * **_Note:_ This should not be edited using the script normally, and will produce a warning if it's set.**
     */
    PreviewDuration: number;
    /**
     * ## Song Filename
     * 
     * The filename of the song.
     * 
     * ---
     * 
     * **_Note:_ This should not be edited using the script normally, and will produce a warning if it's set.**
     */
    SongFilename: string;
    /**
     * ## Cover Image Filename
     * 
     * The filename of the cover image.
     * 
     * ---
     * 
     * **_Note:_ This should not be edited using the script normally, and will produce a warning if it's set.**
     */
    CoverImageFilename: string;
    /**
     * ## Environment Name
     * 
     * The name of the environment the map is in. (e.g. DefaultEnvironment, BigMirrorEnvironment, TriangleEnvironment, etc.)
     * 
     * ---
     * 
     * **_Note:_ This should not be edited using the script normally, and will produce a warning if it's set.**
     */
    EnvironmentName: string;
    /**
     * ## All Directions Environment Name
     * 
     * The name of the environment the map is in when in 360°/90° mode. (e.g. GlassDesertEnvironment, etc.)
     * 
     * ---
     * 
     * **_Note:_ This should not be edited using the script normally, and will produce a warning if it's set.**
     */
    AllDirectionsEnvironmentName: string;
    /**
     * ## Custom Data
     * 
     * Custom data for the map. This can be used for anything you want. This will usually contain the editors and their versions. Another way to use it is with the Vivify's Assetbundle CRCs
     */
    CustomData: Record<string, any>;

    ReadInfo(): void;
    WriteInfo(): void;
}

enum Diff {
    Easy = "Easy",
    Normal = "Normal",
    Hard = "Hard",
    Expert = "Expert",
    ExpertPlus = "ExpertPlus"
}

export interface IDifficultyBeatmap {
    /**
     * ## Difficulty
     * 
     * The difficulty of the map.
     */
    Difficulty: Diff;
    /**
     * ## Difficulty Rank
     * 
     * The difficultyRank value of the difficulty.
     * 
     * ---
     * 
     * ### Values
     * 
     * - Easy: 1
     * - Normal: 3
     * - Hard: 5
     * - Expert: 7
     * - ExpertPlus: 9
     */
    DifficultyRank: number;
    /**
     * ## Beatmap Filename
     * 
     * The filename of the beatmap.
     */
    BeatmapFilename: string;
    /**
     * ## Note Jump Speed
     * 
     * The note jump speed of the map.
     */
    NJS: number;
    BeatmapColorSchemeIdx: number;
    EnvironmentNameIdx: number;
    /**
     * ## Offset
     * 
     * The offset of the map.
     */
    Offset: number;
    /**
     * ## CustomData
     * 
     * Contains all mod related values for the difficulty.
     */
    CustomData: IDifficultyBeatmapCustomData;
}

interface IRGB {
    r: number;
    g: number;
    b: number;
}

export interface IDifficultyBeatmapCustomData {
    /**
     * ## One Saber
     * 
     * Whether the map is a one saber map or not.
     */
    OneSaber?: boolean;
    /**
     * ## Show Rotation Note Spawn Lines
     * 
     * Whether to show the rotation note spawn lines or not.
     */
    ShowRotationNoteSpawnLines?: boolean;
    /**
     * ## Editor Offset
     * 
     * ngl idk what this is
     * 
     * it's a number tho
     */
    EditorOffset?: number;
    /**
     * ## Editor Old Offset
     * 
     * ngl idk what this is either, probably some deprecated MMA2 thing?
     * 
     * it's a number tho
     */
    EditorOldOffset?: number;
    /**
     * ## Difficulty Label
     * 
     * The label of the difficulty.
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * DIFF.DifficultyInfo.CustomData.DifficultyLabel = "6HOST";
     * ```
     */
    DifficultyLabel?: string;
    /**
     * ## Settings
     * 
     * The settings setter values to be used.
     * 
     * ---
     * 
     * ### Options
     * 
     * - `PlayerOptions` - The player options to be used.
     * - `Modifiers` - The modifiers to be used with the map (ie. NoFail, ProMode, etc.).
     * - `Environments` - Environment related settings.
     * - `Colors` - Color related settings.
     * - `Graphics` - Graphics settings.
     * - `Chroma` - Chroma settings.
     * - `CountersPlus` - Counters+ settings.
     * - `UITweaks` - UITweaks settings.
     * - `NoteTweaks` - NoteTweaks settings.
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * DIFF.DifficultyInfo.CustomData.Settings = {
     *     Graphics: {
     *         Bloom: GraphicsSettings.BLOOM_SETTING.On,
     *         ScreenDisplacementEffectsEnabled: true,
     *         MaxShockwaveParticles: 0,
     *         Mirror: GraphicsSettings.MIRROR_SETTING.High,
     *         Smoke: GraphicsSettings.SMOKE_SETTING.Off
     *     },
     *     Modifiers: {
     *         NoFail: true
     *     },
     *     Chroma: {
     *         DisableChromaEvents: false,
     *         DisableEnvironmentEnhancements: false,
     *         DisableNoteColoring: false,
     *         ForceZenModeWalls: false
     *     },
     *     PlayerOptions: {
     *         EnvironmentEffects: "AllEffects",
     *         EnvironmentEffectsExpertPlus: "AllEffects"
     *     },
     *     Environments: {
     *         OverrideEnvironments: false
     *     }
     * };
     * ```
     */
    Settings?: ISettings;
    /**
     * ## Color Left
     * 
     * The left hand note color of the map.
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * DIFF.DifficultyInfo.CustomData.ColorLeft = [1, 0, 0];
     * ```
     */
    ColorLeft?: IRGB | RGBVec;
    /**
     * ## Color Right
     * 
     * The right hand note color of the map.
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * DIFF.DifficultyInfo.CustomData.ColorRight = [0, 0, 1];
     * ```
     */
    ColorRight?: IRGB | RGBVec;
    /**
     * ## Environment Color Left
     * 
     * The left environment color of the map (this is the red light color by default).
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * DIFF.DifficultyInfo.CustomData.EnvColorLeft = [1, 0, 0];
     * ```
     */
    EnvColorLeft?: IRGB | RGBVec;
    /**
     * ## Environment Color Right
     * 
     * The right environment color of the map (this is the blue light color by default).
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * DIFF.DifficultyInfo.CustomData.EnvColorRight = [0, 0, 1];
     * ```
     */
    EnvColorRight?: IRGB | RGBVec;
    /**
     * ## Environment Color White
     * 
     * The white environment color of the map (this is the white light color by default).
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * DIFF.DifficultyInfo.CustomData.EnvColorWhite = [0, 0, 1];
     * ```
     */
    EnvColorWhite?: IRGB | RGBVec;
    /**
     * ## Environment Color Left Boost
     * 
     * The left environment boost color of the map (this is the red light color by default).
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * DIFF.DifficultyInfo.CustomData.EnvColorLeftBoost = [1, 0, 0];
     * ```
     */
    EnvColorLeftBoost?: IRGB | RGBVec;
    /**
     * ## Environment Color Right Boost
     * 
     * The right environment boost color of the map (this is the blue light color by default).
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * DIFF.DifficultyInfo.CustomData.EnvColorRightBoost = [0, 0, 1];
     * ```
     */
    EnvColorRightBoost?: IRGB | RGBVec;
    /**
     * ## Environment Color White Boost
     * 
     * The white environment boost color of the map (this is the white light color by default).
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * DIFF.DifficultyInfo.CustomData.EnvColorWhiteBoost = [0, 0, 1];
     * ```
     */
    EnvColorWhiteBoost?: IRGB | RGBVec;
    /**
     * ## Obstacle Color
     * 
     * The color of the obstacles/walls in the map.
     * 
     * ---
     * 
     * ### Example
     * ```ts
     * DIFF.DifficultyInfo.CustomData.ObstacleColor = [1, 0, 0];
     * ```
     */
    ObstacleColor?: IRGB | RGBVec;
    /**
     * ## Warnings
     * 
     * Warnings about the map.
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * DIFF.DifficultyInfo.CustomData.Warnings = [
     *     "Flickering lights",
     *     "Player movement"
     * ];
     * ```
     */
    Warnings?: string[];
    /**
     * ## Information
     * 
     * Information about the map.
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * DIFF.DifficultyInfo.CustomData.Information = [
     *     "ligma"
     * ];
     * ```
     */
    Information?: string[];
    /**
     * ## Suggestions
     * 
     * Suggested mods for the map.
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * DIFF.DifficultyInfo.CustomData.Suggestions = [
     *     PLUGIN.Chroma
     * ];
     * ```
     */
    Suggestions?: (string | PLUGIN | keyof typeof PLUGIN)[];
    /**
     * ## Requirements
     * 
     * Required mods for the map.
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * DIFF.DifficultyInfo.CustomData.Requirements = [
     *     PLUGIN.Chroma,
     *     PLUGIN.NoodleExtensions,
     *     PLUGIN.Vivify
     * ];
     * ```
     */
    Requirements?: (string | PLUGIN | keyof typeof PLUGIN)[];
}

export interface ISettings {
    /**
     * ## Player Options
     * 
     * The player options to be used.
     * 
     * ---
     * 
     * ### Values
     * 
     * - `LeftHanded` - Whether the player should use left handed mode or not. (boolean)
     * - `PlayerHeight` - The height of the player. (number)
     * - `AutomaticPlayerHeight` - Whether the player height should be automatic or not. (boolean)
     * - `SFXVolume` - The volume of the sound effects. (number)
     * - `ReduceDebris` - Whether to reduce the amount of debris or not. (boolean)
     * - `NoTextsAndHuds` - Whether to show texts and HUDs or not. (boolean)
     * - `NoFailEffects` - Whether to show fail effects or not. (boolean)
     * - `AdvancedHUD` - Whether to show the advanced HUD or not. (boolean)
     * - `AutoRestart` - Whether to automatically restart the map or not. (boolean)
     * - `SaberTrailIntensity` - The intensity of the saber trails. (number)
     * - `NoteJumpDurationTypeSettings` - The type of note jump duration settings to use. ("Dynamic", "Static")
     * - `NoteJumpFixedDuration` - The fixed duration of the note jump. (number)
     * - `NoteJumpStartBeatOffset` - The start beat offset of the note jump. (number)
     * - `HideNoteSpawnEffect` - Whether to hide the note spawn effect or not. (boolean)
     * - `AdaptiveSFX` - Whether to use adaptive SFX or not. (boolean)
     * - `EnvironmentEffects` - The environment effects to use. ("AllEffects", "StrobeFilter", "NoEffects")
     * - `EnvironmentEffectsExpertPlus` - The environment effects to use in Expert+ mode. ("AllEffects", "StrobeFilter", "NoEffects")
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * DIFF.DifficultyInfo.CustomData.Settings = {
     *     PlayerOptions: {
     *         LeftHanded: false, // Forces right handed mode
     *         PlayerHeight: 1.7, // Sets player height to 1.7m
     *         AutomaticPlayerHeight: false, // Disables automatic player height
     *     }
     * };
     * ```
     */
    PlayerOptions?: IPlayerOptions;
    /**
     * ## Modifiers
     * 
     * The modifiers to be used with the map (ie. NoFail, ProMode, etc.).
     * 
     * ---
     * 
     * ### Values
     * 
     * - `EnergyType` - The type of energy to use. ("Battery", "Bar")
     * - `NoFail` - Whether to use NoFail or not. (boolean)
     * - `InstaFail` - Whether to use InstaFail or not. (boolean)
     * - `FailOnSaberClash` - Whether to fail on saber clash or not. (boolean)
     * - `EnabledObstacleType` - The type of obstacles to enable. ("All", "FullHeightOnly", "NoObstacles")
     * - `FastNotes` - Whether to use FastNotes or not. (boolean)
     * - `StrictAngles` - Whether to use StrictAngles or not. (boolean)
     * - `DisappearingArrows` - Whether to use DisappearingArrows or not. (boolean)
     * - `GhostNotes` - Whether to use GhostNotes or not. (boolean)
     * - `NoBombs` - Whether to use NoBombs or not. (boolean)
     * - `SongSpeed` - The speed of the song. ("Normal", "Faster", "Slower", "SuperFast")
     * - `NoArrows` - Whether to use NoArrows or not. (boolean)
     * - `ProMode` - Whether to use ProMode or not. (boolean)
     * - `ZenMode` - Whether to use ZenMode or not. (boolean)
     * - `SmallCubes` - Whether to use SmallCubes or not. (boolean)
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * DIFF.DifficultyInfo.CustomData.Settings = {
     *     Modifiers: {
     *         NoFail: true
     *     }
     * };
     * ```
     */
    Modifiers?: IModifierSettings;
    /**
     * ## Environments
     * 
     * Environment related settings.
     * 
     * ---
     * 
     * ### Values
     * 
     * - `OverrideEnvironments` - Whether the player can override the map's environment or not. (boolean)
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * DIFF.DifficultyInfo.CustomData.Settings = {
     *     Environments: {
     *         OverrideEnvironments: false
     *     }
     * };
     */
    Environments?: {
        /**
         * ## Override Environments
         * 
         * Whether the player can override the map's environment or not.
         * 
         * ---
         * 
         * ### Example
         * 
         * ```ts
         * DIFF.DifficultyInfo.CustomData.Settings = {
         *     Environments: {
         *         OverrideEnvironments: false
         *     }
         * };
         * ```
         */
        OverrideEnvironments?: boolean
    };
    /**
     * ## Colors
     * 
     * Color related settings.
     * 
     * ---
     * 
     * ### Values
     * 
     * - `OverrideDefaultColors` - Whether to override the default colors of the map or not. (boolean)
     * 
     * ---
     * 
     * ### Example
     * ```ts
     * DIFF.DifficultyInfo.CustomData.Settings = {
     *     Colors: {
     *         OverrideDefaultColors: true
     *     }
     * };
     */
    Colors?: {
        /**
         * ## Override Default Colors
         * 
         * Whether to override the default colors of the map or not.
         * 
         * ---
         * 
         * ### Example
         * 
         * ```ts
         * DIFF.DifficultyInfo.CustomData.Settings = {
         *     Colors: {
         *         OverrideDefaultColors: true
         *     }
         * };
         * ```
         */
        OverrideDefaultColors?: boolean
    };
    /**
     * ## Graphics
     * 
     * Graphics settings.
     * 
     * ---
     * 
     * ### Values
     * 
     * - `Mirror` - The mirror setting to use. (0-3 or GraphicsSettings.MIRROR_SETTING)
     * - `Bloom` - The bloom setting to use. (0-1 or GraphicsSettings.BLOOM_SETTING)
     * - `Smoke` - The smoke setting to use. (0-1 or GraphicsSettings.SMOKE_SETTING)
     * - `BurnMarkTrailsEnabled` - Whether to enable burn mark trails or not. (boolean)
     * - `ScreenDisplacementEffectsEnabled` - Whether to enable screen displacement effects or not. (boolean)
     * - `MaxShockwaveParticles` - The maximum amount of shockwave particles to use. (0-2)
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * DIFF.DifficultyInfo.CustomData.Settings = {
     *     Graphics: {
     *         Bloom: GraphicsSettings.BLOOM_SETTING.On,
     *         ScreenDisplacementEffectsEnabled: true,
     *         MaxShockwaveParticles: 0,
     *         Mirror: GraphicsSettings.MIRROR_SETTING.High,
     *         Smoke: GraphicsSettings.SMOKE_SETTING.Off
     *     }
     * };
     * ```
     */
    Graphics?: IGraphicsSettings;
    /**
     * ## Chroma
     * 
     * Chroma settings.
     * 
     * ---
     * 
     * ### Values
     * 
     * - `DisableChromaEvents` - Whether to disable chroma events or not. (boolean)
     * - `DisableEnvironmentEnhancements` - Whether to disable environment enhancements or not. (boolean)
     * - `DisableNoteColoring` - Whether to disable note coloring or not. (boolean)
     * - `ForceZenModeWalls` - Whether to force Zen mode walls or not. (boolean)
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * DIFF.DifficultyInfo.CustomData.Settings = {
     *     Chroma: {
     *         DisableChromaEvents: false,
     *         DisableEnvironmentEnhancements: false,
     *         DisableNoteColoring: false,
     *     }
     * };
     * ```
     */
    Chroma?: IChromaSettings;
    CountersPlus?: Record<string, any>;
    UITweaks?: IUITweaksSettings;
    NoteTweaks?: INoteTweaks;
}