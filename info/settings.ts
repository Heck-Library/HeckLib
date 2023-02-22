// deno-lint-ignore-file no-explicit-any
import { noteJump,effects,energy,enabledWall,speed } from "../src/types.ts";

let infoFile: Record<string, any>;

/**
 * Settings setter properties
 */
export default class Settings {
    s : {
        _playerOptions: {
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
            _noteJumpDurationTypeSettings?: noteJump;
            _noteJumpFixedDuration?: number;
            _noteJumpStartBeatOffset?: number;
            _hideNoteSpawnEffect?: boolean;
            _adaptiveSfx?: number;
            _environmentEffectsFilterDefaultPreset?: effects;
            _environmentEffectsFilterExpertPlusPreset?: effects;
        };
        _modifiers: {
            _energyType?: energy;
            _noFailOn0Energy?: boolean;
            _instaFail?: boolean;
            _failOnSaberClash?: boolean;
            _enabledObstacleType?: enabledWall;
            _fastNotes?: boolean;
            _strictAngles?: boolean;
            _disappearingArrows?: boolean;
            _ghostNotes?: boolean;
            _noBombs?: boolean;
            _songSpeed?: speed;
            _noArrows?: boolean;
            _proMode?: boolean;
            _zenMode?: boolean;
            _smallCubes?: boolean;
        };
        _environments: {
            _overrideEnvironments?: boolean;
        };
        _colors: {
            _overrideDefaultColors?: boolean;
        };
        _graphics: {
            _mirrorGraphicsSettings?: 0 | 1 | 2 | 3;
            _mainEffectGraphicsSettings?: 0 | 1;
            _smokeGraphicsSettings?: 0 | 1;
            _burnMarkTrailsEnabled?: boolean;
            _screenDisplacementEffectsEnabled?: boolean;
            _maxShockwaveParticles?: 0 | 1 | 2;
        };
        _chroma: {
            _disableChromaEvents?: boolean;
            _disableEnvironmentEnhancements?: boolean;
            _disableNoteColoring?: boolean;
            _forceZenModeWalls?: boolean;
        };
        _countersPlus: {
            _mainEnabled?: boolean;
        };
    };
    f : string;

