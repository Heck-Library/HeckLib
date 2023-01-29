import { Map } from "./src/main.ts";
const INPUT = 'ExpertPlusStandard.dat'
const OUTPUT = 'ExpertPlusLawless.dat'

const difficulty = Map.initialize(INPUT, OUTPUT, {
    njs: 16,
    offset: 0
})
// #region Noodle stuff below



// #endregion Noodle stuff above
Map.finalize(difficulty, {
    formatting:true
})