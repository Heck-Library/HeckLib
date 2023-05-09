import IEnvironment from "../interfaces/environment/environment";
import IGeometryEnvironment from "../interfaces/environment/geometry";
import ILightEvent from "../interfaces/environment/lightEvent";
import IMaterial from "../interfaces/environment/material";
import IUnknownEvent from "../interfaces/events/eventData/ICustomEvent";
import IArc from "../interfaces/objects/arc";
import IBomb from "../interfaces/objects/bomb";
import { unknownAnim } from "../types/vectors";

/**
 * Contains all the point definitions of the map in the following format:
 * ```ts
 * {
 *     dissolveIn: [
 *         [0, 0],
 *         [1, 0.25, ease.Out.Circ]
 *     ],
 *     pulseScale: [
 *         [2, 2, 2, 0],
 *         [1, 1, 1, 1, ease.Out.Quad]
 *     ],
 *     redToBlue: [
 *         [1, 0, 0, 1, 0],
 *         [0, 0, 1, 1, 1, ease.InOut.Sine]
 *     ]
 * }
 * ```
 */
export const pointDefinitions: Record<string, unknownAnim> = {};
/**
 * Contains all the point definition names in the map.
 */
export const definitionNames: string[] = [];

/**
 * Contains all the custom events in the map.
 */
export const events: IUnknownEvent[] = [];
/**
 * Contains all the bombs in the map.
 */
export const bombs: IBomb[] = [];

/**
 * Contains all the fake bombs in the map.
 */
export const fakeBombs: Record<string, any>[] = [];

/**
 * Contains all the light events in the map.
 */
export const lightEvents: ILightEvent[] = [];

/**
 * Contains all the environment objects in the map. (Excluding geometry)
 */
export const environment: IEnvironment[] = [];
/**
 * Contains all the materials in the map.
 */
export const materials: Record<string, IMaterial> = {};
/**
 * Contains all the geometry objects in the map.
 */
export const geometry: IGeometryEnvironment[] = [];
/**
 * Contains all the material names in the map.
 */
export const materialNames: string[] = [];