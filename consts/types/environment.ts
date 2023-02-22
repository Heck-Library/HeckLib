import Shader from "../shader.ts";
import Shape from "../shape.ts";
import { Track } from "./objects.ts";
import { vec3 } from "./vec.ts";

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