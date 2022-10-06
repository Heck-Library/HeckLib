
import { filterNotes, finalize, map, pushNote } from "./src/main.js";

map('ExpertPlusStandard.dat', 'ExpertPlusLawless.dat')

filterNotes(8, 16).forEach(n => {
    n._customData._fake = true;
    pushNote(n)
})

finalize()