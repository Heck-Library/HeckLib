import IAnimComponentData from "./IAnimComponentData";
import IAnimateTrackData from "./IAnimateTrackData";
import ICullMaskData from "./ICullMaskData";
import IDestroyPrefabData from "./IDestroyPrefabData";
import IFogTrackData from "./IFogTrackData";
import IInstPrefabData from "./IInstPrefabData";
import IMatPropertyData from "./IMatPropertyData";
import IPPData from "./IPPData";
import IParentTrackData from "./IParentTrackData";
import IPathAnimData from "./IPathAnimData";
import IPlayerTrackData from "./IPlayerTrackData";
import IRenderTextData from "./IRenderTextData";

export default interface ICustomEvent {
    time: number;
    type: string;
    data: IAnimateTrackData | IAnimComponentData | ICullMaskData | IDestroyPrefabData | IFogTrackData | IInstPrefabData | IMatPropertyData | IParentTrackData | IPathAnimData | IPlayerTrackData | IPPData | IRenderTextData;
};
