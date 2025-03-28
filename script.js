import { PLUGIN } from "./dist/util/enums.js";
import { log } from "./dist/util/logs.js";
import { Difficulty } from "./dist/v3/index.js";

const START = performance.now();

const Diff = new Difficulty(
    Difficulty.STANDARD.ExpertPlus,
    Difficulty.LAWLESS.ExpertPlus,
    {
        NoLogo: true,
        Logs: "Success"
    }
);

Diff.DifficultyInfo.CustomData.Requirements = [
    PLUGIN.NoodleExtensions,
    PLUGIN.Chroma,
    PLUGIN.Vivify
]

const { ColorNotes: notes, BombNotes: bombs, Obstacles: walls, Sliders: arcs, BurstSliders: chains, BasicBeatmapEvents: events } = Diff.Map;
const { FakeColorNotes: fakeNotes, FakeBombNotes: fakeBombs, FakeObstacles: fakeWalls, FakeSliders: fakeArcs, FakeBurstSliders: fakeChains, CustomEvents: customEvents, PointDefinitions: pointDefinitions, Materials: materials, Environment: environment } = Diff.Map.CustomData;

//#region       =============== Functions Below  ===============





//#endregion    =============== Functions Above  ===============

//#region       =============== Map Script Below ===============





//#endregion    =============== Map Script Above ===============

Diff.Push({
    format: true // Change this to true to indent the JSON output
});

log.success("HeckLib ran", { StartTime: START });
log.printLogBuffer();