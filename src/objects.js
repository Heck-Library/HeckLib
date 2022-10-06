import { writeFileSync } from "fs";
import { mapDir } from "./consts.js";
import { isArr } from "./general.js";
import { mapData, tempMap } from "./mapHandler.js";


class Object {
    constructor(time) {
        this._time = time;        
    }
    note() {

    }
}

export function pushNote(note) {
    let map = tempMap();
    if (isArr(note)) {
        map._notes.push(...note);
    } else map._notes.push(note);
    console.log(JSON.stringify(map, null, 4))
    writeFileSync(mapDir, JSON.stringify(map, null, 4));
}
export function pushWall(wall) {
    let diff = mapData();
    if (isArr(wall)) {
        diff._obstacles.push(...wall);
    } else diff._obstacles.push(wall);
    writeFileSync(mapDir, JSON.stringify(diff, null, 4));
}
export function pushEvent(event) {
    let diff = mapData();
    if (isArr(event)) {
        diff._customData._customEvents.push(...event);
    } else diff._customData._customEvents.push(event);
    writeFileSync(mapDir, JSON.stringify(diff, null, 4));
}
