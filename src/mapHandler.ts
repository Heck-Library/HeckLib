// deno-lint-ignore-file no-explicit-any no-namespace

import { infoFile } from "./info.ts";
import { LightEvent } from "./lights.ts";
import { Note, Wall } from "./objects.ts";
import { anyAnimation, CUSTOMEVENT, FinalizeProperties, InitProperties, LIGHT, NOTE, POINTDEFINITION, WALL } from "./types.ts";

export const pointDefinitions = ["NULL"];

export let environment: any[];
export let notes: NOTE[];
export let bombs: any[];
export let walls: WALL[];
export let events: CUSTOMEVENT[];
export let materials: any = {};
export let geometry: any[];
export const definitions: POINTDEFINITION[] = [];
export let lights: LIGHT[] = [];
export let fakeNotes: any[];
export let fakeWalls: any[];
export let fakeBombs: any[];
export const materialNames: string[] = [];

export let activeInput: string;
export let activeOutput: string;
export let activeLightshow: string;
export let V3: boolean;

let formatting = false

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
            lightArr.push();
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


function wallsToJSON(): Record<string, any> {
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
        if (V3 && Object.keys(wallJSON.customData).includes("fake")) {
            delete wallJSON.customData.fake;
            delete walls[walls.indexOf(w)];
            fakeWalls.push(wallJSON)
        } else {
            wallArr.push(wallJSON);
        }
    });
    return wallArr;
}

function notesToJSON(): Record<string, any> {
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

function customEventsToJSON(): Record<string, any> {
    const eventArr: any[] = []
    events.forEach((e: CUSTOMEVENT) => {
        const eventJSON: Record<string, any> = {
            b: e.time,
            t: e.type,
            d: e.data
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

function lightsToJSON(): Record<string, any> {
    const lightArr: Record<string, any>[] = [];
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

type JSONDefV2 = {_name: string, _points: anyAnimation};
type JSONDefV3 = Record<string, anyAnimation>;
function pointDefinitionsToJSON(): Record<string, JSONDefV3>|JSONDefV2[] {
    if (V3) {
        const defCollection: Record<string, JSONDefV3> = {};
        definitions.forEach((d: POINTDEFINITION) => {
            const definition = {[d.name]: d.points}
            Object.assign(defCollection, definition);
        })
        return defCollection;
    }
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
        const d = JSON.parse(Deno.readTextFileSync(activeInput));
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
        const lightShowDiff = JSON.parse(Deno.readTextFileSync(file))
        if (lightShowDiff.version) lV3 = true;
        let localLights: Record<string, any>[];

        if (lV3) localLights = lightShowDiff.basicBeatmapEvents;
        else localLights = lightShowDiff._events;

        lights = JSONtoLights(localLights, lV3);
    }
    function isV3(diffName: string) {
        const diff = JSON.parse(Deno.readTextFileSync(diffName));

        if (typeof diff._version !== 'undefined') V3 = false;
        if (typeof diff.version !== 'undefined') V3 = true;
    }
    /**
     * @param input The input file for the difficulty.
     * @param output The output file for the difficulty.
     * @param properties The additional properties such as NJS and offset.
     */
    export function initialize(input: string, output: string, properties: InitProperties): Record<string, any> {
        console.time('HeckLib ran in')
        const p = properties;
        const NJS = p.njs;
        const offset = p.offset;
        if (typeof p.lightshow == 'string') {
            lights.length = 0;
            lightshowImport(`./${p.lightshow}`)
        }
        const info = infoFile;
        isV3(`./${input}`);
        const diff = JSON.parse(Deno.readTextFileSync(`./${input}`));
        infoFile._difficultyBeatmapSets.forEach((x: any) => {
            x._difficultyBeatmaps.forEach((y: any) => {
                if (y._settings) delete(y._settings)
                if (y._requirements) delete(y._requirements)
                if (y._suggestions) delete(y._suggestions)
            })
        });
        Deno.writeTextFileSync('Info.dat', JSON.stringify(infoFile, null, 4))
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
            if (!p.lightshow) lights = diff._events;
            
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
            if (!p.lightshow) lights = diff.basicBeatmapEvents;
            
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
            fakeBombs = customData.fakeBombNotes
        }
        return diff;
    }
    
    /**
     * @param difficulty The difficulty that the map should be written to.
     */
    export function finalize(difficulty: any, properties?: FinalizeProperties): void {
        const precision = 4; // decimals to round to  --- use this for better wall precision or to try and decrease JSON file size
        if (properties && properties.formatting) formatting = true;
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
            difficulty._notes = notesToJSON();
            difficulty._obstacles = wallsToJSON();
            difficulty._events = lightsToJSON();
            difficulty._customData._customEvents = customEventsToJSON();
            difficulty._customData._pointDefinitions = pointDefinitionsToJSON();
            difficulty._notes.sort((a: { _time: number; _lineIndex: number; _lineLayer: number; }, b: { _time: number; _lineIndex: number; _lineLayer: number; }) => (Math.round((a._time + Number.EPSILON) * sortP) / sortP) - (Math.round((b._time + Number.EPSILON) * sortP) / sortP) || (Math.round((a._lineIndex + Number.EPSILON) * sortP) / sortP) - (Math.round((b._lineIndex + Number.EPSILON) * sortP) / sortP) || (Math.round((a._lineLayer + Number.EPSILON) * sortP) / sortP) - (Math.round((b._lineLayer + Number.EPSILON) * sortP) / sortP));
            difficulty._obstacles.sort((a: any, b: any) => a._time - b._time);
            difficulty._events.sort((a: any, b: any) => a._time - b._time);

            if (difficulty._customData._materials.length < 1) {
                delete(difficulty._customData._materials)
            }
            let outputtedDiff = JSON.stringify(difficulty)
            if (formatting == true) {
                outputtedDiff = JSON.stringify(difficulty, null, 4)
            }
            Deno.writeTextFileSync(activeOutput, outputtedDiff)
        }
        if (V3) {
            difficulty.colorNotes = notesToJSON();
            difficulty.obstacles = wallsToJSON();
            difficulty.basicBeatmapEvents = lightsToJSON();
            difficulty.customData.customEvents = customEventsToJSON();
            difficulty.customData.pointDefinitions = pointDefinitionsToJSON();
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
            
            Deno.writeTextFileSync(activeOutput, outputtedDiff)
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