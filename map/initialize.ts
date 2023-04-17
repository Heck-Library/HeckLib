import IEnvironment from "../interfaces/environment/environment";
import IGeometryEnvironment from "../interfaces/environment/geometry";
import ILightEvent from "../interfaces/environment/lightEvent";
import IMaterial from "../interfaces/environment/material";
import ICustomEvent from "../interfaces/events/eventData/ICustomEvent";
import IInfo from "../interfaces/info/info";
import IArc from "../interfaces/objects/arc";
import IBomb from "../interfaces/objects/bomb";
import IChain from "../interfaces/objects/chain";
import INote from "../interfaces/objects/note";
import IWall from "../interfaces/objects/wall";
import IMapV2 from "../interfaces/v2map";
import IMapV3 from "../interfaces/v3map";
import { unknownAnim, vec1anim, vec3anim, vec4anim } from "../types/vectors";
import { readFileSync, writeFileSync } from "fs";
import { JSONtoNotes } from "./converters/JSONtoNotes";
import { JSONtoWalls } from "./converters/JSONtoWalls";
import { JSONtoLights } from "./converters/JSONtoLights";
import { JSONtoCustomEvents } from "./converters/JSONtoCustomEvents";
import { JSONtoPointDefs } from "./converters/JSONtoPointDefs";
import { JSONtoChains } from "./converters/JSONtoChains";
import { JSONtoArcs } from "./converters/JSONtoArcs";
import { JSONtoBombs } from "./converters/JSONtoBombs";

export const pointDefinitions: Record<string, unknownAnim> = {};
export const definitionNames: string[] = [];

export let events: ICustomEvent[] = [];

export let notes: INote[] = [];
export let arcs: IArc[] = [];
export let chains: IChain[] = [];
export let bombs: IBomb[] = [];
export let walls: IWall[] = [];

export let fakeNotes: Record<string, any>[] = [];
export let fakeArcs: Record<string, any>[] = [];
export let fakeChains: Record<string, any>[] = [];
export let fakeBombs: Record<string, any>[] = [];
export let fakeWalls: Record<string, any>[] = [];

export let lightEvents: ILightEvent[] = [];

export let environment: IEnvironment[] = [];
export let materials: Record<string, IMaterial> = {};
export let geometry: IGeometryEnvironment[] = [];
export const materialNames: string[] = [];

export const infoFile: IInfo = JSON.parse(readFileSync("./Info.dat", "utf-8").replace(/"_(\w+)":/g, '"$1":'));

export const MAPDATA: { njs: number, offset: number, bpm: number, halfJumpDuration: number, jumpDistance: number } = {
    njs: 16,
    offset: 0,
    bpm: 120,
    halfJumpDuration: 2,
    jumpDistance: 24
};

export let activeInput: string;
export let activeOutput: string;

export enum Difficulty {
    EXPERT_PLUS_STANDARD = "ExpertPlusStandard.dat",
    EXPERT_PLUS_NO_ARROWS = "ExpertPlusNoArrows.dat",
    EXPERT_PLUS_LIGHTSHOW = "ExpertPlusLightshow.dat",
    EXPERT_PLUS_LAWLESS = "ExpertPlusLawless.dat",
    EXPERT_PLUS_ONE_SABER = "ExpertPlusOneSaber.dat",

    EXPERT_STANDARD = "ExpertStandard.dat",
    EXPERT_NO_ARROWS = "ExpertNoArrows.dat",
    EXPERT_LIGHTSHOW = "ExpertLightshow.dat",
    EXPERT_LAWLESS = "ExpertLawless.dat",
    EXPERT_ONE_SABER = "ExpertOneSaber.dat",

    HARD_STANDARD = "HardStandard.dat",
    HARD_NO_ARROWS = "HardNoArrows.dat",
    HARD_LIGHTSHOW = "HardLightshow.dat",
    HARD_LAWLESS = "HardLawless.dat",
    HARD_ONE_SABER = "HardOneSaber.dat",

    NORMAL_STANDARD = "NormalStandard.dat",
    NORMAL_NO_ARROWS = "NormalNoArrows.dat",
    NORMAL_LIGHTSHOW = "NormalLightshow.dat",
    NORMAL_LAWLESS = "NormalLawless.dat",
    NORMAL_ONE_SABER = "NormalOneSaber.dat",

    EASY_STANDARD = "EasyStandard.dat",
    EASY_NO_ARROWS = "EasyNoArrows.dat",
    EASY_LIGHTSHOW = "EasyLightshow.dat",
    EASY_LAWLESS = "EasyLawless.dat",
    EASY_ONE_SABER = "EasyOneSaber.dat"
}

interface IInitParams {
    /**
     * Sets the NJS of all notes
     */
    njs: number;
    /**
     * Sets the offset of all notes
     */
    offset: number;
    /**
     * Imports the lightshow from another difficulty.
     */
    lightshow?: string;
    /**
     * Whether the map should export as V2 or V3
     * This will enable V3 features even in V2 maps
     * WARNING: Will export as selected format
     */
    format?: "V2"|"V3";
}

export let V3: boolean;

function isV3(diffName: string) : void {
    const difficulty = JSON.parse(readFileSync(diffName, 'utf-8'));

    if (typeof difficulty._version !== "undefined") V3 = false;
    else V3 = true;
}

