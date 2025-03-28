export interface IBPMEvent {
    /**
     * ## Beat
     * 
     * Controls when the BPM change occurs.
     */
    Beat?: number;
    /**
     * ## BPM
     * 
     * Controls the BPM value at the specified beat.
     */
    BPM?: number;
}
