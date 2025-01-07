import Chain from "../../objects/chain";

export function JSONtoChains(chainInput: Record<string, any>[], NJS: number, offset: number): Chain[] {
    const chainArr: Chain[] = [];
    chainInput.forEach((c: Record<string, any>) => {
        const chain = new Chain({
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
            color: c.color,
            njs: NJS,
            offset: offset
        });
        if (c.customData != null || typeof c.customData !== 'undefined') {
            Object.keys(c.customData).forEach((key: string) => {
                if (key != "animation") chain.customData[key] = c.customData[key];
            });
            
            if (c.customData.animation != null || typeof c.customData.animation !== 'undefined') Object.keys(c.customData.animation).forEach((key: string) => {
                chain.animation[key] = c.customData.animation[key];
            });
        };
        chainArr.push(chain);
    });
    return chainArr;
}
