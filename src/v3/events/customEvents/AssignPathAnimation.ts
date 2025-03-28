import { Ease } from "../../../util/easings";
import { ColorAnimation, PositionAnimation, Vec1Animation, Vec3Animation } from "../../../util/vec";
import { BaseCustomEvent } from "./BaseCustomEvent";
import { IAssignPathAnimationData } from "./interfaces/IPathAnimationData";

class PathAnimationData implements IAssignPathAnimationData {
    private track: string | string[] = [];
    private duration?: number;
    private easing?: Ease;
    private offsetPosition?: PositionAnimation;
    private offsetWorldRotation?: Vec3Animation;
    private localRotation?: Vec3Animation;
    private scale?: Vec3Animation;
    private dissolve?: Vec1Animation;
    private dissolveArrow?: Vec1Animation;
    private color?: ColorAnimation;
    private interactable?: Vec1Animation;
    private definitePosition?: PositionAnimation;

    public set Track(track: string | string[]) { this.track = track; }
    public set Duration(duration: undefined | number) { this.duration = duration; }
    public set Easing(easing: undefined | Ease) { this.easing = easing; }
    public set OffsetPosition(offsetPosition: undefined | PositionAnimation) { this.offsetPosition = offsetPosition; }
    public set OffsetWorldRotation(offsetWorldRotation: undefined | Vec3Animation) { this.offsetWorldRotation = offsetWorldRotation; }
    public set LocalRotation(localRotation: undefined | Vec3Animation) { this.localRotation = localRotation; }
    public set Scale(scale: undefined | Vec3Animation) { this.scale = scale; }
    public set Dissolve(dissolve: undefined | Vec1Animation) { this.dissolve = dissolve; }
    public set DissolveArrow(dissolveArrow: undefined | Vec1Animation) { this.dissolveArrow = dissolveArrow; }
    public set Color(color: undefined | ColorAnimation) { this.color = color; }
    public set Interactable(interactable: undefined | Vec1Animation) { this.interactable = interactable; }
    public set DefinitePosition(definitePosition: undefined | PositionAnimation) { this.definitePosition = definitePosition; }

    public get Track(): string | string[] { return this.track; }
    public get Duration(): undefined | number { return this.duration; }
    public get Easing(): undefined | Ease { return this.easing; }
    public get OffsetPosition(): undefined | PositionAnimation { return this.offsetPosition; }
    public get OffsetWorldRotation(): undefined | Vec3Animation { return this.offsetWorldRotation; }
    public get LocalRotation(): undefined | Vec3Animation { return this.localRotation; }
    public get Scale(): undefined | Vec3Animation { return this.scale; }
    public get Dissolve(): undefined | Vec1Animation { return this.dissolve; }
    public get DissolveArrow(): undefined | Vec1Animation { return this.dissolveArrow; }
    public get Color(): undefined | ColorAnimation { return this.color; }
    public get Interactable(): undefined | Vec1Animation { return this.interactable; }
    public get DefinitePosition(): undefined | PositionAnimation { return this.definitePosition; }

    constructor(data: IAssignPathAnimationData = {} as IAssignPathAnimationData) {
        this.track = data.Track;
        this.duration = data.Duration;
        this.easing = data.Easing;
        this.offsetPosition = data.OffsetPosition;
        this.offsetWorldRotation = data.OffsetWorldRotation;
        this.localRotation = data.LocalRotation;
        this.scale = data.Scale;
        this.dissolve = data.Dissolve;
        this.dissolveArrow = data.DissolveArrow;
        this.color = data.Color;
        this.interactable = data.Interactable;
        this.definitePosition = data.DefinitePosition;
    }
}
export class AssignPathAnimation extends BaseCustomEvent {
    protected declare d: PathAnimationData;

    public set Data(data: IAssignPathAnimationData) { this.d = new PathAnimationData(data); }
    public set Track(track: string | string[]) { this.d.Track = track; }
    public set Duration(duration: number) { this.d.Duration = duration; }
    public set Easing(easing: Ease) { this.d.Easing = easing; }
    public set OffsetPosition(offsetPosition: PositionAnimation) { this.d.OffsetPosition = offsetPosition; }
    public set OffsetWorldRotation(offsetWorldRotation: Vec3Animation) { this.d.OffsetWorldRotation = offsetWorldRotation; }
    public set LocalRotation(localRotation: Vec3Animation) { this.d.LocalRotation = localRotation; }
    public set Scale(scale: Vec3Animation) { this.d.Scale = scale; }
    public set Dissolve(dissolve: Vec1Animation) { this.d.Dissolve = dissolve; }
    public set DissolveArrow(dissolveArrow: Vec1Animation) { this.d.DissolveArrow = dissolveArrow; }
    public set Color(color: ColorAnimation) { this.d.Color = color; }
    public set Interactable(interactable: Vec1Animation) { this.d.Interactable = interactable; }
    public set DefinitePosition(definitePosition: PositionAnimation) { this.d.DefinitePosition = definitePosition; }

    public get Data(): IAssignPathAnimationData { return this.d; }
    public get Track(): undefined | string | string[] { return this.d.Track; }
    public get Duration(): undefined | number { return this.d.Duration; }
    public get Easing(): undefined | Ease { return this.d.Easing; }
    public get OffsetPosition(): undefined | PositionAnimation { return this.d.OffsetPosition; }
    public get OffsetWorldRotation(): undefined | Vec3Animation { return this.d.OffsetWorldRotation; }
    public get LocalRotation(): undefined | Vec3Animation { return this.d.LocalRotation; }
    public get Scale(): undefined | Vec3Animation { return this.d.Scale; }
    public get Dissolve(): undefined | Vec1Animation { return this.d.Dissolve; }
    public get DissolveArrow(): undefined | Vec1Animation { return this.d.DissolveArrow; }
    public get Color(): undefined | ColorAnimation { return this.d.Color; }
    public get Interactable(): undefined | Vec1Animation { return this.d.Interactable; }
    public get DefinitePosition(): undefined | PositionAnimation { return this.d.DefinitePosition; }

    constructor(beat: number = 0, data: IAssignPathAnimationData = {} as IAssignPathAnimationData) {
        super(beat, "AssignPathAnimation");
        this.d = new PathAnimationData(data);
    }
}