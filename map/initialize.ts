import { readFileSync, writeFileSync } from "fs";
import { infoFile } from "../consts/info";
import { ARC, BOMB, CHAIN, CUSTOMEVENT, NOTE, POINTDEFINITION, WALL } from "../consts/mod";
import LightEvent from "../objects/lights";
import Note from "../objects/note";
import Wall from "../objects/wall";
import { IV2Map } from "./IV2Map";
import { IV3Map } from "./IV3Map";
import { LIGHT } from "../consts/types/lights/light";
import Chain from "../objects/chain";
import AnimateTrack from "../events/animateTrack";
import AssignPathAnimation from "../events/assignPathAnimation";
import AssignPlayerToTrack from "../events/assignPlayerToTrack";
import AssignTrackParent from "../events/assignTrackParent";
import AnimateComponent from "../events/animateComponent";
import AssignFogTrack from "../events/assignFogTrack";
import Arc from "../objects/arc";

export const pointDefinitions = ["NULL"];

export let environment: any[];
/**
 * Array that contains all the notes in the map.
 */
export let notes: NOTE[];
/**
 * Array that contains all the arcs.
 * DOES NOT WORK WITH V2!
 */
export let arcs: ARC[];
/**
 * Array that contains all the burst sliders or chains in the map.
 * DOES NOT WORK WITH V2!
 */
export let chains: CHAIN[];
/**
 * Array that contains all the fake burst sliders or chains in the map.
 * DOES NOT WORK WITH V2!
 */
export let fakeChains: CHAIN[];
/**
 * Array that contains all the bombs in the map.
 * DOES NOT WORK WITH V2!
 */
export let bombs: BOMB[];
/**
 * Array that contains all the walls in the map.
 */
export let walls: WALL[];
/**
 * Array that contains all the custom events in the map.
 */
export let events: CUSTOMEVENT[];
/**
 * Object that contains all the materials in the map.
 */
export let materials: any = {};
/**
 * Array that contains all the geometry objects in the map.
 */
export let geometry: any[];
/**
 * Array that contains all the point definitions in the map.
 */
export const definitions: POINTDEFINITION[] = [];
/**
 * Array that contains all the light events in the map.
 */
export let lights: LIGHT[] = [];
/**
 * Array that contains all the fake notes in the map.
 * DOES NOT WORK IN V2!
 */
export let fakeNotes: any[];
/**
 * Array that contains all the fake walls in the map.
 * DOES NOT WORK IN V2!
 */
export let fakeWalls: any[];
/**
 * Array that contains all the fake bombs in the map.
 * DOES NOT WORK IN V2!
 */
export let fakeBombs: any[];
/**
 * Array that contains all the material names used in the map.
 */
export const materialNames: string[] = [];

export let activeInput: string;
export let activeOutput: string;
export let activeLightshow: string;

type InitProperties = {
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
};
/**
 * A boolean variable that indicates whether the map is V2 or V3.
 */
export let V3: boolean;

