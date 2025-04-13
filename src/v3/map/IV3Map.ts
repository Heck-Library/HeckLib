import { AnyAnimation } from "../../util/vec";
import { Environment } from "../environment/Environment";
import { Material } from "../environment/Material";
import { BaseBeatmapEvent } from "../events/BasicBeatMapEvent";
import { BPMEvent } from "../events/BpmEvent";
import { ColorBoostBeatmapEvent } from "../events/ColorBoostBeatmapEvent";
import { BaseCustomEvent } from "../events/customEvents/BaseCustomEvent";
import { RotationEvent } from "../events/RotationEvent";
import { Bomb, BombArray } from "../objects/Bomb";
import { BurstSlider, BurstSliderArray } from "../objects/BurstSlider";
import { Note, NoteArray } from "../objects/Note";
import { Obstacle, ObstacleArray } from "../objects/Obstacle";
import { Slider, SliderArray } from "../objects/Slider";

export interface IV3Map {
    /**
     * ## Version
     * 
     * The version of the map file.
     */
    Version: string;
    /**
     * ## BPMEvents
     * 
     * The BPM events in the map.
     */
    BPMEvents: BPMEvent[];
    /**
     * ## RotationEvents
     * 
     * The rotation events in the map.
     */
    RotationEvents: RotationEvent[];
    /**
     * ## BasicBeatmapEvents
     * 
     * The basic beatmap events in the map.
     */
    BasicBeatmapEvents: BaseBeatmapEvent[];
    /**
     * ## Color Boost Events
     * 
     * The color boost events in the map.
     */
    ColorBoostBeatmapEvents: ColorBoostBeatmapEvent[];
    /**
     * ## ColorNotes
     * 
     * The notes in the map.
     */
    ColorNotes: Note[];
    /**
     * ## BombNotes
     * 
     * The bomb notes in the map.
     */
    BombNotes: Bomb[];
    /**
     * ## Obstacles
     * 
     * The obstacles in the map.
     */
    Obstacles: Obstacle[];
    /**
     * ## Sliders
     * 
     * The sliders in the map.
     */
    Sliders: Slider[];
    /**
     * ## BurstSliders
     * 
     * The burst sliders in the map.
     */
    BurstSliders: BurstSlider[];
    /**
     * ## CustomData
     * 
     * The custom data for the map.
     */
    CustomData: IV3MapCustomData;
}

export interface IV3MapCustomData {
    /**
     * ## _time
     * 
     * The time spent in the editor for the map.
     */
    Time?: number;
    /**
     * ## Fake Color Notes
     * 
     * The fake notes in the map.
     */
    FakeColorNotes: NoteArray;
    /**
     * ## Fake Bomb Notes
     * 
     * The fake bomb notes in the map.
     */
    FakeBombNotes: BombArray;
    /**
     * ## Fake Obstacles
     * 
     * The fake obstacles in the map.
     */
    FakeObstacles: ObstacleArray;
    /**
     * ## Fake Sliders
     * 
     * The fake sliders in the map.
     */
    FakeSliders: SliderArray;
    /**
     * ## Fake Burst Sliders
     * 
     * The fake burst sliders in the map.
     */
    FakeBurstSliders: BurstSliderArray;
    /**
     * ## Point Definitions
     * 
     * The point definitions in the map.
     */
    PointDefinitions: Map<string, AnyAnimation>;
    /**
     * ## Materials
     * 
     * The materials in the map.
     */
    Materials: Map<string, Material>;
    /**
     * ## Environment
     * 
     * The environment for the map.
     */
    Environment: Environment[];
    /**
     * ## CustomEvents
     * 
     * The custom events for the map.
     */
    CustomEvents: BaseCustomEvent[];
}