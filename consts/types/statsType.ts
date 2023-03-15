export type statsType = {
    moddedStats: {
        notes: number;
        fakeNotes: number;
        walls: number;
        fakeWalls: number;
        bombs: number;
        fakeBombs: number;
        lights: number;
        customEvents: {
            animTrack: number;
            pathAnim: number;
            trackParent: number;
            playerTrack: number;
            fogTrack: number;
        };
        pointDefinitions: number;
        environments: number;
    };
    vanillaStats: {
        notes: number;
        walls: number;
        bombs: number;
        lights: number;
    };
};
