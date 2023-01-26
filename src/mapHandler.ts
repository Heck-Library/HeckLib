// deno-lint-ignore-file no-explicit-any no-namespace

import { infoFile } from "./info.ts";
import { Wall } from "./main.ts";
import { Note } from "./objects.ts";
import { CUSTOMEVENT, InitProperties, NOTE, WALL } from "./types.ts";

export const pointDefinitions = ["NULL"];

export let environment: any[];
export let notes: any[];
export let bombs: any[];
export let walls: any[];
export let events: any[];
export let materials: any = {};
export let geometry: any[];
export let definitions: any[];
export let lights: any[];
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


function wallsToJSON() {
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
        if (Object.keys(wallJSON.customData.animation).length < 1) delete wallJSON.customData.animation;
        if (Object.keys(wallJSON.customData).length < 1) delete wallJSON.customData;
        else if (Object.keys(wallJSON.customData).includes("fake")) {
            delete wallJSON.customData.fake;
            fakeWalls.push(wallJSON);
        } else wallArr.push(wallJSON)
    });
    return wallArr;
}

function notesToJSON() {
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

function customEventsToJSON() {
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

export namespace Map {
    function lightshow(file: string) {
        if (lights.length < 1) lights.length = 0;
        const lightShowDiff = JSON.parse(Deno.readTextFileSync(file))
        console.log(lightShowDiff)
    }
    /**
     * @summary Toggles ouput file formatting
     * @param enabled If true, the output difficulty will be JSON formatted.
     * @example Map.formatFile(true)
     */
    function formatFile(enabled: boolean) {
        if (enabled) {
            formatting = true;
        } else {
            formatting = false;
        }
    }
    /**
     * @param input The input file for the difficulty.
     * @param output The output file for the difficulty.
     * @param NJS The NJS of the new difficulty. 
     * @param offset The offset of the new difficulty.
     */
    function isV3(diffName: string) {
        const diff = JSON.parse(Deno.readTextFileSync(diffName));

        if (typeof diff._version !== 'undefined') V3 = false;
        if (typeof diff.version !== 'undefined') V3 = true;
    }
    export function initialize(input: string, output: string, properties: InitProperties) {
        console.time('HeckLib ran in')
        const p = properties;
        const NJS = p.njs;
        const offset = p.offset;
        if (p.formatting) formatFile(true);
        if (typeof p.lightshow == 'string') lightshow(`./${p.lightshow}`)
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

        const goofyAHhNotes: any[] = [];
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
            lights = diff._events;
            
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
            definitions = diff._customData._pointDefinitions;
            materials = customData._materials;
        }
        else if (V3) {
            notes = JSONtoNotes(diff.colorNotes, NJS, offset);
            walls = JSONtoWalls(diff.obstacles, NJS, offset);
            bombs = diff.bombNotes;
            lights = diff.basicBeatmapEvents;
            
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
            definitions = diff.customData.pointDefinitions;
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
    export function finalize(difficulty: any) {
        const precision = 4; // decimals to round to  --- use this for better wall precision or to try and decrease JSON file size
    
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
    
        //#region declare counters
        let vanilla:any;
        let modded:any;
        let AT = 0;
        let PA = 0;
        let TP = 0;
        let PT = 0;
        let fakes = 0;
        let NotesCount = [0, 0];
        let WallsCount = [0, 0];
        //#endregion

        if (!V3) {
            difficulty._notes = notesToJSON();
            difficulty._obstacles = wallsToJSON();
            difficulty._customData._customEvents = customEventsToJSON();
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
        
            vanilla = JSON.parse(Deno.readTextFileSync(activeInput));
            modded = JSON.parse(Deno.readTextFileSync(activeOutput))
        
            modded._customData._customEvents.forEach((e: any) => {
                switch (e._type) {
                    case "AnimateTrack":
                        AT++;
                        break;
                    case "AssignPathAnimation":
                        PA++;
                        break;
                    case "AssignTrackParent":
                        TP++;
                        break;
                    case "AssignPlayerToTrack":
                        PT++;
                        break;
                }
            });
        
            modded._notes.forEach((n: any) => {
                if (n._customData && n._customData._fake) fakes++;
            });
            WallsCount = [ vanilla._obstacles.length, modded._obstacles.length ];
            NotesCount = [ vanilla._notes.length, modded._notes.length - fakes];
        }
        if (V3) {
            difficulty.colorNotes = notesToJSON();
            difficulty.obstacles = wallsToJSON();
            difficulty.customData.customEvents = customEventsToJSON();
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
        
            vanilla = JSON.parse(Deno.readTextFileSync(activeInput));
            modded = JSON.parse(Deno.readTextFileSync(activeOutput))
        
            modded.customData.customEvents.forEach((e: any) => {
                switch (e.type) {
                    case "AnimateTrack":
                        AT++;
                        break;
                    case "AssignPathAnimation":
                        PA++;
                        break;
                    case "AssignTrackParent":
                        TP++;
                        break;
                    case "AssignPlayerToTrack":
                        PT++;
                        break;
                }
            });
            WallsCount = [ vanilla.obstacles.length, modded.obstacles.length ];
            NotesCount = [ vanilla.colorNotes.length, modded.colorNotes.length ];
            fakes = modded.customData.fakeColorNotes.length;
        }


        
        

        console.log(" \x1b[5m\x1b[35m\x1b[1m __  __                 __      \x1b[37m__           __        ")
        console.log(" \x1b[35m/\\ \\/\\ \\               /\\ \\  _ \x1b[37m/\\ \\       __/\\ \\       ")
        console.log(" \x1b[35m\\ \\ \\_\\ \\     __    ___\\ \\ \\/ \\\x1b[37m\\ \\ \\     /\\_\\ \\ \\____  ")
        console.log(" \x1b[35m \\ \\  _  \\  / __ \\ / ___\\ \\   < \x1b[37m\\ \\ \\    \\/\\ \\ \\  __ \\ ")
        console.log(" \x1b[35m  \\ \\ \\ \\ \\/\\  __//\\ \\__/\\ \\ \\\\ \\\x1b[37m\\ \\ \\____\\ \\ \\ \\ \\_\\ \\")
        console.log(" \x1b[35m   \\ \\_\\ \\_\\ \\____\\ \\____\\\\ \\_\\ \\_\x1b[37m\\ \\____/ \\ \\_\\ \\____/")
        console.log(" \x1b[35m    \\/_/\\/_/\\/____/\\/____/ \\/_/\\/_/\x1b[37m\\/___/   \\/_/\\/___/ ")
        console.log(" \x1b[0m ")
        console.log(" ======================================================= \n")
        console.log(" \x1b[36m\x1b[1m\x1b[4m" + "=== VANILLA MAP INFO ===" + "\x1b[0m" +
            "\n\n Notes: \x1b[32m\x1b[1m" + NotesCount[0] + 
            "\x1b[0m\n Walls: \x1b[32m\x1b[1m" + WallsCount[0] + "\x1b[0m\n\n")
        console.log(" \x1b[36m\x1b[1m\x1b[4m" + "=== MODDED MAP INFO ===" +
            "\x1b[0m" + "\n\n Notes: \x1b[32m\x1b[1m" + NotesCount[1] +
            "\x1b[0m\n" + " Fake Notes: \x1b[32m\x1b[1m" + fakes +
            "\x1b[0m\n Walls: \x1b[32m\x1b[1m" + WallsCount[1] + 
            "\x1b[0m\n" + " Lights: \x1b[32m\x1b[1m" + lights.length + "\x1b[0m\n\n")
        console.log(" \x1b[36m\x1b[1m\x1b[4m" + "=== CUSTOM EVENTS INFO ===" + "\x1b[0m" +
            "\n\n AnimateTracks: \x1b[32m\x1b[1m" + AT +
            "\x1b[0m\n PathAnimations: \x1b[32m\x1b[1m" + PA +
            "\x1b[0m\n TrackParents: \x1b[32m\x1b[1m" + TP +
            "\x1b[0m\n PlayerTracks: \x1b[32m\x1b[1m" + PT +
            "\x1b[0m\n PointDefinitions: \x1b[32m\x1b[1m" + pointDefinitions.length +
            "\x1b[0m\n\n");
        console.log(" \x1b[36m\x1b[1m\x1b[4m" + "=== ENVIRONMENT INFO ===" + "\x1b[0m" +
            "\n\n Environment Objects: \x1b[32m\x1b[1m" + environment.length + "\x1b[0m\n\n")
        console.timeEnd('HeckLib ran in')
    }
}