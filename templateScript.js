import { finalize, map, notes, walls } from './src/main.js'

let difficulty = map('ExpertPlusStandard.dat', 'ExpertPlusLawless.dat', 16, 0)

// #region Noodle stuff below





// #endregion Noodle stuff above

finalize(difficulty);