import { vec3 } from "../../types/vectors";
import IComponents from "../components/components";
import IGeometryProperties from "./geometryProperties";

export default interface IGeometryEnvironment {
    components?: IComponents;
    active?: boolean;
    scale?: vec3;
    position?: vec3;
    localPosition?: vec3;
    rotation?: vec3;
    localRotation?: vec3;
    lightID?: number;
    track?: string | string[];
    geometry: IGeometryProperties;
}