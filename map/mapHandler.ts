// deno-lint-ignore-file no-explicit-any
import { readFileSync, writeFileSync } from "fs";
import { CUSTOMEVENT, POINTDEFINITION } from "../consts/types/animation";
import { NOTE, WALL, customNoteData, lineIndex, lineLayer, noteDir, noteType } from "../consts/types/objects";
import { unknownAnimation } from "../consts/types/vec";
import Note from "../objects/note";
import Wall from "../objects/wall";
import LightEvent from "../objects/lights";
import { LIGHT } from "../consts/types/lights/light";
import { infoFile } from "../consts/info";

export const pointDefinitions = ["NULL"];

export let environment: any[];
/**
 * Array that contains all the notes in the map.
 */
export let notes: NOTE[];
/**
 * Array that contains all the bombs in the map.
 * DOES NOT WORK WITH V2!
 */
export let bombs: any[];
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
/**
 * A boolean variable that indicates whether the map is V2 or V3.
 */
export let V3: boolean;

let formatting = false
type V2JsonNote = {
    _time: number;
    _lineIndex: lineIndex;
    _lineLayer: lineLayer;
    _type: noteType;
    _cutDirection: noteDir;
    _customData?: customNoteData;
};

type V2DIFF = {
    _version: "2.2.0";
    _notes: V2JsonNote[];
    _obstacles: Record<string, unknown>[];
    _events: Record<string, unknown>[];
    _waypoints: Record<string, unknown>[];
    _customData: {
        _time?: number;
        _environment: Record<string, unknown>[];
        _customEvents: Record<string, unknown>[];
        _bookmarks: Record<string, unknown>[];
        _pointDefinitions: Record<string, unknown>[];
        _materials: Record<string, any>;
    };
};
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
};
type FinalizeProperties = {
    translateToV3?: boolean;
    translateToV2?: boolean;
    /**
     * Formats and indents the file.
     * SIGNIFICANTLY INCREASES FILESIZE, DISABLE BEFORE FINAL RUN
     */
    formatting?: boolean;
    /**
     * showVanillaStats is VERY performance heavy and will slow down your script
     */
    showVanillaStats?: {
        notes?: boolean;
        walls?: boolean;
        bombs?: boolean;
        lights?: boolean;
    };
    /**
     * showModdedStats is VERY performance heavy and will slow down your script
     */
    showModdedStats?: {
        notes?: boolean;
        walls?: boolean;
        bombs?: boolean;
        lights?: boolean;
        customEvents?: boolean;
        pointDefinitions?: boolean;
        showEnvironmentStats?: boolean;
    };
};

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


function wallsToJSON(): Record<string, any>[] {
    const wallArr: any[] = [];
    walls.forEach((w: WALL) => {
        let wallJSON: Record<string, any> = {
            b: w.time,
            x: w.x,
            y: w.y,
            d: w.duration,
            w: w.width,
            h: w.height,
            customData: {
                ...w.data,
                animation: {
                    ...w.anim
                }
            }
        }
        if (Object.keys(wallJSON.customData.animation).length < 1) delete wallJSON.customData.animation;
        if (Object.keys(wallJSON.customData).length < 1) delete wallJSON.customData;
        let stringified = JSON.stringify(wallJSON)
            .replace('"njs"', '"noteJumpMovementSpeed"')
            .replace('"offset"', '"noteJumpStartBeatOffset"')
        if (V3) {
            stringified = stringified
                .replace('"position"', '"coordinates"')
                .replace('"rotation"', '"worldRotation"')
                .replace('"interactable":false', '"uninteractable":true')
                .replace('"disableSpawnEffect":true', '"spawnEffect":false')
        } else {
            stringified = stringified
                .replace('"b":', '"time":')
                .replace('"x":', '"lineIndex":')
                .replace(/"y":(\d)/, '"type":$1')
                .replace('"d":', '"duration":')
                .replace('"w":', '"width":')
                .replace(/"h":\d+,/, '')
                .replace(/"([^_][\w\d]+)":/g, '"_$1":')
        }
        wallJSON = JSON.parse(stringified);
        if (V3 && wallJSON.customData && Object.keys(wallJSON.customData).includes("fake")) {
            delete wallJSON.customData.fake;
            delete walls[walls.indexOf(w)];
            fakeWalls.push(wallJSON)
        } else {
            wallArr.push(wallJSON);
        }
    });
    return wallArr;
}

