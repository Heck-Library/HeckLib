import { Difficulty, MAPDATA, initialize } from "./map/initialize";
import { finalize } from "./map/finalize";
import Note from "./objects/note";
import ease from "./consts/easing";
import AnimateTrack from "./events/animateTrack";

const INPUT = Difficulty.EXPERT_PLUS_STANDARD;
const OUTPUT = Difficulty.EXPERT_PLUS_LAWLESS;

const DIFFICULTY = initialize(INPUT, OUTPUT);

// #region MAP SCRIPT

new Note({
    b: 0,
    d: Note.DIRECTION.DOWN_LEFT,
    x: Note.LINE_INDEX.LEFT_MIDDLE,
    y: Note.LINE_LAYER.BOTTOM,
    c: Note.TYPE.BLUE,
}, {
    coordinates: [0, 0],
    njs: MAPDATA.njs,
    offset: MAPDATA.offset,
    color: [0, 0, 1, 1],
    uninteractable: true,
    fake: true,
    disableSpawnEffect: true,
    scale: [0.5, 0.5, 0.5],
}, {
    dissolveArrow: [
        [0, 0],
        [1, 0.45, ease.Out.Cubic]
    ]
}).push();




// #endregion MAP SCRIPT

finalize(DIFFICULTY, {
    formatting: true
});