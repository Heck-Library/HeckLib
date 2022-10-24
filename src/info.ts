// deno-lint-ignore-file no-explicit-any

import { effects } from "./main.ts";
import { noteJump } from "./main.ts";
import { enabledWall } from "./types.ts";
import { energy } from "./types.ts";
import { speed } from "./types.ts";


export const infoFile = JSON.parse(Deno.readTextFileSync('Info.dat'));

export class Suggestion {
    s: string[]
    f: string;

    constructor(filename: string) {
        this.s = []
        this.f = filename;
    }

    Chroma() {
        this.s.push("Chroma");
        this.End()
        return this;
    }
    Cinema() {
        this.s.push("Cinema");
        this.End()
        return this;
    }
    private End() {
        infoFile._difficultyBeatmapSets.forEach((x: any) => {
            if (this.f.includes(x._beatmapCharacteristicName)) {
                x._difficultyBeatmaps.forEach((y: any) => {
                    if (y._beatmapFilename.includes(this.f)) {
                        y._suggestions = this.s;
                    }
                })
            }
        });
        Deno.writeTextFileSync('Info.dat', JSON.stringify(infoFile, null, 4))
    }
}

export class Requirement {
    r: string[]
    f: string;

    constructor(filename: string) {
        this.r = []
        this.f = filename;
        infoFile._difficultyBeatmapSets.forEach((x: any) => {
            if (this.f.includes(x._beatmapCharacteristicName)) {
                x._difficultyBeatmaps.forEach((y: any) => {
                    if (y._beatmapFilename.includes(this.f)) {
                        y._requirements = this.r;
                    }
                })
            }
        });
        Deno.writeTextFileSync('Info.dat', JSON.stringify(infoFile, null, 4))
    }

    Noodle() {
        this.r.push("Noodle Extensions");
        this.End()
        return this;
    }
    Chroma() {
        this.r.push("Chroma");
        this.End()
        return this;
    }
    Cinema() {
        this.r.push("Cinema");
        this.End()
        return this;
    }
    
    private End() {
        infoFile._difficultyBeatmapSets.forEach((x: any) => {
            if (this.f.includes(x._beatmapCharacteristicName)) {
                x._difficultyBeatmaps.forEach((y: any) => {
                    if (y._beatmapFilename.includes(this.f)) {
                        y._requirements = this.r;
                    }
                })
            }
        });
        Deno.writeTextFileSync('Info.dat', JSON.stringify(infoFile, null, 4))
    }
}

export class Settings {
    s: {
        _playerOptions: {
            _leftHanded?: boolean
            _playerHeight?: number
            _automaticPlayerHeight?: boolean
            _sfxVolume?: number
            _reduceDebris?: boolean
            _noTextsAndHuds?: boolean
            _noFailEffects?: boolean
            _advancedHud?: boolean
            _autoRestart?: boolean
            _saberTrailIntensity?: number
            _noteJumpDurationTypeSettings?: noteJump
            _noteJumpFixedDuration?: number
            _noteJumpStartBeatOffset?: number
            _hideNoteSpawnEffect?: boolean
            _adaptiveSfx?: number
            _environmentEffectsFilterDefaultPreset?: effects
            _environmentEffectsFilterExpertPlusPreset?: effects
        },
        _modifiers: {
            _energyType?: energy
            _noFailOn0Energy?: boolean
            _instaFail?: boolean
            _failOnSaberClash?: boolean
            _enabledObstacleType?: enabledWall
            _fastNotes?: boolean
            _strictAngles?: boolean
            _disappearingArrows?: boolean
            _ghostNotes?: boolean
            _noBombs?: boolean
            _songSpeed?: speed
            _noArrows?: boolean
            _proMode?: boolean
            _zenMode?: boolean
            _smallCubes?: boolean
        },
        _environments: {
            _overrideEnvironments?: boolean
        },
        _colors: {
            _overrideDefaultColors?: boolean
        },
        _graphics: {
            _mirrorGraphicsSettings?: 0|1|2|3
            _mainEffectGraphicsSettings?: 0|1
            _smokeGraphicsSettings?: 0|1
            _burnMarkTrailsEnabled?: boolean
            _screenDisplacementEffectsEnabled?: boolean
            _maxShockwaveParticles?: 0|1|2
        },
        _chroma: {
            _disableChromaEvents?: boolean
            _disableEnvironmentEnhancements?: boolean
            _disableNoteColoring?: boolean
            _forceZenModeWalls?: boolean
        },
        _countersPlus: {
            _mainEnabled?: boolean
        }
    };
    f: string;

    constructor(filename: string) {
        this.s = {
            _playerOptions: {},
            _modifiers: {},
            _environments: {},
            _colors: {},
            _graphics: {},
            _chroma: {},
            _countersPlus: {}
        };
        this.f = filename;
    }

