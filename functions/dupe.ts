import { NOTE, WALL } from "../consts/types/objects";
import Note from "../objects/note";
import Wall from "../objects/wall";

export default function dupe(obj : WALL): WALL
export default function dupe(obj : NOTE): NOTE {
    if (obj.direction) {
        const o: NOTE = JSON.parse(JSON.stringify(obj)).json;
        const n: NOTE = new Note({
            // Vanilla data
            time: o.time,
            type: o.type,
            x: o.x,
            y: o.y,
            direction: o.direction
        }, o.data, o.anim);
        return n;
    }
    const o: WALL = JSON.parse(JSON.stringify(obj)).json;
    const w: WALL = new Wall({
        //Vanilla data
        time: o.time,
        duration: o.duration,
        height: o.height,
        width: o.width,
        x: o.x,
        y: o.y
    }, o.data, o.anim);
    return w;
}