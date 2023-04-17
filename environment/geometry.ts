import IComponents from "../interfaces/components/components";
import IGeometryEnvironment from "../interfaces/environment/geometry";
import IGeometryProperties from "../interfaces/environment/geometryProperties";
import { geometry } from "../map/initialize";
import { vec3 } from "../types/vectors";

enum SHAPE {
    CUBE = "Cube",
    SPHERE = "Sphere",
    CYLINDER = "Cylinder",
    CAPSULE = "Capsule",
    PLANE = "Plane",
    QUAD = "Quad",
    TRIANGLE = "Triangle"
}

export default class Geometry implements IGeometryEnvironment {

    public static readonly SHAPE = SHAPE;

    public components?: IComponents;
    public active?: boolean;
    public scale?: vec3;
    public position?: vec3;
    public localPosition?: vec3;
    public rotation?: vec3;
    public localRotation?: vec3;
    public lightID?: number;
    public track?: string | string[];
    public geometry: IGeometryProperties;

    constructor();
    constructor(geometry: IGeometryEnvironment);
    constructor(geometry?: IGeometryEnvironment) {
        const { components, active, scale, position, localPosition, rotation, localRotation, lightID, track, geometry: geometryProperties } = geometry || {};

        this.geometry = {
            shape: Geometry.SHAPE.CUBE,
            material: ''
        };

        if (typeof geometry !== 'undefined') {
            if (components) this.components = components;
            if (active) this.active = active;
            if (scale) this.scale = scale;
            if (position) this.position = position;
            if (localPosition) this.localPosition = localPosition;
            if (rotation) this.rotation = rotation;
            if (localRotation) this.localRotation = localRotation;
            if (lightID) this.lightID = lightID;
            if (track) this.track = track;
            if (geometryProperties) this.geometry = geometryProperties;
        }
    }

    push() : void {
        geometry.push(this);
    }
}