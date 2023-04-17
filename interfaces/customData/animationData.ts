import { vec1anim, vec3anim, vec4anim } from "../../types/vectors";

export default interface IObjectAnimation {
    position?: vec3anim;
    definitePosition?: vec3anim;
    rotation?: vec3anim;
    localRotation?: vec3anim;
    scale?: vec3anim;
    color?: vec4anim;
    interactable?: vec1anim;
    dissolve?: vec1anim;
    dissolveArrow?: vec1anim;
}