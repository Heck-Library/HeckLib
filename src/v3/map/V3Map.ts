import { BPMEvent } from "../events/BpmEvent";
import { RotationEvent } from "../events/RotationEvent";
import { BombArray } from "../objects/Bomb";
import { BurstSliderArray } from "../objects/BurstSlider";
import { NoteArray } from "../objects/Note";
import { ObstacleArray } from "../objects/Obstacle";
import { SliderArray } from "../objects/Slider";
import { V3MapCustomData } from "./V3MapCustomData";
import { IV3Map, IV3MapCustomData } from "./IV3Map";
import { BeatmapEventArray } from "../events/BasicBeatMapEvent";
import { ColorBoostBeatmapEvent } from "../events/ColorBoostBeatmapEvent";
import { IInitParameters } from "./interfaces/IInitParameters";
import { log } from "../../util/logs";
import { ObstacleCustomData } from "../objects/customData/ObstacleCustomData";
import { ObjectAnimationData } from "../objects/customData/ObjectAnimationData";
import { AnyVec } from "../../util/vec";
import { NoteCustomData } from "../objects/customData/NoteCustomData";
import { SliderCustomData } from "../objects/customData/SliderCustomData";


export class V3Map implements IV3Map {
    private version: string = "3.3.0";
    private bpmEvents: BPMEvent[] = [];
    private rotationEvents: RotationEvent[] = [];
    private colorBoostBeatmapEvents: ColorBoostBeatmapEvent[] = [];
    private basicBeatmapEvents: BeatmapEventArray = new BeatmapEventArray();
    private colorNotes: NoteArray = new NoteArray(false);
    private bombNotes: BombArray = new BombArray(false);
    private obstacles: ObstacleArray = new ObstacleArray(false);
    private sliders: SliderArray = new SliderArray(false);
    private burstSliders: BurstSliderArray = new BurstSliderArray(false);
    private customData: V3MapCustomData = new V3MapCustomData();

    constructor(data?: IV3Map) {
        if (data === undefined) return;
        
        this.version = data.Version ?? "3.3.0";
        this.bpmEvents = data.BPMEvents ?? [];
        this.rotationEvents = data.RotationEvents ?? [];
        this.colorNotes = new NoteArray(false, ...data.ColorNotes);
        this.bombNotes = new BombArray(false, ...data.BombNotes);
        this.obstacles = new ObstacleArray(false, ...data.Obstacles);
        this.sliders = new SliderArray(false, ...data.Sliders);
        this.burstSliders = new BurstSliderArray(false, ...data.BurstSliders);
        this.customData = new V3MapCustomData(data.CustomData);
    }

    get Version() { return this.version; }
    set Version(value: string) { this.version = value; }

    get BPMEvents() { return this.bpmEvents; }
    set BPMEvents(value: BPMEvent[]) { this.bpmEvents = value; }

    get RotationEvents() { return this.rotationEvents; }
    set RotationEvents(value: RotationEvent[]) { this.rotationEvents = value; }

    get ColorBoostBeatmapEvents() { return this.colorBoostBeatmapEvents; }
    set ColorBoostBeatmapEvents(value: ColorBoostBeatmapEvent[]) { this.colorBoostBeatmapEvents = value; }

    get BasicBeatmapEvents() { return this.basicBeatmapEvents; }
    set BasicBeatmapEvents(value: BeatmapEventArray) { this.basicBeatmapEvents = value; }

    get ColorNotes() { return this.colorNotes; }
    set ColorNotes(value: NoteArray) { this.colorNotes = value; }

    get BombNotes() { return this.bombNotes; }
    set BombNotes(value: BombArray) { this.bombNotes = value; }

    get Obstacles() { return this.obstacles; }
    set Obstacles(value: ObstacleArray) { this.obstacles = value; }

    get Sliders() { return this.sliders; }
    set Sliders(value: SliderArray) { this.sliders = value; }

    get BurstSliders() { return this.burstSliders; }
    set BurstSliders(value: BurstSliderArray) { this.burstSliders = value; }

