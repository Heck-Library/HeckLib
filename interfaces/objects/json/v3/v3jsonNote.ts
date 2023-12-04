import cutDirection from "../../../../types/cutDirection";
import lineIndex from "../../../../types/lineIndex";
import lineLayer from "../../../../types/lineLayer";
import { colorAnim, vec1anim, vec2, vec3, vec3anim, vec4, vec4anim } from "../../../../types/vectors";
import ICustomData from "../../../customData/customNoteData";

export default interface V3JsonNote {
    b: number;
    x: lineIndex;
    y: lineLayer;
    d: cutDirection;
    c: number;
    a: number;
    f: number;
    customData?: {
        color?: vec4;
        track?: string | string[];
        spawnEffect?: boolean;
        disableNoteGravity?: boolean;
        disableNoteLook?: boolean;
        fake?: boolean;
        uninteractable?: boolean;
        coordinates?: vec2;
        worldRotation?: vec3;
        scale?: vec3;
        flip?: vec2;
        localRotation?: vec3;
        noteJumpStartBeatOffset?: number;
        noteJumpMovementSpeed?: number;
        animation?: {
            definitePosition?: vec3anim;
            offsetWorldRotation?: vec3anim;
            localRotation?: vec3anim;
            offsetPosition?: vec3anim;
            scale?: vec3anim;
            dissolve?: vec1anim;
            dissolveArrow?: vec1anim;
            color?: colorAnim | vec4anim;
        }
    }
}