import { CHAIN } from "../../consts/mod";
import { V3, fakeNotes, chains } from "../initialize";

export function chainsToJSON(): Record<string, any>[] {
    const chainArr: any[] = [];
    chains.forEach((c: CHAIN) => {
        let chainJSON: Record<string, any> = {
            b: c.time,
            x: c.x,
            y: c.y,
            c: c.color,
            d: c.direction,
            tb: c.endTime,
            tx: c.endX,
            ty: c.endY,
            sc: c.segments,
            s: c.squish,
            customData: {
                ...c.data,
                animation: {
                    ...c.anim
                }
            }
        };
        if (V3 && chainJSON.customData && Object.keys(chainJSON.customData).includes("fake")) {
            delete chainJSON.customData.fake;
            fakeNotes.push(chainJSON);
        } else
            chainArr.push(chainJSON);
    });
    return chainArr;
}
