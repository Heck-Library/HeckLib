import { CutDirection, LineIndex, LineLayer, MidAnchorMode, NoteColor } from "../../util/enums";
import { INoteCustomData } from "./customData/interfaces/INoteCustomData";
import { SliderCustomData } from "./customData/SliderCustomData";
import { ISliderCustomData } from "./customData/interfaces/ISliderCustomData";
import { ISliderData } from "./interfaces/ISliderData";
import { IPathAnimationData } from "../events/customEvents/interfaces/IPathAnimationData";
import { log } from "../../util/logs";
import { BaseObject } from "./BaseObject";
type SliderFilters = {
    StartBeat: number,
    EndBeat: number,
    Xs: LineIndex[];
    Ys: LineLayer[];
    Color: NoteColor;
    CutDirections: CutDirection[];
    Multiplier: number;
    TailBeats: number[];
    TailXs: LineIndex[];
    TailYs: LineLayer[];
    TailDirections: CutDirection[];
    TailMultiplier: number;
    MidAnchorMode: MidAnchorMode;
}

export class SliderArray extends Array<Slider> {
    private fake: boolean = false;

    private determineName(): string { return this.fake ? "FakeArcs" : "Arcs"; }

    private filtersToString(filters: Partial<SliderFilters>): string {
        return (filters.StartBeat !== undefined ? "\n          "+log.console.FIELD_MSG("StartBeat") +": "+ log.console.NUM_MSG(filters.StartBeat) : '')
            + (filters.Xs !== undefined ? "\n          "+log.console.FIELD_MSG("Xs") +": "+ log.console.NUM_MSG(filters.Xs.join(', ')) : '')
            + (filters.Ys !== undefined ? "\n          "+log.console.FIELD_MSG("Ys") +": "+ log.console.NUM_MSG(filters.Ys.join(', ')) : '')
            + (filters.Color !== undefined ? "\n          "+log.console.FIELD_MSG("Color") +": "+ log.console.NUM_MSG(filters.Color) : '')
            + (filters.CutDirections !== undefined ? "\n          "+log.console.FIELD_MSG("CutDirections") +": "+ log.console.NUM_MSG(filters.CutDirections.join(', ')) : '')
            + (filters.Multiplier !== undefined ? "\n          "+log.console.FIELD_MSG("Multiplier") +": "+ log.console.NUM_MSG(filters.Multiplier) : '')
            + (filters.TailBeats !== undefined ? "\n          "+log.console.FIELD_MSG("TailBeats") +": "+ log.console.NUM_MSG(filters.TailBeats.join(', ')) : '')
            + (filters.TailXs !== undefined ? "\n          "+log.console.FIELD_MSG("TailXs") +": "+ log.console.NUM_MSG(filters.TailXs.join(', ')) : '')
            + (filters.TailYs !== undefined ? "\n          "+log.console.FIELD_MSG("TailYs") +": "+ log.console.NUM_MSG(filters.TailYs.join(', ')) : '')
            + (filters.TailDirections !== undefined ? "\n          "+log.console.FIELD_MSG("TailDirections") +": "+ log.console.NUM_MSG(filters.TailDirections.join(', ')) : '')
            + (filters.TailMultiplier !== undefined ? "\n          "+log.console.FIELD_MSG("TailMultiplier") +": "+ log.console.NUM_MSG(filters.TailMultiplier) : '')
            + (filters.MidAnchorMode !== undefined ? "\n          "+log.console.FIELD_MSG("MidAnchorMode") +": "+ log.console.NUM_MSG(filters.MidAnchorMode) : '');
    }

