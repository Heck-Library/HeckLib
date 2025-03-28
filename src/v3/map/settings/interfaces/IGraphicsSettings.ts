enum MirrorSetting {
    Off,
    Low,
    Medium,
    High
}

type MirrorSettingType = MirrorSetting | 0 | 1 | 2 | 3 | false;

enum BloomSetting {
    Off,
    On
}

type BloomSettingType = BloomSetting | 0 | 1 | boolean;

enum SmokeSetting {
    Off,
    On
}

type SmokeSettingType = SmokeSetting | 0 | 1 | boolean;

export interface IGraphicsSettings {
    /**
     * ## Mirror
     * 
     * The mirror settings for the map.
     * 
     * ---
     * 
     * ### Values
     * 
     * - `0` or `GraphicsSettings.MIRROR_SETTING.Off`: Mirror disabled.
     * - `1` or `GraphicsSettings.MIRROR_SETTING.Low`: Low mirror quality.
     * - `2` or `GraphicsSettings.MIRROR_SETTING.Medium`: Medium mirror quality.
     * - `3` or `GraphicsSettings.MIRROR_SETTING.High`: High mirror quality.
     * 
     * ---
     * 
     * ### Example
     * 
     * ```typescript
     * Mirror: GraphicsSettings.MIRROR_SETTING.High
     * ```
     */
    Mirror?: MirrorSettingType;
    /**
     * ## Bloom
     * 
     * The bloom settings for the map.
     * 
     * ---
     * 
     * ### Values
     * 
     * - `false`, `0` or `GraphicsSettings.BLOOM_SETTING.Off`: Bloom disabled.
     * - `true`, `1` or `GraphicsSettings.BLOOM_SETTING.On`: Bloom enabled.
     * 
     * ---
     * 
     * ### Example
     * 
     * ```typescript
     * Bloom: GraphicsSettings.BLOOM_SETTING.On
     * ```
     */
    Bloom?: BloomSettingType;
    /**
     * ## Smoke
     * 
     * The smoke settings for the map.
     * 
     * ---
     * 
     * ### Values
     * 
     * - `false`, `0` or `SmokeSetting.Off`: Smoke disabled.
     * - `true`, `1` or `SmokeSetting.On`: Smoke enabled.
     * 
     * ---
     * 
     * ### Example
     * 
     * ```typescript
     * Smoke: SmokeSetting.On
     * ```
     */
    Smoke?: SmokeSettingType;
    /**
     * ## Burn Mark Trails Enabled
     * 
     * Whether burn mark trails are enabled.
     * 
     * ---
     * 
     * ### Example
     * 
     * ```typescript
     * BurnMarkTrailsEnabled: true
     * ```
     */
    BurnMarkTrailsEnabled?: boolean;
    /**
     * ## Screen Displacement Effects Enabled
     * 
     * Whether screen displacement effects are enabled.
     * 
     * ---
     * 
     * ### Example
     * 
     * ```typescript
     * ScreenDisplacementEffectsEnabled: true
     * ```
     */
    ScreenDisplacementEffectsEnabled?: boolean;
    /**
     * ## Max Shockwave Particles
     * 
     * The maximum number of shockwave particles.
     * 
     * ---
     * 
     * ### Values
     * 
     * - `0`: No shockwave particles.
     * - `1`: Low shockwave particles.
     * - `2`: High shockwave particles.
     * 
     * ---
     * 
     * ### Example
     * 
     * ```typescript
     * MaxShockwaveParticles: 0
     * ```
     */
    MaxShockwaveParticles?: 0 | 1 | 2;
}