import { LineIndex, LineLayer } from "../../util/enums";
import { NoteCustomData } from "./customData/NoteCustomData";
import { INoteCustomData } from "./customData/interfaces/INoteCustomData";
import { IBombData } from "./interfaces/IBombData";
import { IPathAnimationData } from "../events/customEvents/interfaces/IPathAnimationData";
import { log } from "../../util/logs";
import { BaseObject } from "./BaseObject";

export class BombArray extends Array<Bomb> {
    private fake: boolean = false;

    private determineName(): string { return this.fake ? "FakeBombs" : "Bombs" }

    private filtersToString(filters: {
        StartBeat?: number,
        EndBeat?: number,
        Xs?: LineIndex[],
        Ys?: LineLayer[],
    }): string {
        return (filters.StartBeat !== undefined ? "\n          StartBeat: "+ filters.StartBeat : '')
            + (filters.EndBeat !== undefined ? "\n          EndBeat: "+ filters.EndBeat : '')
            + (filters.Xs !== undefined ? "\n          Xs: "+ filters.Xs.join(', ') : '')
            + (filters.Ys !== undefined ? "\n          Ys: "+ filters.Ys.join(', ') : '');
    }
    /**
     * ## Select
     * 
     * Selects bombs based on the filters provided and returns them as a new array.
     * 
     * @param filters All potential filters to select the bombs
     * @returns Filtered array of bombs.
     * @example
     * bombs.select({
     *     StartBeat: 6.9,
     *     EndBeat: 69
     * }).forEach(n => {
     *     n.CustomData.Track = "TestTrack";
     * });
     */
    public select(filters: {
        StartBeat?: number,
        EndBeat?: number,
        Xs?: LineIndex[],
        Ys?: LineLayer[],
    }): Bomb[] {
        try {
            log.debug(`Selecting ${this.determineName()} with filters: ${this.filtersToString(filters)}`);
            const filtered = this.filter(bomb => {
                if (filters.StartBeat !== undefined && bomb.Beat <= filters.StartBeat) return false;
                if (filters.EndBeat !== undefined && bomb.Beat >= filters.EndBeat) return false;
                if (filters.Xs !== undefined && !filters.Xs.includes(bomb.X)) return false;
                if (filters.Ys !== undefined && !filters.Ys.includes(bomb.Y)) return false;
                return true;
            });
            log.info(`Selected ${filtered.length} ${this.determineName()}.`);
            return filtered;
        } catch (e) {
            log.error(`Error selecting ${this.determineName()}: ${e}`);
            return [];
        }
    }

    /**
     * ## Push
     * 
     * Pushes bomb(s) to the array.
     * 
     * @param items Bomb(s) to push to the map. 
     * @returns Length of the array (How many bombs are in the map).
     * @example
     * bombs.push(new Bomb());
     * 
     * bombs[0].CustomData // Returns a NoteCustomData object
     */
    push(...items: Bomb[]): number {
        items.forEach(n => super.push(n.Duplicate()));
        log.debug(`Pushed ${log.console.NUM_MSG(items.length)} bombs to ${this.determineName()}`);
        return this.length;
    }
    
    public toJSON() {
        return this.map(b => b.toJSON());
    }

    constructor(fake: boolean = false, ...items: Bomb[]) {
        super(...items);
        this.fake = fake;
    }
}

export class Bomb extends BaseObject implements IBombData {
    public static readonly LINEINDEX = LineIndex;
    public static readonly LINELAYER = LineLayer;
    
    protected declare customData?: NoteCustomData;