    /**
     * ## Select
     * 
     * Selects sliders based on the filters provided and returns them as a new array.
     * 
     * @param filters All potential filters to select the sliders by.
     * @returns Filtered array of sliders.
     * @example
     * arcs.select({
     *     StartBeat: 6.9,
     *     EndBeat: 69
     * }).forEach(n => {
     *     n.CustomData.Track = "TestTrack";
     * });
     */
    public select(filters: Partial<SliderFilters>): Slider[] {
        try {
            log.info(`Selecting ${this.determineName()} with filters: ${log.console.OBJ_MSG(this.filtersToString(filters))}`);
            const filtered = this.filter(slider => {
                if (filters.StartBeat !== undefined && slider.Beat < filters.StartBeat) return false;
                if (filters.EndBeat !== undefined && slider.Beat > filters.EndBeat) return false;
                if (filters.Xs !== undefined && !filters.Xs.includes(slider.X)) return false;
                if (filters.Ys !== undefined && !filters.Ys.includes(slider.Y)) return false;
                if (filters.Color !== undefined && slider.Color !== filters.Color) return false;
                if (filters.CutDirections !== undefined && !filters.CutDirections.includes(slider.CutDirection)) return false;
                if (filters.Multiplier !== undefined && slider.Multiplier !== filters.Multiplier) return false;
                if (filters.TailBeats !== undefined && !filters.TailBeats.includes(slider.TailBeat)) return false;
                if (filters.TailXs !== undefined && !filters.TailXs.includes(slider.TailX)) return false;
                if (filters.TailYs !== undefined && !filters.TailYs.includes(slider.TailY)) return false;
                if (filters.TailDirections !== undefined && !filters.TailDirections.includes(slider.TailDirection)) return false;
                if (filters.TailMultiplier !== undefined && slider.TailMultiplier !== filters.TailMultiplier) return false;
                if (filters.MidAnchorMode !== undefined && slider.MidAnchorMode !== filters.MidAnchorMode) return false;
                return true;
            });
            log.info(`Selected ${log.console.NUM_MSG(filtered.length)} ${this.determineName()}.`);
            return filtered;
        } catch(e) {
            if (e instanceof Error) {
                log.error(`Could not filter ${this.determineName()}: \x1b[31m${e.message}`);
            } else {
                log.error(`Could not filter ${this.determineName()}: \x1b[31mUnknown error`);
            }
            return [];
        }
    }

    /**
     * ## Push
     * 
     * Pushes slider(s) to the array. This method is significantly slower than `fastPush` with the advantage of keeping the functions and methods of the object.
     * 
     * @param items Slider(s) to push to the map. 
     * @returns Length of the array (How many sliders are in the map).
     */
    push(...items: Slider[]): number {
        items.forEach(n => super.push(n.Duplicate()));
        log.debug(`Pushed ${log.console.NUM_MSG(items.length) +' '+this.determineName()} to ${this.determineName()}.`);
        return this.length;
    }

    toJSON() {
        return this.map(s => s.toJSON());
    }

    constructor(fake: boolean = false, ...items: Slider[]) {
        super(...items);
        this.fake = fake;
    }
}

export class Slider extends BaseObject implements ISliderData {
    public static readonly LINEINDEX = LineIndex;
    public static readonly LINELAYER = LineLayer;
    public static readonly COLOR = NoteColor;
    public static readonly DIRECTION = CutDirection;
    public static readonly MIDANCHORMODE = MidAnchorMode;

    private c: NoteColor = Slider.COLOR.Red;
    private d: CutDirection = Slider.DIRECTION.Up;
    private mu: number = 1;
    private tb: number = 0;
    private tx: LineIndex = Slider.LINEINDEX.Left;
    private ty: LineLayer = Slider.LINELAYER.Bottom;
    private tc: CutDirection = Slider.DIRECTION.Up;
    private tmu: number = 1;
    private m: MidAnchorMode = MidAnchorMode.Straight;
    protected declare customData?: SliderCustomData;

