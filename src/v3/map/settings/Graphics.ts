import { BaseSettings } from "./BaseSettings";
import { IGraphicsSettings } from "./interfaces/IGraphicsSettings";

enum MirrorSetting {
    Off,
    Low,
    Medium,
    High
}

type MirrorSettingType = MirrorSetting | 0 | 1 | 2 | 3 | false;

enum BloomSetting {
    Off,
    On
}

type BloomSettingType = BloomSetting | 0 | 1 | boolean;

enum SmokeSetting {
    Off,
    On
}

type SmokeSettingType = SmokeSetting | 0 | 1 | boolean;

export class GraphicsSettings extends BaseSettings implements IGraphicsSettings {
    public static readonly MIRROR_SETTING: typeof MirrorSetting = MirrorSetting;
    public static readonly BLOOM_SETTING: typeof BloomSetting = BloomSetting;
    public static readonly SMOKE_SETTING: typeof SmokeSetting = SmokeSetting;

    private _mirrorGraphicsSettings?: 0 | 1 | 2 | 3;
    private _mainEffectGraphicsSettings?: 0 | 1;
    private _smokeGraphicsSettings?: 0 | 1;
    private _burnMarkTrailsEnabled?: boolean;
    private _screenDisplacementEffectsEnabled?: boolean;
    private _maxShockwaveParticles?: 0 | 1 | 2;

    set Mirror(mirror: undefined | MirrorSettingType) { this._mirrorGraphicsSettings = Number(mirror) as 0 | 1 | 2 | 3; }
    set Bloom(bloom: undefined | BloomSettingType) { this._mainEffectGraphicsSettings = Number(bloom) as 0 | 1; }
    set Smoke(smoke: undefined | SmokeSettingType) { this._smokeGraphicsSettings = Number(smoke) as 0 | 1; }
    set BurnMarkTrailsEnabled(burnMarkTrailsEnabled: undefined | boolean) { this._burnMarkTrailsEnabled = burnMarkTrailsEnabled; }
    set ScreenDisplacementEffectsEnabled(screenDisplacementEffectsEnabled: undefined | boolean) { this._screenDisplacementEffectsEnabled = screenDisplacementEffectsEnabled; }
    set MaxShockwaveParticles(maxShockwaveParticles: undefined | 0 | 1 | 2) { this._maxShockwaveParticles = maxShockwaveParticles; }

    get Mirror(): undefined | MirrorSettingType { return this._mirrorGraphicsSettings; }
    get Bloom(): undefined | BloomSettingType { return this._mainEffectGraphicsSettings; }
    get Smoke(): undefined | SmokeSettingType { return this._smokeGraphicsSettings; }
    get BurnMarkTrailsEnabled(): undefined | boolean { return this._burnMarkTrailsEnabled; }
    get ScreenDisplacementEffectsEnabled(): undefined | boolean { return this._screenDisplacementEffectsEnabled; }
    get MaxShockwaveParticles(): undefined | 0 | 1 | 2 { return this._maxShockwaveParticles; }

    constructor(data?: IGraphicsSettings) {
        super();
        if (!data) return;
        data.Mirror !== undefined && (this._mirrorGraphicsSettings = Number(data.Mirror) as 0 | 1 | 2 | 3);
        data.Bloom !== undefined && (this._mainEffectGraphicsSettings = Number(data.Bloom) as 0 | 1);
        data.Smoke !== undefined && (this._smokeGraphicsSettings = Number(data.Smoke) as 0 | 1);
        data.BurnMarkTrailsEnabled !== undefined && (this._burnMarkTrailsEnabled = data.BurnMarkTrailsEnabled);
        data.ScreenDisplacementEffectsEnabled !== undefined && (this._screenDisplacementEffectsEnabled = data.ScreenDisplacementEffectsEnabled);
        data.MaxShockwaveParticles !== undefined && (this._maxShockwaveParticles = data.MaxShockwaveParticles);
    }
}