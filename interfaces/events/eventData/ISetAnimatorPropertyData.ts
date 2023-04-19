import IAnimatorProperty from "./IAnimatorProperty";

export default interface ISetAnimatorPropertyData {
    id: string;
    duration?: number;
    easing?: string;
    properties: IAnimatorProperty[]
}