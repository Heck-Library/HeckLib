import { vec1anim, vec3anim, vec4anim } from "../../../types/vectors";

export default interface IPathAnimData {
    offsetPosition?: vec3anim;
    /**
     * The track called for the animation.
     */
    track: string | string[];
    /**
     * The easing used for the animation.
     */
    easing?: string;
    /**
     * The position animation.
     */
    position?: vec3anim;
    /**
     * The definite position animation.
     */
    definitePosition?: vec3anim;
    /**
     * The rotation animation.
     */
    rotation?: vec3anim;
    offsetWorldRotation?: vec3anim;
    /**
     * The local rotation animation.
     */
    localRotation?: vec3anim;
    /**
     * The scale animation.
     */
    scale?: vec3anim;
    /**
     * The color animation.
     */
    color?: vec4anim;
    /**
     * The dissolve animation.
     */
    dissolve?: vec1anim;
    /**
     * The dissolve arrow animation.
     */
    dissolveArrow?: vec1anim;
    /**
     * The interactable animation.
     */
    interactable?: vec1anim;
};
