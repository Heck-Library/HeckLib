import { vec1anim, vec3anim, vec4anim } from "../../../types/vectors";

export default interface IAnimateTrackData {
    /**
     * The track called for the animation.
     */
    track: string | string[];
    /**
     * Duration of the animation in beats.
     */
    duration: number;
    /**
     * The easing used for the animation.
     */
    easing?: string;
    /**
     * The position animation.
     */
    position?: vec3anim;
    /**
     * The local position animation.
     */
    localPosition?: vec3anim;
    /**
     * The rotation animation.
     */
    rotation?: vec3anim;
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
    /**
     * The time animation.
     */
    time?: vec1anim;
    /**
     * The fog's startY value.
     */
    startY?: vec1anim;
    /**
     * Fog attenuation.
     */
    attenuation?: vec1anim;
    /**
     * Fog offset
     */
    offset?: vec1anim;
    /**
     * Fog height
     */
    height?: vec1anim;
};
