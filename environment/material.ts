import IMaterial from "../interfaces/environment/material";
import { materialNames, materials } from "../map/variables";
import shader from "../types/shader";
import { vec4 } from "../types/vectors";

enum SHADER {
    /**
     * ### Billie Water
     * 
     * The Billie environment's water shader.
     */
    BILLIE_WATER = "BillieWater",
    /**
     * ### BTS Pillar
     * 
     * The BTS environment's pillar shader.
     */
    BTS_PILLAR = "BTSPillar",
    /**
     * ### Interscope Car
     * 
     * The Interscope environment's car shader.
     */
    INTERSCOPE_CAR = "InterscopeCar",
    /**
     * ### Interscope Concrete
     * 
     * The Interscope environment's concrete shader.
     */
    INTERSCOPE_CONCRETE = "InterscopeConcrete",
    /**
     * ### Opaque Light
     * 
     * The shader for an opaque light.
     */
    OPAQUE_LIGHT = "OpaqueLight",
    /**
     * ### Standard
     * 
     * The standard shader.
     */
    STANDARD = "Standard",
    /**
     * ### Transparent Light
     * 
     * The shader for a transparent light.
     */
    TRANSPARENT_LIGHT = "TransparentLight",
    /**
     * ### Waterfall Mirror
     * 
     * The mirror shader from the waterfall in Billie.
     */
    WATERFALL_MIRROR = "WaterfallMirror"
}

/**
 * ### Material
 * 
 * The material class. This is used to create a material and push it to the materials array.
 */
export default class Material implements IMaterial {
    /**
     * ### Shader Enumerator
     * 
     * The enumerator for the shaders. This is used to set the shader property.
     */
    public static readonly SHADER = SHADER;
    /**
     * ### Name
     * 
     * The name of the material.
     * 
     * type: `string`
     */
    name: string;
    /**
     * ### Color
     * 
     * The color of the material in `[r, g, b, a]`.
     * 
     * type: `vec4`
     */
    color: vec4;
    /**
     * ### Shader
     * 
     * The shader of the material.
     * 
     * type: `shader`
     * 
     * Possible shaders:
     * - `BillieWater`
     * - `BTSPillar`
     * - `InterscopeCar`
     * - `InterscopeConcrete`
     * - `OpaqueLight`
     * - `Standard`
     * - `TransparentLight`
     * - `WaterfallMirror`
     */
    shader: shader;
    /**
     * ### Track
     * 
     * The track of the material.
     * 
     * type: `string | string[]`
     */
    track?: string | string[];
    /**
     * ### Shader Keywords
     * 
     * The shader keywords of the material.
     */
    shaderKeywords?: string[];

    /**
     * ### Material
     * 
     * Creates a new material. This is used to create a material and push it to the materials array.
     * 
     * #### Usage
     * 
     * ```ts
     * new Material('Material Name', {
     *     color: [r, g, b, a],
     *     shader: Material.SHADER.STANDARD,
     *     track: 'Track',
     *     shaderKeywords: ['KEYWORD_1', 'KEYWORD_2']
     * }).push();
     * ```
     */
    constructor(name: string, properties: IMaterial) {
        this.name = name;
        this.color = properties.color;
        this.shader = properties.shader;
        if (properties.track) this.track = properties.track;
        if (properties.shaderKeywords) this.shaderKeywords = properties.shaderKeywords;
    }

    /**
     * ### Push
     * 
     * Pushes the material to the materials array.
     */
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