// deno-lint-ignore-file no-explicit-any
import {NOTE, Track, WALL} from "../consts/types/objects";
import {fakeNotes, notes, fakeWalls, walls} from "../map/mapHandler";

/**
 * @param obj The objects to filter.
 * @param start What the start beat to filter should be.
 * @param end What the end beat to filter should be.
 * @param type What the type to filter should be.
 * @returns The filtered objects.
 */
export function filter(obj: WALL[], start: number, end: number, type ?: 0 | 1): WALL[];
/**
   * @param obj The objects to filter.
   * @param start What the start beat to filter should be.
   * @param end What the end beat to filter should be.
   * @param type What the type to filter should be.
   * @param direction What the direction to filter should be.
   * @returns The filtered objects.
   */
export function filter(obj: NOTE[], start: number, end: number, type ?: 0 | 1 | 3, direction ?:number): NOTE[] {
    if (obj == fakeNotes || obj == notes) {
        const f: NOTE[] = obj.filter((n : NOTE) => n.time >= start && n.time<= end);
      if (type && !direction) return f.filter((n: NOTE) => n.type == type);
        if (! type && direction) 
            return f.filter((n : NOTE) => n.direction == direction);
        


        if (type && direction) 
            return f.filter((n : NOTE) => n.direction == direction && n.type == type);
        


        return f;
    }
    if (obj == fakeWalls || obj == walls) {
        const f: WALL[] = obj.filter((w : WALL) => w.time >= start && w.time<= end);
      if (type) return f.filter((w: WALL) => w.y);
        return obj.filter((w : WALL) => w.time >= start && w.time<= end);
    }
    return [];
  }
  
/**
    * Assign a track to notes or walls.
    * @param obj The array of objects that the track should be assigned to.
    * @param track The array of tracks or the name of the track that should be assigned.
*/
export function track(obj: NOTE[] | WALL[], track: Track): void {
    obj.forEach((x: Record<string, any>) => {
        const d = x.data;
        if (! d.track) {
            d.track = track;
            return;
        }
        if (!Array.isArray(d.track)) {
            if (Array.isArray(track)) {
                const a = [
                    ...track,
                    d.track
                ];
                d.track = a;
            } else d.track = [d.track, track];
            return;
        }
        const tracks = d.track;
        if (Array.isArray(track)) tracks.push(...track);
        else tracks.push(track);
    });
}
