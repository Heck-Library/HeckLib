export class TubeBloomPrePassLight {
    private colorAlphaMultiplier: number = 0;
    private bloomFogIntensityMultiplier: number = 0;

    get ColorAlphaMultiplier(): number { return this.colorAlphaMultiplier; }
    get BloomFogIntensityMultiplier(): number { return this.bloomFogIntensityMultiplier; }

    set ColorAlphaMultiplier(colorAlphaMultiplier: number) { this.colorAlphaMultiplier = colorAlphaMultiplier; }
    set BloomFogIntensityMultiplier(bloomFogIntensityMultiplier: number) { this.bloomFogIntensityMultiplier = bloomFogIntensityMultiplier; }

    constructor(colorAlphaMultiplier?: number, bloomFogIntensityMultiplier?: number) {
        if (typeof colorAlphaMultiplier === "undefined") return this;
        if (typeof bloomFogIntensityMultiplier === "undefined") return this;

        this.colorAlphaMultiplier = colorAlphaMultiplier;
        this.bloomFogIntensityMultiplier = bloomFogIntensityMultiplier;
        
        return this;
    }
}