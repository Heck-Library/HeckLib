import { Ease } from "../../../util/easings";
import { BaseCustomEvent } from "./BaseCustomEvent";
import { IQualitySettings, IRenderSettings, IXRSettings } from "./interfaces/ISetRenderingSettings";

export class SetRenderingSettingsData {
    private duration?: number;
    private easing?: Ease;
    private renderSettings?: Partial<IRenderSettings>;
    private qualitySettings?: Partial<IQualitySettings>;
    private xrSettings?: Partial<IXRSettings>;

    public set Duration(value: undefined | number) { this.duration = value; }
    public set Easing(value: undefined | Ease) { this.easing = value; }
    public set RenderSettings(value: undefined | Partial<IRenderSettings>) { this.renderSettings = value; }
    public set QualitySettings(value: undefined | Partial<IQualitySettings>) { this.qualitySettings = value; }
    public set XRSettings(value: undefined | Partial<IXRSettings>) { this.xrSettings = value; }

    public get Duration(): undefined | number { return this.duration; }
    public get Easing(): undefined | Ease { return this.easing; }
    public get RenderSettings(): undefined | Partial<IRenderSettings> { return this.renderSettings; }
    public get QualitySettings(): undefined | Partial<IQualitySettings> { return this.qualitySettings; }
    public get XRSettings(): undefined | Partial<IXRSettings> { return this.xrSettings; }

    constructor(data?: Partial<SetRenderingSettingsData>) {
        if (data === undefined) return;
        data.Duration !== undefined && (this.duration = data.Duration);
        data.Easing !== undefined && (this.easing = data.Easing);
        data.RenderSettings !== undefined && (this.renderSettings = data.RenderSettings);
        data.QualitySettings !== undefined && (this.qualitySettings = data.QualitySettings);
        data.XRSettings !== undefined && (this.xrSettings = data.XRSettings);
    }
}

export class SetRenderingSettings extends BaseCustomEvent implements Partial<SetRenderingSettingsData> {
    protected declare d: SetRenderingSettingsData;

    public set Data(value: Partial<SetRenderingSettingsData>) { this.d = new SetRenderingSettingsData(value); }

    public set Duration(value: undefined | number) { this.d.Duration = value; }
    public set Easing(value: undefined | Ease) { this.d.Easing = value; }
    public set RenderSettings(value: undefined | Partial<IRenderSettings>) { this.d.RenderSettings = value; }
    public set QualitySettings(value: undefined | Partial<IQualitySettings>) { this.d.QualitySettings = value; }
    public set XRSettings(value: undefined | Partial<IXRSettings>) { this.d.XRSettings = value; }

    public get Data(): SetRenderingSettingsData { return this.d; }

    public get Duration(): undefined | number { return this.d.Duration; }
    public get Easing(): undefined | Ease { return this.d.Easing; }
    public get RenderSettings(): undefined | Partial<IRenderSettings> { return this.d.RenderSettings; }
    public get QualitySettings(): undefined | Partial<IQualitySettings> { return this.d.QualitySettings; }
    public get XRSettings(): undefined | Partial<IXRSettings> { return this.d.XRSettings; }

    constructor(beat: number = 0, data: Partial<SetRenderingSettingsData> = new SetRenderingSettingsData()) {
        super(beat, "SetRenderingSettings");
        this.d = new SetRenderingSettingsData(data);
    }
}