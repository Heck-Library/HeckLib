
/**
 * A function to convert HSV to RGB
 * ```ts
 * HSV(1, 1, 1); // returns [0.14, 0, 1]
 * ```
 * @param h Hue
 * @param s Saturation
 * @param v Value
 * @returns [R, G, B]
 */
export function HSVtoRGB(hue : number, saturation : number, value : number): [number, number, number] {
    const h = hue;
    let s;
    let v;
    let r: number,
        g: number,
        b: number;
    if (arguments.length === 1) {
        s = 1;
        v = 1;
    } else {
        s = saturation;
        v = value;
    }
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            (r = v),
            (g = t),
            (b = p);
            break;
        case 1:
            (r = q),
            (g = v),
            (b = p);
            break;
        case 2:
            (r = p),
            (g = v),
            (b = t);
            break;
        case 3:
            (r = p),
            (g = q),
            (b = v);
            break;
        case 4:
            (r = t),
            (g = p),
            (b = v);
            break;
        case 5:
            (r = v),
            (g = p),
            (b = q);
            break;
        default:
            throw new Error("Error in HSVtoRGB");
    }
    return [
        Math.round(r * 1000) / 1000, 
        Math.round(g * 1000) / 1000, 
        Math.round(b * 1000) / 1000
    ];
}