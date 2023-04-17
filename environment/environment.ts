import IComponents from "../interfaces/components/components";
import IEnvironment from "../interfaces/environment/environment";
import { environment } from "../map/initialize";
import lookupMethod from "../types/lookupMethod";
import { vec3 } from "../types/vectors";

enum LOOKUP {
    REGEX = "Regex",
    CONTAINS = "Contains",
    EXACT = "Exact",
    STARTS_WITH = "Startswith",
    ENDS_WITH = "Endswith"
}

export default class Environment implements IEnvironment {

    public static readonly LOOKUP = LOOKUP;

    public id: string | RegExp;
    public lookupMethod?: lookupMethod;
    public components?: IComponents;
    public duplicate?: number;
    public active?: boolean;
    public scale?: vec3;
    public position?: vec3;
    public localPosition?: vec3;
    public rotation?: vec3;
    public localRotation?: vec3;
    public lightID?: number;
    public track?: string | string[];

    constructor();
    constructor(environment: IEnvironment);
    constructor(environment?: IEnvironment) {
        const { id, lookupMethod, components, duplicate, active, scale, position, localPosition, rotation, localRotation, lightID, track } = environment || {};

        this.id = '';
        this.lookupMethod = Environment.LOOKUP.EXACT;

        if (typeof environment !== 'undefined') {
            if (id) this.id = id;
            if (lookupMethod) this.lookupMethod = lookupMethod;
            if (components) this.components = components;
            if (duplicate) this.duplicate = duplicate;
            if (active) this.active = active;
            if (scale) this.scale = scale;
            if (position) this.position = position;
            if (localPosition) this.localPosition = localPosition;
            if (rotation) this.rotation = rotation;
            if (localRotation) this.localRotation = localRotation;
            if (lightID) this.lightID = lightID;
            if (track) this.track = track;
        }
    }

    push() : void {
        environment.push(this);
    }
}