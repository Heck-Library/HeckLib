import { Vec1Animation } from "../../../../util/vec";

export class AnimatableBloomFogEnvironment {
    private attenuation?: Vec1Animation;
    private offset?: Vec1Animation;
    private startY?: Vec1Animation;
    private height?: Vec1Animation;

    public static readonly ComponentType: string = "BloomFogEnvironment";

    get Attenuation(): undefined | Vec1Animation { return this.attenuation; }
    get Offset(): undefined | Vec1Animation { return this.offset; }
    get StartY(): undefined | Vec1Animation { return this.startY; }
    get Height(): undefined | Vec1Animation { return this.height; }

    set Attenuation(attenuation: undefined | Vec1Animation) { this.attenuation = attenuation; }
    set Offset(offset: undefined | Vec1Animation) { this.offset = offset; }
    set StartY(startY: undefined | Vec1Animation) { this.startY = startY; }
    set Height(height: undefined | Vec1Animation) { this.height = height; }

    constructor(data?: Partial<AnimatableBloomFogEnvironment>) {
        if (data === undefined) data = {} as AnimatableBloomFogEnvironment;

        this.attenuation = data.Attenuation;
        this.offset = data.Offset;
        this.startY = data.StartY;
        this.height = data.Height;
    }
}