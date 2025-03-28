export enum BeatmapCharacteristic {
    Standard = "Standard",
    NoArrows = "NoArrows",
    OneSaber = "OneSaber",
    ThreeSixty = "360Degree",
    Ninety = "90Degree",
    Legacy = "Legacy",
    Lightshow = "Lightshow",
    Lawless = "Lawless"
}

export enum Standard {
    Easy = "EasyStandard.dat",
    Normal = "NormalStandard.dat",
    Hard = "HardStandard.dat",
    Expert = "ExpertStandard.dat",
    ExpertPlus = "ExpertPlusStandard.dat"
}
export enum NoArrows {
    Easy = "EasyNoArrows.dat",
    Normal = "NormalNoArrows.dat",
    Hard = "HardNoArrows.dat",
    Expert = "ExpertNoArrows.dat",
    ExpertPlus = "ExpertPlusNoArrows.dat"
}
export enum OneSaber {
    Easy = "EasyOneSaber.dat",
    Normal = "NormalOneSaber.dat",
    Hard = "HardOneSaber.dat",
    Expert = "ExpertOneSaber.dat",
    ExpertPlus = "ExpertPlusOneSaber.dat"
}
export enum Lawless {
    Easy = "EasyLawless.dat",
    Normal = "NormalLawless.dat",
    Hard = "HardLawless.dat",
    Expert = "ExpertLawless.dat",
    ExpertPlus = "ExpertPlusLawless.dat"
}
export enum Legacy {
    Easy = "EasyLegacy.dat",
    Normal = "NormalLegacy.dat",
    Hard = "HardLegacy.dat",
    Expert = "ExpertLegacy.dat",
    ExpertPlus = "ExpertPlusLegacy.dat"
}
export enum Lightshow {
    Easy = "EasyLightshow.dat",
    Normal = "NormalLightshow.dat",
    Hard = "HardLightshow.dat",
    Expert = "ExpertLightshow.dat",
    ExpertPlus = "ExpertPlusLightshow.dat"
}
export enum Operator {
    None = "opNone",
    Add = "opAdd",
    Subtract = "opSub",
    Multiply = "opMul",
    Divide = "opDiv",
}

export enum LookupMethod {
    Regex = "Regex",
    Exact = "Exact",
    Contains = "Contains",
    StartsWith = "StartsWith",
    EndsWidth = "EndsWith"
}

export enum MidAnchorMode {
    Straight,
    Clockwise,
    CounterClockwise
}

export enum BaseColor {
    LeftNote = "baseNote0Color",
    RightNote = "baseNote1Color",
    Wall = "baseObstaclesColor",
    LeftSaber = "baseSaberAColor",
    RightSaber = "baseSaberBColor",
    Environment0 = "baseEnvironmentColor0",
    Environment1 = "baseEnvironmentColor1",
    EnvironmentW = "baseEnvironmentColorW",
    EnvironmentBoost0 = "baseEnvironmentColor0Boost",
    EnvironmentBoost1 = "baseEnvironmentColor1Boost",
    EnvironmentBoostW = "baseEnvironmentColorWBoost",
}

export enum MaterialShader {
    /**
     * ### Billie Water
     * 
     * The Billie environment's water shader.
     */
    BillieWater = "BillieWater",
    /**
     * ### BTS Pillar
     * 
     * The BTS environment's pillar shader.
     */
    BTSPillar = "BTSPillar",
    /**
     * ### Interscope Car
     * 
     * The Interscope environment's car shader.
     */
    InterscopeCar = "InterscopeCar",
    /**
     * ### Interscope Concrete
     * 
     * The Interscope environment's concrete shader.
     */
    InterscopeConcrete = "InterscopeConcrete",
    /**
     * ### Opaque Light
     * 
     * The shader for an opaque light.
     */
    OpaqueLight = "OpaqueLight",
    /**
     * ### Standard
     * 
     * The standard shader.
     */
    Standard = "Standard",
    /**
     * ### Transparent Light
     * 
     * The shader for a transparent light.
     */
    TransparentLight = "TransparentLight",
    /**
     * ### Waterfall Mirror
     * 
     * The mirror shader from the waterfall in Billie.
     */
    WaterfallMirror = "WaterfallMirror"
}

