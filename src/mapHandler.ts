// deno-lint-ignore-file no-explicit-any no-namespace

import { infoFile } from "./info.ts";
import { scuffedWallsInUse } from "./main.ts";
import { existsSync } from "https://deno.land/std@0.161.0/fs/mod.ts";


export const pointDefinitions = ["NULL"];

export let environment: any[];
export let notes: any[];
export let walls: any[];
export let events: any[];
export let materials: any[];
export let geometry: any[];
export let definitions: any[];

export let activeInput: string;
export let activeOutput: string;

export namespace Map {
    /**
     * @param input The input file for the difficulty.
     * @param output The output file for the difficulty.
     * @param NJS The NJS of the new difficulty. 
     * @param offset The offset of the new difficulty.
     */
    export function initialize(input: string, output: string, NJS: number, offset: number) {
        const diff = JSON.parse(Deno.readTextFileSync(`./${input}`));
        infoFile._difficultyBeatmapSets.forEach((x: any) => {
            x._difficultyBeatmaps.forEach((y: any) => {
                delete(y._settings)
                delete(y._requirements)
                delete(y._suggestions)
            })
        });
        Deno.writeTextFileSync('Info.dat', JSON.stringify(infoFile, null, 4))
        activeInput = input;
        activeOutput = output;
    
    
        notes = diff._notes;
        walls = diff._obstacles;
    
        if (!diff._customData) {
            diff._customData = {};
        }
        diff._notes.forEach((x: { _customData: { _noteJumpStartBeatOffset: number; _noteJumpMovementSpeed: number; }; }) => {
            if (!x._customData) {
                x._customData = {
                    _noteJumpStartBeatOffset: offset,
                    _noteJumpMovementSpeed: NJS
                }
            }
        });
        diff._obstacles.forEach((x: { _customData: { _noteJumpStartBeatOffset: number; _noteJumpMovementSpeed: number; }; }) => {
            if (!x._customData) {
                x._customData = {
                    _noteJumpStartBeatOffset: offset,
                    _noteJumpMovementSpeed: NJS
                }
            }
        });
    
        const customData = diff._customData;
        
        customData._customEvents = [];
        customData._pointDefinitions = [];
        customData._environment = [];
        customData._materials = [];
    
        //(output, JSON.stringify(diff, null, 4));
    
        events = diff._customData._customEvents;
        environment = customData._environment;
        definitions = diff._customData._pointDefinitions;
        materials = customData._materials;
    
        return diff;
    }
    
