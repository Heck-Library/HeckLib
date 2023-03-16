import { NOTE } from "../../consts/mod";
import { V3, notes, fakeNotes } from "../initialize";
import { V2JsonNote } from "../finalize";

export function notesToJSON(): V2JsonNote[] {
    const noteArr: any[] = [];
    notes.forEach((n: NOTE) => {
        let noteJSON: Record<string, any> = {
            b: n.time,
            c: n.type,
            d: n.direction,
            a: n.angle,
            x: n.x,
            y: n.y,
            customData: {
                ...n.data,
                animation: {
                    ...n.anim
                }
            }
        };
        if (Object.keys(noteJSON.customData.animation).length < 1)
            delete noteJSON.customData.animation;
        if (Object.keys(noteJSON.customData).length < 1)
            delete noteJSON.customData;
        let stringified = JSON.stringify(noteJSON)
            .replace('"njs"', '"noteJumpMovementSpeed"')
            .replace('"offset"', '"noteJumpStartBeatOffset"');
        if (V3) {
            stringified = stringified
                .replace('"position"', '"coordinates"')
                .replace('"rotation"', '"worldRotation"')
                .replace('"interactable":false', '"uninteractable":true')
                .replace('"disableSpawnEffect":true', '"spawnEffect":false');
        } else {
            stringified = stringified
                .replace('"b":', '"time":')
                .replace('"c":', '"type":')
                .replace('"d":', '"cutDirection":')
                .replace('"x":', '"lineIndex":')
                .replace('"y":', '"lineLayer":')
                .replace(/"a":\d+,/g, '')
                .replace(/"([^_][\w\d]+)":/g, '"_$1":');
        }
        noteJSON = JSON.parse(stringified);
        if (V3 && noteJSON.customData && Object.keys(noteJSON.customData).includes("fake")) {
            delete noteJSON.customData.fake;
            fakeNotes.push(noteJSON);
        } else
            noteArr.push(noteJSON);
    });
    return noteArr;
}