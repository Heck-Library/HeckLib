import IChromaSettings from "./chroma";
import IGraphics from "./graphics";
import IModifiers from "./modifiers";
import IPlayerOptions from "./playerOptions";

export default interface ISettings {
    /**
     * ## Player Options
     * 
     * Contains all the player options that can be set.
     * 
     * ---
     * 
     * - `leftHanded`: `boolean`
     * - `playerHeight`: `number`
     * - `automaticPlayerHeight`: `boolean`
     * - `sfxVolume`: `number`
     * - `reduceDebris`: `boolean`
     * - `noTextsAndHuds`: `boolean`
     * - `noFailEffects`: `boolean`
     * - `advancedHud`: `boolean`
     * - `autoRestart`: `boolean`
     * - `saberTrailIntensity`: `number`
     * - `noteJumpDurationTypeSettings`: `string`
     * - `noteJumpFixedDuration`: `number`
     * - `noteJumpStartBeatOffset`: `number`
     * - `hideNoteSpawnEffect`: `boolean`
     * - `adaptiveSfx`: `boolean`
     * - `environmentEffectsFilterDefaultPreset`: `string`
     * - `environmentEffectsFilterExpertPlusPreset`: `string`
     */
    playerOptions?: IPlayerOptions;
    /**
     * ## Modifiers
     * 
     * Contains all the modifiers that can be set.
     * 
     * ---
     * 
     * - `energyType`: `string`
     * - `noFailOn0Energy`: `boolean`
     * - `instaFail`: `boolean`
     * - `failOnSaberClash`: `boolean`
     * - `enabledObstacleType`: `string`
     * - `fastNotes`: `boolean`
     * - `strictAngles`: `boolean`
     * - `disappearingArrows`: `boolean`
     * - `ghostNotes`: `boolean`
     * - `noBombs`: `boolean`
     * - `songSpeed`: `string`
     * - `noArrows`: `boolean`
     * - `proMode`: `boolean`
     * - `zenMode`: `boolean`
     * - `smallCubes`: `boolean`
     */
    modifiers?: IModifiers;
    /**
     * ## Environments
     * 
     * Contains all the environments that can be set.
     * 
     * ---
     * 
     * - `overrideEnvironments`: `boolean`
     */
    environments?: { overrideEnvironments?: boolean };
    /**
     * ## Colors
     * 
     * Contains all the colors that can be set.
     * 
     * ---
     * 
     * - `overrideDefaultColors`: `boolean`
     */
    colors?: {
        /**
         * ## Override Default Colors
         * 
         * This option is used to override the beatmap's colors. Set this to `false` to force the beatmap's colors instead of the player colors.
         * 
         * ---
         * 
         * Type: `boolean`
         */
        overrideDefaultColors?: boolean
    };
    /**
     * ## Graphics
     * 
     * Contains all the graphics that can be set.
     * 
     * ---
     * 
     * - `mirrorGraphicsSettings`: `number`
     * - `mainGraphicsSettings`: `boolean`
     * - `smokeGraphicsSettings`: `boolean`
     * - `burnMarkTrailsEnabled`: `boolean`
     * - `screenDisplacementEffectsEnabled`: `boolean`
     * - `maxShockwaveParticles`: `number`
     */
    graphics?: IGraphics;
    /**
     * ## Chroma
     * 
     * Contains all the chroma settings that can be set.
     * 
     * ---
     * 
     * - `disableChromaEvents`: `boolean`
     * - `disableEnvironmentEnhancements`: `boolean`
     * - `disableNoteColoring`: `boolean`
     * - `forceZenModeWalls`: `boolean`
     */
    chroma?: IChromaSettings;
    /**
     * ## Counters+
     * 
     * Contains all the Counters+ settings that can be set.
     * 
     * ---
     * 
     * - `mainEnabled`: `boolean`
     */
    countersPlus?: {
        /**
         * ## Main Enabled
         * 
         * This option is used to enable or disable the Counters+ mod.
         * 
         * ---
         * 
         * Type: `boolean`
         */
        mainEnabled?: boolean;
    };
}