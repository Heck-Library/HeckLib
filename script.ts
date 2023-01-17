// deno-lint-ignore-file no-explicit-any
import { AnimateTrack, ease, fakeNotes, Map, NOTE, Note, notes, random } from "./src/main.ts";
const INPUT = 'ExpertPlusStandard.dat'
const OUTPUT = 'ExpertPlusLawless.dat'

const difficulty = Map.initialize(INPUT, OUTPUT, 16, 0)

Map.formatFile(true)
// #region Noodle stuff below

function filter(obj: any[], start: number, end: number) {
    return obj.filter((n: Record<string, any>) => n.time <= end && n.time >= start);
}

for (let i = 0; i <= 4; i++)
new Note({
    //Vanilla data
    time: i,
}, {
    fake: true
}, {
    color: [random(-600, 600), 0, 0, 0]
}).push();

const f = filter(notes, 0, 8);
f.forEach((n: NOTE) => {
    n.data.fake = true
    new AnimateTrack({
        time: n.time,
        track: "",
        duration: 0,
        scale: [
            [2, 2, 2, 0],
            [1, 1, 1, 1, ease.Out.Cubic]
        ]
    }).push();
})

// #endregion Noodle stuff above
Map.finalize(difficulty);