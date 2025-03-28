import { LineIndex, LineLayer } from "../../../util/enums";


export interface IObstacleData {
    /**
     * The beat at which the obstacle should approach the player.
     *
     * In seconds this is calculated as `Beat / BPM`.
     *
     * ---
     *
     * **Type:** `number`
     *
     * **Default:** `0`
     */
    Beat?: number;
    /**
     * The duration of the obstacle.
     *
     * In seconds this is calculated as `Duration / BPM`.
     *
     * ---
     *
     * **Type:** `number`
     *
     * **Default:** `0`
     */
    Duration?: number;
    /**
     * The horizontal position of the obstacle.
     *
     * ---
     *
     * ### Values
     *
     * - `Obstacle.LINEINDEX.Left` : `0`
     * - `Obstacle.LINEINDEX.CenterLeft` : `1`
     * - `Obstacle.LINEINDEX.CenterRight` : `2`
     * - `Obstacle.LINEINDEX.Right` : `3`
     *
     * ---
     *
     * **Type:** `LineIndex`
     *
     * **Default:** `LineIndex.Left`
     */
    X?: LineIndex;
    /**
     * The vertical position of the obstacle.
     *
     * ---
     *
     * ### Values
     *
     * - `Obstacle.LINELAYER.Bottom` : `0`
     * - `Obstacle.LINELAYER.Middle` : `1`
     * - `Obstacle.LINELAYER.Top` : `2`
     *
     * ---
     *
     * **Type:** `LineLayer`
     *
     * **Default:** `LineLayer.Bottom`
     */
    Y?: LineLayer;
    /**
     * The width of the obstacle.
     *
     * 1 unit is equal to one lane's width. Which is around 0.666... meters or Unity units.
     *
     * **Note:** Setting this to 0 or a negative number will cause the obstacle to behave in an unstable manner.
     *
     * ---
     *
     * **Type:** `number`
     *
     * **Default:** `1`
     */
    Width?: number;
    /**
     * The height of the obstacle.
     *
     * 1 unit is equal to one lane's height. Which is around 3.5 meters or Unity units.
     *
     * ---
     *
     * **Type:** `number`
     *
     * **Default:** `1`
     */
    Height?: 1 | 2 | 3 | 4 | 5;
}
