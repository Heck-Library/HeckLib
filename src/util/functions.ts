import { Vec3Animation, Vec3Keyframe } from "./vec";

/**
 * ## Random
 * 
 * Returns a random number between min and max (inclusive) and rounds it to the specified precision.
 * @param min lowest possible number to be generated
 * @param max highest possible number to be generated
 * @param precision The number of decimal places to round to
 */
export function Random(min: number, max: number, precision: number = 0) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(precision));
}

/**
 * ## CalculateRotations
 * 
 * Calculates the keyframes needed to rotate an object from the start rotation to the end rotation.
 * 
 * @param animation An animation array with two keyframes representing the start and end rotation
 * @returns An array of keyframes split into 90 degree rotations to make sure the object rotates correctly
 */
export function CalculateRotations(animation: [[number, number, number, 0], [number, number, number, 1]]): Vec3Animation {
    const startRotation: number[] = [animation[0][0], animation[0][1], animation[0][2]];
    const endRotation: number[] = [animation[1][0], animation[1][1], animation[1][2]];

    // find the biggest difference between two axis
    const diff: number[] = [0, 0, 0];
    startRotation.forEach((v, i) => {
        diff[i] = (endRotation[i] - v)
    });
    const maxDiff = Math.max(...diff);

    const n = Math.floor(maxDiff / 90); // number of keyframes

    // calculate the step for each axis to reach the end rotation
    const step: number[] = [0, 0, 0];
    for (let i = 0; i < 3; i++) step[i] = (endRotation[i] - startRotation[i]) / n;

    // create the keyframes
    const keyframes: Vec3Keyframe[] = [];
    for (let i = 0; i <= n; i++) {
        keyframes.push([startRotation[0] + i * step[0], startRotation[1] + i * step[1], startRotation[2] + i * step[2], i / n]);
    }

    return keyframes as Vec3Animation;
}

/**
 * ## HSV to RGB
 * 
 * Converts a color from HSV to RGB format.
 * 
 * Accepts values between 0 and 1, if you want to use degrees, divide the value by 360.
 * 
 * ---
 * 
 * ### Defaults
 * 
 * - Saturation: 1
 * - Value: 1
 * 
 * ---
 * 
 * @param HSV The color in HSV format (0-1)
 * @returns The color in RGB format (0-1)
 */
export function HSVtoRGB(HSV: [number, number?, number?] | number): [number, number, number] {
    let H: number, S: number, V: number;
    
    if (Array.isArray(HSV)) {
        H = HSV[0];
        S = HSV[1] ?? 1;
        V = HSV[2] ?? 1;
    } else {
        H = HSV;
        S = 1;
        V = 1;
    }

    // Convert H from [0,1] range to [0,360] range
    H *= 360;

    const C = V * S;
    const X = C * (1 - Math.abs((H / 60) % 2 - 1));
    const m = V - C;

    let R = 0, G = 0, B = 0;

    if (H < 60) {
        R = C; G = X; B = 0;
    } else if (H < 120) {
        R = X; G = C; B = 0;
    } else if (H < 180) {
        R = 0; G = C; B = X;
    } else if (H < 240) {
        R = 0; G = X; B = C;
    } else if (H < 300) {
        R = X; G = 0; B = C;
    } else {
        R = C; G = 0; B = X;
    }

    return [R + m, G + m, B + m];
}
