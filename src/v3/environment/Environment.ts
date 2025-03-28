import { LookupMethod } from "../../util/enums";
import { log } from "../../util/logs";
import { Vec3 } from "../../util/vec";
import { Geometry, IGeometry } from "./Geometry";
import { IComponents } from "./interfaces/IComponents";
import { IEnvironmentEnhancement, IGeometryEnvironment } from "./interfaces/IEnvironment";
import { Material } from "./Material";

export abstract class BaseEnvironment {
    protected components?: IComponents;
    protected duplicate?: number;
    protected active?: boolean;
    protected scale?: Vec3;
    protected position?: Vec3;
    protected localPosition?: Vec3;
    protected rotation?: Vec3;
    protected localRotation?: Vec3;
    protected track?: string;

    get Components(): undefined | IComponents { return this.components; }
    get Duplicate(): undefined | number { return this.duplicate; }
    get Active(): undefined | boolean { return this.active; }
    get Scale(): undefined | Vec3 { return this.scale; }
    get Position(): undefined | Vec3 { return this.position; }
    get LocalPosition(): undefined | Vec3 { return this.localPosition; }
    get Rotation(): undefined | Vec3 { return this.rotation; }
    get LocalRotation(): undefined | Vec3 { return this.localRotation; }
    get Track(): undefined | string { return this.track; }

    set Components(components: undefined | IComponents) { this.components = components; }
    set Duplicate(duplicate: undefined | number) { this.duplicate = duplicate; }
    set Active(active: undefined | boolean) { this.active = active; }
    set Scale(scale: undefined | Vec3) { this.scale = scale; }
    set Position(position: undefined | Vec3) { this.position = position; }
    set LocalPosition(localPosition: undefined | Vec3) { this.localPosition = localPosition; }
    set Rotation(rotation: undefined | Vec3) { this.rotation = rotation; }
    set LocalRotation(localRotation: undefined | Vec3) { this.localRotation = localRotation; }
    set Track(track: undefined | string) { this.track = track; }

    constructor(data?: IEnvironmentEnhancement | IGeometryEnvironment) {
        if (typeof data === "undefined") return;

        this.components = data.Components;
        this.duplicate = data.Duplicate;
        this.active = data.Active;
        this.scale = data.Scale;
        this.position = data.Position;
        this.localPosition = data.LocalPosition;
        this.rotation = data.Rotation;
        this.localRotation = data.LocalRotation;
        this.track = data.Track;
    }
}

type IEnvironment = IEnvironmentEnhancement | IGeometryEnvironment;

export class Environment extends BaseEnvironment {
    private id?: string | RegExp;
    private lookupMethod?: LookupMethod;

    private geometry?: Geometry;

    get ID(): undefined | string | RegExp {
        if (this.isGeometry()) {
            log.error("Cannot get ID from an Environment object that has a Geometry");
            return "undefined";
        }
        return this.id;
    }
    get LookupMethod(): undefined | LookupMethod {
        if (this.isGeometry()) {
            log.error("Cannot get LookupMethod from an Environment object that has a Geometry");
            return undefined;
        }
        return this.lookupMethod;
    }

    get Geometry(): undefined | IGeometry {
        if (this.isEnhancement()) {
            log.error("Cannot get Geometry from an Environment object that is an Environment Enhancement");
            return undefined;
        }

        if (this.geometry === undefined) this.geometry = new Geometry();

        return this.geometry;
    }

    set ID(id: undefined | string | RegExp) {
        if (this.isGeometry()) {
            log.error("Cannot set ID for an Environment object that has a Geometry");
            return;
        }

        this.id = id;

        delete this.Geometry;
        delete this.geometry;
    }
    set LookupMethod(lookupMethod: undefined | LookupMethod | keyof typeof LookupMethod) {
        if (this.isGeometry()) {
            log.error("Cannot set LookupMethod for an Environment object that has a Geometry");
            return;
        }

        this.lookupMethod = lookupMethod as LookupMethod;

        delete this.Geometry;
        delete this.geometry;
    }

    set Geometry(geometry: undefined | IGeometry) {
        if (this.isEnhancement()) {
            log.error("Cannot set Geometry for an Environment object that is an Environment Enhancement");
            return;
        }

        if (this.geometry === undefined) this.geometry = new Geometry();

        if (geometry === undefined) return;

        const geo = this.geometry;

        geo.Collision = geometry.Collision;
        geo.Material = geometry.Material ?? new Material();
        geo.Type = geometry.Type ?? Geometry.SHAPE.Cube;

        delete this.ID;
        delete this.id;
        delete this.LookupMethod;
        delete this.lookupMethod;
    }

    private isGeometry(): boolean { return this.geometry !== undefined; }
    private isEnhancement(): boolean { return (this.id !== undefined && this.lookupMethod !== undefined); }

    private static dataIsGeometry(data: IEnvironment): data is IGeometryEnvironment { return (data as IGeometryEnvironment).Geometry !== undefined; }
    private static dataIsEnhancement(data: IEnvironment): data is IEnvironmentEnhancement { return (data as IEnvironmentEnhancement).ID !== undefined; }

    public static fromJSON(...json: Record<string, any>[]): Environment[] {
        const environments: Environment[] = [];

        json.forEach(e => {
            if (Environment.dataIsGeometry(e as IEnvironment)) {
                const environment = new Environment(e as IGeometryEnvironment);
                environments.push(environment);
            } else if (Environment.dataIsEnhancement(e as IEnvironment)) {
                const environment = new Environment(e as IEnvironmentEnhancement);
                environments.push(environment);
            }
        });

        return environments
    }

    public toJSON(): Record<string, any> {
        const json: Record<string, any> = {};

        if (this.isGeometry()) {
            json.geometry = (this.Geometry as Geometry).toJSON();
        } else if (this.isEnhancement()) {
            json.id = this.ID;
            json.lookupMethod = this.LookupMethod;
        }

        json.components = this.Components;
        json.duplicate = this.Duplicate;
        json.active = this.Active;
        json.scale = this.Scale;
        json.position = this.Position;
        json.localPosition = this.LocalPosition;
        json.rotation = this.Rotation;
        json.localRotation = this.LocalRotation;
        json.track = this.Track;

        return json
    }

    constructor(data?: IEnvironmentEnhancement);
    constructor(data?: IGeometryEnvironment);
    constructor(data?: IEnvironmentEnhancement | IGeometryEnvironment) {
        super(data);

        if (typeof data === "undefined") return;

        if (Environment.dataIsGeometry(data)) {
            this.geometry = new Geometry(data.Geometry);
        } else if (Environment.dataIsEnhancement(data)) {
            this.id = data.ID;
            this.lookupMethod = data.LookupMethod as LookupMethod;
        }
    }
}