import { PrefabLoadMode, PrefabSaber } from "../../../util/enums";
import { Vec3 } from "../../../util/vec";
import { BaseCustomEvent } from "./BaseCustomEvent";

interface IAssignObjectPrefabStruct {
    track: string;
    asset?: string;
}
interface IAssignCuttablePrefabStruct extends IAssignObjectPrefabStruct {
    debrisAsset?: string;
}
interface IAssignNotePrefabStruct extends IAssignCuttablePrefabStruct {
    anyDirectionAsset?: string;
}
interface IAssignSaberPrefabStruct extends IAssignObjectPrefabStruct {
    type: PrefabSaber | keyof typeof PrefabSaber;
    trailAsset?: string;
    trailTopPos?: Vec3;
    trailBottomPos?: Vec3;
    trailDuration?: number;
    trailSamplingFrequency?: number;
    trailGranularity?: number;
}

export interface IAssignObjectPrefabData {
    LoadMode: PrefabLoadMode | keyof typeof PrefabLoadMode;
    ColorNotes?: IAssignNotePrefabStruct;
    BurstSliders?: IAssignCuttablePrefabStruct;
    BurstSliderElements?: IAssignCuttablePrefabStruct;
    Saber?: IAssignSaberPrefabStruct;
}

class AssignObjectPrefabData implements IAssignObjectPrefabData {
    private loadMode: PrefabLoadMode | keyof typeof PrefabLoadMode;
    private colorNotes?: IAssignNotePrefabStruct;
    private burstSliders?: IAssignCuttablePrefabStruct;
    private burstSliderElements?: IAssignCuttablePrefabStruct;
    private saber?: IAssignSaberPrefabStruct;

    public set LoadMode(loadMode: PrefabLoadMode | keyof typeof PrefabLoadMode) { this.loadMode = loadMode; }
    public set ColorNotes(colorNotes: undefined | IAssignNotePrefabStruct) { this.colorNotes = colorNotes; }
    public set BurstSliders(burstSliders: undefined | IAssignCuttablePrefabStruct) { this.burstSliders = burstSliders; }
    public set BurstSliderElements(burstSliderElements: undefined | IAssignCuttablePrefabStruct) { this.burstSliderElements = burstSliderElements; }
    public set Saber(saber: undefined | IAssignSaberPrefabStruct) { this.saber = saber; }

    public get LoadMode(): PrefabLoadMode | keyof typeof PrefabLoadMode { return this.loadMode; }
    public get ColorNotes(): undefined | IAssignNotePrefabStruct { return this.colorNotes; }
    public get BurstSliders(): undefined | IAssignCuttablePrefabStruct { return this.burstSliders; }
    public get BurstSliderElements(): undefined | IAssignCuttablePrefabStruct { return this.burstSliderElements; }
    public get Saber(): undefined | IAssignSaberPrefabStruct { return this.saber; }

    constructor(data: IAssignObjectPrefabData = { LoadMode: PrefabLoadMode.Single } ) {
        this.loadMode = data.LoadMode;
        this.colorNotes = data.ColorNotes;
        this.burstSliders = data.BurstSliders;
        this.burstSliderElements = data.BurstSliderElements;
        this.saber = data.Saber;
    }
}

export class AssignObjectPrefab extends BaseCustomEvent {
    protected declare d: AssignObjectPrefabData;

    public set Data(value: IAssignObjectPrefabData) {
        const d = this.d;

        d.LoadMode = value.LoadMode;
        d.ColorNotes = value.ColorNotes;
        d.BurstSliders = value.BurstSliders;
        d.BurstSliderElements = value.BurstSliderElements;
        d.Saber = value.Saber;
    }
    public set LoadMode(value: PrefabLoadMode | keyof typeof PrefabLoadMode) { this.d.LoadMode = value; }
    public set ColorNotes(value: IAssignNotePrefabStruct) { this.d.ColorNotes = value; }
    public set BurstSliders(value: IAssignCuttablePrefabStruct) { this.d.BurstSliders = value; }
    public set BurstSliderElements(value: IAssignCuttablePrefabStruct) { this.d.BurstSliderElements = value; }
    public set Saber(value: IAssignSaberPrefabStruct) { this.d.Saber = value; }

    public get Data(): IAssignObjectPrefabData { return this.d; }
    public get LoadMode(): PrefabLoadMode | keyof typeof PrefabLoadMode { return this.d.LoadMode; }
    public get ColorNotes(): undefined | IAssignNotePrefabStruct { return this.d.ColorNotes; }
    public get BurstSliders(): undefined | IAssignCuttablePrefabStruct { return this.d.BurstSliders; }
    public get BurstSliderElements(): undefined | IAssignCuttablePrefabStruct { return this.d.BurstSliderElements; }
    public get Saber(): undefined | IAssignSaberPrefabStruct { return this.d.Saber; }

    constructor(beat: number = 0, data: IAssignObjectPrefabData = { LoadMode: PrefabLoadMode.Single }) {
        super(beat, "AssignObjectPrefab");
        this.Data = data;
    }
}