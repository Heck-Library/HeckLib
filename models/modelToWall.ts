import { readFileSync } from "fs";
import IModel from "../interfaces/model";
import { vec3anim } from "../types/vectors";
import Wall from "../objects/wall";
import AnimateTrack from "../events/animateTrack";
import ease from "../consts/easing";
import PointDefinition from "../map/pointDefinition";
import AssignTrackParent from "../events/assignTrackParent";

export default class ModelToWall {
    private model: IModel[];
    private fileName: string;
    time: number;
    duration: number;
    position: vec3anim = [0, 0, 0];
    rotation: vec3anim = [0, 0, 0];
    scale: vec3anim = [0, 0, 0];
    /**
     * ### Model To Wall
     * 
     * Takes a model file and turns it into walls. Currently works by parenting each wall to a separate track parent which makes this VERY unoptimized. 
     * 
     * # Disclaimer
     * 
     * **Heavily advised against using at the current time due to unoptimized implementation.**
     */
    constructor(time: number, duration: number, file: string) {
        this.model = JSON.parse(readFileSync(file, "utf-8"));
        this.fileName = file;
        this.time = time;
        this.duration = duration;
    }

    push(): void {
        const { time, duration, position, rotation, scale, model, fileName } = this;

        const track = `mtw${fileName}at${time}`;
        const wallDuration = duration + 4;


        new PointDefinition("MTWDISSOLVE", [
            [0, 0],
            [0, 1 / wallDuration, ease.Out.Cubic],
            [1, 2 / wallDuration],
            [1, (wallDuration - 2) / wallDuration],
            [0, (wallDuration - 1) / wallDuration, ease.In.Cubic],
        ]).push();

        let modelNumber = 0;

        model.forEach((obj: IModel) => {
            modelNumber++;
            const individualTrack = `${track}m${modelNumber}`;
            new AssignTrackParent(time - 16, {
                childrenTracks: [individualTrack],
                parentTrack: `${individualTrack}PARENT`
            }).push();

            new AnimateTrack(time - 2, {
                track: `${individualTrack}PARENT`,
                duration: wallDuration,
                localRotation: obj.rotation
            }).push();

            new AnimateTrack(time - 16, {
                track: track,
                duration: 0,
                position: position,
                rotation: rotation,
                scale: scale
            }).push();

            new Wall({
                time: time,
                duration: wallDuration
            }, {
                position: [1.5, 0],
                track: [
                    track,
                    individualTrack
                ],
                fake: true,
                interactable: false,
            }, {
                definitePosition: obj.position,
                scale: obj.scale,
                dissolve: "MTWDISSOLVE",
            }).push();
        });
    }
}