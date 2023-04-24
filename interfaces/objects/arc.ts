import cutDirection from "../../types/cutDirection";
import lineIndex from "../../types/lineIndex";
import lineLayer from "../../types/lineLayer";
import IObjectAnimation from "../customData/animationData";
import ICustomData from "../customData/customNoteData";
import ICustomSliderData from "../customData/customSliderData";

export default interface IArc {
    time: number;
    x?: lineIndex;
    y?: lineLayer;
    type?: 0 | 1;
    direction?: cutDirection;
    multiplier?: number;
    endTime?: number;
    endX?: lineIndex;
    endY?: lineLayer;
    endDirection?: cutDirection;
    endMultiplier?: number;
    anchor?: 0 | 1 | 2;
    customData: ICustomSliderData;
    animation: IObjectAnimation;
}