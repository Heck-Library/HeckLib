const { PLUGIN } = require("./dist/util/enums");
const { log } = require("./dist/util/logs");
const { Difficulty } = require("./dist/v3");

for (let i = 0; i < 1000; i++) {
const START = performance.now();

const Diff = new Difficulty(
    Difficulty.STANDARD.ExpertPlus,
    Difficulty.LAWLESS.ExpertPlus,
    {
        Logs: "Success",

    }
);

Diff.DifficultyInfo.CustomData.Requirements = [
    PLUGIN.NoodleExtensions,
    PLUGIN.Chroma,
    PLUGIN.Vivify
]


Diff.Push({
    format: true // Change this to true to indent the JSON output
});

log.success("HeckLib ran", { StartTime: START });
}
log.printLogBuffer();