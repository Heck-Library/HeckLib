export default interface IPlayerOptions {
    /**
     * ## Left Handed
     * 
     * This option is used to set the player to left handed mode.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    leftHanded?: boolean;
    /**
     * ## Player Height
     * 
     * This option is used to set the player height.
     * 
     * ---
     * 
     * Type: `number`
     */
    playerHeight?: number;
    /**
     * ## Automatic Player Height
     * 
     * This option is used to set the automatic player height.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    automaticPlayerHeight?: boolean;
    /**
     * ## Sound Effects Volume
     * 
     * This option is used to set the sound effects volume.
     * 
     * ---
     * 
     * Type: `number`
     */
    sfxVolume?: number;
    /**
     * ## Reduce Debris
     * 
     * This option is used to enable the reduce debris option.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    reduceDebris?: boolean;
    /**
     * ## No Texts and HUDs
     * 
     * This option is used to disable the HUD and hit score visualizer.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    noTextsAndHuds?: boolean;
    /**
     * ## No Fail Effects
     * 
     * This option is used to disable no fail effects. This is the red flash effect when you fail.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    noFailEffects?: boolean;
    /**
     * ## Advanced HUD
     * 
     * This option is used to enable the advanced HUD.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    advancedHud?: boolean;
    /**
     * ## Auto Restart
     * 
     * This option is used to enable automatic restarting.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    autoRestart?: boolean;
    /**
     * ## Saber Trail Intensity
     * 
     * This option is used to set the saber trail intensity.
     * 
     * ---
     * 
     * Type: `number`
     */
    saberTrailIntensity?: number;
    /**
     * ## Note Jump Duration Type Settings
     * 
    * This option is used to set the note jump duration type.
     * 
     * ---
     * 
     * Type: `string`
     */
    noteJumpDurationTypeSettings?: 'Dynamic' | 'Static';
    /**
     * ## Note Jump Fixed Duration
     * 
     * This option is used to set the fixed note jump duration.
     * 
     * ---
     * 
     * Type: `number`
     */
    noteJumpFixedDuration?: number;
    /**
     * ## Note Jump Start Beat Offset
     * 
     * This option is used to set the note jump start beat offset.
     * 
     * ---
     * 
     * Type: `number`
     */
    noteJumpStartBeatOffset?: number;
    /**
     * ## Hide Note Spawn Effect
     * 
     * This option is used to hide the note spawn effect.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    hideNoteSpawnEffect?: boolean;
    /**
     * ## Adaptive Sound Effects
     * 
     * This option is used to enable adaptive sound effects.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    adaptiveSfx?: boolean;
    /**
     * ## Environment Effects Filter Default Preset
     * 
     * This option is used to set the environment effects filter default. This is the preset for lighting, it is recommended to set this to `AllEffects` for the best experience.
     * 
     * ---
     * 
     * Type: `string`
     */
    environmentEffectsFilterDefaultPreset?: 'AllEffects' | 'NoEffects' | 'Strobefilter';
    /**
     * ## Environment Effects Filter Expert Plus Preset
     * 
     * This option is used to set the environment effects filter for the expert plus difficulty. This is the preset for lighting, it is recommended to set this to `AllEffects` for the best experience.
     * 
     * ---
     * 
     * Type: `string`
     */
    environmentEffectsFilterExpertPlusPreset?: 'AllEffects' | 'NoEffects' | 'Strobefilter';
}