import { XYZWAccessor } from "../typedef";
import { BaseModifier } from "./BaseModifier";

type BaseColorValue =
    "baseNote0Color"
    | "baseNote1Color"
    | "baseObstaclesColor"
    | "baseSaberAColor"
    | "baseSaberBColor"
    | "baseEnvironmentColor0"
    | "baseEnvironmentColor1"
    | "baseEnvironmentColorW"
    | "baseEnvironmentColor0Boost"
    | "baseEnvironmentColor1Boost"
    | "baseEnvironmentColorWBoost";

abstract class ColorValue {
    public static readonly NOTE_L = "baseNote0Color";
    public static readonly NOTE_R = "baseNote1Color";
    public static readonly OBSTACLES = "baseObstaclesColor";
    public static readonly SABER_L = "baseSaberAColor";
    public static readonly SABER_R = "baseSaberBColor";
    public static readonly ENVIRONMENT_L = "baseEnvironmentColor0";
    public static readonly ENVIRONMENT_R = "baseEnvironmentColor1";
    public static readonly ENVIRONMENT_W = "baseEnvironmentColorW";
    public static readonly ENVIRONMENT_L_BOOST = "baseEnvironmentColor0Boost";
    public static readonly ENVIRONMENT_R_BOOST = "baseEnvironmentColor1Boost";
    public static readonly ENVIRONMENT_W_BOOST = "baseEnvironmentColorWBoost";
}

export class ColorModifier extends BaseModifier {
    public static readonly VALUE = ColorValue;

    public set Value(value: BaseColorValue) { this.value = value; }
    public get Value(): BaseColorValue { return this.value as BaseColorValue; }
    
    public set Accessor(accessor: XYZWAccessor) { this.accessor = accessor; }
    public get Accessor(): XYZWAccessor | undefined { return this.accessor; }

    constructor(value?: BaseColorValue, aos?: number, smoothing?: undefined);
    constructor(value?: BaseColorValue, aos?: XYZWAccessor, smoothing?: number);
    constructor(value?: BaseColorValue, aos?: XYZWAccessor | number, smoothing?: number) { super(value, typeof aos === "number" ? "" : aos, typeof aos === "number" ? aos : smoothing); }
}

