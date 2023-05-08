import IArc from "../interfaces/objects/arc";
import IBomb from "../interfaces/objects/bomb";
import IChain from "../interfaces/objects/chain";
import INote from "../interfaces/objects/note";
import IWall from "../interfaces/objects/wall";


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
export default function dupe(obj : INote) : INote;
export default function dupe(obj : IChain) : IChain;
export default function dupe(obj : IBomb) : IBomb;
export default function dupe(obj : IWall) : IWall;
export default function dupe(obj : IArc) : IArc;
export default function dupe(obj : object) : INote | IChain | IBomb | IWall | IArc {
    const newObject = Object.assign(Object.create(Object.getPrototypeOf(obj)), JSON.parse(JSON.stringify(obj)));
    return newObject
}