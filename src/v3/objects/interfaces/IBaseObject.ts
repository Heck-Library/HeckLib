import { LineIndex, LineLayer } from "util/enums";

export interface IBaseObject {
    /**
     * ## Beat
     *
     * The beat the object will be on.
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
     * The horizontal position of the object.
     *
     * ---
     *
     * ### Values
     *
     * - `Note.LINEINDEX.Left` : `0`
     * - `Note.LINEINDEX.CenterLeft` : `1`
     * - `Note.LINEINDEX.CenterRight` : `2`
     * - `Note.LINEINDEX.Right` : `3`
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
     * The vertical position of the object.
     *
     * ---
     *
     * ### Values
     *
     * - `Note.LINELAYER.Bottom` : `0`
     * - `Note.LINELAYER.Middle` : `1`
     * - `Note.LINELAYER.Top` : `2`
     *
     * ---
     *
     * **Type:** `LineLayer`
     *
     * **Default:** `LineLayer.Bottom`
     */
    Y?: LineLayer;
}
