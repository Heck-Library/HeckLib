import { ColorAnimation, PositionAnimation, Vec1Animation, Vec3Animation } from "../../../util/vec";
import { IPathAnimationData } from "../../events/customEvents/interfaces/IPathAnimationData";

export class ObjectAnimationData implements Partial<IPathAnimationData> {
    private offsetPosition?: PositionAnimation;
    private offsetWorldRotation?: Vec3Animation;
    private localRotation?: Vec3Animation;
    private scale?: Vec3Animation;
    private dissolve?: Vec1Animation;
    private dissolveArrow?: Vec1Animation;
    private color?: ColorAnimation;
    private interactable?: Vec1Animation;
    private definitePosition?: PositionAnimation;

    public get OffsetPosition(): undefined | PositionAnimation { return this.offsetPosition; }
    public get OffsetWorldRotation(): undefined | Vec3Animation { return this.offsetWorldRotation; }
    public get LocalRotation(): undefined | Vec3Animation { return this.localRotation; }
    public get Scale(): undefined | Vec3Animation { return this.scale; }
    public get Dissolve(): undefined | Vec1Animation { return this.dissolve; }
    public get DissolveArrow(): undefined | Vec1Animation { return this.dissolveArrow; }
    public get Color(): undefined | ColorAnimation { return this.color; }
    public get Interactable(): undefined | Vec1Animation { return this.interactable; }
    public get DefinitePosition(): undefined | PositionAnimation { return this.definitePosition; }

    public set OffsetPosition(offsetPosition: undefined | PositionAnimation) { this.offsetPosition = offsetPosition; }
    public set OffsetWorldRotation(offsetWorldRotation: undefined | Vec3Animation) { this.offsetWorldRotation = offsetWorldRotation; }
    public set LocalRotation(localRotation: undefined | Vec3Animation) { this.localRotation = localRotation; }
    public set Scale(scale: undefined | Vec3Animation) { this.scale = scale; }
    public set Dissolve(dissolve: undefined | Vec1Animation) { this.dissolve = dissolve; }
    public set DissolveArrow(dissolveArrow: undefined | Vec1Animation) { this.dissolveArrow = dissolveArrow; }
    public set Color(color: undefined | ColorAnimation) { this.color = color; }
    public set Interactable(interactable: undefined | Vec1Animation) { this.interactable = interactable; }
    public set DefinitePosition(definitePosition: undefined | PositionAnimation) { this.definitePosition = definitePosition; }

    public isEmpty(): boolean { return this.offsetPosition === undefined && 
        this.offsetWorldRotation === undefined && 
        this.localRotation === undefined && 
        this.scale === undefined && 
        this.dissolve === undefined &&
        this.dissolveArrow === undefined && 
        this.color === undefined && 
        this.interactable === undefined && 
        this.definitePosition === undefined; 
    }

    constructor(animationData?: Partial<IPathAnimationData>) {
        if (!animationData) return this;

        this.offsetPosition = animationData.OffsetPosition ?? undefined;
        this.offsetWorldRotation = animationData.OffsetWorldRotation ?? undefined;
        this.localRotation = animationData.LocalRotation ?? undefined;
        this.scale = animationData.Scale ?? undefined;
        this.dissolve = animationData.Dissolve ?? undefined;
        this.dissolveArrow = animationData.DissolveArrow ?? undefined;
        this.color = animationData.Color ?? undefined;
        this.interactable = animationData.Interactable ?? undefined;
        this.definitePosition = animationData.DefinitePosition ?? undefined;

        return this;
    }

    public toJSON() {
        const json: Record<string, any> = {};

        json.offsetPosition = this.offsetPosition ?? undefined;
        json.offsetWorldRotation = this.offsetWorldRotation ?? undefined;
        json.localRotation = this.localRotation ?? undefined;
        json.scale = this.scale ?? undefined;
        json.dissolve = this.dissolve ?? undefined;
        json.dissolveArrow = this.dissolveArrow ?? undefined;
        json.color = this.color ?? undefined;
        json.interactable = this.interactable ?? undefined;
        json.definitePosition = this.definitePosition ?? undefined;
        
        return json;
    }

    public toString(): string {
        let str = "{";
        const keys = Object.keys(this) as (keyof ObjectAnimationData)[];
        let definedKeys = 0;
        for (const key of keys) {
            if (this[key as keyof ObjectAnimationData] === undefined) continue;
            str += `\n            ${key}: ${this[key]}`;
            definedKeys++;
        }
        str += definedKeys > 0 ? "\n          }" : "}";
        return str;
    }
}