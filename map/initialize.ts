
import ICustomEvent from "../interfaces/events/eventData/ICustomEvent";
import IInfo from "../interfaces/info/info";
import { readFileSync, writeFileSync } from "fs";
import { JSONtoPointDefs } from "./converters/JSONtoPointDefs";
import { JSONtoChains } from "./converters/JSONtoChains";
import { JSONtoBombs } from "./converters/JSONtoBombs";
import AnimateTrack from "../events/animateTrack";
import AssignPathAnimation from "../events/assignPathAnimation";
import AssignPlayerToTrack from "../events/assignPlayerTrack";
import AssignTrackParent from "../events/assignTrackParent";
import AnimateComponent from "../events/animateComponent";
import AssignFogTrack from "../events/assignFogTrack";
import Wall from "../objects/wall";
import { bombs, environment, events, fakeBombs, lightEvents, materials } from "./variables";
import Note from "../objects/note";
import Arc from "../objects/arc";
import ILightEvent from "../interfaces/environment/lightEvent";
import Light from "../events/lightEvent";
import { fakeNotes, notes } from "../objects/note";
import { walls, fakeWalls } from "../objects/wall";
import { chains } from "../objects/chain";
import { arcs } from "../objects/arc";

//#region Variables
const stringInfo = JSON.parse(readFileSync("./Info.dat", "utf-8"));
export const infoFile: IInfo = JSON.parse(JSON.stringify(stringInfo).replace(/"_(\w+)":/g,'"$1":'));

/**
 * Contains metadata of the map. Such as the NJS, offset, BPM, etc.
 * 
 * - `njs`: The note jump speed of the map.
 * - `offset`: The offset of the map.
 * - `bpm`: The BPM of the map.
 * - `halfJumpDuration`: The HJD of the map.
 * - `jumpDistance`: The JD of the map.
 */
export const MAPDATA: { njs: number, offset: number, bpm: number, halfJumpDuration: number, jumpDistance: number } = {
    njs: 16,
    offset: 0,
    bpm: 120,
    halfJumpDuration: 2,
    jumpDistance: 24
};

export let activeInput: string;
export let activeOutput: string;

//#endregion

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
    njs?: number;
    /**
     * Sets the offset of all notes
     */
    offset?: number;
    /**
     * Imports the lightshow from another difficulty.
     */
    lightshow?: string;
    noLogo?: boolean;
}

export let V3: boolean;

function JSONtoLights(lightInput: Record<string, any>[]): ILightEvent [] {
    console.time("Read lights in")
    const lightArr: ILightEvent[] = [];
    if (V3) {
        if (lightInput) lightInput.forEach((l: Record<string, any>) => {
            l = JSON.parse(JSON.stringify(l).replace(/"_(\w+)":/g,'"$1":').replace(/"lockPosition":/g,'"lockRotation":'))
            if (l.customData && l.customData.lightGradient) {
                delete l.customData.lightGradient;
            }
            const light: ILightEvent = new Light({
                time: l.b,
                type: l.et,
                value: l.i,
                float: l.f
            }, l.customData);
            lightArr.push(light);
        });
    } else {
        if (lightInput) lightInput.forEach((l: Record<string, any>) => {
            const light: ILightEvent = new Light({
                time: l._time,
                type: l._type,
                value: l._value,
                float: l._floatValue
            });
            if (l._customData) {
                light.data = {
                    color: l._customData._color,
                    lightID: l._customData._lightID,
                    easing: l._customData._easing,
                    lerpType: l._customData._lerpType,
                    lockPosition: l._customData._lockRotation,
                    speed: l._customData._speed,
                    direction: l._customData._direction,
                    nameFilter: l._customData._nameFilter,
                    rotation: l._customData._rotation,
                    step: l._customData._step,
                    prop: l._customData._prop
                };
            }
            lightArr.push(light);
        });
    }
    console.timeEnd("Read lights in")
    return lightArr;
}

