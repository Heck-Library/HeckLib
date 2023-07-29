import { Difficulty, MAPDATA, initialize } from "./map/initialize";
import { finalize } from "./map/finalize";
import Note, { notes } from "./objects/note";

const INPUT = Difficulty.EXPERT_PLUS_STANDARD;  // This is your vanilla/input difficulty.
const OUTPUT = Difficulty.EXPERT_PLUS_LAWLESS;  // This is your modded output difficulty.

const DIFFICULTY = initialize(INPUT, OUTPUT);   // This initializes the map.

// REMOVE THIS FOREACH LOOP IF YOU DO NOT WISH TO USE NOODLE
notes.forEach(note => {
    note.customData = {};
    note.animation = {};
    note.customData.njs = MAPDATA.njs;
    note.customData.offset = MAPDATA.offset;
});

// #region MAP SCRIPT




// #endregion MAP SCRIPT

finalize(DIFFICULTY, {
    sortObjects: true,
    formatting: true
});