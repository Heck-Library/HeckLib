import { BaseModifier } from "./baseValues/BaseModifier";
import { ColorModifier } from "./baseValues/ColorModifier";
import { Ease as ease } from "./easings";
import { Operator } from "./enums";

export type operator = Operator | 
    "opNone" |
    "opAdd" |
    "opSub" |
    "opMul" |
    "opDiv";

export type colorModifier = [number, number, number, number, operator];

export type AnimationType = number | string
export type AnimationCalculated = [AnimationType, operator, AnimationCalculated?]
export type AnimationValue = AnimationType | AnimationCalculated;

export type Color = Vec4 | ColorModifier;
 
export type Vec1Keyframe = [AnimationValue, AnimationValue, ease?];
export type Vec2Keyframe = [AnimationValue, AnimationValue, AnimationValue, ease?];
export type Vec3Keyframe = [AnimationValue, AnimationValue, AnimationValue, AnimationValue, ease?];
export type PositionKeyframe = [AnimationValue, AnimationValue, AnimationValue, AnimationValue, ease?, "splineCatmullRom"?] | [AnimationValue, AnimationValue, AnimationValue, AnimationValue, "splineCatmullRom"?, ease?];
export type Vec4Keyframe = [AnimationValue, AnimationValue, AnimationValue, AnimationValue, AnimationValue, ease?];
export type ColorKeyframe = []


// A base value: Either a `number` or a class extending `BaseModifier`
type BaseValue = number | BaseModifier;
type AnimTime = 0 | 1 | (number & { readonly __rangeCheck?: true });
type Modifier = [BaseValue, operator] | [BaseValue, operator, Modifier];
type ModifierSlot = [BaseModifier] | [BaseModifier, Modifier];
type BaseSlot = BaseValue | [BaseValue, Modifier];

export type Vec1 = [BaseSlot];
export type Vec2 = 
    [BaseSlot, BaseSlot]
    | [...ModifierSlot];
export type Vec3 = 
    [BaseSlot, BaseSlot, BaseSlot]
    | [...ModifierSlot, BaseSlot]
    | [BaseSlot, ...ModifierSlot]
    | [...ModifierSlot];
export type Vec4 = 
    [BaseSlot, BaseSlot, BaseSlot, BaseSlot]
    | [...ModifierSlot, BaseSlot, BaseSlot]
    | [BaseSlot, ...ModifierSlot, BaseSlot]
    | [BaseSlot, BaseSlot, ...ModifierSlot]
    | [...ModifierSlot];

type XKeyframe = [...Vec1, AnimTime, ease?];
export type Vec1Animation = XKeyframe[] | Vec1 | string;

type XYZKeyframe = [...Vec3, AnimTime, ease?];
export type Vec3Animation = XYZKeyframe[] | Vec3 | string;

type PosKeyframe = [...XYZKeyframe, "splineCatmullRom"?];
export type PositionAnimation = PosKeyframe[] | Vec3 | string;

type XYZWKeyframe = [...Vec4, AnimTime, ease?]
export type Vec4Animation = XYZWKeyframe[] | Vec4 | string;

type RGBAKeyframe = 
    [...Vec4, AnimTime, ease?]
    | [...Vec3, AnimTime, ease?]
    | [ColorModifier, AnimTime, ease?]
    | [ColorModifier, Modifier, AnimTime, ease?];
export type ColorAnimation = RGBAKeyframe[] | Color | string;

export type AnyAnimation = Vec1Animation | Vec3Animation | PositionAnimation | Vec4Animation | ColorAnimation;
export type AnyVec = Vec1 | Vec2 | Vec3 | Vec4;
