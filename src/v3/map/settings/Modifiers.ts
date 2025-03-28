import { BaseSettings } from "./BaseSettings";

export interface IModifierSettings {
    EnergyType?: "Battery" | "Bar";
    NoFail?: boolean;
    InstaFail?: boolean;
    FailOnSaberClash?: boolean;
    EnabledObstacleType?: "All" | "FullHeightOnly" | "NoObstacles";
    FastNotes?: boolean;
    StrictAngles?: boolean;
    DisappearingArrows?: boolean;
    GhostNotes?: boolean;
    NoBombs?: boolean;
    SongSpeed?: "Normal" | "Faster" | "Slower" | "SuperFast";
    NoArrows?: boolean;
    ProMode?: boolean;
    ZenMode?: boolean;
    SmallCubes?: boolean;
}

export class ModifiersSettings extends BaseSettings implements IModifierSettings {
    private _energyType?: "Battery" | "Bar";
    private _noFailOn0Energy?: boolean;
    private _instaFail?: boolean;
    private _failOnSaberClash?: boolean;
    private _enabledObstacleType?: "All" | "FullHeightOnly" | "NoObstacles";
    private _fastNotes?: boolean;
    private _strictAngles?: boolean;
    private _disappearingArrows?: boolean;
    private _ghostNotes?: boolean;
    private _noBombs?: boolean;
    private _songSpeed?: "Normal" | "Faster" | "Slower" | "SuperFast";
    private _noArrows?: boolean;
    private _proMode?: boolean;
    private _zenMode?: boolean;
    private _smallCubes?: boolean;

    set EnergyType(energyType: undefined | "Battery" | "Bar") { this._energyType = energyType; }
    set NoFail(noFail: undefined | boolean) { this._noFailOn0Energy = noFail; }
    set InstaFail(instaFail: undefined | boolean) { this._instaFail = instaFail; }
    set FailOnSaberClash(failOnSaberClash: undefined | boolean) { this._failOnSaberClash = failOnSaberClash; }
    set EnabledObstacleType(enabledObstacleType: undefined | "All" | "FullHeightOnly" | "NoObstacles") { this._enabledObstacleType = enabledObstacleType; }
    set FastNotes(fastNotes: undefined | boolean) { this._fastNotes = fastNotes; }
    set StrictAngles(strictAngles: undefined | boolean) { this._strictAngles = strictAngles; }
    set DisappearingArrows(disappearingArrows: undefined | boolean) { this._disappearingArrows = disappearingArrows; }
    set GhostNotes(ghostNotes: undefined | boolean) { this._ghostNotes = ghostNotes; }
    set NoBombs(noBombs: undefined | boolean) { this._noBombs = noBombs; }
    set SongSpeed(songSpeed: undefined | "Normal" | "Faster" | "Slower" | "SuperFast") { this._songSpeed = songSpeed; }
    set NoArrows(noArrows: undefined | boolean) { this._noArrows = noArrows; }
    set ProMode(proMode: undefined | boolean) { this._proMode = proMode; }

    get EnergyType(): undefined | "Battery" | "Bar" { return this._energyType; }
    get NoFail(): undefined | boolean { return this._noFailOn0Energy; }
    get InstaFail(): undefined | boolean { return this._instaFail; }
    get FailOnSaberClash(): undefined | boolean { return this._failOnSaberClash; }
    get EnabledObstacleType(): undefined | "All" | "FullHeightOnly" | "NoObstacles" { return this._enabledObstacleType; }
    get FastNotes(): undefined | boolean { return this._fastNotes; }
    get StrictAngles(): undefined | boolean { return this._strictAngles; }
    get DisappearingArrows(): undefined | boolean { return this._disappearingArrows; }
    get GhostNotes(): undefined | boolean { return this._ghostNotes; }
    get NoBombs(): undefined | boolean { return this._noBombs; }
    get SongSpeed(): undefined | "Normal" | "Faster" | "Slower" | "SuperFast" { return this._songSpeed; }
    get NoArrows(): undefined | boolean { return this._noArrows; }
    get ProMode(): undefined | boolean { return this._proMode; }
    get ZenMode(): undefined | boolean { return this._zenMode; }
    get SmallCubes(): undefined | boolean { return this._smallCubes; }

    constructor(data?: IModifierSettings) {
        super();
        if (!data) return;
        data.EnergyType !== undefined && (this._energyType = data.EnergyType);
        data.NoFail !== undefined && (this._noFailOn0Energy = data.NoFail);
        data.InstaFail !== undefined && (this._instaFail = data.InstaFail);
        data.FailOnSaberClash !== undefined && (this._failOnSaberClash = data.FailOnSaberClash);
        data.EnabledObstacleType !== undefined && (this._enabledObstacleType = data.EnabledObstacleType);
        data.FastNotes !== undefined && (this._fastNotes = data.FastNotes);
        data.StrictAngles !== undefined && (this._strictAngles = data.StrictAngles);
        data.DisappearingArrows !== undefined && (this._disappearingArrows = data.DisappearingArrows);
        data.GhostNotes !== undefined && (this._ghostNotes = data.GhostNotes);
        data.NoBombs !== undefined && (this._noBombs = data.NoBombs);
        data.SongSpeed !== undefined && (this._songSpeed = data.SongSpeed);
        data.NoArrows !== undefined && (this._noArrows = data.NoArrows);
        data.ProMode !== undefined && (this._proMode = data.ProMode);
        data.ZenMode !== undefined && (this._zenMode = data.ZenMode);
        data.SmallCubes !== undefined && (this._smallCubes = data.SmallCubes);    
    }
}