import AnimateComponent from "./animateComponent";
import AnimateTrack from "./animateTrack";
import ApplyPostProcessing from "./applyPostProcessing";
import AssignFogTrack from "./assignFogTrack";
import AssignObjectPrefab from "./assignObjectPrefab";
import AssignPathAnimation from "./assignPathAnimation";
import AssignPlayerToTrack from "./assignPlayerTrack";
import AssignTrackParent from "./assignTrackParent";
import CreateCamera from "./createCamera";
import CreateScreenTexture from "./createScreenTexture";
import DestroyObject from "./destroyObject";
import InstantiatePrefab from "./instantiatePrefab";
import LightEvent from "./lightEvent";
import SetAnimatorProperty from "./setAnimatorProperty";
import SetCameraProperty from "./setCameraProperty";
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
    InstantiatePrefab,
    SetAnimatorProperty,
    SetCameraProperty,
    SetGlobalProperty,
    SetMaterialProperty,
    CreateCamera,
    CreateScreenTexture,
    DestroyObject,
    AssignObjectPrefab
}

export default Event;