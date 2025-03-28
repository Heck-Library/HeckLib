import { LineIndex, LineLayer, NoteColor, CutDirection, MidAnchorMode } from "../../../util/enums";

export interface ISliderData {
    /**
     * ## Beat
     *
     * The beat the arc will start on.
     *
     * In seconds this is calculated as `Beat / BPM * 60`.
     *
     * ---
     *
     * **Type:** `number`
     *
     * **Default:** `0`
     */
    Beat?: number;
    /**
     * ## X
     *
     * The horizontal position of the arc's head.
     *
     * ---
     *
     * ### Values
     *
     * - `Slider.LINEINDEX.Left` : `0`
     * - `Slider.LINEINDEX.CenterLeft` : `1`
     * - `Slider.LINEINDEX.CenterRight` : `2`
     * - `Slider.LINEINDEX.Right` : `3`
     *
     * ---
     *
     * **Type:** `LineIndex`
     *
     * **Default:** `LineIndex.Left`
     */
    X?: LineIndex;
    /**
     * ## Y
     *
     * The vertical position of the arc's head.
     *
     * ---
     *
     * ### Values
     *
     * - `Slider.LINELAYER.Bottom` : `0`
     * - `Slider.LINELAYER.Middle` : `1`
     * - `Slider.LINELAYER.Top` : `2`
     *
     * ---
     *
     * **Type:** `LineLayer`
     *
     * **Default:** `LineLayer.Bottom`
     */
    Y?: LineLayer;
    /**
     * ## Color
     *
     * The color of the arc.
     *
     * ---
     *
     * ### Values
     *
     * - `Slider.COLOR.Red` : `0`
     * - `Slider.COLOR.Blue` : `1`
     *
     * ---
     *
     * **Type:** `NoteColor`
     *
     * **Default:** `NoteColor.Red`
     */
    Color?: NoteColor;
    /**
     * ## CutDirection
     *
     * The direction the arc will cut in.
     *
     * ---
     *
     * ### Values
     *
     * - `Slider.DIRECTION.Up` : `0`
     * - `Slider.DIRECTION.Down` : `1`
     * - `Slider.DIRECTION.Left` : `2`
     * - `Slider.DIRECTION.Right` : `3`
     * - `Slider.DIRECTION.UpLeft` : `4`
     * - `Slider.DIRECTION.UpRight` : `5`
     * - `Slider.DIRECTION.DownLeft` : `6`
     * - `Slider.DIRECTION.DownRight` : `7`
     *
     * ---
     *
     * **Type:** `CutDirection`
     *
     * **Default:** `CutDirection.Up`
     */
    CutDirection?: CutDirection;
    /**
     * ## Multiplier
     *
     * The multiplier of the arc used to calculate the shape of the arc's start curve.
     *
     * ---
     *
     * **Type:** `number`
     *
     * **Default:** `1`
     */
    Multiplier?: number;
    /**
     * ## TailBeat
     *
     * The beat the arc will end on.
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
     * The horizontal position of the arc's tail.
     *
     * ---
     *
     * ### Values
     *
     * - `Slider.LINEINDEX.Left` : `0`
     * - `Slider.LINEINDEX.CenterLeft` : `1`
     * - `Slider.LINEINDEX.CenterRight` : `2`
     * - `Slider.LINEINDEX.Right` : `3`
     *
     * ---
     *
     * **Type:** `LineIndex`
     *
     * **Default:** `LineIndex.Left`
     */
    TailX?: LineIndex;
    /**
     * ## TailY
     *
     * The vertical position of the arc's tail.
     *
     * ---
     *
     * ### Values
     *
     * - `Slider.LINELAYER.Bottom` : `0`
     * - `Slider.LINELAYER.Middle` : `1`
     * - `Slider.LINELAYER.Top` : `2`
     *
     * ---
     *
     * **Type:** `LineLayer`
     *
     * **Default:** `LineLayer.Bottom`
     */
    TailY?: LineLayer;
    /**
     * ## TailDirection
     *
     * The direction of the arc's end.
     *
     * Assuming the map is fully linear, this should normally be the opposite of the `CutDirection`.
     *
     * ---
     *
     * ### Values
     *
     * - `Slider.DIRECTION.Up` : `0`
     * - `Slider.DIRECTION.Down` : `1`
     * - `Slider.DIRECTION.Left` : `2`
     * - `Slider.DIRECTION.Right` : `3`
     * - `Slider.DIRECTION.UpLeft` : `4`
     * - `Slider.DIRECTION.UpRight` : `5`
     * - `Slider.DIRECTION.DownLeft` : `6`
     * - `Slider.DIRECTION.DownRight` : `7`
     *
     * ---
     *
     * **Type:** `CutDirection`
     *
     * **Default:** `CutDirection.Up`
     */
    TailDirection?: CutDirection;
    /**
     * ## TailMultiplier
     *
     * The multiplier of the arc used to calculate the shape of the arc's end curve.
     *
     * ---
     *
     * **Type:** `number`
     *
     * **Default:** `1`
     */
    TailMultiplier?: number;
    /**
     * ## MidAnchorMode
     *
     * The mode of the arc's mid anchor.
     *
     * ---
     *
     * ### Values
     *
     * - `Slider.MIDANCHORMODE.Straight` : `0`
     * - `Slider.MIDANCHORMODE.Clockwise` : `1`
     * - `Slider.MIDANCHORMODE.CounterClockwise` : `2`
     *
     * ---
     *
     * **Type:** `MidAnchorMode`
     *
     * **Default:** `MidAnchorMode.Straight`
     */
    MidAnchorMode?: MidAnchorMode;
}
