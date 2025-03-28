import { ExecutionTime } from "../../util/enums";
import { IRotationEvent } from "./interfaces/IRotationEvent";

export class RotationEvent implements IRotationEvent {
    private b: number = 0;
    private e: ExecutionTime = 0;
    private r: number = 0;

    set Beat(b: number) { this.b = b; }
    set ExecutionTime(e: ExecutionTime) { this.e = e; }
    set Magnitude(r: number) { this.r = r; }

    get Beat(): number { return this.b; }
    get ExecutionTime(): ExecutionTime { return this.e; }
    get Magnitude(): number { return this.r; }

    private static defaultValues: IRotationEvent = {
        Beat: 0,
        ExecutionTime: 0,
        Magnitude: 0
    };

    constructor(data: IRotationEvent = RotationEvent.defaultValues) {
        if (data == RotationEvent.defaultValues) return this;
        data.Beat && (this.b = data.Beat);
        data.ExecutionTime && (this.e = data.ExecutionTime);
        data.Magnitude && (this.r = data.Magnitude);
    }

    public static fromJSON(json: Array<{
        b: number,
        e: number,
        r: number
    }>): RotationEvent[] {
        return json.map((data: {
            b: number,
            e: number,
            r: number
        }) => new RotationEvent({
            Beat: data.b,
            ExecutionTime: data.e,
            Magnitude: data.r
        }));
    }        
}