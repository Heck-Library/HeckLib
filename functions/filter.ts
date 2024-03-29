// deno-lint-ignore-file no-explicit-any
import IArc from "../interfaces/objects/arc";
import IChain from "../interfaces/objects/chain";
import INote from "../interfaces/objects/note";
import IWall from "../interfaces/objects/wall";
import cutDirection from "../types/cutDirection";
import lineIndex from "../types/lineIndex";
import lineLayer from "../types/lineLayer";
import noteType from "../types/noteType";

/**
 * @param obj The objects to filter.
 * @param start What the start beat to filter should be.
 * @param end What the end beat to filter should be.
 * @param type What the type to filter should be.
 * @returns The filtered objects.
 */
//export default function filter(obj: WALL[], start: number, end: number, type ?: 0 | 1): WALL[];
/**
   * @param obj The objects to filter.
   * @param start What the start beat to filter should be.
   * @param end What the end beat to filter should be.
   * @param type What the type to filter should be.
   * @param direction What the direction to filter should be.
   * @returns The filtered objects.
   */

type NoteFilters = {
    /**
     * Filters by the type of the object, such as `Note.Red`
     */
    type?: noteType;
    /**
     * Filters by the cut direction of the object, such as `Note.Dot`
     */
    direction?: cutDirection;
    /**
     * Filters by the horizontal position of the object.
     */
    x?: lineIndex;
    /**
     * Filters by the vertical position of the object.
     */
    y?: lineLayer;
};
type ArcFilters = {
    type?: 0 | 1;
    x?: lineIndex;
    y?: lineLayer;
    tailX?: lineIndex;
    tailY?: lineLayer;
}
type WallFilters = {
    /**
     * Filters by the type of the object, such as `Wall.Crouch`
     */
    type?: noteType;
    /**
     * Filters by the horizontal position of the object.
     */
    x?: lineIndex;
    /**
     * Filters by the vertical position of the object.
     */
    y?: lineLayer;
};

/**
 * Returns filtered objects between two time values.
 * 
 * Supports the following object types:
 * - Arcs
 * - Chains
 * - Notes
 * - Walls
 * ---
 * @example 
 * ```ts
 * filter(notes, 69, 727, {
 *     type: Note.Red,
 *     direction: Note.Down
 * });
 * ```
 * The example above returns all red down notes between beats 69 and 727
 * 
 * ---
 * 
 * @param obj The object type to be filtered.
 * @param start Minimum time of the filtered chains
 * @param end Maximum time of the filtered chains
 * @param filters Other less common filters than time, such as `direction`.
 * 
 * Possible objects to use:
 * > - `arcs`
 * > - `chains`
 * > - `notes`
 * > - `walls`
 * > - `fakeChains`
 * > - `fakeNotes`
 * > - `fakeWalls`
 */
export default function filter (obj: IChain[], start: number, end: number, filters?: ArcFilters): IChain[];
export default function filter (obj: IArc[], start: number, end: number, filters?: ArcFilters): IArc[];
export default function filter (obj: IWall[], start: number, end: number, filters?: WallFilters): IWall[];
export default function filter (obj: INote[], start: number, end: number, filters?: NoteFilters): INote[]; 
export default function filter (obj: any, start: number, end: number, filters?: NoteFilters) {
    let objects = obj.filter((o: { time: number; }) => o.time >= start && o.time <= end);
    if (filters) {
        const f = filters;
        if (typeof f.direction === 'number') objects = objects.filter((o: { direction: number; }) => o.direction === f.direction);
        if (typeof f.type === 'number') objects = objects.filter((o: { type: number; }) => o.type === f.type);
        if (typeof f.x === 'number') objects = objects.filter((o: { x: number; }) => o.x === f.x);
        if (typeof f.y === 'number') objects = objects.filter((o: { y: number; }) => o.y === f.y);
    }
    return objects;
}
