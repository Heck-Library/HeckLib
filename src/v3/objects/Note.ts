import { CutDirection, LineIndex, LineLayer, NoteColor } from "../../util/enums";
import { NoteCustomData } from "./customData/NoteCustomData";
import { INoteCustomData } from "./customData/interfaces/INoteCustomData";
import { INoteData } from "./interfaces/INoteData";
import { IPathAnimationData } from "../events/customEvents/interfaces/IPathAnimationData";
import { log } from "../../util/logs";
import { BaseObject } from "./BaseObject";

type NoteFilters = {
    StartBeat: number,
    EndBeat: number,
    Xs: LineIndex[],
    Ys: LineLayer[],
    CutDirections: CutDirection[],
    Color: NoteColor,
};

export class NoteArray extends Array<Note> {
    private fake: boolean = false;

    private determineName(): string { return log.console.CLASS_MSG(this.fake ? "FakeNotes" : "Notes") }

    private filtersToString(filters: Partial<NoteFilters>): string {
        return (filters.StartBeat !== undefined ? "\n          "+log.console.FIELD_MSG("StartBeat") +": "+ log.console.NUM_MSG(filters.StartBeat) : '')
            + (filters.EndBeat !== undefined ? "\n          "+log.console.FIELD_MSG("EndBeat") +": "+ log.console.NUM_MSG(filters.EndBeat) : '')
            + (filters.Xs !== undefined ? "\n          "+log.console.FIELD_MSG("Xs") +": "+ log.console.NUM_MSG(filters.Xs.join(', ')) : '')
            + (filters.Ys !== undefined ? "\n          "+log.console.FIELD_MSG("Ys") +": "+ log.console.NUM_MSG(filters.Ys.join(', ')) : '')
            + (filters.Color !== undefined ? "\n          "+log.console.FIELD_MSG("Color") +": "+ log.console.NUM_MSG(filters.Color) : '')
            + (filters.CutDirections !== undefined ? "\n          "+log.console.FIELD_MSG("CutDirections") +": "+ log.console.NUM_MSG(filters.CutDirections.join(', ')) : '');
    }
    /**
     * ## Select
     * 
     * Selects notes based on the filters provided and returns them as a new array.
     * 
     * @param filters All potential filters to select the notes by.
     * @returns Filtered array of notes.
     * @example
     * notes.select({
     *     StartBeat: 6.9,
     *     EndBeat: 69
     * }).forEach(n => {
     *     n.CustomData.Track = "TestTrack";
     * });
     */
    public select(filters: Partial<NoteFilters>): Note[] {
        try {
            log.debug(`Selecting ${this.determineName()} with filters: ${log.console.OBJ_MSG(this.filtersToString(filters))}`);
            const filtered = this.filter(note => {
                if (filters.StartBeat !== undefined && note.Beat < filters.StartBeat) return false;
                if (filters.EndBeat !== undefined && note.Beat > filters.EndBeat) return false;
                if (filters.Xs !== undefined && !filters.Xs.includes(note.X)) return false;
                if (filters.Ys !== undefined && !filters.Ys.includes(note.Y)) return false;
                if (filters.Color !== undefined && note.Color !== filters.Color) return false;
                if (filters.CutDirections !== undefined && !filters.CutDirections.includes(note.CutDirection)) return false;
                return true;
            });
            log.success(`Selected ${log.console.NUM_MSG(filtered.length)} ${this.determineName()}.`);
            return filtered;
        } catch (e) {
            log.error(`Could not filter ${log.console.CLASS_MSG(this.determineName())}: \x1b[31m${(e as Error).message}`);
            return [];
        }
    }

    /**
     * ## Push
     * 
     * Pushes note(s) to the array. This method is significantly slower than `fastPush` with the advantage of keeping the functions and methods of the object.
     * 
     * @param items Note(s) to push to the map. 
     * @returns Length of the array (How many notes are in the map).
     * @example
     * notes.push(new Note());
     * 
     * notes[0].CustomData // Returns the CustomData of the note.
     */
    public push(...items: Note[]): number {
        log.debug(`Pushing ${items.length} notes to ${this.determineName()}`);
        items.forEach(n => super.push(n.Duplicate()));
        log.debug(`Pushed ${log.console.NUM_MSG(items.length)} ${this.determineName()}.`);
        return this.length;
    }

    toJSON() {
        return this.map(n => n.toJSON());
    }

    constructor(fake: boolean = false, ...items: Note[]) {
        super(...items);
        this.fake = fake;
    }
}

export class Note extends BaseObject implements INoteData {
    public static readonly LINEINDEX = LineIndex;
    public static readonly LINELAYER = LineLayer;
    public static readonly COLOR = NoteColor;
    public static readonly DIRECTION = CutDirection;

    private c: NoteColor = Note.COLOR.Red;
    private d: CutDirection = Note.DIRECTION.Up;
    private a: number = 0;
    protected declare customData?: NoteCustomData;

    set Color(c: NoteColor) { this.c = c; }
    set CutDirection(d: CutDirection) { this.d = d; }
    set Angle(a: number) { this.a = a; }
    set CustomData(customData: INoteCustomData) {
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
    set Animation(animation: undefined | Partial<IPathAnimationData>) {
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

    get Color(): NoteColor { return this.c; }
    get CutDirection(): CutDirection { return this.d; }
    get Angle(): number { return this.a; }
    get CustomData(): NoteCustomData {
        this.ifUndefinedNewCustomData();

        return this.customData as NoteCustomData;
    }
    get Animation(): Partial<IPathAnimationData> {
        this.ifUndefinedNewCustomData();
        
        return (this.customData as NoteCustomData).Animation;
    }

    private ifUndefinedNewCustomData(): void {
        if (this.customData === undefined) this.customData = new NoteCustomData();
    }

    constructor(vanillaData: INoteData = {} as INoteData, customData?: INoteCustomData) {
        super(vanillaData.Beat, vanillaData.X, vanillaData.Y);

        this.c = vanillaData.Color ?? 0;
        this.d = vanillaData.CutDirection ?? 0;
        this.a = vanillaData.Angle ?? 0;

        if (customData !== undefined) this.SetCustomData(customData);
    }

    public SetCustomData(customData?: INoteCustomData): void {
        this.customData = new NoteCustomData(customData);
    }

    public toJSON() {
        const json: Record<string, any> = {};

        json.b = this.b;
        json.x = this.x;
        json.y = this.y;
        json.c = this.c;
        json.d = this.d;
        json.a = this.a;

        if (this.customData !== undefined) json.customData = this.customData.toJSON();

        return json;
    }

    public static fromJSON(...json: Record<string, any>[]): Note[] {
        const notes: Note[] = [];
        json.forEach(j => {
            const note = new Note();

            note.Beat = j.b;
            note.X = j.x;
            note.Y = j.y;
            note.Color = j.c;
            note.CutDirection = j.d;
            note.Angle = j.a;

            if (j.customData !== undefined) {
                note.customData = NoteCustomData.fromJSON(j.customData);
            }

            notes.push(note);
        });
        return notes;
    }

    public ClearAllEmptyData(): void {
        if (this.customData?.Animation !== undefined) this.customData.deleteAnimation();
        if (this.customData !== undefined) this.customData.isEmpty() && (this.customData = undefined);
    }

    public Duplicate(): Note {
        const note = new Note();

        note.Beat = this.Beat;
        note.X = this.X;
        note.Y = this.Y;
        note.Color = this.Color;
        note.CutDirection = this.CutDirection;
        note.Angle = this.Angle;
        
        note.SetCustomData(this.customData);

        return note;
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
}
