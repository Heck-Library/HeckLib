import { ICustomEvent } from "./interfaces/ICustomEvent";

export abstract class BaseCustomEvent implements ICustomEvent {
    protected b: number = 0;
    protected t: string;
    protected d: Record<string, any>;

    set Beat(value: number) { this.b = value; }
    set Data(value: Record<string, any>) { this.d = value; }

    get Beat(): number { return this.b; }
    get Type(): string { return this.t; }
    get Data(): Record<string, any> { return this.d; }

    constructor(beat: number = 0, type: string = "") {
        this.b = beat;
        this.t = type;
        this.d = {};
    }
}