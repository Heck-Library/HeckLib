import shader from "../../types/shader";
import { vec4 } from "../../types/vectors";

export default interface IMaterial {
    color: vec4;
    shader: shader;
    track?: string | string[];
    shaderKeywords?: string[];
}