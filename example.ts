import { Map, diffFile, Standard, Lawless } from './src/mod.ts';
const INPUT: diffFile = Standard.ExpertPlus;
const OUTPUT: diffFile = Lawless.ExpertPlus;

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