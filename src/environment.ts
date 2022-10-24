import { environment } from './mapHandler.ts'
import { Track, vec3 } from './types.ts'

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

    id(x: string) { this.e._id = x; return this }
    method(x: "Regex" | "Contains" | "Exact") { this.e._lookupMethod = x; return this }
    duplicate(x: number) { this.e._duplicate = x; return this }
    active(x: boolean) { this.e._active = x; return this }
    scale(x: vec3) { this.e._scale = x; return this }
    pos(x: vec3) { this.e._position = x; return this }
    localPos(x: vec3) { this.e._localPosition = x; return this }
    rot(x: vec3) { this.e._rotation = x; return this }
    localRot(x: vec3) { this.e._localRotation = x; return this }
    lightID(x: number) { this.e._lightID = x; return this }
    track(x: Track) { this.e._track = x; return this }
    end() {
        environment.push(this.e);
    }
}