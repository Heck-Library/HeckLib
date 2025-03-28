import { EventValue } from "../../../util/enums";


export interface IBasicBeatmapEvent {
    /**
     * ## Beat
     *
     * A specific point in time, as determined by the BPM of the song, when this event should produce its effect.
     */
    Beat: number;
    /**
     * ## [Type](https://bsmg.wiki/mapping/map-format/lightshow.html#basic-events-type)
     *
     * An integer value which represents what group of environment objects are affected.
     *
     * Contrary to popular belief, the values for these events are predefined to ensure compatibility across legacy environments. The following table lists those values which are compatible and their corresponding effects:
     *
     * ---
     *
     * #### Type
     *
     * An integer value which represents what group of environment objects are affected.
     *
     * Contrary to popular belief, the values for these events are predefined to ensure compatibility across legacy environments. The following table lists those values which are compatible and their corresponding effects:
     *
     * | Value | Result                       |
     * | ----- | ---------------------------- |
     * | `0`   | Light                        |
     * | `1`   | Light                        |
     * | `2`   | Light                        |
     * | `3`   | Light                        |
     * | `4`   | Light                        |
     * | `5`   | Color Boost (Legacy)         |
     * | `6`   | Light                        |
     * | `7`   | Light                        |
     * | `8`   | Value / Trigger              |
     * | `9`   | Value / Trigger              |
     * | `10`  | Light / BPM Change (Legacy)  |
     * | `11`  | Light                        |
     * | `12`  | Value                        |
     * | `13`  | Value                        |
     * | `14`  | Early Lane Rotation (Legacy) |
     * | `15`  | Late Lane Rotation (Legacy)  |
     * | `16`  | Value                        |
     * | `17`  | Value                        |
     * | `18`  | Value                        |
     * | `19`  | Value                        |
     * | `40`  | Special                      |
     * | `41`  | Special                      |
     * | `42`  | Special                      |
     * | `43`  | Special                      |
     * | `100` | BPM Change (Legacy)          |
     *
     * ---
     *
     * #### Value Events
     *
     * The event will read the provided value to control the parameters of the effect.
     *
     * ---
     *
     * #### Trigger Events
     *
     * The value goes unused, as any value will trigger the event.
     *
     * ---
     *
     * #### Special Events
     *
     * The value is used to control the keyword-specific effects. See [Special Event Keywords](https://bsmg.wiki/mapping/map-format/lightshow.html#special-event-keywords) for more details.
     *
     * ---
     *
     * #### Color Boost Events (Legacy)
     *
     * The value is used to toggle the color boost effect. See [Color Boost Events](https://bsmg.wiki/mapping/map-format/lightshow.html#color-boost-events) for more details.
     *
     * | Value | Result              |
     * | ----- | ------------------- |
     * | `0`   | Disable color boost |
     * | `1`   | Enable color boost  |
     *
     * ---
     *
     * #### Rotation Events (Legacy)
     *
     * The value is used to control the magnitude and direction of the lane rotation. See [Spawn Rotations](https://bsmg.wiki/mapping/map-format/beatmap.html#spawn-rotations) for more details.
     *
     * | Value | Result |
     * | ----- | ------ |
     * | 0 |	60 Degrees Counter-Clockwise |
     * | 1 |	45 Degrees Counter-Clockwise |
     * | 2 |	30 Degrees Counter-Clockwise |
     * | 3 |	15 Degrees Counter-Clockwise |
     * | 4 |	15 Degrees Clockwise |
     * | 5 |	30 Degrees Clockwise |
     * | 6 |	45 Degrees Clockwise |
     * | 7 |	60 Degrees Clockwise |
     */
    Type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 40 | 41 | 42 | 43 | 100;
    /**
     * ## [Value](https://bsmg.wiki/mapping/map-format/lightshow.html#basic-events-value)
     *
     * A value which determines the specific effect of the event.
     *
     * The value of this property is determined by the `Type` property.
     *
     * ---
     *
     * ### Light Events
     *
     * | Value | Result | Behavior |
     * | ----- | ------ | --- |
     * | `0`   | Off	| Turns the light group off. |
     * | `1`   | Static (Secondary) |	Changes the lights to the secondary color, and turns the lights on. |
     * | `2`   | Flash (Secondary) |	Changes the lights to the secondary color, and flashes brightly before returning to normal. |
     * | `3`   | Fade (Secondary) |	Changes the lights to the secondary color, and flashes brightly before fading to black. |
     * | `4`   | Transition (Secondary) |	Changes the lights to the secondary color by fading from the current state. |
     * | `5`   | Static (Primary) |	Changes the lights to the primary color, and turns the lights on. |
     * | `6`   | Flash (Primary) |	Changes the lights to the primary color, and flashes brightly before returning to normal. |
     * | `7`   | Fade (Primary) |	Changes the lights to the primary color, and flashes brightly before fading to black. |
     * | `8`   | Transition (Primary) |	Changes the lights to the primary color by fading from the current state. |
     * | `9`   | Static (White) |	Changes the lights to white, and turns the lights on. |
     * | `10`  | Flash (White) |	Changes the lights to white, and flashes brightly before returning to normal. |
     * | `11`  | Fade (White) |	Changes the lights to white, and flashes brightly before fading to black. |
     * | `12`  | Transition (White) |	Changes the lights to white by fading from the current state. |
     */
    Value: EventValue;
    /**
     * ## Float
     *
     * As described, allows you to more precisely tune a parameter for the effect.
     *
     * ---
     *
     * ### Light Events
     *
     * The float value is used to control the brightness of the light. A value of 0 will turn the light off.
     *
     * ---
     *
     * ### BPM Events (Legacy)
     *
     * The value is used to alter the BPM at the indicated beat. See [BPM Events](https://bsmg.wiki/mapping/map-format/beatmap.html#bpm-events) for more details.
     */
    Float: number;
}
