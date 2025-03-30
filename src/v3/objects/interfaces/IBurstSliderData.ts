import { LineIndex, LineLayer, NoteColor, CutDirection } from "../../../util/enums";
import { IBaseObject } from "./IBaseObject";


export interface IBurstSliderData extends IBaseObject {
    /**
     * ## Color
     *
     * The color of the chain.
     *
     * ---
     *
     * ### Values
     *
     * - `BurstSlider.COLOR.Red` : `0`
     * - `BurstSlider.COLOR.Blue` : `1`
     *
     * ---
     *
     * **Type:** `NoteColor`
     *
     * **Default:** `BurstSlider.COLOR.Red`
     */
    Color?: NoteColor;
    /**
     * ## CutDirection
     *
     * The direction the chain's head will be cut in.
     *
     * ---
     *
     * ### Values
     *
     * - `BurstSlider.DIRECTION.Up` : `0`
     * - `BurstSlider.DIRECTION.Down` : `1`
     * - `BurstSlider.DIRECTION.Left` : `2`
     * - `BurstSlider.DIRECTION.Right` : `3`
     * - `BurstSlider.DIRECTION.UpLeft` : `4`
     * - `BurstSlider.DIRECTION.UpRight` : `5`
     * - `BurstSlider.DIRECTION.DownLeft` : `6`
     * - `BurstSlider.DIRECTION.DownRight` : `7`
     * - `BurstSlider.DIRECTION.Any` : `8`
     *
     * ---
     *
     * **Type:** `CutDirection`
     *
     * **Default:** `BurstSlider.DIRECTION.Up`
     */
    CutDirection?: CutDirection;
    /**
     * ## TailBeat
     *
     * The beat the chain's last slice will be hit on.
     *
     * ---
     *
     * **Type:** `number`
     *
     * **Default:** `0`
     */
    TailBeat?: number;
    /**
     * ## TailX
     *
     * The horizontal position of the chain's last slice.
     *
     * ---
     *
     * ### Values
     *
     * - `BurstSlider.LINEINDEX.Left` : `0`
     * - `BurstSlider.LINEINDEX.CenterLeft` : `1`
     * - `BurstSlider.LINEINDEX.CenterRight` : `2`
     *
     * ---
     *
     * **Type:** `LineIndex`
     *
     * **Default:** `BurstSlider.LINEINDEX.Left`
     */
    TailX?: LineIndex;
    /**
     * ## TailY
     *
     * The vertical position of the chain's last slice.
     *
     * ---
     *
     * ### Values
     *
     * - `BurstSlider.LINELAYER.Bottom` : `0`
     * - `BurstSlider.LINELAYER.Middle` : `1`
     * - `BurstSlider.LINELAYER.Top` : `2`
     *
     * ---
     *
     * **Type:** `LineLayer`
     *
     * **Default:** `BurstSlider.LINELAYER.Bottom`
     */
    TailY?: LineLayer;
    /**
     * ## SliceCount
     *
     * The number of slices in the chain.
     *
     * ---
     *
     * **Type:** `number`
     *
     * **Default:** 2`
     */
    SliceCount?: number;
    /**
     * ## Squish
     *
     * The amount the chain's slices will be squished.
     *
     * ---
     *
     * **Type:** `number`
     *
     * **Default:** `0.5`
     */
    Squish?: number;
}
