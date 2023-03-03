import { geoShape } from "./environment";
import { vec3, vec4 } from "./vec";

//#endregion
//#region CustomEvents
//#endregion
export type JsonModel = {
    position: vec3;
    rotation: vec3;
    scale: vec3;
    shape: geoShape;
    color: vec4;
};
