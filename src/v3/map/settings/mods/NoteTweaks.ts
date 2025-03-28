import { BaseSettings } from "../BaseSettings";

export interface INoteTweaks {
    Enabled?: boolean;
    EnableBombOutlines?: boolean;
    EnableNoteOutlines?: boolean;
    EnableAccDot?: boolean;
    EnableDots?: boolean;
    EnableChainDots?: boolean;
    FixDotsIfNoodle?: boolean;
    EnableFog?: boolean;
    EnableHeightFog?: boolean;
    NoteScaleX?: number;
    NoteScaleY?: number;
    NoteScaleZ?: number;
    ArrowScaleX?: number;
    ArrowScaleY?: number;
    DotScaleX?: number;
    DotScaleY?: number;
    LinkScale?: number;
    BombScale?: number;
}

export class NoteTweaksSettings extends BaseSettings implements INoteTweaks{
    private _enabled?: boolean;
    private _enableBombOutlines?: boolean;
    private _enableNoteOutlines?: boolean;
    private _enableAccDot?: boolean;
    private _enableDots?: boolean;
    private _enableChainDots?: boolean;
    private _fixDotsIfNoodle?: boolean;
    private _enableFog?: boolean;
    private _enableHeightFog?: boolean;
    private _noteScaleX?: number;
    private _noteScaleY?: number;
    private _noteScaleZ?: number;
    private _arrowScaleX?: number;
    private _arrowScaleY?: number;
    private _dotScaleX?: number;
    private _dotScaleY?: number;
    private _linkScale?: number;
    private _bombScale?: number;

    public get Enabled(): undefined | boolean { return this._enabled; }
    public get EnableBombOutlines(): undefined | boolean { return this._enableBombOutlines; }
    public get EnableNoteOutlines(): undefined | boolean { return this._enableNoteOutlines; }
    public get EnableAccDot(): undefined | boolean { return this._enableAccDot; }   
    public get EnableDots(): undefined | boolean { return this._enableDots; }
    public get EnableChainDots(): undefined | boolean { return this._enableChainDots; }
    public get FixDotsIfNoodle(): undefined | boolean { return this._fixDotsIfNoodle; }
    public get EnableFog(): undefined | boolean { return this._enableFog; }
    public get EnableHeightFog(): undefined | boolean { return this._enableHeightFog; }
    public get NoteScaleX(): undefined | number { return this._noteScaleX; }
    public get NoteScaleY(): undefined | number { return this._noteScaleY; }
    public get NoteScaleZ(): undefined | number { return this._noteScaleZ; }
    public get ArrowScaleX(): undefined | number { return this._arrowScaleX; }
    public get ArrowScaleY(): undefined | number { return this._arrowScaleY; }
    public get DotScaleX(): undefined | number { return this._dotScaleX; }
    public get DotScaleY(): undefined | number { return this._dotScaleY; }
    public get LinkScale(): undefined | number { return this._linkScale; }
    public get BombScale(): undefined | number { return this._bombScale; }

    public set Enabled(enabled: boolean) { this._enabled = enabled; }
    public set EnableBombOutlines(enableBombOutlines: boolean) { this._enableBombOutlines = enableBombOutlines; }
    public set EnableNoteOutlines(enableNoteOutlines: boolean) { this._enableNoteOutlines = enableNoteOutlines; }
    public set EnableAccDot(enableAccDot: boolean) { this._enableAccDot = enableAccDot; }
    public set EnableDots(enableDots: boolean) { this._enableDots = enableDots; }
    public set EnableChainDots(enableChainDots: boolean) { this._enableChainDots = enableChainDots; }
    public set FixDotsIfNoodle(fixDotsIfNoodle: boolean) { this._fixDotsIfNoodle = fixDotsIfNoodle; }
    public set EnableFog(enableFog: boolean) { this._enableFog = enableFog; }
    public set EnableHeightFog(enableHeightFog: boolean) { this._enableHeightFog = enableHeightFog; }
    public set NoteScaleX(noteScaleX: number) { this._noteScaleX = noteScaleX; }
    public set NoteScaleY(noteScaleY: number) { this._noteScaleY = noteScaleY; }
    public set NoteScaleZ(noteScaleZ: number) { this._noteScaleZ = noteScaleZ; }
    public set ArrowScaleX(arrowScaleX: number) { this._arrowScaleX = arrowScaleX; }
    public set ArrowScaleY(arrowScaleY: number) { this._arrowScaleY = arrowScaleY; }
    public set DotScaleX(dotScaleX: number) { this._dotScaleX = dotScaleX; }
    public set DotScaleY(dotScaleY: number) { this._dotScaleY = dotScaleY; }
    public set LinkScale(linkScale: number) { this._linkScale = linkScale; }
    public set BombScale(bombScale: number) { this._bombScale = bombScale; }
    
    constructor(settings?: INoteTweaks) {
        super();
        if (!settings) return this;
        settings.Enabled && (this._enabled = settings.Enabled);
        settings.EnableBombOutlines && (this._enableBombOutlines = settings.EnableBombOutlines);
        settings.EnableNoteOutlines && (this._enableNoteOutlines = settings.EnableNoteOutlines);
        settings.EnableAccDot && (this._enableAccDot = settings.EnableAccDot);
        settings.EnableDots && (this._enableDots = settings.EnableDots);
        settings.EnableChainDots && (this._enableChainDots = settings.EnableChainDots);
        settings.FixDotsIfNoodle && (this._fixDotsIfNoodle = settings.FixDotsIfNoodle);
        settings.EnableFog && (this._enableFog = settings.EnableFog);
        settings.EnableHeightFog && (this._enableHeightFog = settings.EnableHeightFog);
        settings.NoteScaleX && (this._noteScaleX = settings.NoteScaleX);
        settings.NoteScaleY && (this._noteScaleY = settings.NoteScaleY);
        settings.NoteScaleZ && (this._noteScaleZ = settings.NoteScaleZ);
        settings.ArrowScaleX && (this._arrowScaleX = settings.ArrowScaleX);
        settings.ArrowScaleY && (this._arrowScaleY = settings.ArrowScaleY);
        settings.DotScaleX && (this._dotScaleX = settings.DotScaleX);
        settings.DotScaleY && (this._dotScaleY = settings.DotScaleY);
        settings.LinkScale && (this._linkScale = settings.LinkScale);
        settings.BombScale && (this._bombScale = settings.BombScale);
    }
}