    public set CustomData(customData: INoteCustomData) {
        this.ifUndefinedNewCustomData();

        const cd = this.customData as NoteCustomData;

        this.Animation = customData.Animation;
        
        cd.Color = customData.Color;
        cd.Coordinates = customData.Coordinates;
        cd.DisableBadCutDirection = customData.DisableBadCutDirection;
        cd.DisableBadCutSaberType = customData.DisableBadCutSaberType;
        cd.DisableBadCutSpeed = customData.DisableBadCutSpeed;
        cd.DisableNoteDebris = customData.DisableNoteDebris;
        cd.DisableNoteGravity = customData.DisableNoteGravity;
        cd.DisableNoteLook = customData.DisableNoteLook;
        cd.Flip = customData.Flip;
        cd.Link = customData.Link;
        cd.LocalRotation = customData.LocalRotation;
        cd.NJS = customData.NJS;
        cd.Offset = customData.Offset;
        cd.Scale = customData.Scale;
        cd.SpawnEffect = customData.SpawnEffect;
        cd.Track = customData.Track;
        cd.Uninteractable = customData.Uninteractable;
        cd.WorldRotation = customData.WorldRotation;
    }
    public set Animation(animation: undefined | Partial<IPathAnimationData>) {
        this.ifUndefinedNewCustomData();

        const anim = (this.customData as NoteCustomData).Animation;

        if (animation === undefined) {
            (this.customData as NoteCustomData).Animation = undefined;
            return;
        }

        anim.Color = animation.Color;
        anim.DefinitePosition = animation.DefinitePosition;
        anim.Dissolve = animation.Dissolve;
        anim.DissolveArrow = animation.DissolveArrow;
        anim.Interactable = animation.Interactable;
        anim.LocalRotation = animation.LocalRotation;
        anim.OffsetPosition = animation.OffsetPosition;
        anim.OffsetWorldRotation = animation.OffsetWorldRotation;
        anim.Scale = animation.Scale;
    }

    public get CustomData(): NoteCustomData {
        this.ifUndefinedNewCustomData();

        return this.customData as NoteCustomData;
    }
    public get Animation(): Partial<IPathAnimationData> {
        this.ifUndefinedNewCustomData();
        
        return (this.customData as NoteCustomData).Animation;
    }

    private ifUndefinedNewCustomData(): void {
        if (this.customData === undefined) this.customData = new NoteCustomData();
    }
    
    constructor(vanillaData: IBombData = {} as IBombData, customData?: INoteCustomData) {
        super(vanillaData.Beat, vanillaData.X, vanillaData.Y);
    
        customData && (this.customData = new NoteCustomData(customData));
    }

    public toJSON(): Record<string, any> {
        const json: Record<string, any> = {}

        json.b = this.Beat;
        json.x = this.X;
        json.y = this.Y;

        if (this.customData !== undefined) json.customData = this.customData.toJSON();

        return json;
    }
    
    public static fromJSON(...json: Record<string, any>[]): Bomb[] {
        const bombs: Bomb[] = [];

        json.forEach(b => {
            const bomb = new Bomb();
            bomb.Beat = b.b;
            bomb.X = b.x;
            bomb.Y = b.y;
            b.customData && (bomb.CustomData = NoteCustomData.fromJSON(b.customData));
            bombs.push(bomb);
        });

        return bombs;
    }

    public SetCustomData(customData?: INoteCustomData): void {
        this.customData = new NoteCustomData(customData);
    }

    public ClearAllEmptyData() : void {
        if (this.customData?.Animation !== undefined) this.customData.deleteAnimation();
        if (this.customData !== undefined) this.customData.isEmpty() && (this.customData = undefined);
    }

    public AddTrack(...tracks: string[]): void {
        if (Array.isArray(this.CustomData.Track)) {
            this.CustomData.Track.push(...tracks);
            return;
        }

        if (typeof this.CustomData.Track === "string") {
            this.CustomData.Track = [this.CustomData.Track, ...tracks];
            return;
        }
        
        if (this.CustomData.Track === undefined) {
            this.CustomData.Track = tracks;
            return;
        }
    }
    
    public Duplicate(): Bomb {
        const b = new Bomb();
        
        b.Beat = this.Beat;
        b.X = this.X;
        b.Y = this.Y;

        b.SetCustomData(this.CustomData);

        return b;
    }
}