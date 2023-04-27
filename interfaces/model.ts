import shape from "../types/shape";
import { vec3, vec4 } from "../types/vectors";

export default interface IModel {
    position: vec3;
    rotation: vec3;
    scale: vec3;
    color: vec4;
    shape: shape;
}