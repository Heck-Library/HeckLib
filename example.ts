import {
  Map,
  diffFile,
  Difficulty,
} from "https://raw.githubusercontent.com/Heck-Library/HeckLib/v1.2/src/mod.ts";
const INPUT: diffFile = Difficulty.Standard.ExpertPlus;
const OUTPUT: diffFile = Difficulty.Lawless.ExpertPlus;

const difficulty = Map.initialize(INPUT, OUTPUT, {
    njs: 16,
    offset: 0
});
// #region Noodle stuff below




// #endregion Noodle stuff above
Map.finalize(difficulty, {
    formatting: true
});