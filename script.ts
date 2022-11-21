import { Map, Material } from "./src/main.ts";
const INPUT = 'temp.dat'
const OUTPUT = 'ExpertPlusLawless.dat'

const difficulty = Map.initialize(INPUT, OUTPUT, 16, 0)

// #region Noodle stuff below

new Material("cum")
    .color([1, 1, 1])
    .shader("Standard")
    .push()


// #endregion Noodle stuff above

Map.finalize(difficulty);