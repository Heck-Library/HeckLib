import lineIndex from "../../types/lineIndex";
import lineLayer from "../../types/lineLayer";
import IObjectAnimation from "../customData/animationData";
import ICustomData from "../customData/customNoteData";

export default interface IBomb {
    /**
     * ### Time
     * 
     * The time in beats at which the bomb is placed at.
     * 
     * Type: `number`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "b": number
     * ```
     */
    time: number;
    /**
     * ### X
     * 
     * The line index of the bomb.
     * 
     * You can use the `LINE_INDEX` enum for setting this value.
     * 
     * Type: `lineIndex`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "x": lineIndex
     * ```
     */
    x?: lineIndex;
    /**
     * ### Y
     * 
     * The line layer of the bomb.
     * 
     * You can use the `LINE_LAYER` enum for setting this value.
     * 
     * Type: `lineLayer`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "y": lineLayer
     * ```
     */
    y?: lineLayer;
    /**
     * ### Custom Data
     * 
     * The custom data of the bomb.
     * 
     * Type: `ICustomData`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "customData": { ... }
     * ```
     */
    customData: ICustomData;
    /**
     * ### Animation
     * 
     * The animation of the bomb.
     * 
     * Type: `IObjectAnimation`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "customData": { "_animation": { ... } }
     * ```
     */
    animation: IObjectAnimation;
}