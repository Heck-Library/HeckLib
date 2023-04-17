import { vec2, vec3, vec4 } from "../../types/vectors";

export default interface ICustomData {
    track?: string | string[];
    color?: vec4;
    position?: vec2;
    rotation?: vec3;
    localRotation?: vec3;
    flip?: vec2;
    scale?: vec3;
    njs?: number;
    offset?: number;
    fake?: boolean;
    interactable?: boolean;
    disableSpawnEffect?: boolean;
    disableNoteGravity?: boolean;
    disableNoteLook?: boolean;
}