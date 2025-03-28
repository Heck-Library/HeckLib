import { ExecutionTime } from "../../../util/enums";

export interface IRotationEvent {
    /**
     * ## Beat
     *
     * Controls when the rotation event occurs.
     */
    Beat?: number;
    /**
     * ## Execution Time
     *
     * Determines when the lane rotation will be applied to interactable objects placed on the same beat as this event.
     *
     * In v2 or earlier, these effects will be applied to basic event types 14 and 15 respectively.
     *
     * | Value | Result | Behavior |
     * | ----- | ------ | --- |
     * | `0`   | Early  | The objects will change lanes at the same time as this event. |
     * | `1`   | Late   | The objects will remain in its original lane. |
     */
    ExecutionTime?: ExecutionTime;
    /**
     * ## Magnitude
     *
     * Controls the magnitude and direction of the lane rotation.
     *
     * A negative value will turn the player counter-clockwise, and a positive value will turn clockwise.
     */
    Magnitude?: number;
}
