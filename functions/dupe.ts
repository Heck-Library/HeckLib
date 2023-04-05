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
export default function dupe(obj : NOTE | WALL | BOMB | ARC | CHAIN): NOTE | WALL | BOMB | ARC | CHAIN {
    const copy = Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
    return copy;
}