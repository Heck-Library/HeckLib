import { Difficulty, Mod } from './consts.ts';
import './consts.ts';


export type Track = string|string[];

export type lineIndex = 0|1|2|3;
export type lineLayer = 0|1|2;
export type noteDir = 0|1|2|3|4|5|6|7|8;
export type objType = 0|1|3;

export type vec1 = [x: number];
export type vec2 = [x: number, y: number];
export type vec3 = [x: number, y: number, z: number];
export type vec4 = [r: number, g: number, b: number, a: number];

export type vec1frame = [x: number, time: number, easing?: string];
export type vec3frame = [x: number, y: number, z: number, time: number, easing?: string, spline?: "splineCatmullRom"];
export type vec4frame = [r: number, g: number, b: number, a: number, time: number, easing?: string, spline?: "splineCatmullRom"];

export type vec1anim = vec1frame[]|vec1;
export type vec3anim = vec3frame[]|vec3;
export type vec4anim = vec4frame[]|vec4;

export type requirement = Mod.Chroma | Mod.Cinema | Mod.Mapping | Mod.Noodle;
export type diffFile = 
    Difficulty.Lawless.Easy |
    Difficulty.Lawless.Normal |
    Difficulty.Lawless.Hard |
    Difficulty.Lawless.Expert |
    Difficulty.Lawless.ExpertPlus |
    Difficulty.Standard.Easy |
    Difficulty.Standard.Normal |
    Difficulty.Standard.Hard |
    Difficulty.Standard.Expert |
    Difficulty.Standard.ExpertPlus;

export type noteJump = "Dynamic" | "Static";
export type effects = "AllEffects" | "Strobefilter" | "NoEffects";
export type energy = "Bar" | "Battery";
export type speed = "Normal" | "Faster" | "Slower" | "SuperFast";
export type enabledWall = "All" | "FullHeightOnly" | "NoObstacles";