
export let activeDiff;
import { writeFileSync, readFileSync } from 'fs'
import { mapDir } from './consts.js';
import { uniqBy } from './general.js';

export function getActiveDiff(output) {
    if (output) {
        return readFileSync('./temp/out');
    } else return readFileSync('./temp/in');
}

export function filterNotes(start, end) {
    let notes = mapData()._notes;
    let filtered = notes.filter(n => n._time >= start && n._time <= end);
    return filtered;
}

export function filterWalls(start, end) {
    let walls = mapData()._obstacles;
    let filtered = walls.filter(w => w._time >= start && w._time <= end);
    return filtered;
}

export function noteTrack(start, end) {
    //idk how to do this
}

export function map(input, output) {
    let diff = JSON.parse(readFileSync(input));

    if (!diff._customData) {
        diff._customData = {};
    }
    diff._notes.forEach(x => {
        if (!x._customData) {
            x._customData = {}
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
}

export function mapData() {
    return JSON.parse(readFileSync(getActiveDiff(true)));
}

export function tempMap() {
    return JSON.parse(readFileSync('./temp/map'))
}

export function finalize() {
    const precision = 4; // decimals to round to  --- use this for better wall precision or to try and decrease JSON file size
    let difficulty = JSON.parse(readFileSync(getActiveDiff(true)));
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

    const vanilla = JSON.parse(readFileSync(getActiveDiff()))
    const modded = JSON.parse(readFileSync(getActiveDiff(true)))

    const mapInfo = {
        notes: {
            vanilla: vanilla._notes.length,
            modded: modded._notes.length
        },
        walls: {
            vanilla: vanilla._obstacles.length,
            modded: modded._obstacles.length
        }
    };

    console.log("VANILLA MAP INFO\n\nNotes: " + mapInfo.notes.vanilla + "\nWalls: " + mapInfo.walls.vanilla + "\n\n")
    console.log("MODDED MAP INFO\n\nNotes: " + mapInfo.notes.modded + "\nWalls: " + mapInfo.walls.modded + "\n\n")

    let a = uniqBy(difficulty._notes, JSON.stringify)

    writeFileSync(getActiveDiff(true), JSON.stringify(difficulty, null, 4));
}