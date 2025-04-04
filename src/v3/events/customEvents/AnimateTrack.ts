import { Ease } from "../../../util/easings";
import { ColorAnimation, PositionAnimation, Vec1Animation, Vec3Animation } from "../../../util/vec";
import { BaseCustomEvent } from "./BaseCustomEvent";
import { IAnimateTrackData } from "./interfaces/IAnimateTrackData";

class AnimateTrackData implements IAnimateTrackData {
    private track: string | string[];
    private duration?: number;
    private easing?: Ease;
    private repeat?: number;
    private position?: PositionAnimation;
    private offsetPosition?: PositionAnimation;
    private rotation?: Vec3Animation
    private offsetWorldRotation?: Vec3Animation;
    private localRotation?: Vec3Animation;
    private scale?: Vec3Animation;
    private dissolve?: Vec1Animation;
    private dissolveArrow?: Vec1Animation;
    private color?: ColorAnimation;
    private interactable?: Vec1Animation;
    private time?: Vec1Animation;

    public set Track(track: string | string[]) { this.track = track; }
    public set Duration(duration: undefined | number) { this.duration = duration; }
    public set Easing(easing: undefined | Ease) { this.easing = easing; }
    public set Repeat(repeat: undefined | number) { this.repeat = repeat; }
    public set Position(position: undefined | PositionAnimation) { this.position = position; }
    public set OffsetPosition(offsetPosition: undefined | PositionAnimation) { this.offsetPosition = offsetPosition; }
    public set Rotation(rotation: undefined | Vec3Animation) { this.rotation = rotation; }
    public set OffsetWorldRotation(offsetWorldRotation: undefined | Vec3Animation) { this.offsetWorldRotation = offsetWorldRotation; }
    public set LocalRotation(localRotation: undefined | Vec3Animation) { this.localRotation = localRotation; }
    public set Scale(scale: undefined | Vec3Animation) { this.scale = scale; }
    public set Dissolve(dissolve: undefined | Vec1Animation) { this.dissolve = dissolve; }
    public set DissolveArrow(dissolveArrow: undefined | Vec1Animation) { this.dissolveArrow = dissolveArrow; }
    public set Color(color: undefined | ColorAnimation) { this.color = color; }
    public set Interactable(interactable: undefined | Vec1Animation) { this.interactable = interactable; }
    public set Time(time: undefined | Vec1Animation) { this.time = time; }

    public get Track(): string | string[] { return this.track; }
    public get Duration(): undefined | number { return this.duration; }
    public get Easing(): undefined | Ease { return this.easing; }
    public get Repeat(): undefined | number { return this.repeat; }
    public get Position(): undefined | PositionAnimation { return this.position; }
    public get OffsetPosition(): undefined | PositionAnimation { return this.offsetPosition; }
    public get Rotation(): undefined | Vec3Animation { return this.rotation; }
    public get OffsetWorldRotation(): undefined | Vec3Animation { return this.offsetWorldRotation; }
    public get LocalRotation(): undefined | Vec3Animation { return this.localRotation; }
    public get Scale(): undefined | Vec3Animation { return this.scale; }
    public get Dissolve(): undefined | Vec1Animation { return this.dissolve; }
    public get DissolveArrow(): undefined | Vec1Animation { return this.dissolveArrow; }
    public get Color(): undefined | ColorAnimation { return this.color; }
    public get Interactable(): undefined | Vec1Animation { return this.interactable; }
    public get Time(): undefined | Vec1Animation { return this.time; }

    public toJSON() {
        return {
            track: this.track,
            duration: this.duration,
            easing: this.easing,
            repeat: this.repeat,
            position: this.position,
            offsetPosition: this.offsetPosition,
            rotation: this.rotation,
            offsetWorldRotation: this.offsetWorldRotation,
            localRotation: this.localRotation,
            scale: this.scale,
            dissolve: this.dissolve,
            dissolveArrow: this.dissolveArrow,
            color: this.color,
            interactable: this.interactable,
            time: this.time,
        }
    }

