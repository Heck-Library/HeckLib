import { BaseSettings } from "../BaseSettings";

export interface IUITweaksSettings {
    MultiplierEnabled?: boolean;
    EnergyEnabled?: boolean;
    ComboEnabled?: boolean;
    PositionEnabled?: boolean;
    ProgressEnabled?: boolean;
}

export class UITweaksSettings extends BaseSettings {
    private _multiplierEnabled?: boolean;
    private _energyEnabled?: boolean;
    private _comboEnabled?: boolean;
    private _positionEnabled?: boolean;
    private _progressEnabled?: boolean;

    public get MultiplierEnabled(): undefined | boolean { return this._multiplierEnabled; }
    public get EnergyEnabled(): undefined | boolean { return this._energyEnabled; }
    public get ComboEnabled(): undefined | boolean { return this._comboEnabled; }
    public get PositionEnabled(): undefined | boolean { return this._positionEnabled; }
    public get ProgressEnabled(): undefined | boolean { return this._progressEnabled; }

    public set MultiplierEnabled(multiplierEnabled: undefined | boolean) { this._multiplierEnabled = multiplierEnabled; }
    public set EnergyEnabled(energyEnabled: undefined | boolean) { this._energyEnabled = energyEnabled; }
    public set ComboEnabled(comboEnabled: undefined | boolean) { this._comboEnabled = comboEnabled; }
    public set PositionEnabled(positionEnabled: undefined | boolean) { this._positionEnabled = positionEnabled; }
    public set ProgressEnabled(progressEnabled: undefined | boolean) { this._progressEnabled = progressEnabled; }

    constructor(settings?: IUITweaksSettings) {
        super();
        if (!settings) return this;
        settings.MultiplierEnabled && (this._multiplierEnabled = settings.MultiplierEnabled);
        settings.EnergyEnabled && (this._energyEnabled = settings.EnergyEnabled);
        settings.ComboEnabled && (this._comboEnabled = settings.ComboEnabled);
        settings.PositionEnabled && (this._positionEnabled = settings.PositionEnabled);
        settings.ProgressEnabled && (this._progressEnabled = settings.ProgressEnabled);
    }
}