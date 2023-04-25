import IEnvironment from "../interfaces/environment/environment";
import IGeometryEnvironment from "../interfaces/environment/geometry";
import ILightEvent from "../interfaces/environment/lightEvent";
import IMaterial from "../interfaces/environment/material";
import IUnknownEvent from "../interfaces/events/eventData/ICustomEvent";
import IArc from "../interfaces/objects/arc";
import IBomb from "../interfaces/objects/bomb";
import IChain from "../interfaces/objects/chain";
import INote from "../interfaces/objects/note";
import IWall from "../interfaces/objects/wall";
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
 * Contains all the notes in the map. 
 */
export const notes: INote[] = [];
/**
 * Contains all the arcs in the map.
 */
export const arcs: IArc[] = [];
/**
 * Contains all the chains in the map.
 */
export const chains: IChain[] = [];
/**
 * Contains all the bombs in the map.
 */
export const bombs: IBomb[] = [];
/**
 * Contains all the walls in the map.
 */
export const walls: IWall[] = [];

/**
 * Contains all the fake notes in the map.
 */
export const fakeNotes: Record<string, any>[] = [];
/**
 * Contains all the fake arcs in the map.
 */
export const fakeArcs: Record<string, any>[] = [];
/**
 * Contains all the fake chains in the map.
 */
export const fakeChains: Record<string, any>[] = [];
/**
 * Contains all the fake bombs in the map.
 */
export const fakeBombs: Record<string, any>[] = [];
/**
 * Contains all the fake walls in the map.
 */
export const fakeWalls: Record<string, any>[] = [];

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