    constructor(data: IAnimateTrackData = {} as IAnimateTrackData) {
        this.track = data.Track;
        this.duration = data.Duration;
        this.easing = data.Easing;
        this.repeat = data.Repeat;
        this.position = data.Position;
        this.offsetPosition = data.OffsetPosition;
        this.rotation = data.Rotation;
        this.offsetWorldRotation = data.OffsetWorldRotation;
        this.localRotation = data.LocalRotation;
        this.scale = data.Scale;
        this.dissolve = data.Dissolve;
        this.dissolveArrow = data.DissolveArrow;
        this.color = data.Color;
        this.interactable = data.Interactable;
        this.time = data.Time;
    }
}

export class AnimateTrack extends BaseCustomEvent {
    protected declare d: AnimateTrackData;

    set Data(data: IAnimateTrackData) {
        const d = this.d;

        d.Track = data.Track;
        d.Duration = data.Duration;
        d.Easing = data.Easing;
        d.Repeat = data.Repeat;
        d.OffsetPosition = data.OffsetPosition;
        d.OffsetWorldRotation = data.OffsetWorldRotation;
        d.LocalRotation = data.LocalRotation;
        d.Scale = data.Scale;
        d.Dissolve = data.Dissolve;
        d.DissolveArrow = data.DissolveArrow;
        d.Color = data.Color;
        d.Interactable = data.Interactable;
        d.Time = data.Time;
    }
    set Track(t: string | string[]) { this.d.Track = t; }
    set Duration(d: undefined | number) { this.d.Duration = d; }
    set Easing(e: undefined | Ease) { this.d.Easing = e; }
    set Repeat(r: undefined | number) { this.d.Repeat = r; }
    set OffsetPosition(p: undefined | PositionAnimation) { this.d.OffsetPosition = p; }
    set OffsetWorldRotation(r: undefined | Vec3Animation) { this.d.OffsetWorldRotation = r; }
    set LocalRotation(r: undefined | Vec3Animation) { this.d.LocalRotation = r; }
    set Scale(s: undefined | Vec3Animation) { this.d.Scale = s; }
    set Dissolve(d: undefined | Vec1Animation) { this.d.Dissolve = d; }
    set DissolveArrow(d: undefined | Vec1Animation) { this.d.DissolveArrow = d; }
    set Color(c: undefined | ColorAnimation) { this.d.Color = c; }
    set Interactable(i: undefined | Vec1Animation) { this.d.Interactable = i; }
    set Time(t: undefined | Vec1Animation) { this.d.Time = t; }

    get Data(): IAnimateTrackData { return this.d; }
    get Track(): string | string[] { return this.d.Track; }
    get Duration(): undefined | number { return this.d.Duration; }
    get Easing(): undefined | Ease { return this.d.Easing; }
    get Repeat(): undefined | number { return this.d.Repeat; }
    get OffsetPosition(): undefined | PositionAnimation { return this.d.OffsetPosition; }
    get OffsetWorldRotation(): undefined | Vec3Animation { return this.d.OffsetWorldRotation; }
    get LocalRotation(): undefined | Vec3Animation { return this.d.LocalRotation; }
    get Scale(): undefined | Vec3Animation { return this.d.Scale; }
    get Dissolve(): undefined | Vec1Animation { return this.d.Dissolve; }
    get DissolveArrow(): undefined | Vec1Animation { return this.d.DissolveArrow; }
    get Color(): undefined | ColorAnimation { return this.d.Color; }
    get Interactable(): undefined | Vec1Animation { return this.d.Interactable; }
    get Time(): undefined | Vec1Animation { return this.d.Time; }

    public toJSON() {
        return {
            b: this.Beat,
            t: this.Type,
            d: this.d.toJSON(),
        };
    }
    
    constructor(beat: number = 0, data: IAnimateTrackData = {} as IAnimateTrackData) {
        super(beat, "AnimateTrack");
        this.Data = data;
    }
}