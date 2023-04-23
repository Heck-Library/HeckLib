export default interface IModifiers {
    _energyType?: 'Bar' | 'Battery';
    _noFailOn0Energy?: boolean;
    _instaFail?: boolean;
    _failOnSaberClash?: boolean;
    _enabledObstacleType?: 'All' | 'FullHeightOnly' | 'NoObstacles';
    _fastNotes?: boolean;
    _strictAngles?: boolean;
    _disappearingArrows?: boolean;
    _ghostNotes?: boolean;
    _noBombs?: boolean;
    _songSpeed?: 'Normal' | 'Faster' | 'Slower' | 'SuperFast';
    _noArrows?: boolean;
    _proMode?: boolean;
    _zenMode?: boolean;
    _smallCubes?: boolean;
}