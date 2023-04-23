export default interface IPlayerOptions {
    _leftHanded?: boolean;
    _playerHeight?: number;
    _automaticPlayerHeight?: boolean;
    _sfxVolume?: number;
    _reduceDebris?: boolean;
    _noTextsAndHuds?: boolean;
    _noFailEffects?: boolean;
    _advancedHud?: boolean;
    _autoRestart?: boolean;
    _saberTrailIntensity?: number;
    _noteJumpDurationTypeSettings?: 'Dynamic' | 'Static';
    _noteJumpFixedDuration?: number;
    _noteJumpStartBeatOffset?: number;
    _hideNoteSpawnEffect?: boolean;
    _adaptiveSfx?: boolean;
    _environmentEffectsFilterDefaultPreset?: 'AllEffects' | 'NoEffects' | 'Strobefilter';
    _environmentEffectsFilterExpertPlusPreset?: 'AllEffects' | 'NoEffects' | 'Strobefilter';
}