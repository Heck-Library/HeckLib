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
    /**
     * ### Smoke Graphics Settings
     * 
     * This is the same as the smoke setting in the game. Enables particlesystems that emit smoke around the player.
     */
    smokeGraphicsSettings?: boolean;
    /**
     * ### Burn Mark Trails Enabled
     * 
     * This enables the burnmarks that appear on the ground when you swing your sabers through it.
     */
    burnMarkTrailsEnabled?: boolean;
    /**
     * ### Screen Displacement Effects Enabled
     * 
     * This enables the screen displacement effects, this is the effect that makes walls appear with an opaque shader. This is the same as the screen distortion setting in the game.
     */
    screenDisplacementEffectsEnabled?: boolean;
    /**
     * ### Max Shockwave Particles
     * 
     * This is the maximum amount of shockwave particles that can be on screen at once. This is the same as the shockwave particles setting in the game. For maps with walls, it is recommended to be set to 0.
     */
    maxShockwaveParticles?: 0 | 1 | 2;
}