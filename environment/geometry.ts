import { vec3, Track } from "../consts/mod";
import { geoShape, mat } from "../consts/types/environment/environment";
import { environment } from "../map/initialize";


interface IILightWithId {
    lightID: number;
    type: number;
}

interface IFog {
    attenuation?: number;
    offset?: number;
    startY?: number;
    height?: number;
}

interface ITubeBloom {
    colorAlphaMultiplier?: number;
    bloomFogIntensityMultiplier?: number;
}
interface IComponents {
    ILightWithId?: IILightWithId,
    BloomFogEnvironment?: IFog,
    TubeBloomPrePassLight?: ITubeBloom
}

interface IGeometry {
    shape: geoShape;
    material: string | mat;
    collision?: boolean;
}

interface IGeoEnvironment {
    components?: IComponents;
    active?: boolean;
    scale?: vec3;
    position?: vec3;
    localPosition?: vec3;
    rotation?: vec3;
    localRotation?: vec3;
    lightID?: number;
    track?: Track;
    geometry: IGeometry;
}

export default class Geometry implements IGeoEnvironment {

    static readonly Shape: Record<string, geoShape> = {
        Capsule: "Capsule",
        Cube: "Cube",
        Sphere: "Sphere",
        Cylinder: "Cylinder",
        Plane: "Plane",
        Quad: "Quad",
        Triangle: "Triangle",
    }

    components?: IComponents;
    active?: boolean;
    scale?: vec3;
    position?: vec3;
    localPosition?: vec3;
    rotation?: vec3;
    localRotation?: vec3;
    lightID?: number;
    track?: Track;
    geometry: IGeometry;

    constructor(properties?: IGeoEnvironment) {

        this.components = undefined;
        this.active = undefined;
        this.scale = undefined;
        this.position = undefined;
        this.localPosition = undefined;
        this.rotation = undefined;  
        this.localRotation = undefined;
        this.lightID = undefined;
        this.track = undefined;
        this.geometry = undefined;

        if (typeof properties !== 'undefined') {
            this.components = properties.components;
            this.active = properties.active;
            this.scale = properties.scale;
            this.position = properties.position;
            this.localPosition = properties.localPosition;
            this.rotation = properties.rotation;
            this.localRotation = properties.localRotation;
            this.lightID = properties.lightID;
            this.track = properties.track;
            this.geometry = properties.geometry;
        }
    }

    push() : void {
        environment.push(this);
    }
}