    set Color(c: NoteColor) { this.c = c; }
    set CutDirection(d: CutDirection) { this.d = d; }
    set Multiplier(mu: number) { this.mu = mu; }
    set TailBeat(tb: number) { this.tb = tb; }
    set TailX(tx: LineIndex) { this.tx = tx; }
    set TailY(ty: LineLayer) { this.ty = ty; }
    set TailDirection(tc: CutDirection) { this.tc = tc; }
    set TailMultiplier(tmu: number) { this.tmu = tmu; }
    set MidAnchorMode(m: MidAnchorMode) { this.m = m; }
    set CustomData(customData: ISliderCustomData) {
        this.ifUndefinedNewCustomData();

        const cd = this.customData as SliderCustomData;

        this.Animation = customData.Animation;

        cd.Color = customData.Color;
        cd.Coordinates = customData.Coordinates;
        cd.DisableNoteGravity = customData.DisableNoteGravity;
        cd.WorldRotation = customData.WorldRotation;
        cd.LocalRotation = customData.LocalRotation;
        cd.Scale = customData.Scale;
    }
    set Animation(animation: undefined | Partial<IPathAnimationData>) {
        this.ifUndefinedNewCustomData();

        const anim = (this.customData as SliderCustomData).Animation;

        if (animation === undefined) {
            (this.customData as SliderCustomData).Animation = undefined;
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
    get Multiplier(): number { return this.mu; }
    get TailBeat(): number { return this.tb; }
    get TailX(): LineIndex { return this.tx; }
    get TailY(): LineLayer { return this.ty; }
    get TailDirection(): CutDirection { return this.tc; }
    get TailMultiplier(): number { return this.tmu; }
    get MidAnchorMode(): MidAnchorMode { return this.m; }
    get CustomData(): SliderCustomData {
        this.ifUndefinedNewCustomData();

        return this.customData as SliderCustomData;
    }
    get Animation(): Partial<IPathAnimationData> {
        this.ifUndefinedNewCustomData();

        return (this.customData as SliderCustomData).Animation;
    }

    private ifUndefinedNewCustomData(): void {
        if (this.customData === undefined) this.customData = new SliderCustomData();
    }

    constructor(vanillaData: ISliderData = {} as ISliderData, customData?: INoteCustomData) {
        super(vanillaData.Beat, vanillaData.X, vanillaData.Y);

        this.c = vanillaData.Color ?? 0;
        this.d = vanillaData.CutDirection ?? 0;
        this.mu = vanillaData.Multiplier ?? 1;
        this.tb = vanillaData.TailBeat ?? 1;
        this.tx = vanillaData.TailX ?? 0;
        this.ty = vanillaData.TailY ?? 0;
        this.tc = vanillaData.TailDirection ?? 0;
        this.tmu = vanillaData.TailMultiplier ?? 1;
        this.m = vanillaData.MidAnchorMode ?? 0;

        customData && (this.customData = new SliderCustomData(customData));
    }

    toJSON() {
        const json: Record<string, any> = {};
        json.b = this.b;
        json.x = this.x;
        json.y = this.y;
        json.c = this.c;
        json.d = this.d;
        json.mu = this.mu;
        json.tb = this.tb;
        json.tx = this.tx;
        json.ty = this.ty;
        json.tc = this.tc;
        json.tmu = this.tmu;
        json.m = this.m;
        if (this.customData !== undefined) json.customData = this.customData.toJSON();
        
        return json;
    }

    public static fromJSON(...json: Record<string, any>[]): Slider[] {
        const sliders: Slider[] = [];
        json.forEach(s => {
            const slider = new Slider();
            slider.Beat = s.b;
            slider.X = s.x;
            slider.Y = s.y;
            slider.Color = s.c;
            slider.CutDirection = s.d;
            slider.Multiplier = s.mu;
            slider.TailBeat = s.tb;
            slider.TailX = s.tx;
            slider.TailY = s.ty;
            slider.TailDirection = s.tc;
            slider.TailMultiplier = s.tmu;
            slider.MidAnchorMode = s.m;
            s.customData && (slider.CustomData = SliderCustomData.fromJSON(s.customData));
            sliders.push(slider);
        });
        return sliders;
    }
    
    public SetCustomData(customData?: INoteCustomData): void {
        this.customData = new SliderCustomData(customData);
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

    public Duplicate = () : Slider => {
        const slider = new Slider();

        slider.Beat = this.Beat;
        slider.X = this.X;
        slider.Y = this.Y;
        slider.Color = this.Color;
        slider.CutDirection = this.CutDirection;
        slider.Multiplier = this.Multiplier;
        slider.TailBeat = this.TailBeat;
        slider.TailX = this.TailX;
        slider.TailY = this.TailY;
        slider.TailDirection = this.TailDirection;
        slider.TailMultiplier = this.TailMultiplier;
        slider.MidAnchorMode = this.MidAnchorMode;

        slider.SetCustomData(this.customData);
        return slider;
    }
}