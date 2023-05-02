/**
 * ### Clamp
 * 
 * Clamps a number between a minimum and maximum value.
 * 
 * #### Usage
 * ```ts
 * clamp(x: number, min: number, max: number);
 * ```
 * 
 * #### Examples
 * 
 * ```ts
 * clamp(5, 0, 10); // 5
 * clamp(15, 0, 10); // 10
 * clamp(-5, 0, 10); // 0
 * ```
 */
export default function clamp(x: number, min: number, max: number) {
    return Math.min(Math.max(x, min), max);
}