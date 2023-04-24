import { Difficulty, initialize } from "./map/initialize";
import { finalize } from "./map/finalize";
import AnimateTrack from "./events/animateTrack";
import track from "./functions/track";
import { notes } from "./map/variables";
import filter from "./functions/filter";

const INPUT = Difficulty.EXPERT_PLUS_STANDARD;
const OUTPUT = Difficulty.EXPERT_PLUS_LAWLESS;

const DIFFICULTY = initialize(INPUT, OUTPUT);

// #region MAP SCRIPT

track(filter(notes, 0, 8), "sdfasdf");


// #endregion MAP SCRIPT

finalize(DIFFICULTY, {
    formatting: true,
    
});