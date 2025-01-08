import { arcs } from "../../objects/arc";

export function arcsToJSON(): Record<string, any>[] {
    const arcArr: any[] = [];
    arcs.forEach(a => {
        let arcJSON: Record<string, any> = {
            b: a.time,
            x: a.x,
            y: a.y,
            c: a.type,
            d: a.direction,
            mu: a.multiplier,
            tb: a.endTime,
            tx: a.endX,
            ty: a.endY,
            tc: a.endDirection,
            tmu: a.endMultiplier,
            m: a.anchor
        };
        if (a.customData) arcJSON.customData = { ...a.customData };
        if (a.animation) {
            if (!arcJSON.customData) arcJSON.customData = {
                animation: {
                    ...a.animation
                }
            }
        }
        
        arcJSON = JSON.parse(JSON.stringify(arcJSON)
            .replace('"njs":', '"noteJumpMovementSpeed":')
            .replace('"offset":', '"noteJumpStartBeatOffset":')
            .replace('"position":', '"coordinates":')
            .replace('"tailPosition":', '"tailCoordinates":')
            .replace('"rotation":', '"worldRotation":')
            .replace('"interactable":false', '"uninteractable":true')
            .replace('"disableSpawnEffect":true', '"spawnEffect":false')
        );
        arcArr.push(arcJSON);
    });
    return arcArr;
}
