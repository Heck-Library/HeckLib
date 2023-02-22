
/**
 * ```ts
 * random(-10, 10, 1);
 * ```
 * Returns a random number between -10 and 10 with a decimal precision of 1.
 * @param min Minimum value
 * @param max Maximum value
 * @param precision What decimal place to round to
 */

export function random(min : number, max : number, precision? : number): number {
    let p = 10;
    if (typeof precision !== "undefined" && precision !== null) {
        p = Math.pow(p, precision);
    }
    return Math.round((Math.random() * (max - min + 1) + min) * p) / p;
}