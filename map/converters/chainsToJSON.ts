import IChain from "../../interfaces/objects/chain";
import { V3, fakeNotes, chains, fakeChains } from "../initialize";

export function chainsToJSON(): Record<string, any>[] {
    const chainArr: any[] = [];
    chains.forEach((c: IChain) => {
        let chainJSON: Record<string, any> = {
            b: c.time,
            x: c.x,
            y: c.y,
            c: c.type,
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
        chainJSON = JSON.parse(JSON.stringify(chainJSON)
            .replace('"njs":', '"noteJumpMovementSpeed":')
            .replace('"offset":', '"noteJumpStartBeatOffset":')
            .replace('"position":', '"coordinates":')
            .replace('"rotation":', '"worldRotation":')
            .replace('"interactable":false', '"uninteractable":true')
            .replace('"disableSpawnEffect":true', '"spawnEffect":false'))
        if (V3 && chainJSON.customData && Object.keys(chainJSON.customData).includes("fake")) {
            delete chainJSON.customData.fake;
            fakeChains.push(chainJSON);
        } else
            chainArr.push(chainJSON);
    });
    return chainArr;
}
