import { BaseSettings } from "./BaseSettings";

enum DynamicOffset {
    Close = -0.5,
    Closer = -0.25,
    Default = 0,
    Further = 0.25,
    Far = 0.5
}

export interface IPlayerOptions {
    LeftHanded?: boolean;
    PlayerHeight?: number;
    AutomaticPlayerHeight?: boolean;
    SFXVolume?: number;
    ReduceDebris?: boolean;
    NoTextsAndHuds?: boolean;
    NoFailEffects?: boolean;
    AdvancedHUD?: boolean;
    AutoRestart?: boolean;
    SaberTrailIntensity?: number;
    NoteJumpDurationTypeSettings?: "Dynamic" | "Static";
    NoteJumpFixedDuration?: number;
    NoteJumpStartBeatOffset?: number;
    HideNoteSpawnEffect?: boolean;
    AdaptiveSFX?: boolean;
    EnvironmentEffects?: "AllEffects" | "StrobeFilter" | "NoEffects";
    EnvironmentEffectsExpertPlus?: "AllEffects" | "StrobeFilter" | "NoEffects";
}

export class PlayerOptionsSettings extends BaseSettings implements IPlayerOptions {
    public static readonly DynamicOffset = DynamicOffset

    private _leftHanded?: boolean;
    private _playerHeight?: number;
    private _automaticPlayerHeight?: boolean;
    private _sfxVolume?: number;
    private _reduceDebris?: boolean;
    private _noTextsAndHuds?: boolean;
    private _noFailEffects?: boolean;
    private _advancedHud?: boolean;
    private _autoRestart?: boolean;
    private _saberTrailIntensity?: number;
    private _noteJumpDurationTypeSettings?: "Dynamic" | "Static";
    private _noteJumpFixedDuration?: number;
    private _noteJumpStartBeatOffset?: DynamicOffset;
    private _hideNoteSpawnEffect?: boolean;
    private _adaptiveSfx?: boolean;
    private _environmentEffectsFilterDefaultPreset?: "AllEffects" | "StrobeFilter" | "NoEffects";
    private _environmentEffectsFilterExpertPlusPreset?: "AllEffects" | "StrobeFilter" | "NoEffects";

    set LeftHanded(leftHanded: undefined | boolean) { this._leftHanded = leftHanded; }
    set PlayerHeight(playerHeight: undefined | number) { this._playerHeight = playerHeight; }
    set AutomaticPlayerHeight(automaticPlayerHeight: undefined | boolean) { this._automaticPlayerHeight = automaticPlayerHeight; }
    set SFXVolume(sfxVolume: undefined | number) { this._sfxVolume = sfxVolume; }
    set ReduceDebris(reduceDebris: undefined | boolean) { this._reduceDebris = reduceDebris; }
    set NoTextsAndHuds(noTextsAndHuds: undefined | boolean) { this._noTextsAndHuds = noTextsAndHuds; }
    set NoFailEffects(noFailEffects: undefined | boolean) { this._noFailEffects = noFailEffects; }
    set AdvancedHUD(advancedHud: undefined | boolean) { this._advancedHud = advancedHud; }
    set AutoRestart(autoRestart: undefined | boolean) { this._autoRestart = autoRestart; }
    set SaberTrailIntensity(saberTrailIntensity: undefined | number) { this._saberTrailIntensity = saberTrailIntensity; }
    set NoteJumpDurationTypeSettings(noteJumpDurationTypeSettings: undefined | "Dynamic" | "Static") { this._noteJumpDurationTypeSettings = noteJumpDurationTypeSettings; }
    set NoteJumpFixedDuration(noteJumpFixedDuration: undefined | number) { this._noteJumpFixedDuration = noteJumpFixedDuration; }
    set NoteJumpStartBeatOffset(noteJumpStartBeatOffset: undefined | DynamicOffset) { this._noteJumpStartBeatOffset = noteJumpStartBeatOffset; }
    set HideNoteSpawnEffect(hideNoteSpawnEffect: undefined | boolean) { this._hideNoteSpawnEffect = hideNoteSpawnEffect; }
    set AdaptiveSFX(adaptiveSfx: undefined | boolean) { this._adaptiveSfx = adaptiveSfx; }
    set EnvironmentEffects(environmentEffectsFilterDefaultPreset: undefined | "AllEffects" | "StrobeFilter" | "NoEffects") { this._environmentEffectsFilterDefaultPreset = environmentEffectsFilterDefaultPreset; }
    set EnvironmentEffectsExpertPlus(environmentEffectsFilterExpertPlusPreset: undefined | "AllEffects" | "StrobeFilter" | "NoEffects") { this._environmentEffectsFilterExpertPlusPreset = environmentEffectsFilterExpertPlusPreset; }