function getJumps() {
    const _startHalfJumpDurationInBeats = 4;
    const _maxHalfJumpDistance = 18;
    const _startBPM = MAPDATA.bpm; //INSERT BPM HERE -  -  -  -  -  -  -  -  -  -  -  -  -
    const bpm = MAPDATA.bpm; //AND HERE -  -  -  -  -  -  -  -  -  -  -  -  -
    const _startNoteJumpMovementSpeed = MAPDATA.njs; //NJS -  -  -  -  -  -  -  -  -  -  -  -  -
    const _noteJumpStartBeatOffset = MAPDATA.offset; //OFFSET -  -  -  -  -  -  -  -  -  -  -  -  -
  
    let _noteJumpMovementSpeed = (_startNoteJumpMovementSpeed * bpm) / _startBPM;
    let num = 60 / bpm;
    let num2 = _startHalfJumpDurationInBeats;
    while (_noteJumpMovementSpeed * num * num2 > _maxHalfJumpDistance) {
      num2 /= 2;
    }
    num2 += _noteJumpStartBeatOffset;
    if (num2 < 1) {
      num2 = 1;
    }
    const _jumpDuration = num * num2 * 2;
    const _jumpDistance = _noteJumpMovementSpeed * _jumpDuration;
    return { half: num2, dist: _jumpDistance };
}

export function initialize(input: string, output: string, properties?: IInitParams) {
    infoFile.difficultyBeatmapSets.forEach((set) => {
        set.difficultyBeatmaps.forEach((difficulty) => {
            if (difficulty.beatmapFilename.includes(output)) {
                if (!difficulty.customData) difficulty.customData = {};
            }
        });
    });
    writeFileSync("./Info.dat", JSON.stringify(infoFile, null, 4), "utf-8");
    console.time('HeckLib ran in');

    const p = properties || { njs: 16, offset: 0 };
    const NJS = p.njs;
    const offset = p.offset;
    const jumps = getJumps();
    MAPDATA.njs = p.njs;
    MAPDATA.offset = p.offset;
    MAPDATA.bpm = infoFile.beatsPerMinute;
    MAPDATA.halfJumpDuration = jumps.half;
    MAPDATA.jumpDistance = jumps.dist;

    if (p.lightshow) {
        lightEvents.length = 0;
    }

    isV3(`./${input}`);
    let diff = JSON.parse(readFileSync(`./${input}`, 'utf-8'));
    infoFile.difficultyBeatmapSets.forEach((set) => {
        set.difficultyBeatmaps.forEach((difficulty) => {
            if (difficulty.customData?.settings) delete difficulty.customData.settings;
            if (difficulty.customData?.requirements) delete difficulty.customData.requirements;
            if (difficulty.customData?.suggestions) delete difficulty.customData.suggestions;
        });
    });
    writeFileSync("./Info.dat", JSON.stringify(infoFile, null, 4), "utf-8");

    activeInput = input;
    activeOutput = output;

    infoFile.difficultyBeatmapSets.forEach((set) => {
        if (JSON.stringify(set).includes(output)) {
            set.difficultyBeatmaps.forEach((difficulty) => {
                if (JSON.stringify(difficulty).includes(output)) {
                    difficulty.customData = {};
                }
            });
        }
    });

    if (!V3) {
        notes = JSONtoNotes(diff._notes, NJS, offset);
        walls = JSONtoWalls(diff._obstacles, NJS, offset);
        if (!p.lightshow) lightEvents = JSONtoLights(diff._events);

        if (!diff._customData) {
            diff._customData = {};
        }

        const customData = diff._customData;

        if (!customData._customEvents) customData._customEvents = [];
        else customData._customEvents = JSONtoCustomEvents(diff._customData._customEvents);
        if (!customData._pointDefinitions) customData._pointDefinitions = [];
        else JSONtoPointDefs(diff._customData._pointDefinitions);
        if (!customData._environment) customData._environment = [];
        if (!customData._materials) customData._materials = {};

        events = diff._customData._customEvents;
        environment = customData._environment;
        materials = customData._materials;
    }
    else if (V3) {
        notes = JSONtoNotes(diff.colorNotes, NJS, offset);
        walls = JSONtoWalls(diff.obstacles, NJS, offset);
        chains = JSONtoChains(diff.burstSliders, NJS, offset);
        arcs = JSONtoArcs(diff.sliders, NJS, offset);
        bombs = JSONtoBombs(diff.bombNotes, NJS, offset);
        lightEvents = JSONtoLights(diff.basicBeatmapEvents);

        if (!diff.customData) {
            diff.customData = {};
        }
        if (!diff.customData.fakeColorNotes) {
            diff.customData.fakeColorNotes = [];
        } 
        if (!diff.customData.fakeBurstSliders) {
            diff.customData.fakeBurstSliders = [];
        }
        if (!diff.customData.fakeObstacles) {
            diff.customData.fakeObstacles = [];
        }
        if (!diff.customData.fakeBombNotes) {
            diff.customData.fakeBombNotes = [];
        }

        const customData = diff.customData;

        if (!customData.customEvents) customData.customEvents = [];
        else customData.customEvents = JSONtoCustomEvents(diff.customData.customEvents)
        if (!customData.pointDefinitions) customData.pointDefinitions = {};
        else diff.customData.pointDefinitions;
        if (!customData.environment) customData.environment = [];
        if (!customData.materials) customData.materials = {};

        //(output, JSON.stringify(diff, null, 4));

        events = customData.customEvents;
        environment = customData.environment;
        materials = customData.materials;
        fakeNotes = customData.fakeColorNotes;
        fakeWalls = customData.fakeObstacles;
        fakeBombs = customData.fakeBombNotes;
    }
    return diff;
}