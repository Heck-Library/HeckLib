

import IArc from "../interfaces/objects/arc";
import IBomb from "../interfaces/objects/bomb";
import IChain from "../interfaces/objects/chain";
import INote from "../interfaces/objects/note";
import IWall from "../interfaces/objects/wall";

/**
    * Assign a track to notes or walls.
    * @param obj The array of objects that the track should be assigned to.
    * @param track The array of tracks or the name of the track that should be assigned.
*/
export default function track(obj: INote[] | IWall[] | IArc[] | IChain[] | IBomb[], track: string | string[]): void {
    obj.forEach((x: Record<string, any>) => {
        const d = x.customData;
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
