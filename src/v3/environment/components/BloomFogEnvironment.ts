export interface IBloomFogEnvironment {
    attenuation: number;
    offset: number;
    startY: number;
    height: number;
}

export class BloomFogEnvironment {
    private attenuation: number = 0;
    private offset: number = 0;
    private startY: number = 0;
    private height: number = 0;

    ComponentType: string = "BloomFogEnvironment";

    get Attenuation(): number { return this.attenuation; }
    get Offset(): number { return this.offset; }
    get StartY(): number { return this.startY; }
    get Height(): number { return this.height; }

    set Attenuation(attenuation: number) { this.attenuation = attenuation; }
    set Offset(offset: number) { this.offset = offset; }
    set StartY(startY: number) { this.startY = startY; }
    set Height(height: number) { this.height = height; }

    private static readonly defaultValues: IBloomFogEnvironment = {
        attenuation: 0,
        offset: 0,
        startY: 0,
        height: 0
    }

    constructor(data: IBloomFogEnvironment = BloomFogEnvironment.defaultValues) {
        if (data === BloomFogEnvironment.defaultValues) return this;
        data.attenuation && (this.attenuation = data.attenuation);
        data.offset && (this.offset = data.offset);
        data.startY && (this.startY = data.startY);
        data.height && (this.height = data.height);
        return this;
    }
}