    //#region Player Options
    LeftHanded(x: boolean) { this.s._playerOptions._leftHanded = x; this.End(); return this}
    PlayerHeight(x: number) { this.s._playerOptions._playerHeight = x; this.End(); return this}
    AutoPlayerHeight(x: boolean) { this.s._playerOptions._automaticPlayerHeight = x; this.End(); return this}
    SfxVolume(x: number) { this.s._playerOptions._sfxVolume = x; this.End(); return this}
    ReduceDebris(x: boolean) { this.s._playerOptions._reduceDebris = x; this.End(); return this}
    NoHUD(x: boolean) { this.s._playerOptions._noTextsAndHuds = x; this.End(); return this}
    NoFailFX(x: boolean) { this.s._playerOptions._noFailEffects = x; this.End(); return this}
    AdvancedHUD(x: boolean) { this.s._playerOptions._advancedHud = x; this.End(); return this}
    AutoRestart(x: boolean) { this.s._playerOptions._autoRestart = x; this.End(); return this}
    TrailIntensity(x: boolean) { this.s._playerOptions._reduceDebris = x; this.End(); return this}
    NoteJumpDurationType(x: noteJump) { this.s._playerOptions._noteJumpDurationTypeSettings = x; this.End(); return this}
    NoteJumpFixedDuration(x: number) { this.s._playerOptions._noteJumpFixedDuration = x; this.End(); return this}
    NoteJumpOffset(x: number) { this.s._playerOptions._noteJumpStartBeatOffset = x; this.End(); return this}
    HideSpawnEffect(x: boolean) { this.s._playerOptions._hideNoteSpawnEffect = x; this.End(); return this}
    AdaptiveSFX(x: number) { this.s._playerOptions._adaptiveSfx = x; this.End(); return this}
    Effects(x: effects) { this.s._playerOptions._environmentEffectsFilterDefaultPreset = x; this.End(); return this}
    EffectsExpertPlus(x: effects) { this.s._playerOptions._environmentEffectsFilterExpertPlusPreset = x; this.End(); return this}
    //#endregion

    //#region Modifiers
    EnergyType(x: energy) { this.s._modifiers._energyType = x; this.End(); return this}
    NoFail(x: boolean) { this.s._modifiers._noFailOn0Energy = x; this.End(); return this}
    InstaFail(x: boolean) { this.s._modifiers._instaFail = x; this.End(); return this}
    SaberClashFail(x: boolean) { this.s._modifiers._failOnSaberClash = x; this.End(); return this}
    EnabledWalls(x: enabledWall) { this.s._modifiers._enabledObstacleType = x; this.End(); return this}
    FastNotes(x: boolean) { this.s._modifiers._fastNotes = x; this.End(); return this}
    StrictAngles(x: boolean) { this.s._modifiers._strictAngles = x; this.End(); return this}
    DisappearingArrows(x: boolean) { this.s._modifiers._disappearingArrows = x; this.End(); return this}
    GhostNotes(x: boolean) { this.s._modifiers._ghostNotes = x; this.End(); return this}
    NoBombs(x: boolean) { this.s._modifiers._noBombs = x; this.End(); return this}
    SongSpeed(x: speed) { this.s._modifiers._songSpeed = x; this.End(); return this}
    NoArrows(x: boolean) { this.s._modifiers._noArrows = x; this.End(); return this}
    ProMode(x: boolean) { this.s._modifiers._proMode = x; this.End(); return this}
    ZenMode(x: boolean) { this.s._modifiers._zenMode = x; this.End(); return this}
    SmallCubes(x: boolean) { this.s._modifiers._smallCubes = x; this.End(); return this}
    //#endregion

    //#region Other settings
    OverrideEnvironment(x: boolean) { this.s._environments._overrideEnvironments = x; this.End(); return this}
    OverrideColors(x: boolean) { this.s._colors._overrideDefaultColors = x; this.End(); return this}
    Mirror(x: 0|1|2|3) { this.s._graphics._mirrorGraphicsSettings = x; this.End(); return this}
    Bloom(x: boolean) { 
        if (x) {
            this.s._graphics._mainEffectGraphicsSettings = 1; 
        } else this.s._graphics._mainEffectGraphicsSettings = 0;
        this.End();
        return this
    }
    Smoke(x: boolean) {
        if (x) {
            this.s._graphics._smokeGraphicsSettings = 1;
        } else this.s._graphics._smokeGraphicsSettings = 0;
        this.End();
        return this
    }
    BurnMarks(x: boolean) { this.s._graphics._burnMarkTrailsEnabled = x; this.End(); return this}
    ScreenDistortions(x: boolean) { this.s._graphics._screenDisplacementEffectsEnabled = x; this.End(); return this}
    ShockwaveParticles(x: 0|1|2) { this.s._graphics._maxShockwaveParticles = x; this.End(); return this}
    DisableChroma(x: boolean) { this.s._chroma._disableChromaEvents = x; this.End(); return this}
    DisableEnvironment(x: boolean) { this.s._chroma._disableEnvironmentEnhancements = x; this.End(); return this}
    DisableNoteColors(x: boolean) { this.s._chroma._disableNoteColoring = x; this.End(); return this}
    ZenModeWalls (x: boolean) { this.s._chroma._forceZenModeWalls = x; this.End(); return this}
    CountersPlus (x: boolean) { this.s._countersPlus._mainEnabled = x; this.End(); return this}
    //#endregion

    private End() {
        infoFile._difficultyBeatmapSets.forEach((x: any) => {
            if (this.f.includes(x._beatmapCharacteristicName)) {
                x._difficultyBeatmaps.forEach((y: any) => {
                    if (y._beatmapFilename.includes(this.f)) {
                        y._settings = this.s;
                    }
                })
            }
        });
        Deno.writeTextFileSync('Info.dat', JSON.stringify(infoFile, null, 4))
    }
}