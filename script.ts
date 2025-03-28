import * as hl from "./src";

for (let i = 0; i < 1; i++) {
const START = performance.now();

//#region INITIALIZATION
const Diff = new hl.Map.Difficulty(
    hl.Map.Difficulty.STANDARD.ExpertPlus,
    hl.Map.Difficulty.LAWLESS.ExpertPlus,
    {
        NoLogo: true,
        Logs: "Success"
    }
);

Diff.DifficultyInfo.CustomData.Requirements = [
    hl.Util.Enum.PLUGIN.NoodleExtensions,
    hl.Util.Enum.PLUGIN.Chroma,
    hl.Util.Enum.PLUGIN.Vivify
]

//const { ColorNotes: notes, BombNotes: bombs, Obstacles: walls, Sliders: arcs, BurstSliders: chains, BasicBeatmapEvents: events } = Diff.Map;
//const { FakeColorNotes: fakeNotes, FakeBombNotes: fakeBombs, FakeObstacles: fakeWalls, FakeSliders: fakeArcs, FakeBurstSliders: fakeChains, CustomEvents: customEvents, PointDefinitions: pointDefinitions, Materials: materials, Environment: environment } = Diff.Map.CustomData;
//#endregion INITIALIZATION

//fakeNotes as any + notes as any;
//#region       =============== Functions Below  ===============





//#endregion    =============== Functions Above  ===============

//#region       =============== Map Script Below ===============





//#endregion    =============== Map Script Above ===============

Diff.Push({
    format: true // Change this to true to indent the JSON output
});

hl.Util.Log.success("HeckLib ran", { StartTime: START });
}
hl.Util.Log.printLogBuffer();