export default interface IGraphics {
    /**
     * ### Mirror Graphics Settings
     * 
     * This is the same as the mirror setting in the game.
     * 
     * 0 = Off
     * 1 = Low
     * 2 = Medium
     * 3 = High
     */
    mirrorGraphicsSettings?: 0 | 1 | 2 | 3;
    /**
     * ### Main Effect Graphics Settings
     * 
     * This is the same as the bloom setting in the game.
     * 
     * 0 = Off
     * 1 = On
     */
    mainEffectGraphicsSettings?: 0 | 1;
    smokeGraphicsSettings?: boolean;
    burnMarkTrailsEnabled?: boolean;
    screenDisplacementEffectsEnabled?: boolean;
    maxShockwaveParticles?: 0 | 1 | 2;
}