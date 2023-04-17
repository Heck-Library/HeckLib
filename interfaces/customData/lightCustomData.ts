import { vec3, vec4 } from "../../types/vectors";

export default interface ILightCustomData {
    lightID?: number;
    color?: vec3 | vec4;
    easing?: string;
    lerpType?: "HSV" | "RGB";
    lockPosition?: boolean;
    nameFilter?: string;
    rotation?: number;
    step?: number;
    prop?: number;
    speed?: number;
    direction?: 0 | 1;
};