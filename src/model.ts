// deno-lint-ignore-file no-explicit-any
import { Environment, Material } from "./environment.ts"
import { Track, vec4 } from "./main.ts";
import { V3, walls } from "./mapHandler.ts";
import { Wall } from "./objects.ts";
import { geoShape, shaderType, vec3 } from "./types.ts"

export class ModelEnvironment {
    /**
     * 
     * @param filePath File path of the model.json
     * @param shader Shader ("Standard"|"OpaqueLight"|"TransparentLight")
     * @param materialName Name of the material used (Will add a number to the end if multiple colors)
     * @param color 
     */
    constructor(filePath: string, shader: shaderType, materialName: string, color: vec3) {
        const model = JSON.parse(Deno.readTextFileSync(filePath))
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

export class ModelWall {
    walls: any[] = [];
    constructor(time: number, filePath: string) {
        if (V3) throw new Error("ModelWall does not work with V3 yet")
        const model = JSON.parse(Deno.readTextFileSync(filePath))
        const objs = model.objects;
        objs.forEach((x: {
            position: vec3,
            rotation: vec3,
            scale: vec3,
            shape: geoShape,
            color: vec4
        }) => {
            let col: vec4 = [1, 1, 1, 1]
            if (x.color) col = x.color;
            new Wall({
                time: time,
                duration: 1
            }, {
                fake: true,
                interactable: false,
                color: [...col],
                position: [0, 0],
                rotation: x.rotation,
                scale: x.scale
            }, {
                definitePosition: x.position
            }).push()
        });
    }
    track(track: Track) {
        if (!V3)
        this.walls.forEach(x => {
            x._customData._track = track;
        })
        return this;
    }
    alpha(alpha: number) {
        if (!V3)
        this.walls.forEach(x => {
            x._customData._color[3] = alpha;
        })
        return this;
    }
    position(pos: vec3) {
        if (!V3)
        this.walls.forEach(x => {
            const bruh = x._customData._animation._definitePosition;
            bruh[0] += pos[0];
            bruh[1] += pos[1];
            bruh[2] += pos[2];
        })
        return this;
    }
    duration(duration: number) {
        if (!V3)
        this.walls.forEach(x => {
            x._customData.duration = duration;
        })
        return this;
    }
    color(color: vec4) {
        if (!V3)
        this.walls.forEach(x => {
            x._customData._color = color;
        })
        return this;
    }
    outline(thickness: number) {
        if (!V3)
        this.walls.forEach(x => {
            const d = x._customData;
            d._scale[0] /= thickness;
            d._scale[1] /= thickness;
            d._scale[2] /= thickness;
            d._animation._scale = [thickness, thickness, thickness];
        })
        return this;
    }
    push() {
        if (!V3)
        this.walls.forEach(x => {
            walls.push(x);
        })
        return this;
    }
}