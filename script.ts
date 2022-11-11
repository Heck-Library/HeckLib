import { AnimateTrack, Map } from "./src/main.ts";
const INPUT = 'ExpertPlusStandard.dat'
const OUTPUT = 'ExpertPlusLawless.dat'

const difficulty = Map.initialize(INPUT, OUTPUT, 16, 0)

// #region Noodle stuff below

new AnimateTrack(4)
    .track("dsasdf")
    .pos([1,1,1])
    .rot([69, 4.20, 72.7])
    .push();
// #endregion Noodle stuff above

Map.finalize(difficulty);