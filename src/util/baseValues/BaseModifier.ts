import { XYZAccessor, XYZWAccessor, XAccessor } from "../typedef";

type smoothing = `s${number}${""|`_${number}`}`;

export abstract class BaseModifier {
    protected value?: string;
    protected accessor?: XYZAccessor | XYZWAccessor | XAccessor;
    protected smoothing?: smoothing;
    protected accessorTypes: ["x"?, "y"?, "z"?, "w"?] = [];
    
    public set Smoothing(smoothing: number | smoothing) {
        const shit = typeof smoothing === "number" ? `s${smoothing}` : smoothing;
        this.smoothing = shit.replace(".", "_") as smoothing;
    }
    public get Smoothing(): string | undefined { return this.smoothing; }

    [Symbol.for("nodejs.util.inspect.custom")](): string {
        return this.toString() ?? "";
    }

    getAccessorLength(): number { return this.accessorTypes.length; }

    toString() {
        return this.value ?? ""
            + this.accessor ?? ""
            + this.smoothing ?? "";
    }

    /**
     * ## PlayerTransform
     * 
     * This class is used to define a player transform getter value for an animation.
     * 
     * @param value The PlayerTransform value to get
     * @param aos This will either be the accessor (string of "x", "y", "z") or the smoothing modifier (number).
     * @param smoothing If `aos` is an accessor, this will be the optional smoothing modifier.
     */
    constructor(value?: string, aos?: number, smoothing?: undefined);
    /**
     * ## PlayerTransform
     * 
     * This class is used to define a player transform getter value for an animation.
     * 
     * @param value The PlayerTransform value to get
     * @param aos This will either be the accessor (string of "x", "y", "z") or the smoothing modifier (number).
     * @param smoothing If `aos` is an accessor, this will be the optional smoothing modifier.
     */
    constructor(value?: string, aos?: XYZAccessor | XYZWAccessor | XAccessor, smoothing?: number);
    /**
     * ## PlayerTransform
     * 
     * This class is used to define a player transform getter value for an animation.
     * 
     * @param value The PlayerTransform value to get
     * @param aos This will either be the accessor (string of "x", "y", "z") or the smoothing modifier (number).
     * @param smoothing If `aos` is an accessor, this will be the optional smoothing modifier.
     */
    constructor(value?: string, aos?: XYZAccessor | XYZWAccessor | XAccessor | number, smoothing?: number | undefined) {
        this.value = value;
        if (typeof aos === "number") this.Smoothing = aos;
        else this.accessor = aos;
        if (typeof smoothing === "number") this.Smoothing = smoothing;
    }
}
