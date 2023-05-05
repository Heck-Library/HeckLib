import INote from "../../interfaces/objects/note";
import Note from "../../objects/note";
import { V3 } from "../initialize";

export function JSONtoNotes(noteInput: Record<string, any>[], NJS: number, offset: number): INote[] {
    const noteArr: INote[] = [];
    if (V3) {
        if (noteInput) noteInput.forEach((n: Record<string, any>) => {
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
                offset: offset,
                color: n.color,
                disableNoteGravity: n.disableNoteGravity,
                disableSpawnEffect: n.disableSpawnEffect,
                disableNoteLook: n.disableNoteLook,
                interactable: !n.uninteractable,
                flip: n.flip,
                localRotation: n.localRotation,
                position: n.coordinates,
                rotation: n.worldRotation,
                scale: n.scale,
                track: n.track,
            }));
        });
    } else {
        if (noteInput) noteInput.forEach((n: Record<string, any>) => {
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
                offset: offset,
                color: n._customData._color,
                fake: n._customData._fake,
                interactable: n._customData._interactable,
                scale: n._customData._scale,
                disableNoteGravity: n._customData._disableNoteGravity,
                disableSpawnEffect: n._customData._disableSpawnEffect,
                disableNoteLook: n._customData._disableNoteLook,
                flip: n._customData._flip,
                localRotation: n._customData._localRotation,
                position: n._customData._position,
                rotation: n._customData._rotation,
                cutDirection: n._customData._cutDirection,
            }));
        });
    }
    return noteArr;
}
