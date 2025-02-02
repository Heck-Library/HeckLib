import ISetCamPropData from "./ISetCamPropData";

export default interface ICreateCameraData {
    id: string;
    texture?: string;
    depthTexture?: string;
    properties: ISetCamPropData
}