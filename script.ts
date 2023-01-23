
import { Map } from "./src/main.ts";
const INPUT = 'ExpertPlusStandard.dat'
const OUTPUT = 'ExpertPlusLawless.dat'

const difficulty = Map.initialize(INPUT, OUTPUT, 16, 0)
Map.formatFile(true)
// #region Noodle stuff below´



// #endregion Noodle stuff above
Map.finalize(difficulty);