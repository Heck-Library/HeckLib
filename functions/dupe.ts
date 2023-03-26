import { NOTE } from "../consts/types/objects";
import Note from "../objects/note";

export default function dupe(obj : NOTE): NOTE {
    const o = JSON.parse(JSON.stringify(obj))
    const n: NOTE = new Note({
        time: o.json.nD.time,
        type: o.json.nD.type,
        x: o.json.nD.x,
        y: o.json.nD.y,
        direction: o.json.nD.direction
    }, o.json.cD, o.json.aD);
    return n;
}