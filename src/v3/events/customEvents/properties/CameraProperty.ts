import { Vec3, Vec4 } from "../../../../util/vec";

export type depthTextureMode = 'Depth' | 'DepthNormals' | 'MotionVectors';

export interface ICullingProperty {
    track: string | string[],
    whitelist?: boolean
}

export interface ICameraProperty {
    DepthTextureMode?: depthTextureMode[];
    ClearFlags?: 'Skybox' | 'SolidColor' | 'Depth' | 'Nothing';
    BackgroundColor?: Vec3 | Vec4;
    Culling?: ICullingProperty;
    BloomPrePass?: boolean;
    MainEffect?: boolean;
}

export class CameraProperty implements ICameraProperty {
    private depthTextureMode?: depthTextureMode[];
    private clearFlags?: 'Skybox' | 'SolidColor' | 'Depth' | 'Nothing';
    private backgroundColor?: Vec3 | Vec4;
    private culling?: ICullingProperty;
    private bloomPrePass?: boolean;
    private mainEffect?: boolean;

    set DepthTextureMode(value: undefined | depthTextureMode[]) { this.depthTextureMode = value; }
    set ClearFlags(value: undefined | 'Skybox' | 'SolidColor' | 'Depth' | 'Nothing') { this.clearFlags = value; }
    set BackgroundColor(value: undefined | Vec3 | Vec4) { this.backgroundColor = value; }
    set Culling(value: undefined | ICullingProperty) { this.culling = value; }
    set BloomPrePass(value: undefined | boolean) { this.bloomPrePass = value; }
    set MainEffect(value: undefined | boolean) { this.mainEffect = value; }

    get DepthTextureMode(): undefined | depthTextureMode[] { return this.depthTextureMode; }
    get ClearFlags(): undefined | 'Skybox' | 'SolidColor' | 'Depth' | 'Nothing' { return this.clearFlags; }
    get BackgroundColor(): undefined | Vec3 | Vec4 { return this.backgroundColor; }
    get Culling(): undefined | ICullingProperty { return this.culling; }
    get BloomPrePass(): undefined | boolean { return this.bloomPrePass; }
    get MainEffect(): undefined | boolean { return this.mainEffect; }

    constructor(data?: ICameraProperty) {
        if (data === undefined) data = {} as ICameraProperty;

        this.DepthTextureMode = data.DepthTextureMode;
        this.ClearFlags = data.ClearFlags;
        this.BackgroundColor = data.BackgroundColor;
        this.Culling = data.Culling;
        this.BloomPrePass = data.BloomPrePass;
        this.MainEffect = data.MainEffect;
    }
}