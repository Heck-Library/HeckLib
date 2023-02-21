
export type vec1 = [x: number];
export type vec2 = [x: number, y: number];
export type vec3 = [x: number, y: number, z: number];
export type vec4 = [r: number, g: number, b: number, a: number];

export type vec1frame = [x: number, time: number, easing?: string];
export type vec3frame = [
    x: number,
    y: number,
    z: number,
    time: number,
    easing?: string,
    spline?: "splineCatmullRom"
];
export type vec4frame = [
    r: number,
    g: number,
    b: number,
    a: number,
    time: number,
    easing?: string,
    spline?: "splineCatmullRom"
];

export type vec1anim = string | vec1frame[] | vec1;
export type vec3anim = string | vec3frame[] | vec3;
export type vec4anim = string | vec4frame[] | vec4;

export type unknownAnimation = vec1anim | vec3anim | vec4anim;