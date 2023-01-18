
import { AnimateTrack, Builder, ease, Map } from "./src/main.ts";
const INPUT = 'ExpertPlusStandard.dat'
const OUTPUT = 'ExpertPlusLawless.dat'

const difficulty = Map.initialize(INPUT, OUTPUT, 16, 0)

Map.formatFile(true)
// #region Noodle stuff below

new AnimateTrack(1, {
    track: "asdoj",
    duration: 2,
    dissolve: [
        [0, 0],
        [1, 1, ease.Out.Cubic]
    ]
}).push()

const f = new Builder.AnimateTrack(1)
    .duration(1)
    .track("asd");
// #endregion Noodle stuff above
Map.finalize(difficulty);