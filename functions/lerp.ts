

/**
 * A function for linear interpolation.
 * @param start First value
 * @param end Last value
 * @param amount Interpolation amount
 * @returns Interpolated value
 * @example lerp(5, 10, 0.5); returns 7.5
 */
export function lerp(start : number, end : number, amount : number): number {
    return(1 - amount) * start + amount * end;
}
