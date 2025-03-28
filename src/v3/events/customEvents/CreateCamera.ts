import { BaseCustomEvent } from "./BaseCustomEvent";
import { CameraProperty, ICameraProperty } from "./properties/CameraProperty";

export interface ICreateCameraData {
    ID: string;
    Texture?: string;
    DepthTexture?: string;
    Properties?: ICameraProperty;
}

export class CreateCameraData implements ICreateCameraData {
    private id: string;
    private texture?: string;
    private depthTexture?: string;
    private properties?: CameraProperty;

    set ID(value: string) { this.id = value; }
    set Texture(value: undefined | string) { this.texture = value; }
    set DepthTexture(value: undefined | string) { this.depthTexture = value; }
    set Properties(value: undefined | ICameraProperty) { this.properties = new CameraProperty(value); }

    get ID(): string { return this.id; }
    get Texture(): undefined | string { return this.texture; }
    get DepthTexture(): undefined | string { return this.depthTexture; }
    get Properties(): undefined | ICameraProperty { return this.properties; }

    constructor(data?: ICreateCameraData) {
        if (data === undefined) data = {} as ICreateCameraData;
        this.id = data.ID;
        this.texture = data.Texture;
        this.depthTexture = data.DepthTexture;
        this.Properties = data.Properties;
    }
}

export class CreateCamera extends BaseCustomEvent {
    protected readonly t: string = "CreateCamera";
    protected declare d: CreateCameraData;

    set Data(value: ICreateCameraData) { this.d = new CreateCameraData(value); }
    set ID(value: string) { this.Data.ID = value; }
    set Texture(value: undefined | string) { this.Data.Texture = value; }
    set DepthTexture(value: undefined | string) { this.Data.DepthTexture = value; }
    set Properties(value: undefined | ICameraProperty) { this.Data.Properties = value; }

    get Data(): ICreateCameraData { return this.d; }
    get ID(): string { return this.Data.ID; }
    get Texture(): undefined | string { return this.Data.Texture; }
    get DepthTexture(): undefined | string { return this.Data.DepthTexture; }
    get Properties(): undefined | ICameraProperty { return this.Data.Properties; }

    constructor(beat: number = 0, data: ICreateCameraData = new CreateCameraData()) {
        super(beat, "CreateCamera");
        this.d = new CreateCameraData(data);
    }
}