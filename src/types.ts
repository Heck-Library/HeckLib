// deno-lint-ignore-file no-namespace
import { Difficulty, Mod, Shader, Shape } from './consts.ts';
import './consts.ts';
import { Font } from './main.ts';
import { track } from './objects.ts';


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

export type vec1anim = string|vec1frame[]|vec1;
export type vec3anim = string|vec3frame[]|vec3;
export type vec4anim = string|vec4frame[]|vec4;

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

export type geoShape = string | Shape.Capsule | Shape.Cube | Shape.Cylinder | Shape.Plane | Shape.Quad | Shape.Sphere | Shape.Triangle;
export type shaderType = string | Shader.OpaqueLight | Shader.TransparentLight | Shader.Standard;
export type mat = {
    _color: vec3,
    _shader: shaderType,
    _track?: Track,
    _shaderKeywords?: string[]
}

export namespace objectData {
    export type noteData = {
        time: number,
        x: lineIndex,
        y: lineLayer,
        color: objType,
        direction?: noteDir
    }

    export type customData = {
        track?: Track,
        color?: vec4,
        position?: vec2,
        rotation?: vec3,
        localRotation?: vec3,
        scale?: vec3,
        size?: vec3,
        njs?: number,
        offset?: number,
        fake?: boolean,
        interactable?: boolean
    }

    export type animationData = {
        position?: vec3anim,
        definitePosition?: vec3anim,
        rotation?: vec3anim,
        scale?: vec3anim,
        color?: vec4anim,
        interactable?: vec1anim,
        dissolve?: vec1anim,
        dissolveArrow?: vec1anim
    }
}

export type customEventData = { 
    time: number,
    track: Track,
    duration?: number,
    easing?: string,
    position?: vec3anim,
    localPosition?: vec3anim,
    definitePosition?: vec3anim,
    rotation?: vec3anim,
    localRotation?: vec3anim,
    scale?: vec3anim,
    color?: vec4anim,
    dissolve?: vec1anim,
    dissolveArrow?: vec1anim,
    interactable?: vec1anim,
    timeAnim?: vec1anim
}

export type font = Font.LiteFont