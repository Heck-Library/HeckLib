
import { Environment, filter, Map, NOTE, Note, notes } from "./src/main.ts";
const INPUT = 'ExpertPlusStandard.dat'
const OUTPUT = 'ExpertPlusLawless.dat'

const difficulty = Map.initialize(INPUT, OUTPUT, 16, 0)
Map.formatFile(true)
// #region Noodle stuff below´

new Note({
    //Vanilla data
    time: 0,
    direction: Note.Direction.Dot
}, {
    //Custom data
    
}, {
    //Animation data
    
}).push();

// #endregion Noodle stuff above
Map.finalize(difficulty);