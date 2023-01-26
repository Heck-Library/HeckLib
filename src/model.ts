
import { Environment, Material } from "./environment.ts"
import { AnimateTrack } from "./events.ts";
import { Track, vec4, WALL } from "./types.ts";
import { walls } from "./mapHandler.ts";
import { Wall } from "./objects.ts";
import { geoShape, JsonModel, shaderType, vec3, vec3anim } from "./types.ts"

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
    walls: WALL[] = [];
    constructor(time: number, filePath: string) {
        const model = JSON.parse(Deno.readTextFileSync(filePath))
        model.forEach((x: JsonModel) => {
            const col = x.color;
            const w: WALL = new Wall({
                time: time,
                duration: 1
            }, {
                fake: true,
                interactable: false,
                color: [...col],
                position: [0, 0],
                localRotation: x.rotation,
                scale: x.scale
            }, {
                definitePosition: x.position
            })
            this.walls.push(w);
        });
    }
    track(track: Track) {
        this.walls.forEach((x: WALL) => {
            x.data.track = track;
        })
        return this;
    }
    alpha(alpha: number) {
        this.walls.forEach((x: WALL) => {
            if (x.data.color) x.data.color[3] = alpha;
        })
        return this;
    }
    position(pos: vec3anim, duration?: number) {
        const fw = this.walls[0].data;
        if (fw.track) {
            let track: Track;
            let d = 0;
            if (duration) d = duration;
            if (Array.isArray(fw.track)) track = fw.track[fw.track.length - 1];
            else track = fw.track;
            new AnimateTrack(0, {
                track: track,
                duration: d,
                position: pos
            }).push();
        }
        return this;
    }
    duration(duration: number) {
        this.walls.forEach(x => {
            x.duration = duration;
        })
        return this;
    }
    color(color: vec4) {
        this.walls.forEach(x => {
            x.data.color = color;
        })
        return this;
    }
    outline(thickness: number) {
        this.walls.forEach(x => {
                if (x.data.scale) {
                x.data.scale[0] /= thickness;
                x.data.scale[1] /= thickness;
                x.data.scale[2] /= thickness;
                x.anim.scale = [thickness, thickness, thickness];
            }
        })
        return this;
    }
    push() {
        this.walls.forEach(x => {
            walls.push(x);
        })
        return this;
    }
}