function notesToJSON(): V2JsonNote[] {
    const noteArr: any[] = []
    notes.forEach((n: NOTE) => {
        let noteJSON: Record<string, any> = {
            b: n.time,
            c: n.type,
            d: n.direction,
            x: n.x,
            y: n.y,
            customData: {
                ...n.data,
                animation: {
                    ...n.anim
                }
            }
        }
        if (Object.keys(noteJSON.customData.animation).length < 1) delete noteJSON.customData.animation;
        if (Object.keys(noteJSON.customData).length < 1) delete noteJSON.customData
        let stringified = JSON.stringify(noteJSON)
            .replace('"njs"', '"noteJumpMovementSpeed"')
            .replace('"offset"', '"noteJumpStartBeatOffset"')
        if (V3) {
            stringified = stringified
                .replace('"position"', '"coordinates"')
                .replace('"rotation"', '"worldRotation"')
                .replace('"interactable":false', '"uninteractable":true')
                .replace('"disableSpawnEffect":true', '"spawnEffect":false')
        } else {
            stringified = stringified
                .replace('"b":', '"time":')
                .replace('"c":', '"type":')
                .replace('"d":', '"cutDirection":')
                .replace('"x":', '"lineIndex":')
                .replace('"y":', '"lineLayer":')
                .replace(/"([^_][\w\d]+)":/g, '"_$1":')
        }
        noteJSON = JSON.parse(stringified)
        if (V3 && noteJSON.customData && Object.keys(noteJSON.customData).includes("fake")) {
            delete noteJSON.customData.fake;
            fakeNotes.push(noteJSON)
        } else noteArr.push(noteJSON)
    })
    return noteArr
}

function customEventsToJSON(): Record<string, any>[] {
    const eventArr: any[] = []
    events.forEach((e: CUSTOMEVENT) => {
        const eventJSON: Record<string, any> = {
            b: e.json.time,
            t: e.json.type,
            d: e.json.data
        }
        let stringified = JSON.stringify(eventJSON)
        if (!V3) {
            stringified = stringified
                .replace('"b":', '"time":')
                .replace('"t":', '"type":')
                .replace('"d":', '"data":')
                .replace(/"([^_][\w\d]+)":/g, '"_$1":')
        }
        eventArr.push(JSON.parse(stringified))
    });
    return eventArr;
}

function lightsToJSON(): Record<string, any>[] {
    const lightArr: any[] = [];
    lights.forEach((l: LIGHT) => {
        const lightJSON: Record<string, any> = {
            b: l.time,
            et: l.type,
            i: l.value,
        }
        if (l.float) lightJSON.f = l.float;
        if (l.data && Object.keys(l.data).length > 0) lightJSON.customData = l.data
        let stringified = JSON.stringify(lightJSON);
        if (!V3) {
            stringified = stringified
                .replace('"b":', '"time":')
                .replace('"et":', '"type":')
                .replace('"i":', '"value":')
                .replace('"f":', '"floatValue":')
                .replace('"lockRotation":', '"lockPosition":')
                .replace(/"([^_][\w\d]+)":/g, '"_$1":')
        }
        lightArr.push(JSON.parse(stringified));
    })
    return lightArr;
}

type JSONDefV2 = {_name: string, _points: unknownAnimation};
type JSONDefV3 = Record<string, unknownAnimation>;
function pointDefinitionsToV3JSON(): Record<string, JSONDefV3> {
    const defCollection: Record<string, JSONDefV3> = {};
    definitions.forEach((d: POINTDEFINITION) => {
        const definition = {[d.name]: d.points}
        Object.assign(defCollection, definition);
    })
    return defCollection;
}

function pointDefinitionsToV2JSON(): JSONDefV2[] {
    const defArr: JSONDefV2[] = [];
    definitions.forEach((d: POINTDEFINITION) => {
        defArr.push({_name: d.name, _points: d.points});
    })
    return defArr;
}

type statsType = {
    moddedStats: {
        notes: number,
        fakeNotes: number,
        walls: number,
        fakeWalls: number,
        bombs: number,
        fakeBombs: number,
        lights: number,
        customEvents: {
            animTrack: number,
            pathAnim: number,
            trackParent: number,
            playerTrack: number,
            fogTrack: number
        },
        pointDefinitions: number,
        environments: number
    },
    vanillaStats: {
        notes: number,
        walls: number,
        bombs: number,
        lights: number
    }
};

