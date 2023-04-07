import { ARC, BOMB, CHAIN, NOTE, WALL } from "../consts/types/objects";

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
export default function dupe(obj : CHAIN) : CHAIN;
export default function dupe(obj : BOMB) : BOMB;
export default function dupe(obj : WALL) : WALL;
export default function dupe(obj : NOTE): NOTE;
export default function dupe(obj : ARC) : ARC;
export default function dupe(obj : object) {
    return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
}