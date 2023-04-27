import IMaterial from "../interfaces/environment/material";
import { materialNames, materials } from "../map/variables";
import shader from "../types/shader";
import { vec4 } from "../types/vectors";

export default class Material implements IMaterial {
    name: string;
    color: vec4;
    shader: shader;
    track?: string | string[];
    shaderKeywords?: string[];

    constructor(name: string, properties: IMaterial) {
        this.name = name;
        this.color = properties.color;
        this.shader = properties.shader;
        if (properties.track) this.track = properties.track;
        if (properties.shaderKeywords) this.shaderKeywords = properties.shaderKeywords;
    }

    push() {
        materialNames.push(this.name);
        Object.assign(materials, { [this.name]: {
            color: this.color,
            shader: this.shader,
            track: this.track,
            shaderKeywords: this.shaderKeywords
        } });
    }
}