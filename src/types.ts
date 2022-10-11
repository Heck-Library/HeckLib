import { Ease } from "./consts";

export type track = string|string[];
export type easing = string;

export type rgbaStill = [r: number, g: number, b: number, a: number];
export type rgbaFrame = [r: number, g: number, b: number, a: number, time: number, easing?: string, spline?: "splineCatmullRom"];
export type rgbaAnim = rgbaFrame[]|rgbaStill;

export type xyzStill = [x: number, y: number, z: number];
export type xyzFrame = [x: number, y: number, z: number, time: number, easing?: string, spline?: "splineCatmullRom"];
export type xyzAnim = xyzFrame[]|xyzStill;

export type xyStill = [x: number, y: number];

export type xStill = [x: number];
export type xFrame = [x: number, time: number, easing?: string, spline?: "splineCatmullRom"];
export type xAnim = xFrame[]|xStill;

export type lineIndex = 0 | 1 | 2 | 3;
export type lineLayer = 0 | 1 | 2;
export type objType = 0 | 1 | 3;
export type direction = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;