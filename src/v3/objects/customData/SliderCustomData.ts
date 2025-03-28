import { Vec2 } from "../../../util/vec";
import { BaseCustomData } from "./BaseCustomData";
import { ISliderCustomData } from "./interfaces/ISliderCustomData";

export class SliderCustomData extends BaseCustomData implements ISliderCustomData {
    private tailCoordinates?: Vec2;
    private disableNoteGravity?: boolean;

    public set TailCoordinates(tailCoordinates: undefined | Vec2) { this.tailCoordinates = tailCoordinates; }
    public set DisableNoteGravity(disableNoteGravity: undefined | boolean) { this.disableNoteGravity = disableNoteGravity; }
 
    public get TailCoordinates(): undefined | Vec2 { return this.tailCoordinates; }
    public get DisableNoteGravity(): undefined | boolean { return this.disableNoteGravity; }

    public isEmpty(): boolean {
        if (this.Animation && !this.Animation.isEmpty()) return false;

        return [
            this.tailCoordinates,
            this.disableNoteGravity,
            this.Color,
            this.Coordinates,
            this.WorldRotation,
            this.LocalRotation,
            this.Scale,
            this.NJS,
            this.Offset,
            this.Uninteractable,
            this.Track,
        ].every(v => v === undefined);
    }

    public toJSON(): Record<string, any> {
        const json = super.toJSON();

        json.tailCoordinates = this.tailCoordinates;
        json.disableNoteGravity = this.disableNoteGravity;

        return json;
    }

    public static fromJSON(json: Record<string, any>): SliderCustomData {
        const cd = new SliderCustomData();

        cd.Track = json.track;
        cd.Coordinates = json.coordinates;
        cd.WorldRotation = json.worldRotation;
        cd.LocalRotation = json.localRotation;
        cd.Scale = json.scale;
        cd.NJS = json.noteJumpMovementSpeed;
        cd.Offset = json.noteJumpStartBeatOffset;
        cd.Uninteractable = json.uninteractable;
        cd.Color = json.color;
        cd.TailCoordinates = json.tailCoordinates;
        cd.DisableNoteGravity = json.disableNoteGravity;

        const anim = json.animation;

        if (anim === undefined) return cd;

        cd.Animation.Color = anim.color;
        cd.Animation.DefinitePosition = anim.definitePosition;
        cd.Animation.Dissolve = anim.dissolve;
        cd.Animation.DissolveArrow = anim.dissolveArrow;
        cd.Animation.Interactable = anim.interactable;
        cd.Animation.LocalRotation = anim.localRotation;
        cd.Animation.OffsetPosition = anim.offsetPosition;
        cd.Animation.OffsetWorldRotation = anim.offsetWorldRotation;
        cd.Animation.Scale = anim.scale;

        return cd;
    }

    constructor(customData?: ISliderCustomData) {
        super(customData);
        if (customData === undefined) return;
        customData.TailCoordinates !== undefined && (this.tailCoordinates = customData.TailCoordinates);
        customData.DisableNoteGravity !== undefined && (this.disableNoteGravity = customData.DisableNoteGravity);
    }
}