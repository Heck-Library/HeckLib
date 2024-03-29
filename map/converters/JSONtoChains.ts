import Chain from "../../objects/chain";

export function JSONtoChains(chainInput: Record<string, any>[], NJS: number, offset: number): Chain[] {
    const chainArr: Chain[] = [];
    chainInput.forEach((c: Record<string, any>) => {
        chainArr.push(new Chain({
            time: c.b,
            x: c.x,
            y: c.y,
            type: c.c,
            direction: c.d,
            endTime: c.tb,
            endX: c.tx,
            endY: c.ty,
            segments: c.sc,
            squish: c.s
        }, {
            njs: NJS,
            offset: offset
        }));
    });
    return chainArr;
}
