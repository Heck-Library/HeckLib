import { NOTE } from "../consts/types/objects.ts";
import Note from "../objects/note.ts";

export function dupeNote(obj : NOTE): NOTE {
    const o = JSON.parse(JSON.stringify(obj)).json;
    const n: NOTE = new Note({
        // Vanilla data
        time: o.nD.time,
        type: o.nD.type,
        x: o.nD.x,
        y: o.nD.y,
        direction: o.nD.direction
    }, o.cD, o.aD);
    return n;
}