function JSONtoArcs(arcInput: Record<string, any>[], NJS: number, offset: number): Arc[] {
    console.time("Read arcs in");
    const arcArr: Arc[] = [];
    arcInput.forEach((c: Record<string, any>) => {
        arcArr.push(new Arc({
            time: c.b,
            x: c.x,
            y: c.y,
            type: c.c,
            direction: c.d,
            multiplier: c.mu,
            endTime: c.tb,
            endX: c.tx,
            endY: c.ty,
            endDirection: c.tc,
            endMultiplier: c.tmu,
            anchor: c.m,
            customData: {
                njs: NJS,
                offset: offset
            }
        }));
    });
    console.timeEnd("Read arcs in");
    return arcArr;
}

function JSONtoNotes(noteInput: Record<string, any>[], NJS: number, offset: number): Note[] {
    console.time("Read notes in");
    const noteArr: Note[] = [];
    if (V3) {
        if (noteInput) noteInput.forEach((n: Record<string, any>) => {
            const note = new Note({
                //Vanilla data
                time: n.b,
                x: n.x,
                y: n.y,
                angle: n.a,
                type: n.c,
                direction: n.d
            }, {
                //Custom data
                njs: NJS,
                offset: offset,
            });
            if (n.customData) {
                if (n.customData.color) note.customData.color = n.customData.color;
                if (n.customData.fake) note.customData.fake = n.customData.fake;
                if (n.customData.uninteractable) note.customData.interactable = n.customData.interactable;
                if (n.customData.scale) note.customData.scale = n.customData.scale;
                if (n.customData.disableNoteGravity) note.customData.disableNoteGravity = n.customData.disableNoteGravity;
                if (n.customData.disableSpawnEffect) note.customData.disableSpawnEffect = n.customData.disableSpawnEffect;
                if (n.customData.disableNoteLook) note.customData.disableNoteLook = n.customData.disableNoteLook;
                if (n.customData.flip) note.customData.flip = n.customData.flip;
                if (n.customData.localRotation) note.customData.localRotation = n.customData.localRotation;
                if (n.customData.coordinates) note.customData.position = n.customData.coordinates;
                if (n.customData.worldRotation) note.customData.rotation = n.customData.worldRotation;
            }
            notes.push(note)
        });
    } else {
        if (noteInput) noteInput.forEach((n: Record<string, any>) => {
            const note = new Note({
                //Vanilla data
                time: n._time,
                x: n._lineIndex,
                y: n._lineLayer,
                type: n._type,
                direction: n._cutDirection
            }, {
                //Custom data
                njs: NJS,
                offset: offset,
            });
            if (n._customData) {
                if (n._customData._color) note.customData.color = n._customData._color;
                if (n._customData._fake) note.customData.fake = n._customData._fake;
                if (n._customData._interactable) note.customData.interactable = n._customData._interactable;
                if (n._customData._scale) note.customData.scale = n._customData._scale;
                if (n._customData._disableNoteGravity) note.customData.disableNoteGravity = n._customData._disableNoteGravity;
                if (n._customData._disableSpawnEffect) note.customData.disableSpawnEffect = n._customData._disableSpawnEffect;
                if (n._customData._disableNoteLook) note.customData.disableNoteLook = n._customData._disableNoteLook;
                if (n._customData._flip) note.customData.flip = n._customData._flip;
                if (n._customData._localRotation) note.customData.localRotation = n._customData._localRotation;
                if (n._customData._position) note.customData.position = n._customData._position;
                if (n._customData._rotation) note.customData.rotation = n._customData._rotation;
                if (n._customData._cutDirection) note.customData.cutDirection = n._customData._cutDirection;
            }
            noteArr.push(note);
        });
    }
    console.timeEnd("Read notes in");
    return noteArr;
}

