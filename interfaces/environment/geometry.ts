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
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * Doesn't exist.
     * #### V3
     * ```json
     * "components": { ... }
     * ```
     */
    components?: IComponents;
    /**
     * ### Active
     * 
     * Whether the geometry object is active or not. Defaults to `true`. If set to `false`, the geometry object will not be created.
     * 
     * type: `boolean`
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * "_active": true
     * ```
     * #### V3
     * ```json
     * "active": true
     * ```
     */
    active?: boolean;
    /**
     * ### Scale
     * 
     * The scale of the geometry object. Formatted as `[x, y, z]`. Defaults to `[1, 1, 1]`.
     * 
     * type: `vec3`
     * 
     * ---
     * 
     * ### JSON Equivalents	
     * #### V2
     * ```json
     * "_scale": vec3
     * ```
     * #### V3
     * ```json
     * "scale": vec3
     * ```
     */
    scale?: vec3;
    /**
     * ### Position
     * 
     * The position of the geometry object. Formatted as `[x, y, z]`. Defaults to `[0, 0, 0]`. This is relative to the world. If localPosition is set, it is ignored and this will override it instead.
     * 
     * type: `vec3`
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * "_position": vec3
     * ```
     * #### V3
     * ```json
     * "position": vec3
     * ```
     */
    position?: vec3;
    /**
     * ### Local Position
     * 
     * The local position of the geometry object. Formatted as `[x, y, z]`. Defaults to `[0, 0, 0]`. This is relative to the parent object. If there is no parent object, this is relative to the world. If position is set, this is ignored.
     * 
     * type: `vec3`
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * "_localPosition": vec3
     * ```
     * #### V3
     * ```json
     * "localPosition": vec3
     * ```
     */
    localPosition?: vec3;
    /**
     * ### Rotation
     * 
     * The rotation of the geometry object in degrees. Formatted as `[pitch, yaw, roll]`. Defaults to `[0, 0, 0]`.
     * 
     * type: `vec3`
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * "_rotation": vec3
     * ```
     * #### V3
     * ```json
     * "rotation": vec3
     * ```
     */
    rotation?: vec3;
    /**
     * ### Local Rotation
     * 
     * The local rotation of the geometry object in degrees. Formatted as `[pitch, yaw, roll]`. Defaults to `[0, 0, 0]`.
     * 
     * type: `vec3`
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * "_localRotation": vec3
     * ```
     * #### V3
     * ```json
     * "localRotation": vec3
     * ```
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
     * 
     * ---
     * 
     * ### JSON Equivalents
     * #### V2
     * ```json
     * "_geometry": { ... }
     * ```
     * #### V3
     * ```json
     * "geometry": { ... }
     * ```
     */
    geometry: IGeometryProperties;
}