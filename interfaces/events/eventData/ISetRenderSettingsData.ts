import { easingType } from "../../../types/easingType";
import IQualitySettings from "../../RenderSettings/IQualitySettings";
import IRenderSettings from "../../RenderSettings/IRenderSettings";
import IXRSettings from "../../RenderSettings/IXRSettings";

export default interface ISetRenderSettingsData {
    duration?: number;
    easing?: easingType;
    renderSettings?: IRenderSettings;
    qualitySettings?: IQualitySettings;
    xrSettings?: IXRSettings;
}