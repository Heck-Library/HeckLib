import cutDirection from "../../../../types/cutDirection";
import lineIndex from "../../../../types/lineIndex";
import lineLayer from "../../../../types/lineLayer";
import noteType from "../../../../types/noteType";

export default interface V2JsonNote {
    _time: number;
    _lineIndex: lineIndex;
    _lineLayer: lineLayer;
    _type: noteType;
    _cutDirection: cutDirection;
}