function showStats(properties?: FinalizeProperties): statsType {
    const vs = {
        notes: 0,
        walls: 0,
        bombs: 0,
        lights: 0
    };
    const ms = {
        notes: 0,
        fakeNotes: 0,
        walls: 0,
        fakeWalls: 0,
        bombs: 0,
        fakeBombs: 0,
        lights: 0,
        customEvents: {
            animTrack: 0,
            pathAnim: 0,
            trackParent: 0,
            playerTrack: 0,
            fogTrack: 0
        },
        pointDefinitions: 0,
        environments: 0
    }
    if (!properties) return {
        moddedStats: ms,
        vanillaStats: vs
    };
    const p = properties;
    if (p.showModdedStats) {
        const s = p.showModdedStats;
        if (s.notes) {
            if (V3) {
                ms.notes = notes.length;
                ms.fakeNotes = fakeNotes.length;
            } else {
                notes.forEach((n: NOTE) => {
                    if (n.data.fake) ms.fakeNotes++
                    else ms.notes++
                })
            }
        }
        if (s.walls) {
            if (V3) {
                ms.walls = walls.length;
                ms.fakeWalls = fakeWalls.length;
            } else {
                walls.forEach((w: WALL) => {
                    if (w.data.fake) ms.fakeWalls++;
                    else ms.walls++;
                })
            }
        }
        if (s.bombs) {
            if (V3) {
                ms.bombs = bombs.length;
                ms.fakeBombs = fakeBombs.length;
            } else {
                bombs.forEach((n: NOTE) => {
                    if (n.data.fake) ms.fakeBombs++;
                    else ms.bombs++;
                })
            }
        }
        if (s.lights) ms.lights = lights.length;
        if (s.customEvents) {
            events.forEach((e: Record<string, any>) => {
                switch (e.type) {
                    case "AnimateTrack":
                        ms.customEvents.animTrack++;
                        break;
                    case "AssignPathAnimation":
                        ms.customEvents.pathAnim++;
                        break;
                    case "AssignTrackParent":
                        ms.customEvents.trackParent++;
                        break;
                    case "AssignPlayerToTrack":
                        ms.customEvents.playerTrack++;
                        break;
                    case "AssignFogTrack":
                        ms.customEvents.fogTrack++;
                        break;
                }
            });
        }
        if (s.pointDefinitions) ms.pointDefinitions = definitions.length;
        if (s.showEnvironmentStats) ms.environments = environment.length;
    }
    if (p.showVanillaStats) {
        const s = p.showVanillaStats;
        const d = JSON.parse(readFileSync(activeInput, 'utf-8'));
        if (V3) {
            if (s.notes) vs.notes = d.colorNotes.length;
            if (s.bombs) vs.bombs = d.bombNotes.length;
            if (s.lights) vs.lights = d.basicBeatmapEvents.length;
            if (s.walls) vs.walls = d.obstacles.length;
        }
    }
    return {
        moddedStats: ms,
        vanillaStats: vs
    };
}

