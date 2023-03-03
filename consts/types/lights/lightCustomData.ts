import { vec3, vec4 } from "../vec";


export type lightCustomData = {
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
