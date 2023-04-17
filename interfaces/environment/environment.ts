import lookupMethod from "../../types/lookupMethod";
import { vec3 } from "../../types/vectors";
import IComponents from "../components/components";

export default interface IEnvironment {
    id: string | RegExp;
    lookupMethod?: lookupMethod;
    components?: IComponents;
    duplicate?: number;
    active?: boolean;
    scale?: vec3;
    position?: vec3;
    localPosition?: vec3;
    rotation?: vec3;
    localRotation?: vec3;
    lightID?: number;
    track?: string | string[];
} 