    /**
     * @param difficulty The difficulty that the map should be written to.
     */
    export function finalize(difficulty: any) {
        if (!scuffedWallsInUse) {
            Deno.writeTextFileSync('./temp/nosw', "null")
        } else {
            if (existsSync('./temp/nosw'))
                Deno.remove('./temp/nosw')
        }
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
    
        difficulty._notes.sort((a: { _time: number; _lineIndex: number; _lineLayer: number; }, b: { _time: number; _lineIndex: number; _lineLayer: number; }) => (Math.round((a._time + Number.EPSILON) * sortP) / sortP) - (Math.round((b._time + Number.EPSILON) * sortP) / sortP) || (Math.round((a._lineIndex + Number.EPSILON) * sortP) / sortP) - (Math.round((b._lineIndex + Number.EPSILON) * sortP) / sortP) || (Math.round((a._lineLayer + Number.EPSILON) * sortP) / sortP) - (Math.round((b._lineLayer + Number.EPSILON) * sortP) / sortP));
        difficulty._obstacles.sort((a: any, b: any) => a._time - b._time);
        difficulty._events.sort((a: any, b: any) => a._time - b._time);

        Deno.writeTextFileSync(activeOutput, JSON.stringify(difficulty, null, 4))
        if (scuffedWallsInUse) {
            const ts = JSON.parse(Deno.readTextFileSync(activeOutput));
            const tsNotes = ts._notes;
            const tsWalls = ts._obstacles;
            const tsEvents = ts._events;
            const tsCustomEvents = ts._customData._customEvents;

            const sw = JSON.parse(Deno.readTextFileSync('./temp/tempOut.dat'))
            const swNotes = sw._notes;
            const swWalls = sw._obstacles;
            const swEvents = sw._events;
            const swCustomEvents = sw._customData._customEvents;

            tsNotes.push(...swNotes)
            tsWalls.push(...swWalls)
            tsEvents.push(...swEvents)
            tsCustomEvents.push(...swCustomEvents)

            Deno.writeTextFileSync(activeOutput, JSON.stringify(ts, null, 4))
        }
    
        const vanilla = JSON.parse(Deno.readTextFileSync(activeInput));
        const modded = JSON.parse(Deno.readTextFileSync(activeOutput))
    
    
        let AT = 0;
        let PA = 0;
        let TP = 0;
        let PT = 0;
    
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
    
        let fakes = 0;
    
        modded._notes.forEach((n: any) => {
            if (n._customData._fake) fakes++;
        })
        console.log(" \x1b[5m\x1b[35m\x1b[1m __  __                 __      \x1b[37m__           __        ")
        console.log(" \x1b[35m/\\ \\/\\ \\               /\\ \\  _ \x1b[37m/\\ \\       __/\\ \\       ")
        console.log(" \x1b[35m\\ \\ \\_\\ \\     __    ___\\ \\ \\/ \\\x1b[37m\\ \\ \\     /\\_\\ \\ \\____  ")
        console.log(" \x1b[35m \\ \\  _  \\  / __ \\ / ___\\ \\   < \x1b[37m\\ \\ \\    \\/\\ \\ \\  __ \\ ")
        console.log(" \x1b[35m  \\ \\ \\ \\ \\/\\  __//\\ \\__/\\ \\ \\\\ \\\x1b[37m\\ \\ \\____\\ \\ \\ \\ \\_\\ \\")
        console.log(" \x1b[35m   \\ \\_\\ \\_\\ \\____\\ \\____\\\\ \\_\\ \\_\x1b[37m\\ \\____/ \\ \\_\\ \\____/")
        console.log(" \x1b[35m    \\/_/\\/_/\\/____/\\/____/ \\/_/\\/_/\x1b[37m\\/___/   \\/_/\\/___/ ")
        console.log(" ")
        console.log(" ======================================================= \n")
        console.log(" \x1b[36m\x1b[1m\x1b[4m" + "=== VANILLA MAP INFO ===" + "\x1b[0m" + "\n\n Notes: \x1b[32m\x1b[1m" + vanilla._notes.length + "\x1b[0m\n Walls: \x1b[32m\x1b[1m" + vanilla._obstacles.length + "\x1b[0m\n\n")
        console.log(" \x1b[36m\x1b[1m\x1b[4m" + "=== MODDED MAP INFO ===" + "\x1b[0m" + "\n\n Notes: \x1b[32m\x1b[1m" + modded._notes.length + "\x1b[0m\n" + " Fake Notes: \x1b[32m\x1b[1m" + fakes + "\x1b[0m\n\n Walls: \x1b[32m\x1b[1m" + modded._obstacles.length + "\x1b[0m\n\n")
        console.log(" \x1b[36m\x1b[1m\x1b[4m" + "=== CUSTOM EVENTS INFO ===" + "\x1b[0m" + "\n\n AnimateTracks: \x1b[32m\x1b[1m" + AT + "\x1b[0m\n PathAnimations: \x1b[32m\x1b[1m" + PA + "\x1b[0m\n TrackParents: \x1b[32m\x1b[1m" + TP + "\x1b[0m\n PlayerTracks: \x1b[32m\x1b[1m" + PT + "\x1b[0m\n\n");
        console.log(" \x1b[36m\x1b[1m\x1b[4m" + "=== ENVIRONMENT INFO ===" + "\x1b[0m" + "\n\n Environment Objects: \x1b[32m\x1b[1m" + environment.length + "\x1b[0m\n\n")
    }
}