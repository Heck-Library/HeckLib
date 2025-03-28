import { LineIndex, LineLayer } from "../../../util/enums";


export interface IBombData {
    /**
     * ## Beat
     *
     * The beat the bomb should pass the player.
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
     * The horizontal position of the bomb.
     *
     * ---
     *
     * ### Values
     *
     * - `Bomb.LINEINDEX.Left` : `0`
     * - `Bomb.LINEINDEX.CenterLeft` : `1`
     * - `Bomb.LINEINDEX.CenterRight` : `2`
     * - `Bomb.LINEINDEX.Right` : `3`
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
     * The vertical position of the bomb.
     *
     * ---
     *
     * ### Values
     *
     * - `Bomb.LINELAYER.Bottom` : `0`
     * - `Bomb.LINELAYER.Middle` : `1`
     * - `Bomb.LINELAYER.Top` : `2`
     *
     * ---
     *
     * **Type:** `LineLayer`
     *
     * **Default:** `LineLayer.Bottom`
     */
    Y?: LineLayer;
}