    get LeftHanded(): undefined | boolean { return this._leftHanded; }
    get PlayerHeight(): undefined | number { return this._playerHeight; }
    get AutomaticPlayerHeight(): undefined | boolean { return this._automaticPlayerHeight; }
    get SFXVolume(): undefined | number { return this._sfxVolume; }
    get ReduceDebris(): undefined | boolean { return this._reduceDebris; }
    get NoTextsAndHuds(): undefined | boolean { return this._noTextsAndHuds; }
    get NoFailEffects(): undefined | boolean { return this._noFailEffects; }
    get AdvancedHUD(): undefined | boolean { return this._advancedHud; }
    get AutoRestart(): undefined | boolean { return this._autoRestart; }
    get SaberTrailIntensity(): undefined | number { return this._saberTrailIntensity; }
    get NoteJumpDurationTypeSettings(): undefined | "Dynamic" | "Static" { return this._noteJumpDurationTypeSettings; }
    get NoteJumpFixedDuration(): undefined | number { return this._noteJumpFixedDuration; }
    get NoteJumpStartBeatOffset(): undefined | DynamicOffset { return this._noteJumpStartBeatOffset; }
    get HideNoteSpawnEffect(): undefined | boolean { return this._hideNoteSpawnEffect; }
    get AdaptiveSFX(): undefined | boolean { return this._adaptiveSfx; }
    get EnvironmentEffects(): undefined | "AllEffects" | "StrobeFilter" | "NoEffects" { return this._environmentEffectsFilterDefaultPreset; }
    get EnvironmentEffectsExpertPlus(): undefined | "AllEffects" | "StrobeFilter" | "NoEffects" { return this._environmentEffectsFilterExpertPlusPreset; }

    constructor(data?: IPlayerOptions) {
        super();
        if (!data) return;
        data.LeftHanded !== undefined && (this._leftHanded = data.LeftHanded);
        data.PlayerHeight !== undefined && (this._playerHeight = data.PlayerHeight);
        data.AutomaticPlayerHeight !== undefined && (this._automaticPlayerHeight = data.AutomaticPlayerHeight);
        data.SFXVolume !== undefined && (this._sfxVolume = data.SFXVolume);
        data.ReduceDebris !== undefined && (this._reduceDebris = data.ReduceDebris);
        data.NoTextsAndHuds !== undefined && (this._noTextsAndHuds = data.NoTextsAndHuds);
        data.NoFailEffects !== undefined && (this._noFailEffects = data.NoFailEffects);
        data.AdvancedHUD !== undefined && (this._advancedHud = data.AdvancedHUD);
        data.AutoRestart !== undefined && (this._autoRestart = data.AutoRestart);
        data.SaberTrailIntensity !== undefined && (this._saberTrailIntensity = data.SaberTrailIntensity);
        data.NoteJumpDurationTypeSettings !== undefined && (this._noteJumpDurationTypeSettings = data.NoteJumpDurationTypeSettings);
        data.NoteJumpFixedDuration !== undefined && (this._noteJumpFixedDuration = data.NoteJumpFixedDuration);
        data.NoteJumpStartBeatOffset !== undefined && (this._noteJumpStartBeatOffset = data.NoteJumpStartBeatOffset);
        data.HideNoteSpawnEffect !== undefined && (this._hideNoteSpawnEffect = data.HideNoteSpawnEffect);
        data.AdaptiveSFX !== undefined && (this._adaptiveSfx = data.AdaptiveSFX);
        data.EnvironmentEffects !== undefined && (this._environmentEffectsFilterDefaultPreset = data.EnvironmentEffects);
        data.EnvironmentEffectsExpertPlus !== undefined && (this._environmentEffectsFilterExpertPlusPreset = data.EnvironmentEffectsExpertPlus);
    }
}