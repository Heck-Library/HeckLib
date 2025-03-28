export interface ICustomEvent {
    /**
     * ## Beat
     * 
     * The beat at which the event will occur.
     * 
     * **Type:** `number`
     * 
     * **Default:** `0`
     */
    Beat: number;
    /**
     * ## Type
     * 
     * The type of the custom event.
     * 
     * This will be set by the custom event's implementation hence it should not and cannot be changed.
     * 
     * **Type:** `string`
     */
    Type: string;
    /**
     * ## Data
     * 
     * The data of the custom event.
     * 
     * It is not recommended to set this manually, instead use the custom event's accessors to set the data.
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * let at = new AnimateTrack();
     * at.Beat = 4;
     * at.Track = "DissolveDemonstration";
     * at.Duration = 1;
     * at.Dissolve = [
     *     [1, 0],
     *     [0, 1]
     * ];
     * at.DissolveArrow = [
     *     [1, 0],
     *     [0, 1]
     * ];
     * at.Push();
     * ```
     * 
     * OR
     * 
     * ```ts
     * new AnimateTrack(4, { // Beat is set in the constructor
     *     Track: "DissolveDemonstration",
     *     Duration: 1,
     *     Dissolve: [
     *         [1, 0],
     *         [0, 1]
     *     ],
     *     DissolveArrow: [
     *         [1, 0],
     *         [0, 1]
     *     ]
     * }).Push();
     * ```
     */
    Data: Record<string, any>;
}