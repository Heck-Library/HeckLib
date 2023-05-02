import cutDirection from "../../types/cutDirection";
import IObjectAnimation from "../customData/animationData";
import ICustomData from "../customData/customNoteData";
import ICustomSliderData from "../customData/customSliderData";

export default interface IChain {
    /**
     * ### Time
     * 
     * The time in beats at which the chain starts.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "b": number }
     * ```
     */
    time: number;
    /**
     * ### X
     * 
     * An integer number, from 0 to 3, which represents the column where the head of the chain is located. The far left column is located at index 0, and increases to the far right column located at index 3.
     * 
     * You can use the `LINE_INDEX` enum to set this value.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "x": number }
     * ```
     */
    x?: number;
    /**
     * ### Y
     * 
     * An integer number, from 0 to 2, which represents the layer where the head of the chain is located. The bottommost layer is located at layer 0, and inceases to the topmost layer located at index 2.
     * 
     * You can use the `LINE_LAYER` enum to set this value.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "y": number }
     * ```
     */
    y?: number;
    /**
     * ### Type
     * 
     * The type of the chain. (Red/Blue)
     * 
     * You can use the `TYPE` enum to set this value.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "c": number }
     * ```
     */
    type?: 0 | 1;
    /**
     * ### Direction
     * 
     * An integer number which represents the head direction of the chain.
     * 
     * You can use the `DIRECTION` enum to set this value.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "d": number }
     * ```
     */
    direction?: cutDirection;
    /**
     * ### End Time
     * 
     * The time in beats at which the chain ends.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "tb": number }
     * ```
     */
    endTime: number;
    /**
     * ### End X
     * 
     * An integer number, from 0 to 3, which represents the column where the tail of the chain is located. The far left column is located at index 0, and increases to the far right column located at index 3.
     *  
     * You can use the `LINE_INDEX` enum to set this value.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "tx": number }
     * ```
     */
    endX?: number;
    /**
     * ### End Y
     * 
     * An integer number, from 0 to 2, which represents the layer where the tail of the chain is located. The bottommost layer is located at layer 0, and inceases to the topmost layer located at index 2.
     * 
     * You can use the `LINE_LAYER` enum to set this value.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "ty": number }
     * ```
     */
    endY?: number;
    /**
     * ### Segments
     * 
     * An integer number, greater than 0, which represents the number of segments in the burst slider. The head counts as a segment.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "sc": number }
     * ```
     */
    segments?: number;
    /**
     * ### Squish
     * 
     * A float which represents squish factor. This is the proportion of how much of the path from (x,y) to (endX, endY) is used by the chain. This does not alter the shape of the path. Values greater than 1 will extend the path beyond the specified end point.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "s": number }
     * ```
     */
    squish?: number;
    /**
     * ### Custom Data
     * 
     * A custom data object which can be used to store custom data.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * { "customData": object }
     * ```
     */
    customData: ICustomData;
    /**
     * ### Animation
     * 
     * An object which contains animation data. This will go under the `customData` object in the JSON file.
     * 
     * ---
     * 
     * ### JSON Equivalent
     * ```json
     * "customData": { "animation": object }
     * ```
     */
    animation: IObjectAnimation;
}