import { lightCustomData } from "./lightCustomData";
import { lightType } from "./lightType";
import { lightValue } from "./lightValue";


export type LIGHT = {
    time: number;
    type: lightType;
    value: lightValue;
    float?: number;
    data?: lightCustomData;
};
