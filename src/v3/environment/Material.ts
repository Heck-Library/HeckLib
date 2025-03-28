import { MaterialShader } from "../../util/enums";
import { Vec3 } from "../../util/vec";

export interface IMaterialJSON {
    color: Vec3;
    shader: MaterialShader;
    track?: string;
    shaderKeywords?: string[];
}

export interface IMaterial {
    Color: Vec3;
    Shader: MaterialShader;
    Track?: string;
    ShaderKeywords?: string[];
}

export class Material implements IMaterial {
    public static readonly SHADER = MaterialShader;

    private color: Vec3 = [1, 1, 1];
    private shader: MaterialShader = MaterialShader.Standard;
    private track?: string;
    private shaderKeywords?: string[];

    get Color(): Vec3 { return this.color; }
    get Shader(): MaterialShader { return this.shader; }
    get Track(): undefined | string { return this.track; }
    get ShaderKeywords(): undefined | string[] { return this.shaderKeywords; }

    set Color(color: Vec3) { this.color = color; }
    set Shader(shader: MaterialShader) { this.shader = shader; }
    set Track(track: undefined | string) { this.track = track; }
    set ShaderKeywords(shaderKeywords: undefined | string[]) { this.shaderKeywords = shaderKeywords; }

    public toJSON(): IMaterialJSON {
        return {
            color: this.color,
            shader: this.shader,
            track: this.track,
            shaderKeywords: this.shaderKeywords
        };
    }

    constructor(data?: IMaterial) {
        if (data === undefined) return;

        this.color = data.Color;
        this.shader = data.Shader;
        this.track = data.Track;
        this.shaderKeywords = data.ShaderKeywords;
    }
}