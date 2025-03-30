import { IBaseObject } from "./IBaseObject";


export interface IObstacleData extends IBaseObject {
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
