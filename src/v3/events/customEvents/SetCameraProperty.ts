import { BaseCustomEvent } from "./BaseCustomEvent";
import { CameraProperty, ICameraProperty } from "./properties/CameraProperty";

interface ISetCameraPropertyData {
    ID?: string;
    Properties: ICameraProperty;
}

class SetCameraPropertyData implements ISetCameraPropertyData {
    protected id?: string;
    private properties: CameraProperty;

    set ID(value: undefined | string) { this.id = value; }
    set Properties(value: ICameraProperty) { this.properties = new CameraProperty(value); }

    get ID(): undefined | string { return this.id; }
    get Properties(): ICameraProperty { return this.properties; }

    constructor(data?: ISetCameraPropertyData) {
        if (data === undefined) data = {} as ISetCameraPropertyData;

        this.id = data.ID;
        this.properties = new CameraProperty(data.Properties);
    }
}

export class SetCameraProperty extends BaseCustomEvent {
    protected d: SetCameraPropertyData = new SetCameraPropertyData();

    set Data(value: ISetCameraPropertyData) { this.d = new SetCameraPropertyData(value); }
    set ID(value: undefined | string) { this.d.ID = value; }
    set Properties(value: ICameraProperty) { this.d.Properties = value; }

    get Data(): ISetCameraPropertyData { return this.d; }
    get ID(): undefined | string { return this.d.ID; }
    get Properties(): ICameraProperty { return this.d.Properties; }

    constructor(beat: number = 0, data: ISetCameraPropertyData = new SetCameraPropertyData()) {
        super(beat, "SetCameraProperty");
        this.d = new SetCameraPropertyData(data);
    }
}