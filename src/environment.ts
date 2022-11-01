// deno-lint-ignore-file no-explicit-any

import { Shader, Shape } from './consts.ts'
import { environment, materials } from './mapHandler.ts'
import { geoShape, Track, vec3, vec4, shaderType, mat } from './types.ts'

export class Environment {
    e: {
        _id?: string
        _lookupMethod?: "Regex" | "Contains" | "Exact"
        _duplicate?: number
        _active?: boolean
        _scale?: vec3
        _position?: vec3
        _localPosition?: vec3
        _rotation?: vec3
        _localRotation?: vec3
        _lightID?: number
        _track?: Track
    }

    constructor() {
        this.e = {}
    }

    /**
     * The id of the environment piece.
     */
    id(x: string) { this.e._id = x; return this }
    /**
     * The lookup method to use.
     */
    method(x: "Regex" | "Contains" | "Exact") { this.e._lookupMethod = x; return this }
    /**
     * How many times to duplicate the environment piece.
     */
    duplicate(x: number) { this.e._duplicate = x; return this }
    /**
     * If the environment piece should be disabled or active.
     */
    active(x: boolean) { this.e._active = x; return this }
    /**
     * The scale of the environment piece.
     */
    scale(x: vec3) { this.e._scale = x; return this }
    /**
     * The position that this environment piece should be set to.
     */
    pos(x: vec3) { this.e._position = x; return this }
    /**
     *  The local position that this environment piece should be set to.
     */
    localPos(x: vec3) { this.e._localPosition = x; return this }
    /**
     * The rotation that this environment piece should have.
     */
    rot(x: vec3) { this.e._rotation = x; return this }
    /**
     * The local rotation that this environment piece should have.
     */
    localRot(x: vec3) { this.e._localRotation = x; return this }
    /**
     *  What the light id of this environment piece should be.
     */
    lightID(x: number) { this.e._lightID = x; return this }
    /**
     * Which track the environment piece should be assigned to.
     */
    track(x: Track) { this.e._track = x; return this }
    /**
     * Push the environment piece to the map data.
     */
    push() {
        environment.push(this.e);
    }
}

export class Material {
    stuff: any
    m: {
        _color: vec4,
        _shader: shaderType,
        _track?: Track,
        _shaderKeywords?: string[]
    }
    constructor(name: string) {
        this.m = {
            _color: [0, 0, 0, 0],
            _shader: Shader.Standard
        }
        const m = this.m;
        this.stuff = JSON.parse(`{"${name}": {"_color": ${JSON.stringify(m._color)},"_shader": ${JSON.stringify(m._shader)}}}`);
    }
    /**
     * The color of the material.
     */
    color(x: vec4) { this.stuff[Object.keys(this.stuff)[0]]._color = x; return this; }
    /**
     * Which shader the material should use.
     */
    shader(x: shaderType) { this.stuff[Object.keys(this.stuff)[0]]._shader = x; return this; }
    /**
     * Which track the material should be assigned to.
     */
    track(x: Track) { this.stuff[Object.keys(this.stuff)[0]]._track = x; return this; }
    /**
     * The keywords for the material.
     */
    keywords(x: string[]) { this.stuff[Object.keys(this.stuff)[0]]._shaderKeywords = x; return this; }
    /**
     * Push the material to the map data.
     */
    push() { materials.push(this.stuff) }
}

export class Geometry extends Environment{
    geometry: any
    e: {
        _type: geoShape,
        _material: string | mat,
        _collision?: boolean,
        _track?: Track
    }
    constructor() {
        super();
        this.e = {
            _type: Shape.Cube,
            _material: {
                _color: [1, 1, 1, 1],
                _shader: Shader.Standard
            }
        }
    }
    /**
     * The shape of the geometry.
     */
    shape(x: geoShape) { this.e._type = x; return this}
    /**
     * Which material the geometry should use.
     */
    material(x: string | mat) { this.e._material = x; return this }
    /**
     * If the material should have collision or not
     */
    collision(x: boolean) { this.e._collision = x; return this }
    /**
     * Push the geometry to the map data.
     */
    push() {
        this.geometry = {geometry: this.e};
        environment.push(this.geometry)
    }
}