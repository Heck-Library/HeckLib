import { Vec3 } from "../../../util/vec";
import { BaseCustomData } from "./BaseCustomData";
import { IObstacleCustomData } from "./interfaces/IObstacleCustomData";

export class ObstacleCustomData extends BaseCustomData implements IObstacleCustomData {
    private size?: Vec3;

    public set Size(size: Vec3) { this.size = size; }
    public get Size(): undefined | Vec3 { return this.size; }

    public isEmpty(): boolean {
        if (this.Animation && !this.Animation.isEmpty()) return false;

        return [
            this.size,
            this.Color,
            this.Coordinates,
            this.WorldRotation,
            this.LocalRotation,
            this.Scale,
            this.NJS,
            this.Offset,
            this.Uninteractable,
            this.Track
        ].every(v => v === undefined);
    }

    public toJSON(): Record<string, any> {
        const json = super.toJSON();

        json.size = this.size;

        return json;
    }

    public static fromJSON(json: Record<string, any>): ObstacleCustomData {
        const cd = new ObstacleCustomData();
        
        cd.Track = json.track ?? undefined;
        cd.Coordinates = json.coordinates ?? undefined;
        cd.WorldRotation = json.worldRotation ?? undefined;
        cd.LocalRotation = json.localRotation ?? undefined;
        cd.Scale = json.scale ?? undefined;
        cd.NJS = json.noteJumpMovementSpeed ?? undefined;
        cd.Offset = json.noteJumpStartBeatOffset ?? undefined;
        cd.Uninteractable = json.uninteractable ?? undefined;
        cd.Color = json.color ?? undefined;
        cd.Size = json.size ?? undefined;

        const anim = json.animation ?? undefined;

        if (anim !== undefined) {
            cd.Animation.Color = anim.color ?? undefined;
            cd.Animation.DefinitePosition = anim.definitePosition ?? undefined;
            cd.Animation.Dissolve = anim.dissolve ?? undefined;
            cd.Animation.DissolveArrow = anim.dissolveArrow ?? undefined;
            cd.Animation.Interactable = anim.interactable ?? undefined;
            cd.Animation.LocalRotation = anim.localRotation ?? undefined;
            cd.Animation.OffsetPosition = anim.offsetPosition ?? undefined;
            cd.Animation.OffsetWorldRotation = anim.offsetWorldRotation ?? undefined;
            cd.Animation.Scale = anim.scale ?? undefined;
        }

        return cd;
    }

    constructor(customData?: IObstacleCustomData) {
        super(customData);

        if (customData === undefined) return;

        customData.Size !== undefined && (this.size = customData.Size);
        
        return this;
    }
}