import { ColorFormat, FilterMode as FilterModeEnum } from "../../../util/enums";
import { BaseCustomEvent } from "./BaseCustomEvent";

export interface ICreateScreenTextureData {
    ID: string;
    XRatio?: number;
    YRatio?: number;
    Width?: number;
    Height?: number;
    ColorFormat?: ColorFormat | keyof typeof ColorFormat;
    FilterMode?: FilterModeEnum | keyof typeof FilterModeEnum;
}

class CreateScreenTextureData implements ICreateScreenTextureData {
    private id: string;
    private xRatio?: number;
    private yRatio?: number;
    private width?: number;
    private height?: number;
    private colorFormat?: ColorFormat | keyof typeof ColorFormat;
    private filterMode?: FilterModeEnum | keyof typeof FilterModeEnum;

    set ID(value: string) { this.id = value; }
    set XRatio(value: undefined | number) { this.xRatio = value; }
    set YRatio(value: undefined | number) { this.yRatio = value; }
    set Width(value: undefined | number) { this.width = typeof value === "number" ? Math.floor(value) : value; }
    set Height(value: undefined | number) { this.height = typeof value === "number" ? Math.floor(value) : value; }
    set ColorFormat(value: undefined | ColorFormat | keyof typeof ColorFormat) { this.colorFormat = value; }
    set FilterMode(value: undefined | FilterModeEnum | keyof typeof FilterModeEnum) { this.filterMode = value; }

    get ID(): string { return this.id; }
    get XRatio(): undefined | number { return this.xRatio; }
    get YRatio(): undefined | number { return this.yRatio; }
    get Width(): undefined | number { return this.width; }
    get Height(): undefined | number { return this.height; }
    get ColorFormat(): undefined | ColorFormat | keyof typeof ColorFormat { return this.colorFormat; }
    get FilterMode(): undefined | FilterModeEnum | keyof typeof FilterModeEnum { return this.filterMode; }

    constructor(data?: ICreateScreenTextureData) {
        if (data === undefined) data = {} as ICreateScreenTextureData;

        this.id = data.ID;
        this.xRatio = data.XRatio;
        this.yRatio = data.YRatio;
        this.width = data.Width;
        this.height = data.Height;
        this.colorFormat = data.ColorFormat;
        this.filterMode = data.FilterMode;
    }
}

export class CreateScreenTexture extends BaseCustomEvent {
    protected d: CreateScreenTextureData = new CreateScreenTextureData();
    
    set Data(value: ICreateScreenTextureData) { this.d = new CreateScreenTextureData(value); }
    set ID(value: string) { this.d.ID = value; }
    set XRatio(value: number) { this.d.XRatio = value; }
    set YRatio(value: number) { this.d.YRatio = value; }
    set Width(value: number) { this.d.Width = value; }
    set Height(value: number) { this.d.Height = value; }
    set ColorFormat(value: ColorFormat | keyof typeof ColorFormat) { this.d.ColorFormat = value; }
    set FilterMode(value: FilterModeEnum | keyof typeof FilterModeEnum) { this.d.FilterMode = value; }

    get Data(): ICreateScreenTextureData { return this.d; }
    get ID(): string { return this.d.ID; }
    get XRatio(): undefined | number { return this.d.XRatio; }
    get YRatio(): undefined | number { return this.d.YRatio; }
    get Width(): undefined | number { return this.d.Width; }
    get Height(): undefined | number { return this.d.Height; }
    get ColorFormat(): undefined | ColorFormat | keyof typeof ColorFormat { return this.d.ColorFormat; }
    get FilterMode(): undefined | FilterModeEnum | keyof typeof FilterModeEnum { return this.d.FilterMode; }

    constructor(beat: number = 0, data: ICreateScreenTextureData = new CreateScreenTextureData()) {
        super(beat, "CreateScreenTexture");
        this.d = new CreateScreenTextureData(data);
    }
}