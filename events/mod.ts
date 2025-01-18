import AnimateComponent from "./animateComponent";
import AnimateTrack from "./animateTrack";
import ApplyPostProcessing from "./applyPostProcessing";
import AssignFogTrack from "./assignFogTrack";
import AssignPathAnimation from "./assignPathAnimation";
import AssignPlayerToTrack from "./assignPlayerTrack";
import AssignTrackParent from "./assignTrackParent";
import DeclareCullingMask from "./declareCullingMask";
import DeclareRenderTexture from "./declareRenderTexture";
import DestroyPrefab from "./destroyPrefab";
import DestroyTexture from "./destroyTexture";
import InstantiatePrefab from "./instantiatePrefab";
import LightEvent from "./lightEvent";
import SetAnimatorProperty from "./setAnimatorProperty";
import { SetCameraProperty } from "./setCameraProperty";
import SetGlobalProperty from "./setGlobalProperty";
import SetMaterialProperty from "./setMaterialProperty";

const Event = {
    AnimateComponent,
    AnimateTrack,
    AssignFogTrack,
    AssignPathAnimation,
    AssignPlayerToTrack,
    AssignTrackParent,
    LightEvent,
    ApplyPostProcessing,
    DeclareCullingMask,
    DeclareRenderTexture,
    DestroyPrefab,
    DestroyTexture,
    InstantiatePrefab,
    SetAnimatorProperty,
    SetCameraProperty,
    SetGlobalProperty,
    SetMaterialProperty
}

export default Event;