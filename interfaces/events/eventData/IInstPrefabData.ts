import { vec3 } from "../../../types/vectors";

export default interface IInstPrefabData {
    asset: string;
    id?: string;
    track?: string | string[];
    position?: vec3;
    localPosition?: vec3;
    rotation?: vec3;
    localRotation?: vec3;
    scale?: vec3;
}
