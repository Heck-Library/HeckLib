import Shader from "../shader";
import Shape from "../shape";
import { Track } from "./objects";
import { vec3 } from "./vec";

export type geoShape =
    | string
    | Shape.Capsule
    | Shape.Cube
    | Shape.Cylinder
    | Shape.Plane
    | Shape.Quad
    | Shape.Sphere
    | Shape.Triangle;
    
export type shaderType =
    | string
    | Shader.OpaqueLight
    | Shader.TransparentLight
    | Shader.Standard;
    
export type mat = {
    _color: vec3;
    _shader: shaderType;
    _track?: Track;
    _shaderKeywords?: string[];
};