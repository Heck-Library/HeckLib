import { Difficulty, initialize } from "./map/initialize";
import { finalize } from "./map/finalize";

const INPUT = Difficulty.EXPERT_PLUS_STANDARD;
const OUTPUT = Difficulty.EXPERT_PLUS_LAWLESS;

const DIFFICULTY = initialize(INPUT, OUTPUT);

// #region MAP SCRIPT




// #endregion MAP SCRIPT

finalize(DIFFICULTY, {
    formatting: true,
    sortObjects: true
});