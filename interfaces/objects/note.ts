import cutDirection from "../../types/cutDirection";
import lineIndex from "../../types/lineIndex";
import lineLayer from "../../types/lineLayer";
import noteType from "../../types/noteType";
import IObjectAnimation from "../customData/animationData";
import ICustomData from "../customData/customNoteData";

export default interface INote {
    /**
     * The time of the note.
     * 
     * This is the time in beats from the start of the song.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_time`
     * - V3: `b`
     */
    time: number;
    /**
     * The line index of the note.
     * 
     * An integer number, from 0 to 3, which represents the column where this note is located. The far left column is located at index 0, and increases to the far right column located at index 3.
     * 
     * - Left: 0
     * - Left Middle: 1
     * - Right Middle: 2
     * - Right: 3
     * 
     * You can also use the enumerator in the Note class.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_lineIndex`
     * - V3: `x`
     */
    x?: lineIndex;
    /**
     * The line layer of the note.
     * 
     * An integer number, from 0 to 2, which represents the layer where this note is located. The bottommost layer is located at layer 0, and inceases to the topmost layer located at index 2.
     * 
     * - Bottom: 0
     * - Middle: 1
     * - Top: 2
     * 
     * You can also use the enumerator in the Note class.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_lineLayer`
     * - V3: `y`
     */
    y?: lineLayer;
    /**
     * The type or the color of the note.
     * 
     * - Red: 0
     * - Blue: 1
     * - Bomb: 3 (Won't work in V3 due to bombs belonging to a separate array.)
     * 
     * You can also use the enumerator in the Note class.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_type`
     * - V3: `c`
    */
    type?: noteType;
    /**
     * An integer number which represents the additional counter-clockwise angle offset applied to the note's cut direction in degrees. This has no effect on angles created due to snapping (e.g. dot stack, slanted windows).
     * 
     * This only works in V3.
     * 
     * ---
     * 
     * ### JSON Values
     * - V3: `a`
     */
    angle?: number;
    /**
     * The cut direction of the note.
     * 
     * - Up: 0
     * - Down: 1
     * - Left: 2
     * - Right: 3
     * - Up Left: 4
     * - Up Right: 5
     * - Down Left: 6
     * - Down Right: 7
     * - Dot: 8
     * 
     * You can also use the enumerator in the Note class.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_cutDirection`
     * - V3: `d`
     */
    direction?: cutDirection;
    /**
     * The custom data of the note.
     * 
     * This is used for adding custom data to the note. Such as `color` or `scale`
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_customData`
     * - V3: `customData`
     */
    customData: ICustomData;
    /**
     * The animation of the note.
     * 
     * This is used for adding animations to the note. Such as `position` or `rotation`
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_customData._animation`
     * - V3: `customData.animation`
     */
    animation: IObjectAnimation;
}