import { Map } from './src/mapHandler';
import { diffFile } from './consts/difficulty';
import Difficulty from './consts/difficulty';

const INPUT: diffFile = Difficulty.Standard.ExpertPlus;
const OUTPUT: diffFile = Difficulty.Lawless.ExpertPlus;

const difficulty = Map.initialize(INPUT, OUTPUT, {
    njs: 16,
    offset: 0
});
// #region Noodle stuff below




// #endregion Noodle stuff above
Map.finalize(difficulty, {
    formatting: true,
    showModdedStats: {
        customEvents: true,
        notes: true,
        lights: true,
        pointDefinitions: true,
        walls: true
    }
});