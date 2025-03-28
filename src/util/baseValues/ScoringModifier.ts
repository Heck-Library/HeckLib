import { XAccessor } from "../typedef";
import { BaseModifier } from "./BaseModifier";

type ScoringValue =
    "baseCombo"
    | "baseMultipliedScore"
    | "baseImmediateMaxPossibleMultipliedScore"
    | "baseModifiedScore"
    | "baseImmediateMaxPossibleModifiedScore"
    | "baseRelativeScore"
    | "baseMultiplier"
    | "baseEnergy"
    | "baseSongTime"
    | "baseSongLength"

abstract class Value {
    public static readonly COMBO = "baseCombo";
    public static readonly MULTIPLIED_SCORE = "baseMultipliedScore";
    public static readonly IMMEDIATE_MAX_POSSIBLE_MULTIPLIED_SCORE = "baseImmediateMaxPossibleMultipliedScore";
    public static readonly MODIFIED_SCORE = "baseModifiedScore";
    public static readonly IMMEDIATE_MAX_POSSIBLE_MODIFIED_SCORE = "baseImmediateMaxPossibleModifiedScore";
    public static readonly RELATIVE_SCORE = "baseRelativeScore";
    public static readonly MULTIPLIER = "baseMultiplier";
    public static readonly ENERGY = "baseEnergy";
    public static readonly SONG_TIME = "baseSongTime";
    public static readonly SONG_LENGTH = "baseSongLength";
}

export class ScoringModifier extends BaseModifier {
    public static readonly VALUE = Value;

    public set Value(value: ScoringValue) { this.value = value; }
    public get Value(): ScoringValue { return this.value as ScoringValue; }
    
    public set Accessor(accessor: XAccessor) { this.accessor = accessor; }
    public get Accessor(): string | undefined { return this.accessor; }

    constructor(value?: ScoringValue, aos?: number, smoothing?: undefined);
    constructor(value?: ScoringValue, aos?: XAccessor, smoothing?: number);
    constructor(value?: ScoringValue, aos?: XAccessor | number, smoothing?: number) { super(value, typeof aos === "number" ? "" : aos, typeof aos === "number" ? aos : smoothing);}
}