import { Map } from "./src/main.ts";
const INPUT = 'temp.dat'
const OUTPUT = 'ExpertPlusLawless.dat'

const difficulty = Map.initialize(INPUT, OUTPUT, 16, 0)

// #region Noodle stuff below




// #endregion Noodle stuff above

Map.finalize(difficulty);