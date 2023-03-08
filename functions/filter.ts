// deno-lint-ignore-file no-explicit-any
import {NOTE, WALL} from "../consts/types/objects";
import {fakeNotes, notes, fakeWalls, walls} from "../map/initialize";

/**
 * @param obj The objects to filter.
 * @param start What the start beat to filter should be.
 * @param end What the end beat to filter should be.
 * @param type What the type to filter should be.
 * @returns The filtered objects.
 */
export default function filter(obj: WALL[], start: number, end: number, type ?: 0 | 1): WALL[];
/**
   * @param obj The objects to filter.
   * @param start What the start beat to filter should be.
   * @param end What the end beat to filter should be.
   * @param type What the type to filter should be.
   * @param direction What the direction to filter should be.
   * @returns The filtered objects.
   */
export default function filter(obj: NOTE[], start: number, end: number, type ?: 0 | 1 | 3, direction ?:number): NOTE[] {
    if (obj == fakeNotes || obj == notes) {
        const f: NOTE[] = obj.filter((n : NOTE) => n.time >= start && n.time<= end);
        if (type && !direction) return f.filter((n: NOTE) => n.type == type);
        if (! type && direction) return f.filter((n : NOTE) => n.direction == direction);
        if (type && direction) return f.filter((n : NOTE) => n.direction == direction && n.type == type);
        return f;
    }
    if (obj == fakeWalls || obj == walls) {
        const f: WALL[] = obj.filter((w : WALL) => w.time >= start && w.time<= end);
        if (type) return f.filter((w: WALL) => w.y);
        return obj.filter((w : WALL) => w.time >= start && w.time<= end);
    }
    return [];
}
  

