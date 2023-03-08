// deno-lint-ignore-file no-explicit-any
import Shader from "../consts/shader";
import { shaderType } from "../consts/types/environment/environment";
import { Track } from "../consts/types/objects";
import { vec3 } from "../consts/types/vec";
import { materialNames, materials, V3 } from "../map/initialize";

interface IMaterial {
    _color: vec3;
    _shader: shaderType;
    _track?: Track;
    _shaderKeywords?: string[];
}

export default class Material {
    private materialJSON: Record<string, any>;
    private name: string;
    private material: IMaterial;
    constructor(name: string) {
        this.name = name;
        this.material = {
            _color: [0, 0, 0],
            _shader: Shader.Standard,
            _shaderKeywords: [],
        };
        const m = this.material;
        this.materialJSON = JSON.parse(
            `{"${name}": {"_color": ${JSON.stringify(
                m._color
            )},"_shader": ${JSON.stringify(m._shader)}}}`
        );
    }
    /**
     * The color of the material.
     */
    color(x: vec3) {
        this.materialJSON[Object.keys(this.materialJSON)[0]]._color = x;
        return this;
    }
    /**
     * Which shader the material should use.
     */
    shader(x: shaderType) {
        this.materialJSON[Object.keys(this.materialJSON)[0]]._shader = x;
        return this;
    }
    /**
     * Which track the material should be assigned to.
     */
    track(x: Track) {
        this.materialJSON[Object.keys(this.materialJSON)[0]]._track = x;
        return this;
    }
    /**
     * The keywords for the material.
     */
    keywords(x: string[]) {
        this.materialJSON[Object.keys(this.materialJSON)[0]]._shaderKeywords = x;
        return this;
    }
    /**
     * Push the material to the map data.
     */
    push() {
        let out = this.materialJSON;
        if (V3) {
            const stringified = JSON.stringify(this.materialJSON).replace(/_/g, "");
            out = JSON.parse(stringified);
        }
        if (materialNames.includes(this.name)) {
            return;
        }
        materialNames.push(this.name);
        Object.assign(materials, out);
    }
}
