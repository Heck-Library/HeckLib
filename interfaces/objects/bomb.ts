import lineIndex from "../../types/lineIndex";
import lineLayer from "../../types/lineLayer";
import IObjectAnimation from "../customData/animationData";
import ICustomData from "../customData/customData";

export default interface IBomb {
    time: number;
    x?: lineIndex;
    y?: lineLayer;
    data: ICustomData;
    anim: IObjectAnimation;
}