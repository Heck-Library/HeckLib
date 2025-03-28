import { BaseColor } from "./enums";

enum BasePlayer {
    HeadPosition = "baseHeadPosition",
    HeadLocalPosition = "baseHeadLocalPosition",
    HeadRotation = "baseHeadRotation",
    HeadLocalRotation = "baseHeadLocalRotation",
    HeadLocalScale = "baseHeadLocalScale",
    LeftHandPosition = "baseLeftHandPosition",
    LeftHandLocalPosition = "baseLeftHandLocalPosition",
    LeftHandRotation = "baseLeftHandRotation",
    LeftHandLocalRotation = "baseLeftHandLocalRotation",
    LeftHandLocalScale = "baseLeftHandLocalScale",
    RightHandPosition = "baseRightHandPosition",
    RightHandLocalPosition = "baseRightHandLocalPosition",
    RightHandRotation = "baseRightHandRotation",
    RightHandLocalRotation = "baseRightHandLocalRotation",
    RightHandLocalScale = "baseRightHandLocalScale"
}

type AxisModifier = "" | `.${string}`; // .x, .y, .z, .w

type SmoothingValue = `${"s"}${number}${"" | `_${number}`}`;

export type PlayerString = `${BasePlayer}${AxisModifier}${"" | `.${SmoothingValue}`}`;
export type ColorString = `${BaseColor}${AxisModifier}`;

