import { ISetMaterialPropertyData, SetMaterialPropertyData } from "./properties/PropertyData";
import { SetGlobalProperty } from "./SetGlobalProperty";

export class SetMaterialProperty extends SetGlobalProperty {
    protected declare d: SetMaterialPropertyData;

    set Asset(asset: string) { this.d.Asset = asset; }
    get Asset(): string { return this.d.Asset; }

    constructor(beat: number = 0, data: ISetMaterialPropertyData = new SetMaterialPropertyData(), type: string = "SetMaterialProperty") {
        super(beat, new SetMaterialPropertyData(data), type);
        this.d = new SetMaterialPropertyData(data);
        this.t = "SetMaterialProperty";
    }
}