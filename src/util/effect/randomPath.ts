import { Ease } from "util/easings";
import { Random } from "util/functions";
import { AnyAnimation } from "util/vec";
import { BaseObject } from "v3/objects/BaseObject";

let used = false;

export function RandomPath(objects: BaseObject[], pointDefs?: Map<string, AnyAnimation>, forcedOffset?: number) {
    const pointDef = pointDefs !== undefined;

    if (!used && pointDef) {
        used = true;

        for (let i = 1; i <= 32; i++) {
            pointDefs.set(`GrpOP${i}`, [
                [Random(-10, 10), Random(-2, 10), 0, 0],
                [0, 0, 0, 0.475, Ease.OutCirc]
            ]);
            pointDefs.set(`GrpOWR${i}`, [
                [Random(-45, 45), Random(-45, 45), Random(-45, 45), 0],
                [0, 0, 0, 0.475, Ease.OutCirc]
            ]);
            pointDefs.set(`GrpLR${i}`, [
                [Random(-45, 45), Random(-45, 45), Random(-180, 180), 0],
                [0, 0, 0, 0.475, Ease.OutCirc]
            ]);
        }

        pointDefs.set("GrpD", [
            [0, 0],
            [1, 0.25, Ease.OutSine]
        ]);
    }

    objects.forEach((obj) => {
        if (obj.CustomData.Animation === undefined) obj.CustomData.Animation = {};

        obj.CustomData.Offset = forcedOffset ?? 1;
        
        obj.CustomData.Animation.OffsetPosition = pointDef ? `GrpOP${Random(1, 32)}` : [
            [Random(-10, 10), Random(-2, 10), 0, 0],
            [0, 0, 0, 0.475, Ease.OutCirc]
        ];
        obj.CustomData.Animation.OffsetWorldRotation = pointDef ? `GrpOWR${Random(1, 32)}` : [
            [Random(-45, 45), Random(-45, 45), Random(-45, 45), 0],
            [0, 0, 0, 0.475, Ease.OutCirc]
        ];
        obj.CustomData.Animation.LocalRotation = pointDef ? `GrpLR${Random(1, 32)}` : [
            [Random(-45, 45), Random(-45, 45), Random(-180, 180), 0],
            [0, 0, 0, 0.475, Ease.OutCirc]
        ];
        obj.CustomData.Animation.Dissolve = pointDef ? "GrpD" : [
            [0, 0],
            [1, 0.25, Ease.OutSine]
        ];
        obj.CustomData.Animation.DissolveArrow = pointDef ? "GrpD" : [
            [0, 0],
            [1, 0.25, Ease.OutSine]
        ];
    });
    
}

