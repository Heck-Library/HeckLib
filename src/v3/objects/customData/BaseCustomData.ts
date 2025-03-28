import { log } from "../../../util/logs";
import { Color, Vec2, Vec3 } from "../../../util/vec";
import { IPathAnimationData } from "../../events/customEvents/interfaces/IPathAnimationData";
import { IBaseCustomData } from "./interfaces/IBaseCustomData";
import { ObjectAnimationData } from "./ObjectAnimationData";

export class BaseCustomData implements IBaseCustomData {
    private track?: string | string[];
    private coordinates?: Vec2;
    private worldRotation?: Vec3 | number;
    private localRotation?: Vec3;
    private scale?: Vec3;
    private noteJumpMovementSpeed?: number;
    private noteJumpStartBeatOffset?: number;
    private uninteractable?: boolean;
    private color?: Color;
    private animation?: ObjectAnimationData;

    public set Track(track: undefined | string | string[]) { this.track = track; }
    public set Coordinates(coordinates: undefined | Vec2) { this.coordinates = coordinates; }
    public set WorldRotation(worldRotation: undefined | Vec3 | number) { this.worldRotation = worldRotation; }
    public set LocalRotation(localRotation: undefined | Vec3) { this.localRotation = localRotation; }
    public set Scale(scale: undefined | Vec3) { this.scale = scale; }
    public set NJS(njs: undefined | number) { this.noteJumpMovementSpeed = njs; }
    public set Offset(offset: undefined | number) { this.noteJumpStartBeatOffset = offset; }
    public set Uninteractable(uninteractable: undefined | boolean) { this.uninteractable = uninteractable; }
    public set Color(color: undefined | Color) { this.color = color; }
    public set Animation(animation: undefined | Partial<IPathAnimationData>) {
        if (!this.animation) {
            this.animation = new ObjectAnimationData(animation);
            return;
        }
    
        for (const [key, value] of Object.entries(animation || {})) {
            if (value !== undefined) {
                (this.animation as any)[key] = value;
            }
        }
    }

    public get Track(): undefined | string | string[] { return this.track; }
    public get Coordinates(): undefined | Vec2 { return this.coordinates; }
    public get WorldRotation(): undefined | Vec3 | number { return this.worldRotation; }
    public get LocalRotation(): undefined | Vec3 { return this.localRotation; }
    public get Scale(): undefined | Vec3 { return this.scale; }
    public get NJS(): undefined | number { return this.noteJumpMovementSpeed; }
    public get Offset(): undefined | number { return this.noteJumpStartBeatOffset; }
    public get Uninteractable(): undefined | boolean { return this.uninteractable; }
    public get Color(): undefined | Color { return this.color; }
    public get Animation(): ObjectAnimationData {
        if (this.animation === undefined) this.animation = new ObjectAnimationData();
        return this.animation;
    }

    public deleteAnimation(): void { if (this.Animation !== undefined && this.Animation.isEmpty()) this.animation = undefined; }

    constructor(customData?: IBaseCustomData) {
        if (customData === undefined) return;

        this.track = customData.Track;
        this.coordinates = customData.Coordinates;
        this.worldRotation = customData.WorldRotation;
        this.localRotation = customData.LocalRotation;
        this.scale = customData.Scale;
        this.noteJumpMovementSpeed = customData.NJS;
        this.noteJumpStartBeatOffset = customData.Offset;
        this.uninteractable = customData.Uninteractable;
        this.color = customData.Color;

        this.animation = new ObjectAnimationData(customData.Animation);
    }

    public toJSON() {
        const json: Record<string, any> = {};

        json.track = this.track;
        json.coordinates = this.coordinates;
        json.worldRotation = this.worldRotation;
        json.localRotation = this.localRotation;
        json.scale = this.scale;
        json.noteJumpMovementSpeed = this.noteJumpMovementSpeed;
        json.noteJumpStartBeatOffset = this.noteJumpStartBeatOffset;
        json.uninteractable = this.uninteractable;
        json.color = this.color;

        if (this.animation && !this.animation.isEmpty()) json.animation = this.animation.toJSON();
        
        return json
    }

    public toString(): string {
        const parts: string[] = [];
    
        for (const key in this) {
            if (!Object.prototype.hasOwnProperty.call(this, key)) continue;
            if (key === "animation") continue;
    
            const value = this[key];
            if (value !== undefined) {
                const displayValue = Array.isArray(value)
                    ? JSON.stringify(value)
                    : log.determineLogColorMessage(value, typeof value);
    
                parts.push(`          ${log.console.FIELD_MSG(key)}: ${displayValue}`);
            }
        }
    
        if (this.animation !== undefined) {
            const animStr = Object.keys(this.animation).length > 0
                ? this.animation.toString()
                : "{}";
            parts.push(`          ${log.console.FIELD_MSG("animation")}: ${animStr}`);
        }
    
        return "\n" + parts.join("\n") + "\n";
    }
}
