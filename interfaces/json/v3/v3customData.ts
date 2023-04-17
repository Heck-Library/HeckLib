import { vec2, vec3, vec4 } from "../../../types/vectors";
import v3objectAnimation from "./v3objectAnimation";

export default interface v3customData {
    color?: vec4;
    disableNoteGravity?: boolean;
    disableNoteLook?: boolean;
    disableSpawnEffect?: boolean;
    flip?: vec2;
    uninteractable?: boolean;
    localRotation?: vec3;
    scale?: vec3;
    fake?: boolean;
    njs?: number;
    offset?: number;
    worldRotation?: vec3;
    coordinates?: vec2;
}
