// deno-lint-ignore-file

export const __dirname = new URL('.', import.meta.url).pathname.slice(1).replace(/\//g, "\\").replace(/src\\/g, "");


export function isPresent(x: any) {
    if (typeof x !== 'undefined' && x !== null) return true;
    return false;
}

export function isArr (x: any) {
    if (Array.isArray(x)) {
        return true;
    } else return false;
}

/**
 * A function to convert HSV to RGB
 * @param h Hue
 * @param s Saturation
 * @param v Value
 * @returns RGB
 */

export function HSVtoRGB(h: any, s: number, v: number) {
    let r: number, g: number, b: number, i: number, f: number, p: number, q: number, t: number;
    if (arguments.length === 1) {
        (s = h.s), (v = h.v), (h = h.h);
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            (r = v), (g = t), (b = p);
            break;
        case 1:
            (r = q), (g = v), (b = p);
            break;
        case 2:
            (r = p), (g = v), (b = t);
            break;
        case 3:
            (r = p), (g = q), (b = v);
            break;
        case 4:
            (r = t), (g = p), (b = v);
            break;
        case 5:
            (r = v), (g = p), (b = q);
            break;
        default:
            throw new Error("Error in HSVtoRGB")
    }
    return [r, g, b];
}

/**
 * A function to get a random number between two numbers
 * @param min Minimum value
 * @param max Maximum value
 * @param precision What decimal place to round to
 * @returns Random number
 */

export function random(min: number, max: number, precision?: number) {
    let p = 10;
    if (typeof precision !== 'undefined' && precision !== null) {
        p = Math.pow(p, precision);
    }
    return Math.round((Math.random() * (max - min + 1) + min) * p) / p;
}