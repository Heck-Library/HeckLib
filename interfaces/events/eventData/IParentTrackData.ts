export default interface IParentTrackData {
    /**
     * The children will be assigned to this track.
     */
    parentTrack: string;
    /**
     * These tracks will be assigned under the parent track.
     */
    childrenTracks: string[];
    /**
     * ngl, I have no fucking clue...
     */
    worldPositionStays?: boolean;
}
