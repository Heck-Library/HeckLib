import { vec3, vec4 } from "../consts/mod";
import AnimateTrack from "../events/animateTrack";
import { MAPPROPERTIES } from "../map/initialize";
import Wall from "../objects/wall";

// CREDITS TO REDDEK FOR HELPING ME WITH THIS
type polygonParams = {
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
export default function polygon(parameters: polygonParams) {
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
            time: p.time + MAPPROPERTIES.halfJumpDuration
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