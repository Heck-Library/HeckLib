import { Vec3 } from "../../../util/vec";
import { BaseCustomEvent } from "./BaseCustomEvent";

export interface IInstantiatePrefabData {
    Asset: string;
    ID?: string;
    Track?: string;
    Position?: Vec3;
    LocalPosition?: Vec3;
    Rotation?: Vec3;
    LocalRotation?: Vec3;
    Scale?: Vec3;
}

class InstantiatePrefabData implements IInstantiatePrefabData {
    private asset: string;
    private id?: string;
    private track?: string;
    private position?: Vec3;
    private localPosition?: Vec3;
    private rotation?: Vec3;
    private localRotation?: Vec3;
    private scale?: Vec3;

    public set Asset(asset: string) { this.asset = asset; }
    public set ID(id: undefined | string) { this.id = id; }
    public set Track(track: undefined | string) { this.track = track; }
    public set Position(position: undefined | Vec3) { this.position = position; }
    public set LocalPosition(localPosition: undefined | Vec3) { this.localPosition = localPosition; }
    public set Rotation(rotation: undefined | Vec3) { this.rotation = rotation; }
    public set LocalRotation(localRotation: undefined | Vec3) { this.localRotation = localRotation; }
    public set Scale(scale: undefined | Vec3) { this.scale = scale; }

    public get Asset(): string { return this.asset; }
    public get ID(): undefined | string { return this.id; }
    public get Track(): undefined | string { return this.track; }
    public get Position(): undefined | Vec3 { return this.position; }
    public get LocalPosition(): undefined | Vec3 { return this.localPosition; }
    public get Rotation(): undefined | Vec3 { return this.rotation; }
    public get LocalRotation(): undefined | Vec3 { return this.localRotation; }
    public get Scale(): undefined | Vec3 { return this.scale; }

    constructor(data?: IInstantiatePrefabData) {
        if (data === undefined) data = {} as IInstantiatePrefabData;

        this.asset = data.Asset ?? "";
        this.id = data.ID;
        this.track = data.Track;
        this.position = data.Position;
        this.localPosition = data.LocalPosition;
        this.rotation = data.Rotation;
        this.localRotation = data.LocalRotation;
        this.scale = data.Scale;
    }
}

export class InstantiatePrefab extends BaseCustomEvent {
    protected declare d: InstantiatePrefabData;

    public set Data(value: IInstantiatePrefabData) { this.d = new InstantiatePrefabData(value); }
    public set Asset(value: string) { this.d.Asset = value; }
    public set ID(value: undefined | string) { this.d.ID = value; }
    public set Track(value: undefined | string) { this.d.Track = value; }
    public set Position(value: undefined | Vec3) { this.d.Position = value; }
    public set LocalPosition(value: undefined | Vec3) { this.d.LocalPosition = value; }
    public set Rotation(value: undefined | Vec3) { this.d.Rotation = value; }
    public set LocalRotation(value: undefined | Vec3) { this.d.LocalRotation = value; }
    public set Scale(value: undefined | Vec3) { this.d.Scale = value; }

    public get Data(): IInstantiatePrefabData { return this.d; }
    public get Asset(): string { return this.d.Asset; }
    public get ID(): undefined | string { return this.d.ID; }
    public get Track(): undefined | string { return this.d.Track; }
    public get Position(): undefined | Vec3 { return this.d.Position; }
    public get LocalPosition(): undefined | Vec3 { return this.d.LocalPosition; }
    public get Rotation(): undefined | Vec3 { return this.d.Rotation; }
    public get LocalRotation(): undefined | Vec3 { return this.d.LocalRotation; }
    public get Scale(): undefined | Vec3 { return this.d.Scale; }

    constructor(beat: number = 0, data: IInstantiatePrefabData = new InstantiatePrefabData()) {
        super(beat, "InstantiatePrefab");
        this.d = new InstantiatePrefabData(data);
    }
}