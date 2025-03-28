import { Vec1Animation } from "../../../../util/vec";

export class AnimatableTubeBloomPrePassLight {
    private colorAlphaMultiplier?: Vec1Animation;
    private bloomFogIntensityMultiplier?: Vec1Animation;

    public static readonly ComponentType: string = "TubeBloomPrePassLight";

    get ColorAlphaMultiplier(): undefined | Vec1Animation { return this.colorAlphaMultiplier; }
    get BloomFogIntensityMultiplier(): undefined | Vec1Animation { return this.bloomFogIntensityMultiplier; }

    set ColorAlphaMultiplier(colorAlphaMultiplier: undefined | Vec1Animation) { this.colorAlphaMultiplier = colorAlphaMultiplier; }
    set BloomFogIntensityMultiplier(bloomFogIntensityMultiplier: undefined | Vec1Animation) { this.bloomFogIntensityMultiplier = bloomFogIntensityMultiplier; }

    constructor(data?: Partial<AnimatableTubeBloomPrePassLight>) {
        if (data === undefined) data = {} as AnimatableTubeBloomPrePassLight;

        this.colorAlphaMultiplier = data.ColorAlphaMultiplier;
        this.bloomFogIntensityMultiplier = data.BloomFogIntensityMultiplier;
    }
}