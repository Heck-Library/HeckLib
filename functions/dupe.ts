import { NOTE } from "../consts/types/objects";
import Note from "../objects/note";

export default function dupe(obj : NOTE): NOTE {
    const n: NOTE = new Note({
        time: obj.time,
        type: obj.type,
        x: obj.x,
        y: obj.y,
        direction: obj.direction
    }, obj.data, obj.anim);
    return n;
}