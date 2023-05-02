import IComponents from "../interfaces/components/components";
import IGeometryEnvironment from "../interfaces/environment/geometry";
import IGeometryProperties from "../interfaces/environment/geometryProperties";
import { geometry } from "../map/variables";
import { vec3 } from "../types/vectors";

/**
 * ### Shape
 * 
 * The shape of the geometry object. This is used to determine the type of geometry to create.
 */
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

    /**
     * ### Shape
     * 
     * The enumerator for the shape of the geometry object. This is used to determine the type of geometry to create.
     */
    public static readonly SHAPE = SHAPE;

    /**
     * ### Components
     * 
     * The components of the geometry object.
     * 
     * type: `IComponents`
     */
    public components?: IComponents;
    /**
     * ### Active
     * 
     * Whether the geometry object is active or not.
     * 
     * type: `boolean`
     */
    public active?: boolean;
    /**
     * ### Scale
     * 
     * The scale of the geometry object. Formatted as `[x, y, z]`.
     * 
     * type: `vec3`
     */
    public scale?: vec3;
    /**
     * ### Position
     * 
     * The position of the geometry object. Formatted as `[x, y, z]`.
     * 
     * type: `vec3`
     */
    public position?: vec3;
    /**
     * ### Local Position
     * 
     * The local position of the geometry object. Formatted as `[x, y, z]`.
     * 
     * type: `vec3`
     */
    public localPosition?: vec3;
    /**
     * ### Rotation
     * 
     * The rotation of the geometry object in degrees. Formatted as `[pitch, yaw, roll]`.
     * 
     * type: `vec3`
     */
    public rotation?: vec3;
    /**
     * ### Local Rotation
     * 
     * The local rotation of the geometry object in degrees. Formatted as `[pitch, yaw, roll]`.
     * 
     * type: `vec3`
     */
    public localRotation?: vec3;
    /**
     * ### Light ID
     * 
     * The ID of the light to attach to the geometry object.
     * 
     * type: `number`
     */
    public lightID?: number;
    /**
     * ### Track
     * 
     * The track to attach the geometry object to. This can be a single track or an array of tracks.
     * 
     * type: `string | string[]`
     */
    public track?: string | string[];
    /**
     * ### Geometry
     * 
     * The properties of the geometry object.
     * 
     * type: `IGeometryProperties`
     * 
     * #### Example
     * 
     * ```ts
     * {
     *     shape: Geometry.SHAPE.CUBE,
     *     material: 'Material Name'
     * }
     * ```
     */
    public geometry: IGeometryProperties;

    /**
     * ### Geometry
     * 
     * The constructor for the `Geometry` class.
     * 
     * Creates a new geometry object.
     */
    constructor();
    /**
     * ### Geometry
     * 
     * The constructor for the `Geometry` class.
     * 
     * Creates a new geometry object using parameters.
     * 
     * #### Usage
     * 
     * ```ts
     * new Geometry({
     *     components: IComponents,
     *     active: boolean,
     *     scale: vec3,
     *     position: vec3,
     *     localPosition: vec3,
     *     rotation: vec3,
     *     localRotation: vec3,
     *     lightID: number,
     *     track: string | string[],
     *     geometry: IGeometryProperties
     * }).push();
     * ```
     */
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

    /**
     * ### Push
     * 
     * Pushes the geometry object to the map.
     */
    push() : void {
        geometry.push(this);
    }
}