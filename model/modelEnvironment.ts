import { shaderType,geoShape } from "../consts/types/environment/environment";
import { vec3 } from "../consts/types/vec";
import Material from "../environment/material";
import Environment from "../environment/environment";
import { readFileSync } from "fs";

export default class ModelEnvironment {
    /**
     * 
     * @param filePath File path of the model.json
     * @param shader Shader ("Standard"|"OpaqueLight"|"TransparentLight")
     * @param materialName Name of the material used (Will add a number to the end if multiple colors)
     * @param color 
     */
    constructor(filePath: string, shader: shaderType, materialName: string, color: vec3) {
        const model = JSON.parse(readFileSync(filePath, 'utf-8'))
        let matNum = 1
        const objs = model.objects;
        const colors: vec3[] = []
        objs.forEach((x: {
            position: vec3,
            rotation: vec3,
            scale: vec3,
            shape: geoShape,
            color: vec3
        }) => {
            if (!colors.includes(x.color)) {
                colors.push(x.color);
            }

            new Environment()
                .geometry()
                .shape(x.shape)
                .material(materialName)
                .pos(x.position)
                .rot(x.rotation)
                .scale(x.scale)
                .push();
        })
        colors.forEach((x: vec3) => {
            let matName = materialName
            if (x.length > 1) matName = `${materialName + matNum}`
            new Material(matName)
            .color(color)
            .shader(shader)
            .push();
            matNum++;
        })
    }
}
