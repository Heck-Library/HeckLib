import { AnimateTrack, ease, Map, PathAnimation, PlayerTrack, random, TrackParent } from "./src/main.ts";
const INPUT = 'ExpertStandard.dat'
const OUTPUT = 'ExpertPlusLawless.dat'

const difficulty = Map.initialize(INPUT, OUTPUT, 16, 0)

// #region Noodle stuff below

new AnimateTrack(4)
    .track("scsads")
    .duration(2)
    .color([0, 0, 0, 1]);

new AnimateTrack(2)
    .track("osdkoasd")
    .duration(2)

new TrackParent(3)
    .children(["dsasd"])
    .parent("deez")

new PathAnimation(2)
    .track("deez")
    .pos([
        [0, random(5, 10), 0, 0],
        [0, 0, 0, 0.45, ease.Out.Circ]
    ])

new PlayerTrack(2)
    .track("cum")
    
// #endregion Noodle stuff above

Map.finalize(difficulty);