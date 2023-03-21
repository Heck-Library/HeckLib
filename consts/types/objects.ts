import { vec1anim, vec2, vec3, vec3anim, vec4, vec4anim } from "./vec";

export type Track = string | string[];

export type lineIndex = 0 | 1 | 2 | 3;
export type lineLayer = 0 | 1 | 2;
export type noteDir = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type noteType = 0 | 1 | 3;
export type WALL = {
    time: number;
    x?: lineIndex;
    y?: lineLayer;
    duration?: number;
    width?: number;
    height?: number;
    data: customNoteData;
    anim: animationData;
};

export type customWallData = {
    track?: Track;
    color?: vec4;
    position?: vec2;
    rotation?: vec3;
    localRotation?: vec3;
    size?: vec2;
    scale?: vec3;
    njs?: number;
    offset?: number;
    fake?: boolean;
    interactable?: boolean;
};

export type NOTE = {
    time: number;
    x?: lineIndex;
    y?: lineLayer;
    angle?: number;
    type?: noteType;
    direction?: noteDir;
    data: customNoteData;
    anim: animationData;
};
export type CHAIN = {
    time: number;
    x?: number;
    y?: number;
    type?: 0 | 1;
    direction?: noteDir;
    endTime?: number;
    endX?: number;
    endY?: number;
    segments?: number;
    squish?: number;
    data: customNoteData;
    anim: animationData;
}
export type ARC = {
    time: number;
    x?: number;
    y?: number;
    type?: 0 | 1;
    direction?: noteDir;
    multiplier?: number;
    endTime?: number;
    endX?: number;
    endY?: number;
    endDirection?: noteDir;
    endMultiplier?: number;
    anchor?: 0 | 1 | 2;
    data: customNoteData;
    anim: animationData;
}
export type BOMB = {
    time: number;
    x?: lineIndex;
    y?: lineLayer;
    data: customNoteData;
    anim: animationData;
};

export type customNoteData = {
    track?: Track;
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
};

export type animationData = {
    position?: vec3anim;
    definitePosition?: vec3anim;
    rotation?: vec3anim;
    localRotation?: vec3anim;
    scale?: vec3anim;
    color?: vec4anim;
    interactable?: vec1anim;
    dissolve?: vec1anim;
    dissolveArrow?: vec1anim;
};