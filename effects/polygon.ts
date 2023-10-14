import AnimateTrack from "../events/animateTrack";
import IObjectAnimation from "../interfaces/customData/animationData";
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
    animation?: IObjectAnimation;
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
export default class Polygon implements IPolygonParams {
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
    animation?: IObjectAnimation;
    
    constructor();
    constructor(parameters: IPolygonParams);
    constructor(parameters?: IPolygonParams) {
        const { time, track, duration, radius, amount, h, l, position, rotations, dissolveTime, color, animation } = parameters;
        this.time = (time) ? time : 0;
        this.track = (track) ? track : "track1";
        this.duration = (duration) ? duration : 4;
        this.radius = (radius) ? radius : 5;
        this.amount = (amount) ? amount : 3;
        this.h = (h) ? h : 1;
        this.l = (l) ? l : 1;
        this.position = (position) ? position : [0, 0, 0];
        this.rotations = (rotations) ? rotations : 0;
        this.dissolveTime = (dissolveTime) ? dissolveTime : 0;
        this.color = (color) ? color : [1, 1, 1, 1];
        this.animation = animation;
    }

    push(): void {
        const { time, track, duration, radius, amount, h, l, position, rotations, dissolveTime, color, animation } = this;
        for (let i = 0; i < amount; i++) {
            let angle = Math.PI * 2 / amount;
            let rot = 360 / amount * i;
            let radians = angle * i
            let w = 2 * radius * Math.tan(Math.PI / amount);
            let sx = position[0] + Math.cos(radians) * radius - (w / 2);
            let sy = position[0] + Math.sin(radians) * radius - (h / 2);
            const wall = new Wall({
                //Vanilla data
                time: time + MAPDATA.halfJumpDuration,
                duration: duration,
            }, {
                //Custom data
                interactable: false,
                track: track,
                scale: [w, h, l],
                rotation: [0, 0, 0],
                localRotation: [0, 0, 90 + rot],
                position: [sx, sy]
            }, animation);
            wall.animation.definitePosition = position;
            wall.animation.color = (color) ? color : [1, 1, 1, 1];
            wall.push();
        }
        if (rotations) {
            new AnimateTrack(time - 2, {
                track: track,
                duration: duration + 2,
                rotation: [0, 0, 0 + rotations]
            }).push();
        }
        if (dissolveTime) {
            new AnimateTrack(time, {
                track: track,
                duration: 1,
                dissolve: [[1, 0], [0, 0.95]]
            }).push();
        }
    }
}