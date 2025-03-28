import { LookupMethod } from "../../../util/enums";
import { Vec3 } from "../../../util/vec";
import { IComponents } from "./IComponents";
import { IGeometry } from "../Geometry";

interface IBaseEnv {
    Components?: IComponents;
    Duplicate?: number;
    Active?: boolean;
    Scale?: Vec3;
    Position?: Vec3;
    LocalPosition?: Vec3;
    Rotation?: Vec3;
    LocalRotation?: Vec3;
    Track?: string;   
}

export interface IGeometryEnvironment extends IBaseEnv {
    Geometry: IGeometry;
}

export interface IEnvironmentEnhancement extends IBaseEnv {
    ID: string | RegExp;
    LookupMethod: LookupMethod | keyof typeof LookupMethod;
}