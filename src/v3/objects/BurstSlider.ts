import { CutDirection, LineIndex, LineLayer, NoteColor } from "../../util/enums";
import { NoteCustomData } from "./customData/NoteCustomData";
import { INoteCustomData } from "./customData/interfaces/INoteCustomData";
import { IBurstSliderData } from "./interfaces/IBurstSliderData";
import { IPathAnimationData } from "../events/customEvents/interfaces/IPathAnimationData";
import { log } from "../../util/logs";
import { BaseObject } from "./BaseObject";

type BurstSliderFilters = {
    StartBeat: number,
    EndBeat: number,
    Xs: LineIndex[],
    Ys: LineLayer[],
    Colors: NoteColor[],
    CutDirections: CutDirection[],
    TailBeats: number[],
    TailXs: LineIndex[],
    TailYs: LineLayer[],
    MinSliceCount: number,
    MaxSliceCount: number,
    MinSquish: number,
    MaxSquish: number
}

export class BurstSliderArray extends Array<BurstSlider> {
    private fake: boolean = false;

    private determineName(): string { return this.fake ? "FakeBurstSliders" : "BurstSliders" }

    private filtersToString(filters: Partial<BurstSliderFilters>) {
        return (filters.StartBeat !== undefined ? "\n          StartBeat: "+ filters.StartBeat : '')
            + (filters.EndBeat !== undefined ? "\n          EndBeat: "+ filters.EndBeat : '')
            + (filters.Xs !== undefined ? "\n          Xs: "+ filters.Xs.join(', ') : '')
            + (filters.Ys !== undefined ? "\n          Ys: "+ filters.Ys.join(', ') : '')
            + (filters.Colors !== undefined ? "\n          Colors: "+ filters.Colors.join(', ') : '')
            + (filters.CutDirections !== undefined ? "\n          CutDirections: "+ filters.CutDirections.join(', ') : '')
            + (filters.TailBeats !== undefined ? "\n          TailBeats: "+ filters.TailBeats.join(', ') : '')
            + (filters.TailXs !== undefined ? "\n          TailXs: "+ filters.TailXs.join(', ') : '')
            + (filters.TailYs !== undefined ? "\n          TailYs: "+ filters.TailYs.join(', ') : '')
            + (filters.MinSliceCount !== undefined ? "\n          MinSliceCount: "+ filters.MinSliceCount : '')
            + (filters.MaxSliceCount !== undefined ? "\n          MaxSliceCount: "+ filters.MaxSliceCount : '')
            + (filters.MinSquish !== undefined ? "\n          MinSquish: "+ filters.MinSquish : '')
            + (filters.MaxSquish !== undefined ? "\n          MaxSquish: "+ filters.MaxSquish : '');
    }
    /**
     * ## Select
     * 
     * Selects burst sliders based on the filters provided and returns them as a new array.
     * 
     * @param filters All potential filters to select the burst sliders by.
     * @returns Filtered array of burst sliders.
     * @example
     * sliders.select({
     *     StartBeat: 6.9,
     *     EndBeat: 69
     * }).forEach(n => {
     *     n.CustomData.Track = "TestTrack";
     * });
     */
    public select(filters: Partial<BurstSliderFilters>): BurstSlider[] {
        try {
            log.info(`Selecting ${this.determineName()} with filters: ${this.filtersToString(filters)}`);
            const filtered = this.filter(burstSlider => {
                if (filters.StartBeat !== undefined && burstSlider.Beat < filters.StartBeat) return false;
                if (filters.EndBeat !== undefined && burstSlider.Beat > filters.EndBeat) return false;
                if (filters.Xs !== undefined && !filters.Xs.includes(burstSlider.X)) return false;
                if (filters.Ys !== undefined && !filters.Ys.includes(burstSlider.Y)) return false;
                if (filters.Colors !== undefined && !filters.Colors.includes(burstSlider.Color)) return false;
                if (filters.CutDirections !== undefined && !filters.CutDirections.includes(burstSlider.CutDirection)) return false;
                if (filters.TailBeats !== undefined && !filters.TailBeats.includes(burstSlider.TailBeat)) return false;
                if (filters.TailXs !== undefined && !filters.TailXs.includes(burstSlider.TailX)) return false;
                if (filters.TailYs !== undefined && !filters.TailYs.includes(burstSlider.TailY)) return false;
                if (filters.MinSliceCount !== undefined && burstSlider.SliceCount < filters.MinSliceCount) return false;
                if (filters.MaxSliceCount !== undefined && burstSlider.SliceCount > filters.MaxSliceCount) return false;
                if (filters.MinSquish !== undefined && burstSlider.Squish < filters.MinSquish) return false;
                if (filters.MaxSquish !== undefined && burstSlider.Squish > filters.MaxSquish) return false;
                return true;
            });
            log.success(`Selected ${filtered.length} ${this.determineName()}.`);
            return filtered;
        } catch (e) {
            log.error(`Error selecting ${this.determineName()}s: ${e}`);
            return [];
        }
    }

