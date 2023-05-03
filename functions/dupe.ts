import Arc from "../objects/arc";
import Bomb from "../objects/bomb";
import Chain from "../objects/chain";
import Note from "../objects/note";
import Wall from "../objects/wall";


/**
 * Duplicates an object to a new class instead of referencing the old one.
 * 
 * You can use this to duplicate notes and give them a separate animation from the original one for example.
 * ```ts
 * const duplicatedNote = dupe(note);
 * ```
 * @param obj Object to be duplicated
 * @returns Duplicate of the object
 */
export default function dupe(obj : Note): Note;
export default function dupe(obj : Chain) : Chain;
export default function dupe(obj : Bomb) : Bomb;
export default function dupe(obj : Wall) : Wall;
export default function dupe(obj : Arc) : Arc;
export default function dupe(obj : object) : Note | Chain | Bomb | Wall | Arc {
    const newObject = Object.assign(Object.create(Object.getPrototypeOf(obj)), JSON.parse(JSON.stringify(obj)));
    return newObject
}