function JSONtoWalls(wallInput: Record<string, any>[], NJS: number, offset: number): Wall[] {
    console.time("Read walls in");
    const wallArr: Wall[] = [];
    if (V3) {
        if (wallInput) wallInput.forEach((w: Record<string, any>) => {
            wallArr.push(new Wall({
                //Vanilla data
                time: w.b,
                duration: w.d,
                x: w.x,
                y: w.y,
                width: w.w,
                height: w.h
            }, {
                //Custom data
                njs: NJS,
                offset: offset
            }));
        });
    } else {
        if (wallInput) wallInput.forEach((w: Record<string, any>) => {
            wallArr.push(new Wall({
                //Vanilla data
                time: w._time,
                duration: w._duration,
                width: w._width,
                x: w._lineIndex,
                y: w._type
            }, {
                //Custom data
                njs: NJS,
                offset: offset
            }));
        });
    }
    console.timeEnd("Read walls in");
    return wallArr;
}

function JSONtoCustomEvents(eventInput: Record<string, any>[]) {
    console.time("Read custom events in")
    const eventArr: ICustomEvent[] = [];
    if (!V3) {
        eventInput.forEach((e: Record<string, any>) => {
            const f = JSON.parse(
                JSON.stringify(e)
                    .replace(/"_(\w+)":/g, '"_$1":')
            );
            switch (f.t) {
                case "AnimateTrack":
                    if (!e._data._track)
                        f.data.track = "NULL";
                    if (!e._data._duration)
                        f.data.duration = 1;
                    eventArr.push(new AnimateTrack(f.time, f.data));
                    break;
                case "AssignPathAnimation":
                    if (!e._data._track)
                        f.data.track = "NULL";
                    eventArr.push(new AssignPathAnimation(f.time, f.data));
                    break;
                case "AssignPlayerToTrack":
                    if (!e._data._track)
                        f.data.track = "NULL";
                    eventArr.push(new AssignPlayerToTrack(f.time, f.data.track));
                    break;
                case "AssignTrackParent":
                    eventArr.push(new AssignTrackParent(f.time, f.data));
                    break;
                case "AnimateComponent":
                    if (!e._data._track)
                        f.data.track = "NULL";
                    if (!e._data._duration)
                        f.data.duration = 1;
                    eventArr.push(new AnimateComponent(f.time, f.data));
                    break;
                case "AssignFogTrack":
                    if (!e._data._track)
                        f.data.track = "NULL";
                    eventArr.push(new AssignFogTrack(f.time, f.data.track));
                    break;
            }
        });
    }
    if (V3) {
        eventInput.forEach((e: Record<string, any>) => {
            const f = JSON.parse(
                JSON.stringify(e)
                    .replace('"offsetPosition":', '"position":')
                    .replace('"offsetWorldRotation":', '"rotation":')
            );
            switch (f.t) {
                case "AnimateTrack":
                    if (!e.d.track)
                        f.d.track = "NULL";
                    if (!e.d.duration)
                        f.d.duration = 1;
                    eventArr.push(new AnimateTrack(f.b, f.d));
                    break;
                case "AssignPathAnimation":
                    if (!e.d.track)
                        f.d.track = "NULL";
                    eventArr.push(new AssignPathAnimation(f.b, f.d));
                    break;
                case "AssignPlayerToTrack":
                    if (!e.d.track)
                        f.d.track = "NULL";
                    eventArr.push(new AssignPlayerToTrack(f.b, f.d.track));
                    break;
                case "AssignTrackParent":
                    eventArr.push(new AssignTrackParent(f.b, f.d));
                    break;
                case "AnimateComponent":
                    if (!e.d.track)
                        f.d.track = "NULL";
                    if (!e.d.duration)
                        f.d.duration = 1;
                    eventArr.push(new AnimateComponent(f.b, f.d));
                    break;
            }
        });
    }
    console.timeEnd("Read custom events in")
    return eventArr;
}

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

/**
 * Initializes the map file.
 * 
 * Example:
 * ```ts
 * const INPUT = Difficulty.EXPERT_PLUS_LAWLESS;
 * const OUTPUT = Difficulty.EXPERT_PLUS_STANDARD;
 * 
 * const DIFFICULTY = initialize(INPUT, OUTPUT, {
 *     njs: 16,
 *     offset: 0
 * });
 * ```
 */