export namespace Map {
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
        for(let i = 0; i <= 100; i++) {
            console.log("")
        }
        infoFile._difficultyBeatmapSets.forEach((x : any) => {
            if (Object.keys(x).includes('_beatmapCharacteristicName')) {
                x._difficultyBeatmaps.forEach((y : any) => {
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
        isV3(`./${input}`);
        const diff = JSON.parse(readFileSync(`./${input}`, 'utf-8'));
        infoFile._difficultyBeatmapSets.forEach((x: any) => {
            x._difficultyBeatmaps.forEach((y: any) => {
                if (y._settings) delete(y._settings)
                if (y._requirements) delete(y._requirements)
                if (y._suggestions) delete(y._suggestions)
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

            customData._customEvents = [];
            customData._pointDefinitions = [];
            customData._environment = [];
            customData._materials = {};
        
            events = diff._customData._customEvents;
            environment = customData._environment;
            materials = customData._materials;
        }
        else if (V3) {
            notes = JSONtoNotes(diff.colorNotes, NJS, offset);
            walls = JSONtoWalls(diff.obstacles, NJS, offset);
            bombs = diff.bombNotes;
            if (!p.lightshow) lights = JSONtoLights(diff.basicBeatmapEvents, V3);
            
            if (!diff.customData) {
                diff.customData = {};
            }
            if (!diff.customData.fakeColorNotes) {
                diff.customData.fakeColorNotes = [];
            }
            if (!diff.customData.fakeObstacles) {
                diff.customData.fakeObstacles = [];
            }
            if (!diff.customData.fakeBombNotes) {
                diff.customData.fakeBombNotes = [];
            }
        
            const customData = diff.customData;

            customData.customEvents = [];
            customData.pointDefinitions = {};
            customData.environment = [];
            customData.materials = {};
        
            //(output, JSON.stringify(diff, null, 4));
        
            events = diff.customData.customEvents;
            environment = customData.environment;
            materials = customData.materials;
            fakeNotes = customData.fakeColorNotes;
            fakeWalls = customData.fakeObstacles;
            fakeBombs = customData.fakeBombNotes;
        }
        return diff;
    }
    
    /**
     * @param difficulty The difficulty that the map should be written to.
     * @param properties Miscellaneous properties for the script, such as how it's exported.
     * Map.finalize(difficulty, {
     *     formatting: true,
     *     showModdedStats: {
     *         customEvents: true,
     *         notes: true,
     *         lights: true,
     *         pointDefinitions: true,
     *         walls: true
     *     }
     * });
     */
    export function finalize(difficulty: any, properties?: FinalizeProperties): void {
        const precision = 4; // decimals to round to  --- use this for better wall precision or to try and decrease JSON file size
        if (properties) {
            const p = properties;
            if (p.formatting) formatting = true;
            if (p.translateToV3) {
                V3 = true;
            }
            if (p.translateToV2) {
                V3 = false;
            }
        }
        const jsonP = Math.pow(10, precision);
        const sortP = Math.pow(10, 2);
        function deeperDaddy(obj: any) {
            if (obj) 
                for (const key in obj) {
                    if (obj[key] == null) {
                        delete obj[key];
                    } else if (typeof obj[key] === "object" || Array.isArray(obj[key])) {
                        deeperDaddy(obj[key]);
                    } else if (typeof obj[key] == "number") {
                        obj[key] = (Math.round((obj[key] + Number.EPSILON) * jsonP) / jsonP);
                    }
                }
            
        }
        deeperDaddy(difficulty)

        if (!V3) {
            const newDiff: V2DIFF = {
                _version: "2.2.0",
                _notes: notesToJSON(),
                _obstacles: wallsToJSON(),
                _events: lightsToJSON(),
                _waypoints: [],
                _customData: {
                    _bookmarks: [],
                    _customEvents: customEventsToJSON(),
                    _environment: [],
                    _pointDefinitions: pointDefinitionsToV2JSON(),
                    _materials: {}
                }
            }
            newDiff._notes.sort((a: { _time: number; _lineIndex: number; _lineLayer: number; }, b: { _time: number; _lineIndex: number; _lineLayer: number; }) => (Math.round((a._time + Number.EPSILON) * sortP) / sortP) - (Math.round((b._time + Number.EPSILON) * sortP) / sortP) || (Math.round((a._lineIndex + Number.EPSILON) * sortP) / sortP) - (Math.round((b._lineIndex + Number.EPSILON) * sortP) / sortP) || (Math.round((a._lineLayer + Number.EPSILON) * sortP) / sortP) - (Math.round((b._lineLayer + Number.EPSILON) * sortP) / sortP));
            newDiff._obstacles.sort((a: any, b: any) => a._time - b._time);
            newDiff._events.sort((a: any, b: any) => a._time - b._time);

            if (newDiff._customData._materials.length < 1) {
                delete(difficulty._customData._materials)
            }
            let outputtedDiff = JSON.stringify(newDiff)
            if (formatting == true) {
                outputtedDiff = JSON.stringify(newDiff, null, 4)
            }
            writeFileSync(activeOutput, outputtedDiff)
        }
        if (V3) {
            difficulty.colorNotes = notesToJSON();
            difficulty.obstacles = wallsToJSON();
            difficulty.basicBeatmapEvents = lightsToJSON();
            difficulty.customData.customEvents = customEventsToJSON();
            difficulty.customData.pointDefinitions = pointDefinitionsToV3JSON();
            difficulty.colorNotes.sort((a: { b: number; x: number; y: number; }, b: { b: number; x: number; y: number; }) => (Math.round((a.b + Number.EPSILON) * sortP) / sortP) - (Math.round((b.b + Number.EPSILON) * sortP) / sortP) || (Math.round((a.x + Number.EPSILON) * sortP) / sortP) - (Math.round((b.x + Number.EPSILON) * sortP) / sortP) || (Math.round((a.y + Number.EPSILON) * sortP) / sortP) - (Math.round((b.y + Number.EPSILON) * sortP) / sortP));
            difficulty.obstacles.sort((a: any, b: any) => a.b - b.b);
            difficulty.basicBeatmapEvents.sort((a: any, b: any) => a.b - b.b);
            if (difficulty.customData.materials && Object.keys(difficulty.customData.materials).length < 1) {
                delete difficulty.customData.materials
            }

            let outputtedDiff = JSON.stringify(difficulty)
            if (formatting == true) {
                outputtedDiff = JSON.stringify(difficulty, null, 4)
            }
            
            writeFileSync(activeOutput, outputtedDiff)
        }

        const stats = showStats(properties);
        const ms = stats.moddedStats;
        const vs = stats.vanillaStats;

        console.log(" \x1b[5m\x1b[35m\x1b[1m __  __                 __      \x1b[37m__           __        ")
        console.log(" \x1b[35m/\\ \\/\\ \\               /\\ \\  _ \x1b[37m/\\ \\       __/\\ \\       ")
        console.log(" \x1b[35m\\ \\ \\_\\ \\     __    ___\\ \\ \\/ \\\x1b[37m\\ \\ \\     /\\_\\ \\ \\____  ")
        console.log(" \x1b[35m \\ \\  _  \\  / __ \\ / ___\\ \\   < \x1b[37m\\ \\ \\    \\/\\ \\ \\  __ \\ ")
        console.log(" \x1b[35m  \\ \\ \\ \\ \\/\\  __//\\ \\__/\\ \\ \\\\ \\\x1b[37m\\ \\ \\____\\ \\ \\ \\ \\_\\ \\")
        console.log(" \x1b[35m   \\ \\_\\ \\_\\ \\____\\ \\____\\\\ \\_\\ \\_\x1b[37m\\ \\____/ \\ \\_\\ \\____/")
        console.log(" \x1b[35m    \\/_/\\/_/\\/____/\\/____/ \\/_/\\/_/\x1b[37m\\/___/   \\/_/\\/___/ ")
        console.log(" \x1b[0m ")
        console.log(" ======================================================= \n")
        if (properties?.showVanillaStats) console.log(" \x1b[36m\x1b[1m\x1b[4m" + "=== VANILLA MAP INFO ===" + "\x1b[0m" +
            "\n\n Notes: \x1b[32m\x1b[1m" + vs.notes + 
            "\x1b[0m\n Bombs: \x1b[32m\x1b[1m" + vs.bombs + 
            "\x1b[0m\n Walls: \x1b[32m\x1b[1m" + vs.walls + "\x1b[0m\n\n")
        if (properties?.showModdedStats) console.log(" \x1b[36m\x1b[1m\x1b[4m" + "=== MODDED MAP INFO ===" +
            "\x1b[0m" + "\n\n Notes: \x1b[32m\x1b[1m" + ms.notes +
            "\x1b[0m\n" + " Fake Notes: \x1b[32m\x1b[1m" + ms.fakeNotes +
            "\x1b[0m\n Walls: \x1b[32m\x1b[1m" + ms.walls + 
            "\x1b[0m\n Fake Walls: \x1b[32m\x1b[1m" + ms.fakeWalls + 
            "\x1b[0m\n" + " Lights: \x1b[32m\x1b[1m" + ms.lights + "\x1b[0m\n\n")
        if (properties?.showModdedStats?.customEvents) console.log(" \x1b[36m\x1b[1m\x1b[4m" + "=== CUSTOM EVENTS INFO ===" + "\x1b[0m" +
            "\n\n AnimateTracks: \x1b[32m\x1b[1m" + ms.customEvents.animTrack +
            "\x1b[0m\n AssignPathAnimations: \x1b[32m\x1b[1m" + ms.customEvents.pathAnim +
            "\x1b[0m\n AssignTrackParents: \x1b[32m\x1b[1m" + ms.customEvents.trackParent +
            "\x1b[0m\n AssignPlayerToTracks: \x1b[32m\x1b[1m" + ms.customEvents.playerTrack +
            "\x1b[0m\n AssignFogTracks: \x1b[32m\x1b[1m" + ms.customEvents.fogTrack +
            "\x1b[0m\n PointDefinitions: \x1b[32m\x1b[1m" + ms.pointDefinitions +
            "\x1b[0m\n\n");
        if (properties?.showModdedStats?.showEnvironmentStats) console.log(" \x1b[36m\x1b[1m\x1b[4m" + "=== ENVIRONMENT INFO ===" + "\x1b[0m" +
            "\n\n Environment Objects: \x1b[32m\x1b[1m" + environment.length + "\x1b[0m\n\n")
        console.timeEnd('HeckLib ran in')
    }
}