export enum LogType {
    /**
     * ## Debug
     * 
     * Displays literally everything that happens.
     */
    Debug = -1,
    /**
     * ## Normal
     * 
     * Display all necessary logs **(DEFAULT)**
     */
    Normal = 0,
    /**
     * ## OnlyImportant
     * 
     * Display only important logs.
     */
    OnlyImportant,
    /**
     * ## OnlyTimes
     * 
     * Display only the runtime measurement logs.
     */
    OnlyTimes,
    /**
     * ## None
     * 
     * Display no logs (Does not affect errors, warnings, nor logo).
     */
    None,
    /**
     * ## Suppress
     * 
     * Suppress all logs, including warnings (Does not affect errors or logo).
     */
    Suppress
}

/**
 * ## LineIndex
 * 
 * The X position on the 4x3 grid.
 * 
 * ---
 * 
 * ### Values
 * 
 * - `LineIndex.Left` : `0`
 * - `LineIndex.LeftCenter` : `1`
 * - `LineIndex.RightCenter` : `2`
 * - `LineIndex.Right` : `3`
 */
export enum LineIndex {
    Left,
    LeftCenter,
    RightCenter,
    Right
}

export enum PLUGIN {
    Chroma = "Chroma",
    MappingExtensions = "Mapping Extensions",
    NoodleExtensions = "Noodle Extensions",
    Cinema = "Cinema",
    Vivify = "Vivify",
    CustomAvatars = "Custom Avatars",
    CustomPlatforms = "Custom Platforms",
    AudioLink = "AudioLink",
    CustomJSONData = "CustomJSONData"
}


/**
 * ## LineLayer
 * 
 * The Y position on the 4x3 grid.
 * 
 * ---
 * 
 * ### Values
 * 
 * - `LineLayer.Bottom` : `0`
 * - `LineLayer.Middle` : `1`
 * - `LineLayer.Top` : `2`
 */
export enum LineLayer {
    Bottom,
    Middle,
    Top
}

export enum NoteColor {
    Red,
    Blue
}

export enum CutDirection {
    Up,
    Down,
    Left,
    Right,
    UpLeft,
    UpRight,
    DownLeft,
    DownRight,
    Any
}

export enum ColorFormat {
    ARGB32 = "ARGB32",
    Depth = "Depth",
    ARGBHalf = "ARGBHalf",
    Shadowmap = "Shadowmap",
    RGB565 = "RGB565",
    ARGB4444 = "ARGB4444",
    ARGB1555 = "ARGB1555",
    Default = "Default",
    ARGB2101010 = "ARGB2101010",
    DefaultHDR = "DefaultHDR",
    ARGB64 = "ARGB64",
    ARGBFloat = "ARGBFloat",
    RGFloat = "RGFloat",
    RGHalf = "RGHalf",
    RFloat = "RFloat",
    RHalf = "RHalf",
    R8 = "R8",
    ARGBInt = "ARGBInt",
    RGInt = "RGInt",
    RInt = "RInt",
    BGRA32 = "BGRA32",
    RGB111110Float = "RGB111110Float",
    RG32 = "RG32",
    RGBAUShort = "RGBAUShort",
    RG16 = "RG16",
    BGRA10101010_XR = "BGRA10101010_XR",
    BGR101010_XR = "BGR101010_XR",
    R16 = "R16",
}

export enum FilterMode {
    Point = "Point",
    Bilinear = "Bilinear",
    Trilinear = "Trilinear"
}

export enum PrefabLoadMode {
    Single = "Single",
    Additive = "Additive"
}

export enum PrefabSaber {
    Left = "Left",
    Right = "Right",
    Both = "Both"
}

