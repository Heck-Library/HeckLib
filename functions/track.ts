import { NOTE, Track, WALL } from "../consts/types/objects";

/**
    * Assign a track to notes or walls.
    * @param obj The array of objects that the track should be assigned to.
    * @param track The array of tracks or the name of the track that should be assigned.
*/

export default function track(obj: NOTE[] | WALL[], track: Track): void {
    obj.forEach((x: Record<string, any>) => {
        const d = x.data;
        if (!d.track) {
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
            } else
                d.track = [d.track, track];
            return;
        }
        const tracks = d.track;
        if (Array.isArray(track))
            tracks.push(...track);
        else
            tracks.push(track);
    });
}
