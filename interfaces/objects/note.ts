import cutDirection from "../../types/cutDirection";
import lineIndex from "../../types/lineIndex";
import lineLayer from "../../types/lineLayer";
import noteType from "../../types/noteType";
import IObjectAnimation from "../customData/animationData";
import ICustomData from "../customData/customData";

export default interface INote {
    time: number;
    type?: noteType;
    x?: lineIndex;
    y?: lineLayer;
    angle?: number;
    direction?: cutDirection;
    customData: ICustomData;
    animation: IObjectAnimation;
}