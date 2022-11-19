import { AnimateTrack, CustomData, ease, filter, Map, notes, PathAnimation, PlayerTrack, random, Requirement, Settings, track, TrackParent, Wall } from "./src/main.ts";
const INPUT = 'temp.dat'
const OUTPUT = 'ExpertPlusLawless.dat'

const difficulty = Map.initialize(INPUT, OUTPUT, 16, 0)

// #region Noodle stuff below

track(filter(notes, 8, 16), ["deez", "nuts"]);

new Requirement("ExpertPlusLawless.dat")
    .chroma()
    .noodle()
    .cinema()
    
new PathAnimation(8).track("deez").duration(2).pos([0, 0, 0]).color("d").dis([0]).disArr([1]).rot("sdasd")

// #endregion Noodle stuff above

Map.finalize(difficulty);