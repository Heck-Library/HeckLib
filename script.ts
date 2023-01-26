import { AnimateTrack, ease, Map } from "./src/main.ts";
const INPUT = 'ExpertPlusStandard.dat'
const OUTPUT = 'ExpertPlusLawless.dat'

const difficulty = Map.initialize(INPUT, OUTPUT, {
    njs: 16,
    offset: 0
})
// #region Noodle stuff below´
for (let i = 0; i <= 10000; i++) {
    new AnimateTrack(i, {
        track: `foo${i / 2}`,
        duration: 1,
        easing: ease.Out.Quad,
        scale: [
            [2, 2, 2, 0],
            [1, 1, 1, 1]
        ]
    }).push();
}

// #endregion Noodle stuff above
Map.finalize(difficulty)