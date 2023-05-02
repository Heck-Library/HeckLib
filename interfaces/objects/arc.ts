import cutDirection from "../../types/cutDirection";
import lineIndex from "../../types/lineIndex";
import lineLayer from "../../types/lineLayer";
import IObjectAnimation from "../customData/animationData";
import ICustomData from "../customData/customNoteData";
import ICustomSliderData from "../customData/customSliderData";

export default interface IArc {
    /**
     * ### Time
     * 
     * The time in beats at which the arc starts.
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
     * The line index of the arc's start point.
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
     * The line layer of the arc's start point.
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
     * ### Type
     * 
     * The type of the arc. (Red/Blue)
     * 
     * Type: `0 | 1`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "c": 0 | 1
     * ```
     */
    type?: 0 | 1;
    /**
     * ### Direction
     * 
     * The direction of the arc's startpoint.
     * 
     * You can use the `DIRECTION` enum to set this value.
     * 
     * Type: `cutDirection`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "d": cutDirection
     * ```
     */
    direction?: cutDirection;
    /**
     * ### Multiplier
     * 
     * The multiplier of the arc's startpoint.
     * 
     * Type: `number`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "mu": number
     * ```
     */
    multiplier?: number;
    /**
     * ### End Time
     * 
     * The time in beats at which the arc ends.
     * 
     * Type: `number`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "tb": number
     * ```
     */
    endTime?: number;
    /**
     * ### End X
     * 
     * The line index of the arc's end point.
     * 
     * Type: `lineIndex`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "tx": lineIndex
     * ```
     */
    endX?: lineIndex;
    /**
     * ### End Y
     * 
     * The line layer of the arc's end point.
     * 
     * Type: `lineLayer`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "ty": lineLayer
     * ```
     */
    endY?: lineLayer;
    /**
     * ### End Direction
     * 
     * The direction of the arc's endpoint.
     * 
     * You can use the `DIRECTION` enum to set this value.
     * 
     * Type: `cutDirection`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "tc": cutDirection
     * ```
     */
    endDirection?: cutDirection;
    /**
     * ### End Multiplier
     * 
     * The multiplier of the arc's endpoint.
     * 
     * Type: `number`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "tmu": number
     * ```
     */
    endMultiplier?: number;
    /**
     * ### Anchor
     * 
     * The anchor type of the arc. (Straight/CW/CCW)
     * 
     * You can use the `ANCHOR` enum to set this value.
     * 
     * Type: `0 | 1 | 2`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "m": 0 | 1 | 2
     * ```
     */
    anchor?: 0 | 1 | 2;
    /**
     * ### Custom Data
     * 
     * The custom data of the arc.
     * 
     * Type: `ICustomSliderData`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "_customData": ICustomSliderData
     * ```
     */
    customData: ICustomSliderData;
    /**
     * ### Animation
     * 
     * The animation data of the arc.
     * 
     * Type: `IObjectAnimation`
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "_customData": { "_animation": IObjectAnimation }
     * ```
     */
    animation: IObjectAnimation;
}