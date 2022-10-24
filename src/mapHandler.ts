// deno-lint-ignore-file no-explicit-any

import { infoFile } from "./info.ts";

// TODO make the script able to read and write .dat files

export const pointDefinitions = ["NULL"];
export let notes: any[];
export let walls: any[];
export let events: any[];
export let definitions: any[];
export let activeInput: string;
export let activeOutput: string;

export function map(input: string, output: string, NJS: number, offset: number) {
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
    customData._environments = [];

    //(output, JSON.stringify(diff, null, 4));

    events = diff._customData._customEvents;
    definitions = diff._customData._pointDefinitions;

    return diff;
}

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

    difficulty._notes.sort((a: { _time: number; _lineIndex: number; _lineLayer: number; }, b: { _time: number; _lineIndex: number; _lineLayer: number; }) => (Math.round((a._time + Number.EPSILON) * sortP) / sortP) - (Math.round((b._time + Number.EPSILON) * sortP) / sortP) || (Math.round((a._lineIndex + Number.EPSILON) * sortP) / sortP) - (Math.round((b._lineIndex + Number.EPSILON) * sortP) / sortP) || (Math.round((a._lineLayer + Number.EPSILON) * sortP) / sortP) - (Math.round((b._lineLayer + Number.EPSILON) * sortP) / sortP));
    difficulty._obstacles.sort((a: any, b: any) => a._time - b._time);
    difficulty._events.sort((a: any, b: any) => a._time - b._time);

    const vanilla = JSON.parse(Deno.readTextFileSync(activeInput));
    const modded = JSON.parse(JSON.stringify(difficulty))


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

    console.log("=== VANILLA MAP INFO ===\n\nNotes: " + vanilla._notes.length + "\nWalls: " + vanilla._obstacles.length + "\n\n")
    console.log("=== MODDED MAP INFO ===\n\nNotes: " + modded._notes.length + "\n" + "Fake Notes: " + fakes + "\n\nWalls: " + modded._obstacles.length + "\n\n")
    console.log("=== CUSTOM EVENTS INFO ===\n\nAnimateTracks: " + AT + "\nPathAnimations: " + PA + "\nTrackParents: " + TP + "\nPlayerTracks: " + PT + "\n");

    Deno.writeTextFileSync(activeOutput, JSON.stringify(difficulty, null, 4));
}