function JSONtoWalls(wallInput: Record<string, any>[], NJS: number, offset: number): WALL[] {
    const wallArr: WALL[] = [];
    if (V3) {
        wallInput.forEach((w: Record<string, any>) => {
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
        })
    } else {
        wallInput.forEach((w: Record<string, any>) => {
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
    return wallArr;
}

function JSONtoNotes(noteInput: Record<string, any>[], NJS: number, offset: number): NOTE[] {
    const noteArr: NOTE[] = [];
    if (V3) {
        noteInput.forEach((n: Record<string, any>) => {
            noteArr.push(new Note({
                //Vanilla data
                time: n.b,
                x: n.x,
                y: n.y,
                type: n.c,
                direction: n.d
            }, {
                //Custom data
                njs: NJS,
                offset: offset
            }))
        })
    } else {
        noteInput.forEach((n: Record<string, any>) => {
            noteArr.push(new Note({
                //Vanilla data
                time: n._time,
                x: n._lineIndex,
                y: n._lineLayer,
                type: n._type,
                direction: n._cutDirection
            }, {
                //Custom data
                njs: NJS,
                offset: offset
            }))
        })
    }
    return noteArr;
}

function JSONtoChains(chainInput: Record<string, any>[], NJS: number, offset: number): CHAIN[] {
    const chainArr: CHAIN[] = [];
    chainInput.forEach((c: Record<string, any>) => {
        chainArr.push(new Chain({
            time: c.b,
            x: c.x,
            y: c.y,
            color: c.c,
            direction: c.d,
            endTime: c.tb,
            endX: c.tx,
            endY: c.ty,
            segments: c.sc,
            squish: c.s
        }, {
            njs: NJS,
            offset: offset
        }))
    });
    return chainArr;
}

function JSONtoArcs(arcInput: Record<string, any>[], NJS: number, offset: number): ARC[] {
    const arcArr: ARC[] = [];
    arcInput.forEach((c: Record<string, any>) => {
        arcArr.push(new Arc({
            time: c.b,
            x: c.x,
            y: c.y,
            color: c.c,
            direction: c.d,
            multiplier: c.mu,
            endTime: c.tb,
            endX: c.tx,
            endY: c.ty,
            endMultiplier: c.tmu,
            segments: c.sc,
            anchor: c.m
        }, {
            njs: NJS,
            offset: offset
        }))
    });
    return arcArr;
}

function JSONtoLights(lightInput: Record<string, any>[], lightsV3: boolean): LIGHT[] {
    const lightArr: LIGHT[] = [];
    if (lightsV3) {
        lightInput.forEach((l: Record<string, any>) => {
            const light: LIGHT = new LightEvent({
                time: l.b,
                type: l.et,
                value: l.i,
                float: l.f
            })
            if (l.customData) {
                light.data = {
                    color: l.customData.color,
                    lightID: l.customData.lightID,
                    easing: l.customData.easing,
                    lerpType: l.customData.lerpType,
                    lockPosition: l.customData.lockRotation,
                    speed: l.customData.speed,
                    direction: l.customData.direction,
                    nameFilter: l.customData.nameFilter,
                    rotation: l.customData.rotation,
                    step: l.customData.step,
                    prop: l.prop
                }
            }
            lightArr.push(light);
        })
    } else {
        lightInput.forEach((l: Record<string, any>) => {
            const light: LIGHT = new LightEvent({
                time: l._time,
                type: l._type,
                value: l._value,
                float: l._floatValue
            })
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
                }
            }
            lightArr.push(light)
        })
    }
    return lightArr;
}

function JSONtoCustomEvents(eventInput: Record<string, any>[]) {
    const eventArr: CUSTOMEVENT[] = [];
    if (!V3) {
        eventInput.forEach((e: Record<string, any>) => {
            const f = JSON.parse(
                JSON.stringify(e)
                .replace(/"_(\w+)":/g,'"_$1":')
            );
            switch(f.t) {
                case "AnimateTrack":
                    if (!e._data._track) f.data.track = "NULL";
                    if (!e._data._duration) f.data.duration = 1;
                    eventArr.push(new AnimateTrack(f.time, f.data));
                    break;
                case "AssignPathAnimation":
                    if (!e._data._track) f.data.track = "NULL";
                    eventArr.push(new AssignPathAnimation(f.time, f.data));
                    break;
                case "AssignPlayerToTrack":
                    if (!e._data._track) f.data.track = "NULL";
                    eventArr.push(new AssignPlayerToTrack(f.time, f.data.track));
                    break;
                case "AssignTrackParent":
                    eventArr.push(new AssignTrackParent(f.time, f.data))
                    break;
                case "AnimateComponent":
                    if (!e._data._track) f.data.track = "NULL";
                    if (!e._data._duration) f.data.duration = 1;
                    eventArr.push(new AnimateComponent(f.time, f.data))
                    break;
                case "AssignFogTrack":
                    if (!e._data._track) f.data.track = "NULL";
                    eventArr.push(new AssignFogTrack(f.time, f.data.track))
                    break;
            }
        })
    }
    if (V3) {
        eventInput.forEach((e: Record<string, any>) => {
            const f = JSON.parse(
                JSON.stringify(e)
                .replace('"offsetPosition":','"position":')
                .replace('"offsetWorldRotation":','"rotation":')
            );
            switch(f.t) {
                case "AnimateTrack":
                    if (!e.d.track) f.d.track = "NULL";
                    if (!e.d.duration) f.d.duration = 1;
                    eventArr.push(new AnimateTrack(f.b, f.d));
                    break;
                case "AssignPathAnimation":
                    if (!e.d.track) f.d.track = "NULL";
                    eventArr.push(new AssignPathAnimation(f.b, f.d));
                    break;
                case "AssignPlayerToTrack":
                    if (!e.d.track) f.d.track = "NULL";
                    eventArr.push(new AssignPlayerToTrack(f.b, f.d.track));
                    break;
                case "AssignTrackParent":
                    eventArr.push(new AssignTrackParent(f.b, f.d))
                    break;
                case "AnimateComponent":
                    if (!e.d.track) f.d.track = "NULL";
                    if (!e.d.duration) f.d.duration = 1;
                    eventArr.push(new AnimateComponent(f.b, f.d))
                    break;
            }
        })
    }
    return eventArr
}

// TODO Lightshow importer 
function lightshowImport(file: string) {
    let lV3 = false;
    const lightShowDiff = JSON.parse(readFileSync(file, 'utf-8'))
    if (lightShowDiff.version) lV3 = true;
    let localLights: Record<string, any>[];

    if (lV3) localLights = lightShowDiff.basicBeatmapEvents;
    else localLights = lightShowDiff._events;

    lights = JSONtoLights(localLights, lV3);
}
function isV3(diffName: string) {
    const diff = JSON.parse(readFileSync(diffName, 'utf-8'));

    if (typeof diff._version !== 'undefined') V3 = false;
    if (typeof diff.version !== 'undefined') V3 = true;
}
function V3toV2(diff: IV3Map) {
    const v2Diff: IV2Map = {
        _version: "2.2.0",
        _notes: [],
        _obstacles: [],
        _events: [],
        _waypoints: [],
        _customData: {
            _bookmarks: [],
            _customEvents: [],
            _environment: [],
            _pointDefinitions: [],
            _materials: {}
        }
    }
    diff.colorNotes.forEach(n => {
        const note = {
            _time: n.b,
            _lineIndex: n.x,
            _lineLayer: n.y,
            _type: n.c,
            _cutDirection: n.d,
            _customData: {}
        };
        v2Diff._notes.push(note)
    });
    diff.bombNotes.forEach(n => {
        const bomb = {
            _time: n.b,
            _lineIndex: n.x,
            _lineLayer: n.y,
            _type: 3,
            _cutDirection: 0,
            _customData: {}
        };
        v2Diff._notes.push(bomb)
    });
    diff.obstacles.forEach(w => {
        let wallType = 0;
        if (w.y > 0) wallType = 1;
        const wall = {
            _time: w.b,
            _lineIndex: w.x,
            _type: wallType,
            _duration: w.d,
            _width: w.w,
            _customData: {}
        };
        v2Diff._obstacles.push(wall)
    });
    diff.basicBeatmapEvents.forEach(l => {
        let floatValue = 1.0;
        if (l.f) floatValue = l.f;
        const light = {
            _time: l.b,
            _type: l.et,
            _value: l.i,
            _floatValue: floatValue,
            _customData: {}
        };
        v2Diff._obstacles.push(light)
    });
    if (diff.customData) {
        const d = diff.customData;
        if (d.customEvents) {
            d.customEvents.forEach(e => {
                let strEvent = JSON.stringify(e);
                strEvent = strEvent
                    .replace('"b":', '"time":')
                    .replace('"t":', '"type":')
                    .replace('"d":', '"data":')
                    .replace('"offsetPosition":', '"position":')
                    .replace('"offsetWorldRotation":', '"rotation":')
                    .replace(/"(\w+)":/g, '"_$1":')
                v2Diff._customData._customEvents.push(JSON.parse(strEvent))
            })
        }
        if (d.environment) {
            d.environment.forEach(e => {
                let strEnv = JSON.stringify(e);
                strEnv = strEnv.replace(/"(\w+)":/g, '"_$1":')
                v2Diff._customData._environment.push(JSON.parse(strEnv))
            })
        }
    }
    return v2Diff;
}
/**
 * @param input The input file for the difficulty.
 * @param output The output file for the difficulty.
 * @param properties The additional properties such as NJS and offset.
 * ```ts
 * const diff = Map.initialize(INPUT, OUTPUT, {
 *     njs: 18,
 *     offset: 0
 * });
 */
export function initialize(input: string, output: string, properties: InitProperties): Record<string, any> {
    for (let i = 0; i <= 100; i++) {
        console.log("")
    }
    infoFile._difficultyBeatmapSets.forEach((x: any) => {
        if (Object.keys(x).includes('_beatmapCharacteristicName')) {
            x._difficultyBeatmaps.forEach((y: any) => {
                if (y._beatmapFilename.includes(output)) {
                    if (!y._customData)
                        y._customData = {};

                    y._customData._suggestions = undefined;
                    y._customData._requirements = undefined;
                }
            });
        }
    });
    writeFileSync("Info.dat", JSON.stringify(infoFile, null, 4));
    console.time('HeckLib ran in')
    const p = properties;
    const NJS = p.njs;
    const offset = p.offset;
    if (p.lightshow) {
        lights.length = 0;
        lightshowImport(`./${p.lightshow}`)
    }
    const info = infoFile;
    let translate = false;
    isV3(`./${input}`);
    if (properties.format) {
        translate = true;
        switch (properties.format) {
            case "V2":
                V3 = false;
                break;
            case "V3":
                V3 = true;
                break;
        }
    }
    let diff = JSON.parse(readFileSync(`./${input}`, 'utf-8'));
    if (translate) {
        if (properties.format == "V2") diff = V3toV2(diff);
    }
    infoFile._difficultyBeatmapSets.forEach((x: any) => {
        x._difficultyBeatmaps.forEach((y: any) => {
            if (y._settings) delete (y._settings)
            if (y._requirements) delete (y._requirements)
            if (y._suggestions) delete (y._suggestions)
        })
    });
    writeFileSync('Info.dat', JSON.stringify(infoFile, null, 4))
    activeInput = input;
    activeOutput = output;

    if (info._difficultyBeatmapSets) {
        info._difficultyBeatmapSets.forEach((x: any) => {
            if (JSON.stringify(x).includes(output)) {
                x._difficultyBeatmaps.forEach((y: any) => {
                    if (JSON.stringify(y).includes(output)) {
                        y._customData = {};
                    }
                })
            }
        })
    }

    if (!V3) {
        notes = JSONtoNotes(diff._notes, NJS, offset);
        walls = JSONtoWalls(diff._obstacles, NJS, offset);
        if (!p.lightshow) lights = JSONtoLights(diff._events, V3);

        if (!diff._customData) {
            diff._customData = {};
        }

        const customData = diff._customData;

        if (!customData._customEvents) customData._customEvents = [];
        else JSONtoCustomEvents(diff._customData._customEvents);
        if (!customData._pointDefinitions) customData._pointDefinitions = [];
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
        bombs = diff.bombNotes;
        if (!p.lightshow) lights = JSONtoLights(diff.basicBeatmapEvents, V3);

        if (!diff.customData) {
            diff.customData = {};
        }
        if (!diff.customData.fakeColorNotes) {
            diff.customData.fakeColorNotes = [];
        } else JSONtoCustomEvents(diff.customData.customEvents)
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
        if (!customData.pointDefinitions) customData.pointDefinitions = [];
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