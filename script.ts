
import { Map, ModelWall } from "./src/main.ts";
const INPUT = 'ExpertPlusStandard.dat'
const OUTPUT = 'ExpertPlusLawless.dat'

const difficulty = Map.initialize(INPUT, OUTPUT, 16, 0)

Map.formatFile(true)
// #region Noodle stuff below

new ModelWall(1, 'untitled.json')
.outline(12)
.push()

// #endregion Noodle stuff above
Map.finalize(difficulty);