    /**
     * ## Push
     * 
     * Pushes burst slider(s) to the array. This method is significantly slower than `fastPush` with the advantage of keeping the functions and methods of the object.
     * 
     * @param items Burst slider(s) to push to the map. 
     * @returns Length of the array (How many burst sliders are in the map).
     * @example
     * sliders.push(new BurstSlider());
     * 
     * sliders[0].CustomData // Returns the CustomData of the burst slider.
     */
    push(...items: BurstSlider[]): number {
        items.forEach(n => super.push(n.Duplicate()));
        log.debug(`Pushed ${log.console.NUM_MSG(items.length)} burst sliders to ${this.determineName()}`);
        return this.length;
    }

    toJSON() {
        return this.map(b => b.toJSON());
    }

    constructor(fake: boolean = false, ...items: BurstSlider[]) {
        super(...items);
        this.fake = fake;
    }
}

export class BurstSlider extends BaseObject implements IBurstSliderData {
    public static readonly LINEINDEX = LineIndex;
    public static readonly LINELAYER = LineLayer;
    public static readonly COLOR = NoteColor;
    public static readonly DIRECTION = CutDirection;

    private c: NoteColor = BurstSlider.COLOR.Red;
    private d: CutDirection = BurstSlider.DIRECTION.Up;
    private tb: number = 0;
    private tx: LineIndex = BurstSlider.LINEINDEX.Left;
    private ty: LineLayer = BurstSlider.LINELAYER.Bottom;
    private sc: number = 2;
    private s: number = .5;
    protected declare customData?: NoteCustomData;

    set Color(c: NoteColor) { this.c = c; }
    set CutDirection(d: CutDirection) { this.d = d; }
    set TailBeat(tb: number) { this.tb = tb; }
    set TailX(tx: LineIndex) { this.tx = tx; }
    set TailY(ty: LineLayer) { this.ty = ty; }
    set SliceCount(sc: number) { this.sc = sc; }
    set Squish(s: number) { this.s = s; }
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
    get TailBeat(): number { return this.tb; }
    get TailX(): LineIndex { return this.tx; }
    get TailY(): LineLayer { return this.ty; }
    get SliceCount(): number { return this.sc; }
    get Squish(): number { return this.s; }
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

    constructor(vanillaData: IBurstSliderData = {} as IBurstSliderData, customData?: INoteCustomData) {
        super(vanillaData.Beat, vanillaData.X, vanillaData.Y);

        this.c = vanillaData.Color ?? 0;
        this.d = vanillaData.CutDirection ?? 0;
        this.tb = vanillaData.TailBeat ?? 0;
        this.tx = vanillaData.TailX ?? 0;
        this.ty = vanillaData.TailY ?? 0;
        this.sc = vanillaData.SliceCount ?? 2;
        this.s = vanillaData.Squish ?? .5;

        customData && (this.customData = new NoteCustomData(customData));
    }

    public toJSON() {
        const json: Record<string, any> = {};

        json.b = this.b;
        json.x = this.x;
        json.y = this.y;
        json.c = this.c;
        json.d = this.d;
        json.tb = this.tb;
        json.tx = this.tx;
        json.ty = this.ty;
        json.sc = this.sc;
        json.s = this.s;

        if (this.customData) json.customData = this.customData.toJSON();

        return json;
    }

    public static fromJSON(...json: Record<string, any>[]): BurstSlider[] {
        const burstSliders: BurstSlider[] = [];

        json.forEach(b => {
            const burstSlider = new BurstSlider()

            burstSlider.Beat = b.b;
            burstSlider.X = b.x;
            burstSlider.Y = b.y;
            burstSlider.Color = b.c;
            burstSlider.CutDirection = b.d;
            burstSlider.TailBeat = b.tb;
            burstSlider.TailX = b.tx;
            burstSlider.TailY = b.ty;
            burstSlider.SliceCount = b.sc;
            burstSlider.Squish = b.s;

            if (b.customData !== undefined) {
                if (burstSlider.customData === undefined) burstSlider.customData = new NoteCustomData();
                burstSlider.customData = NoteCustomData.fromJSON(b.customData);
            }

            burstSliders.push(burstSlider);
        });

        return burstSliders;
    }

    public SetCustomData(customData?: INoteCustomData): void {
        this.customData = new NoteCustomData(customData);
    }

    public ClearAllEmptyData() : void {
        if (this.customData?.Animation) this.customData.deleteAnimation();
        this.customData?.isEmpty() && (this.customData = undefined);
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

    public Duplicate() : BurstSlider {
        const chain = new BurstSlider()
        
        chain.Beat = this.Beat;
        chain.X = this.X;
        chain.Y = this.Y;
        chain.Color = this.Color;
        chain.CutDirection = this.CutDirection;
        chain.TailBeat = this.TailBeat;
        chain.TailX = this.TailX;
        chain.TailY = this.TailY;
        chain.SliceCount = this.SliceCount;
        chain.Squish = this.Squish;

        chain.SetCustomData(this.customData);

        return chain;
    }
}