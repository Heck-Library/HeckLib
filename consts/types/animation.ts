import {Track} from "./objects";
import {vec1anim, vec3anim, vec4anim} from "./vec";

export type POINTDEFINITION = {
    name: string;
    points: vec1anim | vec3anim | vec4anim;
};

export type parentTrackType = {
    /**
     * The children will be assigned to this track.
     */
    parentTrack: Track;
    /**
     * These tracks will be assigned under the parent track.
     */
    childrenTracks: string[];
};

export type playerTrackType = {
    track: Track;
};

export type animateTrackData = {
    /**
     * The track called for the animation.
     */
    track: Track;
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
    timeAnim?: vec1anim;
};

export type pathAnimData = {
    /**
     * The track called for the animation.
     */
    track: Track;
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
};

export type animComponentData = {
    track: Track;
    duration: number;
    easing?: string;
    BloomFogEnvironment?: {
        attenuation?: vec1anim;
        offset?: vec1anim;
        startY?: vec1anim;
        height?: vec1anim;
    };
    TubeBloomPrePassLight?: {
        colorAlphaMultiplier?: vec1anim;
        bloomFogIntensityMultiplier?: vec1anim;
    };
};

export type fogTrackData = {
    track: Track;
};

export type CUSTOMEVENT = {
    b?: number;
    t?: string;
    d?: fogTrackData | animateTrackData | pathAnimData | playerTrackType | parentTrackType;
    json: {
        time: number;
        type: string;
        data: | fogTrackData | animateTrackData | pathAnimData | playerTrackType | parentTrackType;
    };
};
