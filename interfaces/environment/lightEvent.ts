import lightType from "../../types/lightType";
import lightValue from "../../types/lightValue";
import ILightCustomData from "../customData/lightCustomData";

export default interface ILightEvent {
    time: number;
    type: lightType;
    value: lightValue;
    float?: number;
    data?: ILightCustomData;
}