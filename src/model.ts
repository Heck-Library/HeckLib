import { Environment, Material } from "./environment.ts"
import { geoShape, shaderType, vec3 } from "./types.ts"

export class ModelEnvironment {
    constructor(filePath: string, color: vec3, shader: shaderType, materialName: string) {
        const model = JSON.parse(Deno.readTextFileSync(filePath))
        const objs = model.objects;
        objs.forEach((x: {
            position: vec3,
            rotation: vec3,
            scale: vec3,
            shape: geoShape
        }) => {
            new Material(materialName)
                .color(color)
                .shader(shader)
                .push();

            new Environment()
                .geometry()
                .shape(x.shape)
                .material(materialName)
                .pos(x.position)
                .rot(x.rotation)
                .scale(x.scale)
                .push();
        })
    }
}