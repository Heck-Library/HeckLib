import { BaseColor, colorModifier } from "./colorModifiers";
import { easingType } from "./easingType";

export type vec1 = [number];
export type vec2 = [number, number];
export type vec3 = [number, number, number];
export type vec4 = [number, number, number, number];

export type vec1Keyframe = [number, number, string?, string?];
export type vec3Keyframe = [number, number, number, number, string?, string?];
export type vec4Keyframe = [number, number, number, number, number, string?, string?];
export type colorKeyframe = BaseColor |
                            [number, number, number, number, number, easingType | colorModifier | undefined] |
                            [number, number, number, number, number, colorModifier, easingType];


export type vec1anim = vec1Keyframe[] | vec1 | string;
export type vec3anim = vec3Keyframe[] | vec3 | string;
export type vec4anim = vec4Keyframe[] | vec4 | string;
export type colorAnim = colorKeyframe[] | string;

export type unknownAnim = vec1anim | vec3anim | vec4anim | colorAnim;