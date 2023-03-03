import { lightType } from "./lightType";
import { lightValue } from "./lightValue";


export type lightData = {
    time: number;
    type: lightType;
    value: lightValue;
    float?: number;
};
