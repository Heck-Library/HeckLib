import AnimateTrack from "../events/animateTrack";
import { MAPDATA } from "../map/initialize";
import Wall from "../objects/wall";
import { vec3, vec4 } from "../types/vectors";

// CREDITS TO REDDEK FOR HELPING ME WITH THIS
/**
 * Polygon parameters
 * @param time - The time the polygon is created
 * @param track - The track the polygon is created on
 * @param duration - The duration of the polygon
 * @param radius - The radius of the polygon
 * @param amount - The amount of sides the polygon has
 * @param h - The height of the polygon
 * @param l - The length of the polygon
 * @param position - The position of the polygon
 * @param rotations - The amount of rotations the polygon has
 * @param dissolveTime - The time the polygon dissolves
 * @param color - The color of the polygon
 */
interface IPolygonParams {
    time: number;
    track: string;
    duration: number;
    radius: number;
    amount: number;
    h: number;
    l: number;
    position: vec3;
    rotations?: number;
    dissolveTime?: number;
    color: vec4;
}
/**
 * Creates a polygon
```ts
polygon({
    time: 0,
    track: "track1",
    duration: 4,
    radius: 5,
    amount: 3,
    h: 1,
    l: 1,
    position: [0, 0, 0], 
    color: [1, 1, 1, 1]
});
```
 */
export default function polygon(parameters: IPolygonParams): void {
    const p = parameters;
    for (let i = 0; i < p.amount; i++) {
        let angle = Math.PI * 2 / p.amount;
        let rot = 360 / p.amount * i;
        let radians = angle * i
        let w = 2 * p.radius * Math.tan(Math.PI / p.amount);
        let sx = p.position[0] + Math.cos(radians) * p.radius - (w / 2);
        let sy = p.position[0] + Math.sin(radians) * p.radius - (p.h / 2);
        new Wall({
            //Vanilla data
            time: p.time + MAPDATA.halfJumpDuration
        }, {
            //Custom data
            interactable: false,
            track: p.track,
            scale: [w, p.h, p.l],
            rotation: [0, 0, 0],
            localRotation: [0, 0, 90 + rot],
            position: [sx, sy]
        }, {
            //Animation data
            definitePosition: [[0, 0, p.position[2], 0], [0, 0, p.position[2], 1]],
            color: (p.color) ? p.color : [1, 1, 1, 1]
        }).push();
    }
    if (p.rotations) {
        new AnimateTrack(p.time - 2, {
            track: p.track,
            duration: p.duration + 2,
            rotation: [0, 0, 0 + p.rotations]
        }).push();
    }
    if (p.dissolveTime) {
        new AnimateTrack(p.time, {
            track: p.track,
            duration: 1,
            dissolve: [[1, 0], [0, 0.95]]
        }).push();
    }
}