    get CustomData() { return this.customData; }
    set CustomData(value: IV3MapCustomData) { this.customData = new V3MapCustomData(value); }

    private static VecToColor(vec: AnyVec = [0]): [number, number, number, number] {
        switch (vec.length) {
            case 1: return [vec[0], vec[0], vec[0], 1] as [number, number, number, number];
            case 2: return [vec[0], vec[1], 0, 1] as [number, number, number, number];
            case 3: return [vec[0], vec[1], vec[2], 1] as [number, number, number, number];
            case 4: return vec as [number, number, number, number];
            default: return [0, 0, 0, 1];
        }
    }

    public initMapCustomData(map: V3Map, properties: IInitParameters, mapNJS: number, mapOffset: number): V3Map {
        const START = performance.now();

        properties.NoLogo === undefined && (properties.NoLogo = false);
        properties.InitializeCustomDataFields === undefined && (properties.InitializeCustomDataFields = true);
        properties.InitializeAnimationFields === undefined && (properties.InitializeAnimationFields = true);

        let { ForcedColors, ForcedNJS, ForcedOffset, InitializeAnimationFields, InitializeCustomDataFields } = properties;

        if ((ForcedColors || ForcedNJS || ForcedOffset || InitializeAnimationFields) && InitializeCustomDataFields !== true) {
            InitializeCustomDataFields == false && (log.warning("Cannot set colors, NJS, or Offset and\ncan't initialize animation fields without\ninitializing CustomData fields:\n\x1b[31m\x1b[1moverriding InitializeCustomDataFields to true.\x1b[0m\n"));
            InitializeCustomDataFields = true;
        }

        if (!ForcedColors) ForcedColors = {};

        const realNJS: number = typeof ForcedNJS === "number" ? ForcedNJS : mapNJS;
        const realOffset: number = typeof ForcedOffset === "number" ? ForcedOffset : mapOffset;

        // Walls
        if (map.Obstacles.length > 0) {
            InitializeCustomDataFields && map.Obstacles.forEach(w => {
                w.CustomData === undefined && InitializeCustomDataFields && (w.CustomData = new ObstacleCustomData()); // Initialize CustomData if it doesn't exist
                const d = w.CustomData;
                d.NJS === undefined && ForcedNJS !== undefined && (d.NJS = realNJS); // Set NJS if it's not defined
                d.Offset === undefined && ForcedOffset !== undefined && (d.Offset = realOffset); // Set Offset if it's not defined
                d.Color === undefined && ForcedColors && ForcedColors.Obstacle !== undefined && (d.Color = V3Map.VecToColor(ForcedColors.Obstacle)); // Set color if it's not defined
                d.Animation === undefined && (d.Animation = new ObjectAnimationData()); // Initialize Animation if it doesn't exist
            });

            InitializeCustomDataFields && log.change("Walls", "CustomData", map.Obstacles[0].CustomData, "custom");
        } else log.warning(`No ${log.console.CLASS_MSG("Walls")} found, skipping...`);

        // Notes
        if (map.ColorNotes.length > 0) {
            InitializeCustomDataFields && map.ColorNotes.forEach(n => {
                n.CustomData === undefined && InitializeCustomDataFields && (n.CustomData = new NoteCustomData()); // Initialize CustomData if it doesn't exist
                const d = n.CustomData;
                d.NJS === undefined && ForcedNJS !== undefined && (d.NJS = realNJS); // Set NJS if it's not defined
                d.Offset === undefined && ForcedOffset !== undefined && (d.Offset = realOffset); // Set Offset if it's not defined
                if (ForcedColors && d.Color === undefined) { // Set color if it's not defined
                    (n.Color == 0 && ForcedColors.Left) && (d.Color = V3Map.VecToColor(ForcedColors.Left));
                    (n.Color == 1 && ForcedColors.Right) && (d.Color = V3Map.VecToColor(ForcedColors.Right));
                }
                d.Animation === undefined && (d.Animation = new ObjectAnimationData()); // Initialize Animation if it doesn't exist
            });

            InitializeCustomDataFields && log.change("Notes", "CustomData", map.ColorNotes[0].CustomData, "custom");
        } else log.warning(`No ${log.console.CLASS_MSG("Notes")} found, skipping...`);

        // Bombs
        if (map.BombNotes.length > 0) {
            InitializeCustomDataFields && map.BombNotes.forEach(b => {
                b.CustomData === undefined && (InitializeCustomDataFields) && (b.CustomData = new NoteCustomData()); // Initialize CustomData if it doesn't exist
                const d = b.CustomData;
                d.NJS === undefined && ForcedNJS !== undefined && (d.NJS = realNJS); // Set NJS if it's not defined
                d.Offset === undefined && ForcedOffset !== undefined && (d.Offset = realOffset); // Set Offset if it's not defined
                d.Color === undefined && ForcedColors && ForcedColors.Bomb !== undefined && (d.Color = V3Map.VecToColor(ForcedColors.Bomb)); // Set color if it's not defined
                d.Animation === undefined && d.Animation === undefined && (d.Animation = new ObjectAnimationData()); // Initialize Animation if it doesn't exist
            });

            InitializeCustomDataFields && log.change("Bombs", "CustomData", map.ColorNotes[0].CustomData, "custom");
        } else log.warning(`No ${log.console.CLASS_MSG("Bombs")} found, skipping...`);

        // Arcs
        if (map.Sliders.length > 0) {
            InitializeCustomDataFields && map.Sliders.forEach(s => {
                s.CustomData === undefined && (InitializeCustomDataFields) && (s.CustomData = new SliderCustomData()); // Initialize CustomData if it doesn't exist
                const d = s.CustomData;
                d.NJS === undefined && ForcedNJS !== undefined && (d.NJS = realNJS); // Set NJS if it's not defined
                d.Offset === undefined && ForcedOffset !== undefined && (d.Offset = realOffset); // Set Offset if it's not defined
                if (ForcedColors && d.Color === undefined) { // Set color if it's not defined
                    (s.Color == 0 && ForcedColors.Left) && (d.Color = V3Map.VecToColor(ForcedColors.Left));
                    (s.Color == 1 && ForcedColors.Right) && (d.Color = V3Map.VecToColor(ForcedColors.Right));
                }
                d.Animation === undefined && (d.Animation = new ObjectAnimationData()); // Initialize Animation if it doesn't exist
            });

            InitializeCustomDataFields && log.change("Arcs", "CustomData", map.BurstSliders[0].CustomData, "custom");
        } else log.warning(`No ${log.console.CLASS_MSG("Arcs")} found, skipping...`);

        // Chains
        if (map.BurstSliders.length > 0) {
            InitializeCustomDataFields && map.BurstSliders.forEach(bs => {
                bs.CustomData === undefined && (InitializeCustomDataFields) && (bs.CustomData = new NoteCustomData()); // Initialize CustomData if it doesn't exist
                const d = bs.CustomData;
                d.NJS === undefined && ForcedNJS !== undefined && (d.NJS = realNJS); // Set NJS if it's not defined
                d.Offset === undefined && ForcedOffset !== undefined && (d.Offset = realOffset); // Set Offset if it's not defined
                if (ForcedColors && d.Color === undefined) { // Set color if it's not defined
                    (bs.Color == 0 && ForcedColors.Left) && (d.Color = V3Map.VecToColor(ForcedColors.Left));
                    (bs.Color == 1 && ForcedColors.Right) && (d.Color = V3Map.VecToColor(ForcedColors.Right));
                }
                d.Animation === undefined && (d.Animation = new ObjectAnimationData()); // Initialize Animation if it doesn't exist
            });

            InitializeCustomDataFields && log.change("Chains", "CustomData", map.BurstSliders[0].CustomData, "custom");
        } else log.warning(`No ${log.console.CLASS_MSG("BurstSliders")} found, skipping...`);

        log.success(`Initialized ${(ForcedColors || ForcedNJS || ForcedOffset !== undefined) ? (log.console.OBJ_MSG("CustomData") + " & value overrides") : (log.console.OBJ_MSG("CustomData") + " fields")} in: ${log.console.TIME_MSG(START)}`);

        return map;
    }
}
