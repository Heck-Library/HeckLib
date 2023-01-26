import { AnimateTrack, ease, Map, random } from "./src/main.ts";
const INPUT = 'ExpertPlusStandard.dat'
const OUTPUT = 'ExpertPlusLawless.dat'

const difficulty = Map.initialize(INPUT, OUTPUT, {
    njs: 16,
    offset: 0
})
// #region Noodle stuff below

for (let i = 1; i <= 10000; i++) {
    new AnimateTrack(i, {
        track: `foo${Math.round(i / random(1, 10) * 100) / 100}`,
        duration: 1,
        scale: [
            [2, 2, 2, 0],
            [1, 1, 1, 1, ease.Out.Quad]
        ]
    }).push();
}

// #endregion Noodle stuff above
Map.finalize(difficulty)