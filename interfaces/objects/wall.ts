import lineIndex from "../../types/lineIndex";
import lineLayer from "../../types/lineLayer";
import IObjectAnimation from "../customData/animationData";
import ICustomWallData from "../customData/customWallData";

export default interface IWall {
    /**
     * The time in seconds at which the wall will appear in beats.
     * 
     * --- 
     * 
     * ### JSON Values
     * - V2: `_time`
     * - V3: `b`
     */
    time: number;
    /**
     * The line index at which the wall will appear.
     * 
     * This is the horizontal position of the wall, starting from left.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_lineIndex`
     * - V3: `x`
     */
    x: lineIndex;
    /**
     * The line layer at which the wall will appear.
     * 
     * This is the vertical position of the wall, starting from bottom.
     * 
     * **IN V2, THIS IS ONLY 0 OR 1.**
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_type`
     * - V3: `y`
     */
    y: lineLayer;
    /**
     * The duration of the wall in beats.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_duration`
     * - V3: `d`
     */
    duration: number;
    /**
     * The width of the wall in beats.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_width`
     * - V3: `w`
     */
    width: number;
    /**
     * The height of the wall.
     * 
     * **DOES NOT WORK WITH V2**
     * 
     * ---
     * 
     * ### JSON Values
     * - V3: `h`
     */
    height: number;
    /**
     * The custom data of the wall.
     * 
     * This is used for adding custom data to the wall. Such as `color` or `scale`
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_customData`
     * - V3: `customData`
     */
    data: ICustomWallData;
    /**
     * The animation data of the wall.
     * 
     * This is used for adding animation to the wall.
     * 
     * ---
     * 
     * ### JSON Values
     * - V2: `_customData._animation`
     * - V3: `customData.animation`
     */
    anim: IObjectAnimation;
}