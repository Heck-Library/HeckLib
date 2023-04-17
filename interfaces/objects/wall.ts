import lineIndex from "../../types/lineIndex";
import lineLayer from "../../types/lineLayer";
import IObjectAnimation from "../customData/animationData";
import ICustomData from "../customData/customData";

export default interface IWall {
    time: number;
    x?: lineIndex;
    y?: lineLayer;
    duration?: number;
    width?: number;
    height?: number;
    data: ICustomData;
    anim: IObjectAnimation;
}