export default interface IModifiers {
    /**
     * ## Energy Type
     * 
     * The energy modifier used.
     * 
     * ---
     * 
     * Type: `string`
     * 
     * - `'Bar'` - The energy bar is used.
     * - `'Battery'` - The battery energy (4 life) is used.
     */
    energyType?: 'Bar' | 'Battery';
    /**
     * ## Nofail
     * 
     * This enables no fail.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    noFailOn0Energy?: boolean;
    /**
     * ## Insta Fail
     * 
     * This enables insta fail modifier.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    instaFail?: boolean;
    /**
     * ## Fail on Saber Clash
     * 
     * **HIDDEN SETTING**
     * 
     * This enables fail on saber clash.
     * 
     * This is a hidden setting, and is not available in the game.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    failOnSaberClash?: boolean;
    /**
     * ## Obstacle Type
     * 
     * The obstacle type that is enabled.
     * 
     * ---
     * 
     * Type: `string`
     * 
     * - `'All'` - All obstacles are enabled.
     * - `'FullHeightOnly'` - Only full height obstacles are enabled.
     * - `'NoObstacles'` - No walls.
     */
    enabledObstacleType?: 'All' | 'FullHeightOnly' | 'NoObstacles';
    /**
     * ## Fast Notes
     * 
     * **HIDDEN SETTING**
     * 
     * This enables fast notes.
     * 
     * This is a hidden setting, and is not available in the game.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    fastNotes?: boolean;
    /**
     * ## Strict Angles
     * 
     * This enables the strict angles modifier.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    strictAngles?: boolean;
    /**
     * ## Disappearing Arrows
     * 
     * This enables the disappearing arrows modifier.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    disappearingArrows?: boolean;
    /**
     * ## Ghost Notes
     * 
     * This enables the ghost notes modifier.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    ghostNotes?: boolean;
    /**
     * ## No Bombs
     * 
     * This enables the no bombs modifier.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    noBombs?: boolean;
    /**
     * ## Song Speed
     * 
     * The song speed modifier.
     * 
     * ---
     * 
     * Type: `string`
     * 
     * - `'Normal'` - Normal playback speed.
     * - `'Faster'` - Slightly faster playback speed.
     * - `'Slower'` - Slightly slower playback speed.
     * - `'SuperFast'` - Significantly faster playback speed.
     */
    songSpeed?: 'Normal' | 'Faster' | 'Slower' | 'SuperFast';
    /**
     * ## No Arrows
     * 
     * This enables the no arrows modifier.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    noArrows?: boolean;
    /**
     * ## Pro Mode
     * 
     * This enables the pro mode modifier.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    proMode?: boolean;
    /**
     * ## Zen Mode
     * 
     * This enables the zen mode modifier.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    zenMode?: boolean;
    /**
     * ## Small Notes
     * 
     * This enables the small notes modifier.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    smallCubes?: boolean;
}