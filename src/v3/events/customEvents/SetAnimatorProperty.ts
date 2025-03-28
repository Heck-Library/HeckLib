import { Ease } from "../../../util/easings";
import { BaseCustomEvent } from "./BaseCustomEvent";
import { AnimatorPropertyData } from "./properties/Properties";
import { ISetAnimatorPropertyData, SetAnimatorPropertyData } from "./properties/PropertyData";


export class SetAnimatorProperty extends BaseCustomEvent {
    protected declare d: SetAnimatorPropertyData;

    set Data(data: ISetAnimatorPropertyData) { this.d = new SetAnimatorPropertyData(data); }
    set ID(id: string) { this.d.ID = id; }
    set Duration(duration: number) { this.d.Duration = duration; }
    set Easing(easing: Ease) { this.d.Easing = easing; }
    set Properties(properties: AnimatorPropertyData | AnimatorPropertyData[]) { this.d.Properties = properties; }

    get Data(): ISetAnimatorPropertyData { return this.d; }
    get ID(): string { return this.d.ID; }
    get Duration(): undefined | number { return this.d.Duration; }
    get Easing(): undefined | Ease { return this.d.Easing; }
    get Properties(): AnimatorPropertyData | AnimatorPropertyData[] { return this.d.Properties; }

    constructor(beat: number = 0, data: ISetAnimatorPropertyData = new SetAnimatorPropertyData()) {
        super(beat, "SetAnimatorProperty");
        this.d = new SetAnimatorPropertyData(data);
    }
}