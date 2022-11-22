import { Environment } from "./environment.ts"
import { vec3 } from "./types.ts"

export class ModelEnvironment {
    constructor(filePath: string) {
        const model = JSON.parse(Deno.readTextFileSync(filePath))
        const objs = model.objects;
        objs.forEach((x: {
            pos: vec3,
            rot: vec3,
            scale: vec3,
            color: vec3,
            track: string
        }) => {
            let shader = "Standard";
            if (x.track.length > 1) shader = x.track[1];

            new Environment()
                .geometry()
                .shape(x.track[0])
                .material({
                    _color: x.color,
                    _shader: shader,
                })
                .pos(x.pos)
                .rot(x.rot)
                .scale(x.scale)
                .push();
        })
    }
}