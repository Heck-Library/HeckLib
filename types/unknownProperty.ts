import IAnimateTrackData from "../interfaces/events/eventData/IAnimateTrackData";
import IAnimComponentData from "../interfaces/events/eventData/IAnimComponentData";
import ICullMaskData from "../interfaces/events/eventData/ICullMaskData";
import IDestroyPrefabData from "../interfaces/events/eventData/IDestroyPrefabData";
import IDestroyTextureData from "../interfaces/events/eventData/IDestroyTexture";
import IFogTrackData from "../interfaces/events/eventData/IFogTrackData";
import IInstPrefabData from "../interfaces/events/eventData/IInstPrefabData";
import IMatPropertyData from "../interfaces/events/eventData/IMatPropertyData";
import IParentTrackData from "../interfaces/events/eventData/IParentTrackData";
import IPathAnimData from "../interfaces/events/eventData/IPathAnimData";
import IPlayerTrackData from "../interfaces/events/eventData/IPlayerTrackData";
import IPPData from "../interfaces/events/eventData/IPPData";
import IRenderTextData from "../interfaces/events/eventData/IRenderTextData";
import ISetCamPropData from "../interfaces/events/eventData/ISetCamPropData";

type unknownProperty = IAnimateTrackData 
| IAnimComponentData 
| ICullMaskData 
| IDestroyPrefabData
| IDestroyTextureData
| IFogTrackData 
| IInstPrefabData 
| IMatPropertyData 
| IInstPrefabData 
| IParentTrackData
| IPathAnimData
| IPlayerTrackData
| IPPData
| ISetCamPropData
| IRenderTextData;

export default unknownProperty;