import { AnyAnimation } from "../../util/vec";
import { Environment } from "../environment/Environment";
import { Material } from "../environment/Material";
import { CustomEventArray } from "../events/customEvents/CustomEventArray";
import { BombArray } from "../objects/Bomb";
import { BurstSliderArray } from "../objects/BurstSlider";
import { NoteArray } from "../objects/Note";
import { ObstacleArray } from "../objects/Obstacle";
import { SliderArray } from "../objects/Slider";
import { IV3MapCustomData } from "./IV3Map";

//#region Map object definitions

export class V3MapCustomData implements IV3MapCustomData {
    private time: number = 0;
    private fakeColorNotes: NoteArray = new NoteArray(true);
    private fakeBombNotes: BombArray = new BombArray(true);
    private fakeObstacles: ObstacleArray = new ObstacleArray(true);
    private fakeSliders: SliderArray = new SliderArray(true);
    private fakeBurstSliders: BurstSliderArray = new BurstSliderArray(true);
    private materials: Map<string, Material> = new Map();
    private environment: Environment[] = [];
    private pointDefinitions: Map<string, AnyAnimation> = new Map();
    private customEvents: CustomEventArray = new CustomEventArray();

    constructor(data?: IV3MapCustomData) {
        if (data === undefined) data = {} as IV3MapCustomData;
        
        this.time = data.Time ?? 0;
        this.fakeColorNotes = new NoteArray(true, ...(data.FakeColorNotes ?? []));
        this.fakeBombNotes = new BombArray(true, ...(data.FakeBombNotes ?? []));
        this.fakeObstacles = new ObstacleArray(true, ...(data.FakeObstacles ?? []));
        this.fakeSliders = new SliderArray(true, ...(data.FakeSliders ?? []));
        this.fakeBurstSliders = new BurstSliderArray(true, ...(data.FakeBurstSliders ?? []));
        this.materials = data.Materials ?? new Map();
        this.environment = data.Environment ?? [];
        this.pointDefinitions = data.PointDefinitions ?? new Map();
        this.customEvents = new CustomEventArray();
    }

    get Time() { return this.time; }
    set Time(value: number) { this.time = value; }

    get FakeColorNotes() { return this.fakeColorNotes; }
    set FakeColorNotes(value: NoteArray) { this.fakeColorNotes = value; }

    get FakeBombNotes() { return this.fakeBombNotes; }
    set FakeBombNotes(value: BombArray) { this.fakeBombNotes = value; }

    get FakeObstacles() { return this.fakeObstacles; }
    set FakeObstacles(value: ObstacleArray) { this.fakeObstacles = value; }

    get FakeSliders() { return this.fakeSliders; }
    set FakeSliders(value: SliderArray) { this.fakeSliders = value; }

    get FakeBurstSliders() { return this.fakeBurstSliders; }
    set FakeBurstSliders(value: BurstSliderArray) { this.fakeBurstSliders = value; }

    get Materials() { return this.materials; }
    set Materials(value: Map<string, Material>) { this.materials = value; }

    get Environment() { return this.environment; }
    set Environment(value: Environment[]) { this.environment = value; }

    get PointDefinitions(): Map<string, AnyAnimation> { return this.pointDefinitions; }
    set PointDefinitions(value: Map<string, AnyAnimation>) { this.pointDefinitions = value; }

    get CustomEvents(): CustomEventArray { return this.customEvents; }
    set CustomEvents(value: CustomEventArray) { this.customEvents = value; }
}
