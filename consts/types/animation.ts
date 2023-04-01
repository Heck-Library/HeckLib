import {Track} from "./objects";
import {vec1anim, vec3, vec3anim, vec4anim} from "./vec";

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
    worldPositionStays: boolean;
};

export type playerTrackType = {
    track: Track;
};

export type property = {
    name: string,
    type: 'Texture'|'Float'|'Color'|'Integer',
    value: any
}
export type matPropertyData = {
    asset?: string,
    duration?: number,
    easing?: string,
    properties?: property[]
}

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

export type ppData = {
    asset: string,
    priority?: number,
    pass?: number,
    target?: string,
    duration?: number,
    easing?: string,
    properties: property[]
}

export type cullMaskData = {
    name: string,
    track: string,
    whitelist?: boolean
}

export type renderTextData = {
    name: string,
    xRatio: number,
    yRatio: number,
    width: number,
    height: number
}

export type instPrefabData = {
    asset: string,
    id?: string,
    track?: string,
    position?: vec3,
    localPosition?: vec3,
    rotation?: vec3,
    localRotation?: vec3,
    scale?: vec3
}

export type destroyPrefabData = {
    id: string
}

export type CUSTOMEVENT = {
    time: number;
    type: string;
    data: | destroyPrefabData | instPrefabData | cullMaskData | renderTextData | ppData | matPropertyData | fogTrackData | animateTrackData | pathAnimData | playerTrackType | parentTrackType;
};
