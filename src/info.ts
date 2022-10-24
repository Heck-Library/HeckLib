// deno-lint-ignore-file no-explicit-any

import { effects } from "./main.ts";
import { noteJump } from "./main.ts";
import { enabledWall } from "./types.ts";
import { energy } from "./types.ts";
import { speed } from "./types.ts";


export const infoFile = JSON.parse(Deno.readTextFileSync('Info.dat'));

export class Info {
    diff: any;

    constructor(filename: string) {
        infoFile._difficultyBeatmapSets.forEach((x: any) => {
            if (filename.includes(x._beatmapCharacteristicName)) {
                x._difficultyBeatmaps.forEach((y: any) => {
                    if (y._beatmapFilename.includes(filename)) {
                        this.diff = y;
                    }
                })
            }
        });
    }

    set settings(x: any) {this.diff._settings = x}
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

    constructor() {
        this.s = {
            _playerOptions: {},
            _modifiers: {},
            _environments: {},
            _colors: {},
            _graphics: {},
            _chroma: {},
            _countersPlus: {}
        };
    }

    //#region Player Options
    LeftHanded(x: boolean) { this.s._playerOptions._leftHanded = x; return this}
    PlayerHeight(x: number) { this.s._playerOptions._playerHeight = x; return this}
    AutoPlayerHeight(x: boolean) { this.s._playerOptions._automaticPlayerHeight = x; return this}
    SfxVolume(x: number) { this.s._playerOptions._sfxVolume = x; return this}
    ReduceDebris(x: boolean) { this.s._playerOptions._reduceDebris = x; return this}
    NoHUD(x: boolean) { this.s._playerOptions._noTextsAndHuds = x; return this}
    NoFailFX(x: boolean) { this.s._playerOptions._noFailEffects = x; return this}
    AdvancedHUD(x: boolean) { this.s._playerOptions._advancedHud = x; return this}
    AutoRestart(x: boolean) { this.s._playerOptions._autoRestart = x; return this}
    TrailIntensity(x: boolean) { this.s._playerOptions._reduceDebris = x; return this}
    NoteJumpDurationType(x: noteJump) { this.s._playerOptions._noteJumpDurationTypeSettings = x; return this}
    NoteJumpFixedDuration(x: number) { this.s._playerOptions._noteJumpFixedDuration = x; return this}
    NoteJumpOffset(x: number) { this.s._playerOptions._noteJumpStartBeatOffset = x; return this}
    HideSpawnEffect(x: boolean) { this.s._playerOptions._hideNoteSpawnEffect = x; return this}
    AdaptiveSFX(x: number) { this.s._playerOptions._adaptiveSfx = x; return this}
    Effects(x: effects) { this.s._playerOptions._environmentEffectsFilterDefaultPreset = x; return this}
    EffectsExpertPlus(x: effects) { this.s._playerOptions._environmentEffectsFilterExpertPlusPreset = x; return this}
    //#endregion

    //#region Modifiers
    EnergyType(x: energy) { this.s._modifiers._energyType = x; return this}
    NoFail(x: boolean) { this.s._modifiers._noFailOn0Energy = x; return this}
    InstaFail(x: boolean) { this.s._modifiers._instaFail = x; return this}
    SaberClashFail(x: boolean) { this.s._modifiers._failOnSaberClash = x; return this}
    EnabledWalls(x: enabledWall) { this.s._modifiers._enabledObstacleType = x; return this}
    FastNotes(x: boolean) { this.s._modifiers._fastNotes = x; return this}
    StrictAngles(x: boolean) { this.s._modifiers._strictAngles = x; return this}
    DisappearingArrows(x: boolean) { this.s._modifiers._disappearingArrows = x; return this}
    GhostNotes(x: boolean) { this.s._modifiers._ghostNotes = x; return this}
    NoBombs(x: boolean) { this.s._modifiers._noBombs = x; return this}
    SongSpeed(x: speed) { this.s._modifiers._songSpeed = x; return this}
    NoArrows(x: boolean) { this.s._modifiers._noArrows = x; return this}
    ProMode(x: boolean) { this.s._modifiers._proMode = x; return this}
    ZenMode(x: boolean) { this.s._modifiers._zenMode = x; return this}
    SmallCubes(x: boolean) { this.s._modifiers._smallCubes = x; return this}
    //#endregion

    //#region Other settings
    OverrideEnvironment(x: boolean) { this.s._environments._overrideEnvironments = x; return this}
    OverrideColors(x: boolean) { this.s._colors._overrideDefaultColors = x; return this}
    Mirror(x: 0|1|2|3) { this.s._graphics._mirrorGraphicsSettings = x; return this}
    Bloom(x: boolean) { 
        if (x) {
            this.s._graphics._mainEffectGraphicsSettings = 1; 
        } else this.s._graphics._mainEffectGraphicsSettings = 0;
        return this
    }
    Smoke(x: boolean) {
        if (x) {
            this.s._graphics._smokeGraphicsSettings = 1;
        } else this.s._graphics._smokeGraphicsSettings = 0;
        return this
    }
    BurnMarks(x: boolean) { this.s._graphics._burnMarkTrailsEnabled = x; return this}
    ScreenDistortions(x: boolean) { this.s._graphics._screenDisplacementEffectsEnabled = x; return this}
    ShockwaveParticles(x: 0|1|2) { this.s._graphics._maxShockwaveParticles = x; return this}
    DisableChroma(x: boolean) { this.s._chroma._disableChromaEvents = x; return this}
    DisableEnvironment(x: boolean) { this.s._chroma._disableEnvironmentEnhancements = x; return this}
    DisableNoteColors(x: boolean) { this.s._chroma._disableNoteColoring = x; return this}
    ZenModeWalls (x: boolean) { this.s._chroma._forceZenModeWalls = x; return this}
    CountersPlus (x: boolean) { this.s._countersPlus._mainEnabled = x; return this}
    //#endregion

    end(filename: string) {
        const a = new  Info(filename);
        a.settings = this.s;
        console.log(a)
    }
}