import { Ease } from "./consts";

export type track = string|string[];
export type easing = string;

export type rgbaStill = [r: number, g: number, b: number, a: number];
export type rgbaFrame = [r: number, g: number, b: number, a: number, time: number, easing?: string, spline?: "splineCatmullRom"];
export type rgbaAnim = rgbaFrame[];

export type xyzStill = [x: number, y: number, z: number];
export type xyzFrame = [x: number, y: number, z: number, time: number, easing?: string, spline?: "splineCatmullRom"];
export type xyzAnim = xyzFrame[];

export type xStill = [x: number];
export type xFrame = [x: number, time: number, easing?: string, spline?: "splineCatmullRom"];
export type xAnim = xFrame[];