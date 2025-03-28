import { Vec3 } from "../../../../util/vec";
import { IBaseCustomData } from "./IBaseCustomData";


export interface IObstacleCustomData extends IBaseCustomData {
    /**
     * ## Size
     *
     * `Size` is a `Vec3` property in the `CustomData` of an `Obstacle`.
     *
     * It can only be used with walls. Walls are stored in the `obstacles` variable of the default script.
     *
     * `obstacles` is a redefinition of the `Diff.Map.Obstacles` property, which is an array of `Obstacle` objects.
     *
     * This essentially sets the width, height, and depth of the obstacle, overriding the default `Width` and `Height` properties.
     *
     * ---
     *
     * ### Example
     *
     * ```ts
     * obstacles.select({
     *     StartBeat: 0,
     *     EndBeat: 200
     * }).forEach(obstacle => {
     *     obstacle.CustomData.Size = [1, 10, 2];
     * });
     * ```
     *
     * This will set the size of all walls between beats 0 and 200 to be 1x10x2. Which is 1 unit wide, 10 units tall, and 2 units deep.
     */
    Size?: Vec3;
}