    constructor(filename : string) {
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

    // #region Player Options
    /**
   * If left handed mode should be turned on or off.
   */
    leftHanded(x : boolean) {
        this.s._playerOptions._leftHanded = x;
        this.End();
        return this;
    }
    /**
   * What the player height should be set to.
   */
    playerHeight(x : number) {
        this.s._playerOptions._playerHeight = x;
        this.End();
        return this;
    }
    /**
   * If player height should be set to automatic or not.
   */
    autoPlayerHeight(x : boolean) {
        this.s._playerOptions._automaticPlayerHeight = x;
        this.End();
        return this;
    }
    /**
   * What the sfx volume should be set to.
   */
    sfxVolume(x : number) {
        this.s._playerOptions._sfxVolume = x;
        this.End();
        return this;
    }
    /**
   * If redue debris should be turned on or off.
   */
    reduceDebris(x : boolean) {
        this.s._playerOptions._reduceDebris = x;
        this.End();
        return this;
    }
    /**
   * If the HUD should be turned on or off.
   */
    noHUD(x : boolean) {
        this.s._playerOptions._noTextsAndHuds = x;
        this.End();
        return this;
    }
    /**
   * If the no fail effect should be turned on or off.
   */
    noFailFX(x : boolean) {
        this.s._playerOptions._noFailEffects = x;
        this.End();
        return this;
    }
    /**
   * If the advanced HUD should be turned on or off.
   */
    advancedHUD(x : boolean) {
        this.s._playerOptions._advancedHud = x;
        this.End();
        return this;
    }
    /**
   * If automatic restart should be turned on or off.
   */
    autoRestart(x : boolean) {
        this.s._playerOptions._autoRestart = x;
        this.End();
        return this;
    }
    /**
   * What the saber trail intensity should be set to.
   */
    trailIntensity(x : number) {
        this.s._playerOptions._saberTrailIntensity = x;
        this.End();
        return this;
    }
    /**
   * What the note jump duration type should be.
   */
    noteJumpDurationType(x : noteJump) {
        this.s._playerOptions._noteJumpDurationTypeSettings = x;
        this.End();
        return this;
    }
    /**
   * What the note jump fixed duration should be.
   */
    noteJumpFixedDuration(x : number) {
        this.s._playerOptions._noteJumpFixedDuration = x;
        this.End();
        return this;
    }
    /**
   * What the note jump offset should be.
   */
    noteJumpOffset(x : number) {
        this.s._playerOptions._noteJumpStartBeatOffset = x;
        this.End();
        return this;
    }
    /**
   * If hide spawn effect should be turned on or off.
   */
    hideSpawnEffect(x : boolean) {
        this.s._playerOptions._hideNoteSpawnEffect = x;
        this.End();
        return this;
    }
    /**
   * If adaptive sound effects should be turned on or off (0 = off, 1 = on).
   */
    adaptiveSFX(x : number) {
        this.s._playerOptions._adaptiveSfx = x;
        this.End();
        return this;
    }
    /**
   * What the effects for the environment should be set to.
   */
    effects(x : effects) {
        this.s._playerOptions._environmentEffectsFilterDefaultPreset = x;
        this.End();
        return this;
    }
    /**
   * What the effects for the environment on expert+ should be set to.
   */
    effectsExpertPlus(x : effects) {
        this.s._playerOptions._environmentEffectsFilterExpertPlusPreset = x;
        this.End();
        return this;
    }
    // #endregion

    // #region Modifiers
    /**
   * What the energy type should be set to.
   */
    energyType(x : energy) {
        this.s._modifiers._energyType = x;
        this.End();
        return this;
    }
    /**
   * If no fail should be on or off.
   */
    noFail(x : boolean) {
        this.s._modifiers._noFailOn0Energy = x;
        this.End();
        return this;
    }
    /**
   * If insta-fail should be on or off.
   */
    instaFail(x : boolean) {
        this.s._modifiers._instaFail = x;
        this.End();
        return this;
    }
    /**
   * If the level should fail on saber clash.
   */
    saberClashFail(x : boolean) {
        this.s._modifiers._failOnSaberClash = x;
        this.End();
        return this;
    }
    /**
   * What type of walls should be enabled.
   */
    enabledWalls(x : enabledWall) {
        this.s._modifiers._enabledObstacleType = x;
        this.End();
        return this;
    }
    /**
   * If fast notes should be on or off.
   */
    fastNotes(x : boolean) {
        this.s._modifiers._fastNotes = x;
        this.End();
        return this;
    }
    /**
   * If strict angles should be on or off.
   */
    strictAngles(x : boolean) {
        this.s._modifiers._strictAngles = x;
        this.End();
        return this;
    }
    /**
   * If disappearing arrows should be on or off.
   */
    disappearingArrows(x : boolean) {
        this.s._modifiers._disappearingArrows = x;
        this.End();
        return this;
    }
    /**
   * If ghost notes should be on or off.
   */
    ghostNotes(x : boolean) {
        this.s._modifiers._ghostNotes = x;
        this.End();
        return this;
    }
    /**
   * If the level should disabled bombs.
   */
    noBombs(x : boolean) {
        this.s._modifiers._noBombs = x;
        this.End();
        return this;
    }
    /**
   * The speed of the level.
   */
    songSpeed(x : speed) {
        this.s._modifiers._songSpeed = x;
        this.End();
        return this;
    }
    /**
   * If no arrows should be on or off.
   */
    noArrows(x : boolean) {
        this.s._modifiers._noArrows = x;
        this.End();
        return this;
    }
    /**
   * If pro mode should be on or off.
   */
    proMode(x : boolean) {
        this.s._modifiers._proMode = x;
        this.End();
        return this;
    }
    /**
   * If zen mode should be on or off.
   */
    zenMode(x : boolean) {
        this.s._modifiers._zenMode = x;
        this.End();
        return this;
    }
    /**
   * If small cubes should be on or off.
   */
    smallCubes(x : boolean) {
        this.s._modifiers._smallCubes = x;
        this.End();
        return this;
    }
    // #endregion

    // #region Other settings
    /**
   * If override environment should be on or off.
   */
    overrideEnvironment(x : boolean) {
        this.s._environments._overrideEnvironments = x;
        this.End();
        return this;
    }
    /**
   * If override colors should be on or off.
   */
    overrideColors(x : boolean) {
        this.s._colors._overrideDefaultColors = x;
        this.End();
        return this;
    }
    /**
   * What mirror quality should be set to.
   */
    mirror(x : 0 | 1 | 2 | 3) {
        this.s._graphics._mirrorGraphicsSettings = x;
        this.End();
        return this;
    }

    /**
   * If bloom should be on or off.
   */
    bloom(x : boolean) {
        if (x) {
            this.s._graphics._mainEffectGraphicsSettings = 1;
        } else 
            this.s._graphics._mainEffectGraphicsSettings = 0;
        
        this.End();
        return this;
    }
    /**
   * If smoke should be on or off.
   */
    smoke(x : boolean) {
        if (x) {
            this.s._graphics._smokeGraphicsSettings = 1;
        } else 
            this.s._graphics._smokeGraphicsSettings = 0;
        
        this.End();
        return this;
    }
    /**
   * If burn marks should be on or off.
   */
    burnMarks(x : boolean) {
        this.s._graphics._burnMarkTrailsEnabled = x;
        this.End();
        return this;
    }
    /**
   * If screen distortion effects should be on or off.
   */
    screenDistortions(x : boolean) {
        this.s._graphics._screenDisplacementEffectsEnabled = x;
        this.End();
        return this;
    }
    /**
   * The intensity of shockwave particles.
   */
    shockwaveParticles(x : 0 | 1 | 2) {
        this.s._graphics._maxShockwaveParticles = x;
        this.End();
        return this;
    }
    /**
   * If chroma should be disabled or not.
   */
    disableChroma(x : boolean) {
        this.s._chroma._disableChromaEvents = x;
        this.End();
        return this;
    }
    /**
   * If environment enhancements be on or off.
   */
    disableEnvironment(x : boolean) {
        this.s._chroma._disableEnvironmentEnhancements = x;
        this.End();
        return this;
    }
    /**
   * If note coloring should be on or off.
   */
    disableNoteColors(x : boolean) {
        this.s._chroma._disableNoteColoring = x;
        this.End();
        return this;
    }
    /**
   * If zen mode walls should be on or off.
   */
    zenModeWalls(x : boolean) {
        this.s._chroma._forceZenModeWalls = x;
        this.End();
        return this;
    }
    /**
   * If counters+ should be on or off.
   */
    countersPlus(x : boolean) {
        this.s._countersPlus._mainEnabled = x;
        this.End();
        return this;
    }
    // #endregion

    private End() {
        try {
            infoFile = JSON.parse(Deno.readTextFileSync("Info.dat"));
        } catch {
            console.warn("Reading Info.dat failed");
        } infoFile._difficultyBeatmapSets.forEach((x : any) => {
            if (this.f.includes(x._beatmapCharacteristicName)) {
                x._difficultyBeatmaps.forEach((y : any) => {
                    if (y._beatmapFilename.includes(this.f)) {
                        if (!y._customData) 
                            y._customData = {};
                        
                        if (!y._customData._settings) 
                            y._customData._settings = {};
                        
                        y._customData._settings = this.s;
                    }
                });
            }
        });
    
    Deno.writeTextFileSync("Info.dat", JSON.stringify(infoFile, null, 4));
}}
