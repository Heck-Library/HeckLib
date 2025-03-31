import { Ease } from "../../util/easings";
import { Direction, EventValue, LerpType } from "../../util/enums";
import { Vec3, Vec4 } from "../../util/vec";
import { IBasicBeatmapEvent } from "./interfaces/IBasicBeatmapEvent";

export class BeatmapEventArray extends Array<BaseBeatmapEvent> {
    public push(...items: BaseBeatmapEvent[]): number {
        items.forEach(e => super.push(e.duplicate()));
        return super.length;
    }

    public fastPush(...items: BaseBeatmapEvent[]): number {
        items.forEach(e => super.push(e));
        return super.length;
    }

    public toJSON() {
        return this.map(e => e.toJSON());
    }

    public select(filters: {
        Beat?: number,
        Type?: EventType,
        Value?: EventValue,
        Float?: number
    }): BaseBeatmapEvent[] {
        return this.filter(e => {
            if (filters.Beat !== undefined && e.Beat !== filters.Beat) return false;
            if (filters.Type !== undefined && e.Type !== filters.Type) return false;
            if (filters.Value !== undefined && e.Value !== filters.Value) return false;
            if (filters.Float !== undefined && e.Float !== filters.Float) return false;
            return true;
        });
    }
}

export interface IEmptyEvent {}

interface ILight extends IEmptyEvent {
    LightID?: number;
    Color?: Vec4 | Vec3;
    Easing?: Ease;
    LerpType?: LerpType | keyof typeof LerpType;
}

interface ILaserSpeed extends IEmptyEvent {
    LockRotation?: boolean;
    Speed?: number;
    Direction?: Direction | 0 | 1;
}

interface IRingZoom extends IEmptyEvent {
    Step?: number;
    Speed?: number;
}

interface IRingRotation extends IRingZoom {
    NameFilter?: string;
    Rotation?: number;
    Prop?: number;
    Direction?: Direction | 0 | 1;
}

type LightEventType = 0 | 1 | 2 | 3 | 4 | 6 | 7 | 11;
type LaserSpeedType = 12 | 13;
type RingZoomType = 9;
type RingRotationType = 8;
type EventType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 40 | 41 | 42 | 43 | 100;

/**
 * ## Basic Beatmap Event
 * 
 * Represents a basic beatmap event.
 * 
 * ---
 * 
 * ### Generic Type
 * 
 * The generic type `T` represents the custom data that can be attached to the event.
 * 
 * #### Generics
 * 
 * | Type | Description |
 * | --- | --- |
 * | `ILight` | Represents a light event. |
 * | `ILaserSpeed` | Represents a laser speed event. |
 * | `IRingZoom` | Represents a ring zoom event. |
 * | `IRingRotation` | Represents a ring rotation event. |
 */
export class BaseBeatmapEvent implements IBasicBeatmapEvent {
    public static readonly VALUE = EventValue;

    protected b: number = 0;
    protected et: EventType = 0;
    protected i: EventValue = 0;
    protected f: number = 1;
    protected customData: Record<string, any> = {};

    public set Beat(b: number) { this.b = b; }
    public set Type(et: EventType) { this.et = et; }
    public set Value(i: number) { this.i = i; }
    public set Float(f: number) { this.f = f; }

    public get Beat(): number { return this.b; }
    public get Type(): EventType { return this.et; }
    public get Value(): number { return this.i; }
    public get Float(): number { return this.f; }

    constructor(data: Partial<IBasicBeatmapEvent> = {}, customData: Record<string, any> = {}) {
        data.Beat && (this.b = data.Beat);
        data.Type && (this.et = data.Type as EventType);
        data.Value && (this.i = data.Value);
        data.Float && (this.f = data.Float);
        this.customData = customData;
    }

    public static fromJSON(...json: Record<string, any>[]): BaseBeatmapEvent[] {
        const events: BaseBeatmapEvent[] = [];
        json.forEach(e => {
            const event = new BaseBeatmapEvent();
            event.Beat = e.b;
            event.Type = e.et;
            event.Value = e.i;
            event.Float = e.f;
            if (e.customData) Object.keys(e.customData).forEach(k => {
                event.customData[k[0].toUpperCase() + k.slice(1)] = e.customData[k];
            });
            events.push(event);
        });
        return events
    }

    public toJSON() {
        const json: Record<string, any> = {
            b: this.b,
            et: this.et,
            i: this.i,
            f: this.f,
            customData: {}
        };

        Object.keys(this.customData).forEach(k => {
            json.customData[k[0].toLowerCase() + k.slice(1)] = this.customData[k];
        });

        return json;
    }

    public duplicate(): BaseBeatmapEvent {
        return new BaseBeatmapEvent({
            Beat: this.b,
            Type: this.et,
            Value: this.i,
            Float: this.f
        }, this.customData);
    }
}

export class LightEvent extends BaseBeatmapEvent {
    protected et: LightEventType = 0;

    public set Type(et: LightEventType) { this.et = et; }
    public get Type(): LightEventType { return this.et; }

    public set Data(customData: ILight) { this.customData = customData; }
    public get Data(): ILight { return this.customData; }

    constructor(data: Partial<IBasicBeatmapEvent> = {}, customData: ILight = {}) { super(data, customData); }
}

export class LaserSpeedEvent extends BaseBeatmapEvent {
    protected et: LaserSpeedType = 12;

    public set Type(et: LaserSpeedType) { this.et = et; }
    public get Type(): LaserSpeedType { return this.et; }

    public set Data(customData: ILaserSpeed) { this.customData = customData; }
    public get Data(): ILaserSpeed { return this.customData; }

    constructor(data: Partial<IBasicBeatmapEvent> = {}, customData: ILaserSpeed = {}) { super(data, customData); }
}

export class RingZoomEvent extends BaseBeatmapEvent {
    protected et: RingZoomType = 9;

    public set Type(et: RingZoomType) { this.et = et; }
    public get Type(): RingZoomType { return this.et; }

    public set Data(customData: IRingZoom) { this.customData = customData; }
    public get Data(): IRingZoom { return this.customData; }

    constructor(data: Partial<IBasicBeatmapEvent> = {}, customData: IRingZoom = {}) { super(data, customData); }
}

export class RingRotationEvent extends BaseBeatmapEvent {
    protected et: RingRotationType = 8;

    public set Type(et: RingRotationType) { this.et = et; }
    public get Type(): RingRotationType { return this.et; }

    public set Data(customData: IRingRotation) { this.customData = customData; }
    public get Data(): IRingRotation { return this.customData; }

    constructor(data: Partial<IBasicBeatmapEvent> = {}, customData: IRingRotation = {}) { super(data, customData); }
}