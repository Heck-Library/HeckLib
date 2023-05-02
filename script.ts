import { Difficulty, initialize } from "./map/initialize";
import { finalize } from "./map/finalize";

const INPUT = Difficulty.EXPERT_PLUS_STANDARD;  // This is your vanilla/input difficulty.
const OUTPUT = Difficulty.EXPERT_PLUS_LAWLESS;  // This is your modded output difficulty.

const DIFFICULTY = initialize(INPUT, OUTPUT, {
    lightshow: Difficulty.EASY_LIGHTSHOW
});   // This initializes the map.

// #region MAP SCRIPT




// #endregion MAP SCRIPT

finalize(DIFFICULTY, {
    formatting: true,
    sortObjects: true,
    roundNumbers: 4
});