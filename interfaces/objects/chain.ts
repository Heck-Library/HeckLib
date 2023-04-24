import cutDirection from "../../types/cutDirection";
import IObjectAnimation from "../customData/animationData";
import ICustomData from "../customData/customNoteData";
import ICustomSliderData from "../customData/customSliderData";

export default interface IChain {
    time: number;
    x?: number;
    y?: number;
    type?: 0 | 1;
    direction?: cutDirection;
    endTime?: number;
    endX?: number;
    endY?: number;
    segments?: number;
    squish?: number;
    customData: ICustomSliderData;
    animation: IObjectAnimation;
}