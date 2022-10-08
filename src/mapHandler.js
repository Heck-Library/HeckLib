
export let activeDiff;
import { writeFileSync, readFileSync } from 'fs'
import { mapDir } from './consts.js';
import { uniqBy } from './general.js';

export let notesVar;
export let wallsVar;
export let eventsVar;

export function getActiveDiff(output) {
    if (output) {
        return readFileSync('./temp/out');
    } else return readFileSync('./temp/in');
}

export function map(input, output, NJS, offset) {
    let diff = JSON.parse(readFileSync(input));

    notesVar = diff._notes;
    wallsVar = diff._obstacles;

    if (!diff._customData) {
        diff._customData = {};
    }
    diff._notes.forEach(x => {
        if (!x._customData) {
            x._customData = {
                _noteJumpStartBeatOffset: offset,
                _noteJumpMovementSpeed: NJS
            }
        }
    });
    diff._obstacles.forEach(x => {
        if (!x._customData) {
            x._customData = {
                _noteJumpStartBeatOffset: offset,
                _noteJumpMovementSpeed: NJS
            }
        }
    });

    writeFileSync(mapDir, JSON.stringify({
        _notes: [],
        _obstacles: [],
        _events: [],
        _customData: {}
    }));
    writeFileSync('./temp/in', input);
    writeFileSync('./temp/out', output);

    let customData = diff._customData;
    
    customData._customEvents = [];
    customData._pointDefinitions = [];
    customData._environments = [];

    writeFileSync(output, JSON.stringify(diff, null, 4));
    
    eventsVar = diff._customData._customEvents;

    return diff;
}

export function mapData() {
    return JSON.parse(readFileSync(getActiveDiff(true)));
}
export function finalize(difficulty) {
    const precision = 4; // decimals to round to  --- use this for better wall precision or to try and decrease JSON file size

    const jsonP = Math.pow(10, precision);
    const sortP = Math.pow(10, 2);
    function deeperDaddy(obj) {
        if (obj) 
            for (const key in obj) {
                if (obj[key] == null) {
                    delete obj[key];
                } else if (typeof obj[key] === "object" || Array.isArray(obj[key])) {
                    deeperDaddy(obj[key]);
                } else if (typeof obj[key] == "number") {
                    obj[key] = parseFloat(Math.round((obj[key] + Number.EPSILON) * jsonP) / jsonP);
                }
            }
        
    }
    deeperDaddy(difficulty)

    difficulty._notes.sort((a, b) => parseFloat(Math.round((a._time + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b._time + Number.EPSILON) * sortP) / sortP) || parseFloat(Math.round((a._lineIndex + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b._lineIndex + Number.EPSILON) * sortP) / sortP) || parseFloat(Math.round((a._lineLayer + Number.EPSILON) * sortP) / sortP) - parseFloat(Math.round((b._lineLayer + Number.EPSILON) * sortP) / sortP));
    difficulty._obstacles.sort((a, b) => a._time - b._time);
    difficulty._events.sort((a, b) => a._time - b._time);

    const vanilla = JSON.parse(readFileSync(getActiveDiff()));
    const modded = JSON.parse(readFileSync(getActiveDiff(true)));

    let animNotes = 0;
    let animWalls = 0;

    modded._notes.forEach(n => {
        if (typeof n._customData._animation !== 'undefined'){
            animNotes++;
        } else {
            delete(n._customData._animation)
        };
    });
    modded._obstacles.forEach(n => {
        if (typeof n._customData._animation !== 'undefined'){
            animWalls++;
        } else {
            delete(n._customData._animation)
        };
    });


    let AT = 0;
    let PA = 0;
    let TP = 0;
    let PT = 0;

    modded._customData._customEvents.forEach(e => {
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
    })

    const mapInfo = {
        v: {
            n: vanilla._notes.length,
            w: vanilla._obstacles.length
        },
        m: {
            n: modded._notes.length,
            aN: animNotes,
            w: modded._obstacles.length,
            aW: animWalls,
        }
    };

    console.log("=== VANILLA MAP INFO ===\n\nNotes: " + mapInfo.v.n + "\nWalls: " + mapInfo.v.w + "\n\n")
    console.log("=== MODDED MAP INFO ===\n\nNormal Notes: " + mapInfo.m.n + "\nAnimated Notes: " + mapInfo.m.aN + "\n\nWalls: " + mapInfo.m.w + "\nAnimated Walls: " + mapInfo.m.aW + "\n\n")
    console.log("=== CUSTOM EVENTS INFO ===\n\nAnimateTracks: " + AT + "\nPathAnimations: " + PA + "\nTrackParents: " + TP + "\nPlayerTracks: " + PT);

    let a = uniqBy(difficulty._notes, JSON.stringify)

    writeFileSync(getActiveDiff(true), JSON.stringify(difficulty, null, 4));
}