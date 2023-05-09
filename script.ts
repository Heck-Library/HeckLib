import { Difficulty, initialize } from "./map/initialize";
import { finalize } from "./map/finalize";
import Wall from "./objects/wall";
import random from "./functions/random";

const INPUT = Difficulty.EXPERT_PLUS_STANDARD;  // This is your vanilla/input difficulty.
const OUTPUT = Difficulty.EXPERT_PLUS_LAWLESS;  // This is your modded output difficulty.

const DIFFICULTY = initialize(INPUT, OUTPUT);   // This initializes the map.

// #region MAP SCRIPT


for (let i = 69; i <= 420; i += 1 / 32) {
    const wall = new Wall();
    const customData = wall.customData;
    const animation = wall.animation;

    wall.time = 69;
    wall.duration = 8;

    customData.fake = true;
    customData.interactable = false;
    customData.scale = [0.1, 0.1, 0.1];

    animation.rotation = [
        [0, 0, random(-180, 180), 0],
        [0, 0, 0, 1]
    ];
    animation.dissolve = [
        [0, 0],
        [1, 1 / 8],
        [1, 7 / 8],
        [0, 1]
    ];
    animation.definitePosition = [0, 7, 10];

    wall.push();
}


// #endregion MAP SCRIPT

finalize(DIFFICULTY, {
    formatting: true,
    sortObjects: true,
    roundNumbers: 4
});