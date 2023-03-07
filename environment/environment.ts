import Shader from "../consts/shader";
import Shape from "../consts/shape";
import { geoShape, mat } from "../consts/types/environment/environment";
import { Track } from "../consts/types/objects";
import { vec3 } from "../consts/types/vec";
import { environment, V3 } from "../map/mapHandler";

interface IEnvironment {
    _id?: string;
    _lookupMethod?: "Regex" | "Contains" | "Exact";
    _duplicate?: number;
    _active?: boolean;
    _scale?: vec3;
    _position?: vec3;
    _localPosition?: vec3;
    _rotation?: vec3;
    _localRotation?: vec3;
    _lightID?: number;
    _track?: Track;
    _geometry?: {
        _type: geoShape;
        _material: string | mat;
        _collision?: boolean;
        _track?: Track;
    };
}

export default class Environment {
    private environment: IEnvironment;

    /**
     * Creates a new Environment modification.
     * This feature uses Chroma, not Noodle.
     */
    constructor() {
        this.environment = {};
    }
    /**
     * Searches for an environment object using regex.
     * @param x Your regex lookup.
     */
    regex(x: string | RegExp) {
        let id: string;
        if (typeof x !== "string") {
            id = x.toString().replaceAll("/", "");
        } else {
            id = x.toString().replaceAll("/", "");
        }
        this.environment._id = id;
        this.environment._lookupMethod = "Regex";
        return this;
    }
    /**
     * Searches for an environment object using contains lookup.
     * @param x Your ID match.
     */
    contains(x: string) {
        this.environment._id = x;
        this.environment._lookupMethod = "Contains";
        return this;
    }
    /**
     * Searches for an environment object using exact match.
     * @param x The object's entire ID.
     */
    exact(x: string) {
        this.environment._id = x;
        this.environment._lookupMethod = "Exact";
        return this;
    }
    /**
     * How many times to duplicate the environment piece.
     */
    duplicate(x: number) {
        this.environment._duplicate = x;
        return this;
    }
    /**
     * If the environment piece should be disabled or active.
     */
    active(x: boolean) {
        this.environment._active = x;
        return this;
    }
    /**
     * The scale of the environment piece.
     */
    scale(x: vec3) {
        this.environment._scale = x;
        return this;
    }
    /**
     * The position that this environment piece should be set to.
     */
    pos(x: vec3) {
        this.environment._position = x;
        return this;
    }
    /**
     *  The local position that this environment piece should be set to.
     */
    localPos(x: vec3) {
        this.environment._localPosition = x;
        return this;
    }
    /**
     * The rotation that this environment piece should have.
     */
    rot(x: vec3) {
        this.environment._rotation = x;
        return this;
    }
    /**
     * The local rotation that this environment piece should have.
     */
    localRot(x: vec3) {
        this.environment._localRotation = x;
        return this;
    }
    /**
     *  What the light id of this environment piece should be.
     */
    lightID(x: number) {
        this.environment._lightID = x;
        return this;
    }
    /**
     * Which track the environment piece should be assigned to.
     */
    track(x: Track) {
        this.environment._track = x;
        return this;
    }
    geometry() {
        this.environment._geometry = {
            _type: Shape.Cube,
            _material: { _color: [1, 1, 1], _shader: Shader.Standard },
        };
        return this;
    }

    shape(x: geoShape) {
        if (!this.environment._geometry)
            return this;
        this.environment._geometry._type = x;
        return this;
    }
    material(x: string | mat) {
        if (!this.environment._geometry)
            return this;
        this.environment._geometry._material = x;
        return this;
    }
    collision(x: boolean) {
        if (!this.environment._geometry)
            return this;
        this.environment._geometry._collision = x;
        return this;
    }
    /**
     * Push the environment piece to the map data.
     */
    push() {
        let out = this.environment;
        if (V3) {
            const stringified = JSON.stringify(this.environment).replace(/_/g, "");
            out = JSON.parse(stringified);
        }
        environment.push(out);
    }
}
