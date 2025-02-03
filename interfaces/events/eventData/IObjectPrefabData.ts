import { vec3 } from "../../../types/vectors";

export default interface IObjectPrefabData {
    loadMode: "Single" | "Additive";
    colorNotes?: {
        track: string | string[];
        asset?: string;
        anyDirectionAsset?: string;
        debrisAsset?: string;
    };
    burstSliders?: {
        track: string | string[];
        asset?: string;
        debrisAsset?: string;
    };
    burstSliderElements?: {
        track: string | string[];
        asset?: string;
        debrisAsset?: string;
    };
    saber?: {
        type: "Left" | "Right" | "Both";
        asset?: string;
        trailAsset?: string;
        trailTopPos?: vec3;
        trailBottomPos?: vec3;
        trailDuration?: number;
        trailSamplingFrequency?: number;
        trailGranularity?: number;
    }

}