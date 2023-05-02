import { vec3 } from "../../types/vectors";
import IComponents from "../components/components";
import IGeometryProperties from "./geometryProperties";

export default interface IGeometryEnvironment {
    /**
     * ### Components
     * 
     * The components of the geometry object.
     * 
     * type: `IComponents`
     */
    components?: IComponents;
    /**
     * ### Active
     * 
     * Whether the geometry object is active or not.
     * 
     * type: `boolean`
     */
    active?: boolean;
    /**
     * ### Scale
     * 
     * The scale of the geometry object. Formatted as `[x, y, z]`.
     * 
     * type: `vec3`
     */
    scale?: vec3;
    /**
     * ### Position
     * 
     * The position of the geometry object. Formatted as `[x, y, z]`.
     * 
     * type: `vec3`
     */
    position?: vec3;
    /**
     * ### Local Position
     * 
     * The local position of the geometry object. Formatted as `[x, y, z]`.
     * 
     * type: `vec3`
     */
    localPosition?: vec3;
    /**
     * ### Rotation
     * 
     * The rotation of the geometry object in degrees. Formatted as `[pitch, yaw, roll]`.
     * 
     * type: `vec3`
     */
    rotation?: vec3;
    /**
     * ### Local Rotation
     * 
     * The local rotation of the geometry object in degrees. Formatted as `[pitch, yaw, roll]`.
     * 
     * type: `vec3`
     */
    localRotation?: vec3;
    /**
     * ### Light ID
     * 
     * The ID of the light to attach to the geometry object.
     * 
     * type: `number`
     */
    lightID?: number;
    /**
     * ### Track
     * 
     * The track to attach the geometry object to. This can be a single track or an array of tracks.
     * 
     * type: `string | string[]`
     */
    track?: string | string[];
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
    geometry: IGeometryProperties;
}