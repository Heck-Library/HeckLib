import { LineIndex, LineLayer } from "util/enums";
import { IBaseObject } from "./interfaces/IBaseObject";

export abstract class BaseObject implements IBaseObject {
    protected b: number;
    protected x: LineIndex;
    protected y: LineLayer;

    protected customData?: any;

    public set Beat(beat: number) { this.b = beat; }
    public set X(x: LineIndex) { this.x = x; }
    public set Y(y: LineLayer) { this.y = y; }
    public set CustomData(customData: any) { this.customData = customData; }

    public get Beat(): number { return this.b; }
    public get X(): LineIndex { return this.x; }
    public get Y(): LineLayer { return this.y; }
    public get CustomData(): any { return this.customData; }

    constructor(beat?: number, x?: LineIndex, y?: LineLayer) {
        this.b = beat ?? 0;
        this.x = x ?? 0;
        this.y = y ?? 0;
    }
}