export function initialize(input: string, output: string, properties?: IInitParams) {
    console.time("\x1b[36mInitialized in");
    if (infoFile.difficultyBeatmapSets ) infoFile.difficultyBeatmapSets.forEach((set) => {
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
    if (!p.noLogo) {
        console.log(" \x1b[5m\x1b[35m\x1b[1m __  __                 __      \x1b[37m__           __        ")
        console.log(" \x1b[35m/\\ \\/\\ \\               /\\ \\  _ \x1b[37m/\\ \\       __/\\ \\       ")
        console.log(" \x1b[35m\\ \\ \\_\\ \\     __    ___\\ \\ \\/ \\\x1b[37m\\ \\ \\     /\\_\\ \\ \\____  ")
        console.log(" \x1b[35m \\ \\  _  \\  / __ \\ / ___\\ \\   < \x1b[37m\\ \\ \\    \\/\\ \\ \\  __ \\ ")
        console.log(" \x1b[35m  \\ \\ \\ \\ \\/\\  __//\\ \\__/\\ \\ \\\\ \\\x1b[37m\\ \\ \\____\\ \\ \\ \\ \\_\\ \\")
        console.log(" \x1b[35m   \\ \\_\\ \\_\\ \\____\\ \\____\\\\ \\_\\ \\_\x1b[37m\\ \\____/ \\ \\_\\ \\____/")
        console.log(" \x1b[35m    \\/_/\\/_/\\/____/\\/____/ \\/_/\\/_/\x1b[37m\\/___/   \\/_/\\/___/ ")
        console.log(" \x1b[0m ")
        console.log(" ======================================================= \n")
    }

    isV3(`./${input}`);
    let diff = JSON.parse(readFileSync(`./${input}`, 'utf-8'));
    if (infoFile.difficultyBeatmapSets) infoFile.difficultyBeatmapSets.forEach((set) => {
        set.difficultyBeatmaps.forEach((difficulty) => {
            if(difficulty.beatmapFilename.includes(output)){
                if (difficulty.customData?.settings) delete difficulty.customData.settings;
                if (difficulty.customData?.requirements) delete difficulty.customData.requirements;
                if (difficulty.customData?.suggestions) delete difficulty.customData.suggestions;
            }
        });
    });

    activeInput = input;
    activeOutput = output;

    if (infoFile.difficultyBeatmapSets) infoFile.difficultyBeatmapSets.forEach((set) => {
        if (JSON.stringify(set).includes(output)) {
            set.difficultyBeatmaps.forEach((difficulty) => {
                if (JSON.stringify(difficulty).includes(output)) {
                    difficulty.customData = {};
                }
            });
        }
    });

    writeFileSync("./Info.dat", JSON.stringify(infoFile, null, 4), "utf-8");

    if (!V3) {
        notes.push(...JSONtoNotes(diff._notes, NJS, offset));
        walls.push(...JSONtoWalls(diff._obstacles, NJS, offset));
        if (!p.lightshow) lightEvents.push(...JSONtoLights(diff._events));

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

        events.push(...diff._customData._customEvents);
        environment.push(customData._environment);
        Object.assign(materials, Object.entries(customData._materials));
    }
    else if (V3) {
        notes.push(...JSONtoNotes(diff.colorNotes, NJS, offset));
        walls.push(...JSONtoWalls(diff.obstacles, NJS, offset));
        chains.push(...JSONtoChains(diff.burstSliders, NJS, offset));
        arcs.push(...JSONtoArcs(diff.sliders, NJS, offset));
        bombs.push(...JSONtoBombs(diff.bombNotes, NJS, offset));
        lightEvents.push(...JSONtoLights(diff.basicBeatmapEvents));

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

        events.push(...customData.customEvents);
        environment.push(...customData.environment);
        Object.assign(materials, Object.entries(customData.materials));
        fakeNotes.push(...customData.fakeColorNotes);
        fakeWalls.push(...customData.fakeObstacles);
        fakeBombs.push(...customData.fakeBombNotes);
    }
    console.log("")
    console.timeEnd("\x1b[36mInitialized in")
    console.log("\x1b[0m")
    return diff;
}