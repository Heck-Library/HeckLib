// deno-lint-ignore-file no-explicit-any
import { filter, Map, NOTE, Note, notes, Wall } from "./src/main.ts";
const INPUT = 'ExpertPlusStandard.dat'
const OUTPUT = 'ExpertPlusLawless.dat'

const difficulty = Map.initialize(INPUT, OUTPUT, 16, 0)

Map.formatFile(true)
// #region Noodle stuff below
new Note({
    //Vanilla data
    time: 0,
}, {
    //Custom data
    fake: true
}, {
    //Animation data
    
}).push();

new Wall({
    time: 0,
    duration: 1,
}, {
    fake: true
}, {
    definitePosition: [0, 10, 10]
}).push();

// #endregion Noodle stuff above
Map.finalize(difficulty);