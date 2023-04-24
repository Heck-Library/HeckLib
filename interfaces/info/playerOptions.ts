export default interface IPlayerOptions {
    leftHanded?: boolean;
    playerHeight?: number;
    automaticPlayerHeight?: boolean;
    sfxVolume?: number;
    reduceDebris?: boolean;
    noTextsAndHuds?: boolean;
    noFailEffects?: boolean;
    advancedHud?: boolean;
    autoRestart?: boolean;
    saberTrailIntensity?: number;
    noteJumpDurationTypeSettings?: 'Dynamic' | 'Static';
    noteJumpFixedDuration?: number;
    noteJumpStartBeatOffset?: number;
    hideNoteSpawnEffect?: boolean;
    adaptiveSfx?: boolean;
    environmentEffectsFilterDefaultPreset?: 'AllEffects' | 'NoEffects' | 'Strobefilter';
    environmentEffectsFilterExpertPlusPreset?: 'AllEffects' | 'NoEffects' | 'Strobefilter';
}