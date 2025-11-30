import { Ease } from "../../../util/easings";
import { BaseCustomEvent } from "./BaseCustomEvent";
import { AnimatableBloomFogEnvironment } from "./components/AnimatableBloomFogEnvironment";
import { AnimatableTubeBloomPrePassLight } from "./components/AnimatableTubeBloomPrePassLight";

type AnimateComponentStruct = Partial<Omit<AnimateComponentData, "Track">> & { Track: string };

export class AnimateComponentData {
    private track: string;
    private duration?: number;
    private easing?: Ease;
    private BloomFogEnvironment?: AnimatableBloomFogEnvironment;
    private TubeBloomPrePassLight?: AnimatableTubeBloomPrePassLight;

    public set Track(value: string) { this.track = value; }
    public set Duration(value: undefined | number) { this.duration = value; }
    public set Easing(value: undefined | Ease) { this.easing = value; }
    public set BloomFogEnv(value: undefined | Partial<AnimatableBloomFogEnvironment>) { this.BloomFogEnvironment = new AnimatableBloomFogEnvironment(value); }
    public set TubeBloomPrePass(value: undefined | Partial<AnimatableTubeBloomPrePassLight>) { this.TubeBloomPrePassLight = new AnimatableTubeBloomPrePassLight(value); }

    public get Track(): string { return this.track; }
    public get Duration(): undefined | number { return this.duration; }
    public get Easing(): undefined | Ease { return this.easing; }
    public get BloomFogEnv(): undefined | Partial<AnimatableBloomFogEnvironment> { return this.BloomFogEnvironment; }
    public get TubeBloomPrePass(): undefined | Partial<AnimatableTubeBloomPrePassLight> { return this.TubeBloomPrePassLight; }

    constructor(data: AnimateComponentStruct = {} as AnimateComponentStruct) {
        this.track = data.Track;
        this.duration = data.Duration;
        this.easing = data.Easing;

        if (data.BloomFogEnv !== undefined) {
            this.BloomFogEnvironment = new AnimatableBloomFogEnvironment();

            this.BloomFogEnvironment.Attenuation = data.BloomFogEnv?.Attenuation || undefined;
            this.BloomFogEnvironment.Offset = data.BloomFogEnv?.Offset || undefined;
            this.BloomFogEnvironment.StartY = data.BloomFogEnv?.StartY || undefined;
            this.BloomFogEnvironment.Height = data.BloomFogEnv?.Height || undefined;
        }

        if (data.TubeBloomPrePass !== undefined) {
            this.TubeBloomPrePassLight = new AnimatableTubeBloomPrePassLight();

            this.TubeBloomPrePassLight.ColorAlphaMultiplier = data.TubeBloomPrePass?.ColorAlphaMultiplier || undefined;
            this.TubeBloomPrePassLight.BloomFogIntensityMultiplier = data.TubeBloomPrePass?.BloomFogIntensityMultiplier || undefined;
        }
    }
}

export class AnimateComponent extends BaseCustomEvent {
    protected declare d: AnimateComponentData;

    public set Data(value: AnimateComponentStruct) { this.d = new AnimateComponentData(value); }
    public set Track(value: string) { this.d.Track = value; }
    public set Duration(value: undefined | number) { this.d.Duration = value; }
    public set Easing(value: undefined | Ease) { this.d.Easing = value; }
    public set BloomFogEnv(value: undefined | AnimatableBloomFogEnvironment) { this.d.BloomFogEnv = value; }
    public set TubeBloomPrePass(value: undefined | AnimatableTubeBloomPrePassLight) { this.d.TubeBloomPrePass = value; }

    public get Data(): AnimateComponentData { return this.d; }
    public get Track(): string { return this.d.Track; }
    public get Duration(): undefined | number { return this.d.Duration; }
    public get Easing(): undefined | Ease { return this.d.Easing; }
    public get BloomFogEnv(): undefined | Partial<AnimatableBloomFogEnvironment> { return this.d.BloomFogEnv; }
    public get TubeBloomPrePass(): undefined | Partial<AnimatableTubeBloomPrePassLight> { return this.d.TubeBloomPrePass; }

    constructor(beat: number = 0, data: AnimateComponentStruct = new AnimateComponentData()) {
        super(beat, "AnimateComponent");
        this.d = new AnimateComponentData(data);
    }
}