import { NOTE } from "../../consts/mod";
import Note from "../../objects/note";
import { V3 } from "../initialize";

export function JSONtoNotes(noteInput: Record<string, any>[], NJS: number, offset: number): NOTE[] {
    const noteArr: NOTE[] = [];
    if (V3) {
        noteInput.forEach((n: Record<string, any>) => {
            noteArr.push(new Note({
                //Vanilla data
                time: n.b,
                x: n.x,
                y: n.y,
                angle: n.a,
                type: n.c,
                direction: n.d
            }, {
                //Custom data
                njs: NJS,
                offset: offset
            }));
        });
    } else {
        noteInput.forEach((n: Record<string, any>) => {
            noteArr.push(new Note({
                //Vanilla data
                time: n._time,
                x: n._lineIndex,
                y: n._lineLayer,
                type: n._type,
                direction: n._cutDirection
            }, {
                //Custom data
                njs: NJS,
                offset: offset
            }));
        });
    }
    return noteArr;
}
