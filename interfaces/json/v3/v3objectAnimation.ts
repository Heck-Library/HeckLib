import { vec1anim, vec3anim, vec4 } from "../../../types/vectors";

export default interface v3objectAnimation {
    offsetPosition?: vec3anim;
    offsetWorldRotation?: vec3anim;
    localRotation?: vec3anim;
    scale?: vec3anim;
    dissolve?: vec1anim;
    dissolveArrow?: vec1anim;
    color?: vec4;
    interactable?: vec1anim;
    definitePosition?: vec3anim;
}
