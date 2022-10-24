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

    chroma() {
        this.s.push("Chroma");
        this.End()
        return this;
    }
    cinema() {
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

    noodle() {
        this.r.push("Noodle Extensions");
        this.End()
        return this;
    }
    chroma() {
        this.r.push("Chroma");
        this.End()
        return this;
    }
    cinema() {
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
    leftHanded(x: boolean) { this.s._playerOptions._leftHanded = x; this.End(); return this}
    playerHeight(x: number) { this.s._playerOptions._playerHeight = x; this.End(); return this}
    autoPlayerHeight(x: boolean) { this.s._playerOptions._automaticPlayerHeight = x; this.End(); return this}
    sfxVolume(x: number) { this.s._playerOptions._sfxVolume = x; this.End(); return this}
    reduceDebris(x: boolean) { this.s._playerOptions._reduceDebris = x; this.End(); return this}
    noHUD(x: boolean) { this.s._playerOptions._noTextsAndHuds = x; this.End(); return this}
    noFailFX(x: boolean) { this.s._playerOptions._noFailEffects = x; this.End(); return this}
    advancedHUD(x: boolean) { this.s._playerOptions._advancedHud = x; this.End(); return this}
    autoRestart(x: boolean) { this.s._playerOptions._autoRestart = x; this.End(); return this}
    trailIntensity(x: boolean) { this.s._playerOptions._reduceDebris = x; this.End(); return this}
    noteJumpDurationType(x: noteJump) { this.s._playerOptions._noteJumpDurationTypeSettings = x; this.End(); return this}
    noteJumpFixedDuration(x: number) { this.s._playerOptions._noteJumpFixedDuration = x; this.End(); return this}
    noteJumpOffset(x: number) { this.s._playerOptions._noteJumpStartBeatOffset = x; this.End(); return this}
    hideSpawnEffect(x: boolean) { this.s._playerOptions._hideNoteSpawnEffect = x; this.End(); return this}
    adaptiveSFX(x: number) { this.s._playerOptions._adaptiveSfx = x; this.End(); return this}
    effects(x: effects) { this.s._playerOptions._environmentEffectsFilterDefaultPreset = x; this.End(); return this}
    effectsExpertPlus(x: effects) { this.s._playerOptions._environmentEffectsFilterExpertPlusPreset = x; this.End(); return this}
    //#endregion

    //#region Modifiers
    energyType(x: energy) { this.s._modifiers._energyType = x; this.End(); return this}
    noFail(x: boolean) { this.s._modifiers._noFailOn0Energy = x; this.End(); return this}
    instaFail(x: boolean) { this.s._modifiers._instaFail = x; this.End(); return this}
    saberClashFail(x: boolean) { this.s._modifiers._failOnSaberClash = x; this.End(); return this}
    enabledWalls(x: enabledWall) { this.s._modifiers._enabledObstacleType = x; this.End(); return this}
    fastNotes(x: boolean) { this.s._modifiers._fastNotes = x; this.End(); return this}
    strictAngles(x: boolean) { this.s._modifiers._strictAngles = x; this.End(); return this}
    disappearingArrows(x: boolean) { this.s._modifiers._disappearingArrows = x; this.End(); return this}
    ghostNotes(x: boolean) { this.s._modifiers._ghostNotes = x; this.End(); return this}
    noBombs(x: boolean) { this.s._modifiers._noBombs = x; this.End(); return this}
    songSpeed(x: speed) { this.s._modifiers._songSpeed = x; this.End(); return this}
    noArrows(x: boolean) { this.s._modifiers._noArrows = x; this.End(); return this}
    proMode(x: boolean) { this.s._modifiers._proMode = x; this.End(); return this}
    zenMode(x: boolean) { this.s._modifiers._zenMode = x; this.End(); return this}
    smallCubes(x: boolean) { this.s._modifiers._smallCubes = x; this.End(); return this}
    //#endregion

    //#region Other settings
    overrideEnvironment(x: boolean) { this.s._environments._overrideEnvironments = x; this.End(); return this}
    overrideColors(x: boolean) { this.s._colors._overrideDefaultColors = x; this.End(); return this}
    mirror(x: 0|1|2|3) { this.s._graphics._mirrorGraphicsSettings = x; this.End(); return this}
    bloom(x: boolean) { 
        if (x) {
            this.s._graphics._mainEffectGraphicsSettings = 1; 
        } else this.s._graphics._mainEffectGraphicsSettings = 0;
        this.End();
        return this
    }
    smoke(x: boolean) {
        if (x) {
            this.s._graphics._smokeGraphicsSettings = 1;
        } else this.s._graphics._smokeGraphicsSettings = 0;
        this.End();
        return this
    }
    burnMarks(x: boolean) { this.s._graphics._burnMarkTrailsEnabled = x; this.End(); return this}
    screenDistortions(x: boolean) { this.s._graphics._screenDisplacementEffectsEnabled = x; this.End(); return this}
    shockwaveParticles(x: 0|1|2) { this.s._graphics._maxShockwaveParticles = x; this.End(); return this}
    disableChroma(x: boolean) { this.s._chroma._disableChromaEvents = x; this.End(); return this}
    disableEnvironment(x: boolean) { this.s._chroma._disableEnvironmentEnhancements = x; this.End(); return this}
    disableNoteColors(x: boolean) { this.s._chroma._disableNoteColoring = x; this.End(); return this}
    zenModeWalls (x: boolean) { this.s._chroma._forceZenModeWalls = x; this.End(); return this}
    countersPlus (x: boolean) { this.s._countersPlus._mainEnabled = x; this.End(); return this}
    //#endregion

    private End() {
        infoFile._difficultyBeatmapSets.forEach((x: any) => {
            if (this.f.includes(x._beatmapCharacteristicNalrame)) {
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