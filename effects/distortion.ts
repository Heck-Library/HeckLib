import ease from "../consts/easing";
import AnimateTrack from "../events/animateTrack";
import AssignTrackParent from "../events/assignTrackParent";
import random from "../functions/random";
import PointDefinition from "../map/pointDefinition";
import Wall from "../objects/wall";
import { vec4 } from "../types/vectors";

let firstTime = true;

/**
 * Properties for the Distortion effect
 * ```ts
 * start: number;      // The start time of the distortion
 * end: number;        // The end time of the distortion
 * intensity: number;  // The intensity of the distortion
 * shake?: number;     // The amount of shaking
 * color?: vec4;       // The color of the distortion
 * ```
 */
interface IDistortion {
    start: number;
    end: number;
    intensity: number;
    shake?: number;
    color?: vec4;
}

export default class Distortion {
    start: number;
    end: number;
    intensity: number;
    shake: number;
    color: vec4;

    constructor(options: IDistortion) {
        this.start = options.start;
        this.end = options.end;
        this.intensity = options.intensity;
        this.shake = options.shake || 0;
        this.color = options.color || [0, 0, 0, this.intensity * 200];

        if (this.color[0] === 0) this.color[0] = -1;
        if (this.color[1] === 0) this.color[1] = -1;
        if (this.color[2] === 0) this.color[2] = -1;
        if (this.color[3] === 0) this.color[3] = -1;
    }

    push() {
        const { start, end, intensity, shake, color } = this;
        const duration = end - start;
        color[3] = intensity * 200;
        let wallStart = start - 4;
        if (wallStart < 0) wallStart = 0;
        const wDuration = duration + 8;
        
        if (shake > 0) {
            if (firstTime) {
                new AssignTrackParent(wallStart, {
                    parentTrack: "wallDistortionParent",
                    childrenTracks: ["wallDistortion"],
                }).push();
                new PointDefinition("wallDistSpin", [
                    [0, 0, 0, 0],
                    [90, 0, 0, 0.25],
                    [180, 0, 0, 0.5],
                    [270, 0, 0, 0.75],
                    [0, 0, 0, 1],
                ]).push();
                firstTime = false;
            }

            for (let i = 0; i <= 3; i++) {
                new Wall({
                    //Vanilla data
                    time: wallStart,
                    duration: wDuration
                }, {
                    //Custom data
                    track: "wallDistortion",
                    fake: true,
                    interactable: false,
                    rotation: [90 * i, 0, 0],
                    scale: [100, 10, 10]
                }, {
                    //Animation data
                    scale: [100, 100, 100],
                    definitePosition: [-50, -100, -150],
                    dissolve: [
                        [0, 0],
                        [0, 4/wDuration],
                        [1, 4.25/wDuration],
                        [1, (duration + 4)/wDuration],
                        [0, (duration + 4.25)/wDuration]
                    ],
                    color: [
                        [color[0], color[1], color[2], 0, 0],
                        [color[0], color[1], color[2], 0, 4/wDuration],
                        [...color, 4.25/wDuration, ease.Out.Circ],
                        [...color, (duration + 4)/wDuration],
                        [color[0], color[1], color[2], 0, (duration + 4.25)/wDuration],
                    ]
                }).push();
            }

            for (let i = wallStart; i <= end; i += 8 / shake) {
                new AnimateTrack(i, {
                    track: "wallDistortionParent",
                    duration: 8 / shake,
                    rotation: "wallDistSpin",
                }).push();
            }
        } else {
            new Wall({
                //Vanilla data
                time: wallStart,
                duration: wDuration
            }, {
                //Custom data
                fake: true,
                interactable: false,
                scale: [100, 100, 100]
            }, {
                //Animation data
                scale: [100, 100, 100],
                definitePosition: [-50, -100, -150],
                dissolve: [
                    [0, 0],
                    [0, 4/wDuration],
                    [1, 4.25/wDuration],
                    [1, (duration + 4)/wDuration],
                    [0, (duration + 4.25)/wDuration]
                ],
                color: [
                    [color[0], color[1], color[2], 0, 0],
                    [color[0], color[1], color[2], 0, 4/wDuration],
                    [...color, 4.25/wDuration, ease.Out.Circ],
                    [color[0], color[1], color[2], color[3] * (random(50, 150) / 100), (duration + 4)/wDuration],
                    [color[0], color[1], color[2], 0, (duration + 4.25)/wDuration],
                ]
            }).push();
        }
    }
}