export enum AmbientMode {
    Skybox,
    Trilight,
    Flat = 3,
    Custom = 4
}

export enum ReflectionMode {
    Skybox,
    Custom
}

export enum FogMode {
    Linear = 1,
    Exponential,
    ExponentialSquared
}

export enum AnistropicFiltering {
    Disable,
    Enable,
    ForceEnable
}

export enum AntiAliasing {
    Disabled = 0,
    _2x = 2,
    _4x = 4,
    _8x = 8
}

export enum ShadowmaskMode {
    Shadowmask,
    DistanceShadowmask
}

export enum ShadowProjection {
    CloseFit,
    StableFit
}

export enum ShadowResolution {
    Low,
    Medium,
    High,
    VeryHigh
}

export enum Shadows {
    Disable,
    HardOnly,
    All
}

export enum EventValue {
    /**
     * ## Off
     *
     * Turn off the event group
     *
     * ---
     *
     * Returns: `0`
     */
    OFF,

    /**
     * ## On (Secondary)
     *
     * Changes the lights to the secondary color, and turns the lights on.
     *
     * ---
     *
     * Returns: `1`
     */
    SECONDARY_ON,
    /**
     * ## Flash (Secondary)
     *
     * Changes the lights to the secondary color, and flashes brightly before returning to normal.
     *
     * ---
     *
     * Returns: `2`
     */
    SECONDARY_FLASH,
    /**
     * ## Fade (Secondary)
     *
     * Changes the lights to the secondary color, and flashes brightly before fading to black.
     *
     * ---
     *
     * Returns: `3`
     */
    SECONDARY_FADE,
    /**
     * ## Transition (Secondary)
     *
     * Changes the lights to the secondary color by fading from the current state.
     *
     * ---
     *
     * Returns: `4`
     */
    SECONDARY_TRANSITION,

    /**
     * ## On (Primary)
     *
     * Changes the lights to the primary color, and turns the lights on.
     *
     * ---
     *
     * Returns: `5`
     */
    PRIMARY_ON,
    /**
     * ## Flash (Primary)
     *
     * Changes the lights to the primary color, and flashes brightly before returning to normal.
     *
     * ---
     *
     * Returns: `6`
     */
    PRIMARY_FLASH,
    /**
     * ## Fade (Primary)
     *
     * Changes the lights to the primary color, and flashes brightly before fading to black.
     *
     * ---
     *
     * Returns: `7`
     */
    PRIMARY_FADE,
    /**
     * ## Transition (Primary)
     *
     * Changes the lights to the primary color by fading from the current state.
     *
     * ---
     *
     * Returns: `8`
     */
    PRIMARY_TRANSITION,

    /**
     * ## On (White)
     *
     * 	Changes the lights to white, and turns the lights on.
     *
     * ---
     *
     * Returns: `9`
     */
    WHITE_ON,
    /**
     * ## Flash (White)
     *
     * Changes the lights to white, and flashes brightly before returning to normal.
     *
     * ---
     *
     * Returns: `10`
     */
    WHITE_FLASH,
    /**
     * ## Fade (White)
     *
     * Changes the lights to white, and flashes brightly before fading to black.
     *
     * ---
     *
     * Returns: `11`
     */
    WHITE_FADE,
    /**
     * ## Transition (White)
     *
     * Changes the lights to white by fading from the current state.
     *
     * ---
     *
     * Returns: `12`
     */
    WHITE_TRANSITION
}

export enum Direction {
    COUNTER_CLOCKWISE,
    CLOCKWISE
}
export enum LerpType {
    HSV = "HSV",
    RGB = "RGB"
}
export enum ExecutionTime {
    EARLY,
    LATE
}
export enum GeometryShape {
    Sphere = "Sphere",
    Capsule = "Capsule",
    Cylinder = "Cylinder",
    Cube = "Cube",
    Plane = "Plane",
    Quad = "Quad",
    Triangle = "Triangle"
}

