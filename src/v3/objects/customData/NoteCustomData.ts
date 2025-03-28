import { Vec2 } from "../../../util/vec";
import { BaseCustomData } from "./BaseCustomData";
import { INoteCustomData } from "./interfaces/INoteCustomData";

export class NoteCustomData extends BaseCustomData implements INoteCustomData {
    private flip?: Vec2;
    private disableNoteGravity?: boolean;
    private disableNoteLook?: boolean;
    private disableBadCutDirection?: boolean;
    private disableBadCutSpeed?: boolean;
    private disableBadCutSaberType?: boolean;
    private disableNoteDebris?: boolean;
    private spawnEffect?: boolean;
    private link?: string;

    public set Flip(flip: undefined | Vec2) { this.flip = flip; }
    public set DisableNoteGravity(disableNoteGravity: undefined | boolean) { this.disableNoteGravity = disableNoteGravity; }
    public set DisableNoteLook(disableNoteLook: undefined | boolean) { this.disableNoteLook = disableNoteLook; }
    public set DisableBadCutDirection(disableBadCutDirection: undefined | boolean) { this.disableBadCutDirection = disableBadCutDirection; }
    public set DisableBadCutSpeed(disableBadCutSpeed: undefined | boolean) { this.disableBadCutSpeed = disableBadCutSpeed; }
    public set DisableBadCutSaberType(disableBadCutSaberType: undefined | boolean) { this.disableBadCutSaberType = disableBadCutSaberType; }
    public set DisableNoteDebris(disableNoteDebris: undefined | boolean) { this.disableNoteDebris = disableNoteDebris; }
    public set SpawnEffect(spawnEffect: undefined | boolean) { this.spawnEffect = spawnEffect; }
    public set Link(link: undefined | string) { this.link = link; }

    public get Flip(): undefined | Vec2 { return this.flip; }
    public get DisableNoteGravity(): undefined | boolean { return this.disableNoteGravity; }
    public get DisableNoteLook(): undefined | boolean { return this.disableNoteLook; }
    public get DisableBadCutDirection(): undefined | boolean { return this.disableBadCutDirection; }
    public get DisableBadCutSpeed(): undefined | boolean { return this.disableBadCutSpeed; }
    public get DisableBadCutSaberType(): undefined | boolean { return this.disableBadCutSaberType; }
    public get DisableNoteDebris(): undefined | boolean { return this.disableNoteDebris; }
    public get SpawnEffect(): undefined | boolean { return this.spawnEffect; }
    public get Link(): undefined | string { return this.link; }

    public isEmpty(): boolean {
        if (this.Animation && !this.Animation.isEmpty()) {
            return false;
        }

        return [
            this.flip,
            this.disableNoteGravity,
            this.disableNoteLook,
            this.disableBadCutDirection,
            this.disableBadCutSpeed,
            this.disableBadCutSaberType,
            this.disableNoteDebris,
            this.spawnEffect,
            this.link,
            this.Color,
            this.Coordinates,
            this.WorldRotation,
            this.LocalRotation,
            this.Scale,
            this.NJS,
            this.Offset,
            this.Uninteractable,
            this.Track,
        ].every(prop => prop === undefined);
    }

    public toJSON(): Record<string, any> {
        const json = super.toJSON();
    
        if (this.flip !== undefined) json.flip = this.flip;
        if (this.disableNoteGravity !== undefined) json.disableNoteGravity = this.disableNoteGravity;
        if (this.disableNoteLook !== undefined) json.disableNoteLook = this.disableNoteLook;
        if (this.disableBadCutDirection !== undefined) json.disableBadCutDirection = this.disableBadCutDirection;
        if (this.disableBadCutSpeed !== undefined) json.disableBadCutSpeed = this.disableBadCutSpeed;
        if (this.disableBadCutSaberType !== undefined) json.disableBadCutSaberType = this.disableBadCutSaberType;
        if (this.disableNoteDebris !== undefined) json.disableNoteDebris = this.disableNoteDebris;
        if (this.spawnEffect !== undefined) json.spawnEffect = this.spawnEffect;
        if (this.link !== undefined) json.link = this.link;
    
        return json;
    }
    
    public static fromJSON(json: Record<string, any>): NoteCustomData {
        const cd = new NoteCustomData();
    
        // Base fields
        cd.Track = json.track;
        cd.Coordinates = json.coordinates;
        cd.WorldRotation = json.worldRotation;
        cd.LocalRotation = json.localRotation;
        cd.Scale = json.scale;
        cd.NJS = json.noteJumpMovementSpeed;
        cd.Offset = json.noteJumpStartBeatOffset;
        cd.Uninteractable = json.uninteractable;
        cd.Color = json.color;
    
        // Note-specific fields
        cd.flip = json.flip;
        cd.disableNoteGravity = json.disableNoteGravity;
        cd.disableNoteLook = json.disableNoteLook;
        cd.disableBadCutDirection = json.disableBadCutDirection;
        cd.disableBadCutSpeed = json.disableBadCutSpeed;
        cd.disableBadCutSaberType = json.disableBadCutSaberType;
        cd.disableNoteDebris = json.disableNoteDebris;
        cd.spawnEffect = json.spawnEffect;
        cd.link = json.link;
    
        // Animation (only if present)
        const anim = json.animation;
        if (anim !== undefined) {
            cd.Animation.Color = anim.color;
            cd.Animation.DefinitePosition = anim.definitePosition;
            cd.Animation.Dissolve = anim.dissolve;
            cd.Animation.DissolveArrow = anim.dissolveArrow;
            cd.Animation.Interactable = anim.interactable;
            cd.Animation.LocalRotation = anim.localRotation;
            cd.Animation.OffsetPosition = anim.offsetPosition;
            cd.Animation.OffsetWorldRotation = anim.offsetWorldRotation;
            cd.Animation.Scale = anim.scale;
        }
    
        return cd;
    }
    

    constructor(customData?: INoteCustomData) {
        super(customData);
        if (!customData) return;
    
        this.flip = customData.Flip;
        this.disableNoteGravity = customData.DisableNoteGravity;
        this.disableNoteLook = customData.DisableNoteLook;
        this.disableBadCutDirection = customData.DisableBadCutDirection;
        this.disableBadCutSpeed = customData.DisableBadCutSpeed;
        this.disableBadCutSaberType = customData.DisableBadCutSaberType;
        this.disableNoteDebris = customData.DisableNoteDebris;
        this.spawnEffect = customData.SpawnEffect;
        this.link = customData.Link;
    }
    
}