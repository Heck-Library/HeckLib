import { finalize, map } from './src/main.ts'

const difficulty = map('ExpertPlusStandard.dat', 'ExpertPlusLawless.dat', 16, 0)

// #region Noodle stuff below





// #endregion Noodle stuff above

finalize(difficulty);