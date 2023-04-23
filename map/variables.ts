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

export const pointDefinitions: Record<string, unknownAnim> = {};
export const definitionNames: string[] = [];

export const events: IUnknownEvent[] = [];

export const notes: INote[] = [];
export const arcs: IArc[] = [];
export const chains: IChain[] = [];
export const bombs: IBomb[] = [];
export const walls: IWall[] = [];

export const fakeNotes: Record<string, any>[] = [];
export const fakeArcs: Record<string, any>[] = [];
export const fakeChains: Record<string, any>[] = [];
export const fakeBombs: Record<string, any>[] = [];
export const fakeWalls: Record<string, any>[] = [];

export const lightEvents: ILightEvent[] = [];

export const environment: IEnvironment[] = [];
export const materials: Record<string, IMaterial> = {};
export const geometry: IGeometryEnvironment[] = [];
export const materialNames: string[] = [];