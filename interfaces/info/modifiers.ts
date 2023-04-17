export default interface IModifiers {
    energyType?: 'Bar' | 'Battery';
    noFailOn0Energy?: boolean;
    instaFail?: boolean;
    failOnSaberClash?: boolean;
    enabledObstacleType?: 'All' | 'FullHeightOnly' | 'NoObstacles';
    fastNotes?: boolean;
    strictAngles?: boolean;
    disappearingArrows?: boolean;
    ghostNotes?: boolean;
    noBombs?: boolean;
    songSpeed?: 'Normal' | 'Faster' | 'Slower' | 'SuperFast';
    noArrows?: boolean;
    proMode?: boolean;
    zenMode?: boolean;
    smallCubes?: boolean;
}