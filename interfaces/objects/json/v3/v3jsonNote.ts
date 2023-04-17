import cutDirection from "../../../../types/cutDirection";
import lineIndex from "../../../../types/lineIndex";
import lineLayer from "../../../../types/lineLayer";
import ICustomData from "../../../customData/customData";

interface V3JsonNote {
    b: number;
    x: lineIndex;
    y: lineLayer;
    d: cutDirection;
    c: 0 | 1;
    a: number;
    f: number;
    customData: ICustomData
}