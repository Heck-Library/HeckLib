import { ARC } from "../../consts/mod";
import Arc from "../../objects/arc";

export function JSONtoArcs(arcInput: Record<string, any>[], NJS: number, offset: number): ARC[] {
    const arcArr: ARC[] = [];
    arcInput.forEach((c: Record<string, any>) => {
        arcArr.push(new Arc({
            time: c.b,
            x: c.x,
            y: c.y,
            type: c.c,
            direction: c.d,
            multiplier: c.mu,
            endTime: c.tb,
            endX: c.tx,
            endY: c.ty,
            endDirection: c.tc,
            endMultiplier: c.tmu,
            segments: c.sc,
            anchor: c.m
        }, {
            njs: NJS,
            offset: offset
        }));
    });
    return arcArr;
}
