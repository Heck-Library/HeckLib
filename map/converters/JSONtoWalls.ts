import { WALL } from "../../consts/mod";
import Wall from "../../objects/wall";
import { V3 } from "../initialize";

export function JSONtoWalls(wallInput: Record<string, any>[], NJS: number, offset: number): WALL[] {
    const wallArr: WALL[] = [];
    if (V3) {
        wallInput.forEach((w: Record<string, any>) => {
            wallArr.push(new Wall({
                //Vanilla data
                time: w.b,
                duration: w.d,
                x: w.x,
                y: w.y,
                width: w.w,
                height: w.h
            }, {
                //Custom data
                njs: NJS,
                offset: offset
            }));
        });
    } else {
        wallInput.forEach((w: Record<string, any>) => {
            wallArr.push(new Wall({
                //Vanilla data
                time: w._time,
                duration: w._duration,
                width: w._width,
                x: w._lineIndex,
                y: w._type
            }, {
                //Custom data
                njs: NJS,
                offset: offset
            }));
        });
    }
    return wallArr;
}
