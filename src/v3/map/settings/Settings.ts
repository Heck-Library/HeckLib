import { ISettings } from "../../../info/IInfo";
import { BaseSettings } from "./BaseSettings";
import { ChromaSettings } from "./Chroma";
import { GraphicsSettings } from "./Graphics";
import { IChromaSettings } from "./interfaces/IChroma";
import { IGraphicsSettings } from "./interfaces/IGraphicsSettings";
import { IModifierSettings, ModifiersSettings } from "./Modifiers";
import { NoteTweaksSettings, INoteTweaks } from "./mods/NoteTweaks";
import { UITweaksSettings, IUITweaksSettings } from "./mods/UITweaks";
import { PlayerOptionsSettings, IPlayerOptions } from "./PlayerOptions";
import { log } from "../../../util/logs";

class Environments extends BaseSettings {
    private _overrideEnvironments?: boolean;

    set OverrideEnvironments(overrideEnvironments: undefined | boolean) { this._overrideEnvironments = overrideEnvironments; }
    get OverrideEnvironments(): undefined | boolean { return this._overrideEnvironments; }

    constructor(data?: {OverrideEnvironments?: boolean}) {
        super();
        if (!data) return;
        this._overrideEnvironments = data.OverrideEnvironments;
    }
}

class Colors extends BaseSettings {
    private _overrideDefaultColors?: boolean;

    set OverrideDefaultColors(overrideColors: undefined | boolean) { this._overrideDefaultColors = overrideColors; }
    get OverrideDefaultColors(): undefined | boolean { return this._overrideDefaultColors; }

    constructor(data?: {OverrideDefaultColors?: boolean}) {
        super();
        if (!data) return;
        this._overrideDefaultColors = data.OverrideDefaultColors;
    }
}

export class Settings implements ISettings {
    private _playerOptions?: PlayerOptionsSettings;
    private _modifiers?: ModifiersSettings;
    private _environments?: Environments;
    private _colors?: Colors;
    private _graphics?: GraphicsSettings;
    private _chroma?: ChromaSettings;
    private _countersPlus?: Record<string, any>;
    private _uiTweaks?: UITweaksSettings;
    private _noteTweaks?: NoteTweaksSettings;

    set PlayerOptions(playerOptions: IPlayerOptions) {
        this._playerOptions = new PlayerOptionsSettings(playerOptions);
        log.change("Difficulty.Settings", "PlayerOptions", playerOptions, "custom");
    }
    set Modifiers(modifiers: IModifierSettings) {
        this._modifiers = new ModifiersSettings(modifiers);
        log.change("Difficulty.Settings", "Modifiers", modifiers, "custom");
    }
    set Environments(environments: {OverrideEnvironments?: boolean}) {
        this._environments = new Environments(environments);
        log.change("Difficulty.Settings", "Environments", environments, "custom");
    }
    set Colors(colors: {OverrideDefaultColors?: boolean}) {
        this._colors = new Colors(colors);
        log.change("Difficulty.Settings", "Colors", colors, "custom");
    }
    set Graphics(graphics: IGraphicsSettings) {
        this._graphics = new GraphicsSettings(graphics);
        log.change("Difficulty.Settings", "Graphics", graphics, "object");
    }
    set Chroma(chroma: IChromaSettings) {
        this._chroma = new ChromaSettings(chroma);
        log.change("Difficulty.Settings", "Chroma", chroma, "custom");
    }
    set CountersPlus(countersPlus: Record<string, any>) {
        this._countersPlus = countersPlus;
        log.change("Difficulty.Settings", "CountersPlus", countersPlus, "object");
    }
    set UITweaks(uiTweaks: IUITweaksSettings) {
        this._uiTweaks = new UITweaksSettings(uiTweaks);
        log.change("Difficulty.Settings", "UITweaks", uiTweaks, "custom");
    }
    set NoteTweaks(noteTweaks: INoteTweaks) {
        this._noteTweaks = new NoteTweaksSettings(noteTweaks);
        log.change("Difficulty.Settings", "NoteTweaks", noteTweaks, "custom");
    }

    get PlayerOptions(): undefined | PlayerOptionsSettings { return this._playerOptions; }
    get Modifiers(): undefined | ModifiersSettings { return this._modifiers; }
    get Environments(): undefined | Environments { return this._environments; }
    get Colors(): undefined | Colors { return this._colors; }
    get Graphics(): undefined | GraphicsSettings { return this._graphics; }
    get Chroma(): undefined | IChromaSettings { return this._chroma; }
    get CountersPlus(): undefined | Record<string, any> { return this._countersPlus; }
    get UITweaks(): undefined | IUITweaksSettings { return this._uiTweaks; }
    get NoteTweaks(): undefined | NoteTweaksSettings { return this._noteTweaks; }

    constructor(data?: ISettings) {
        if (!data) return;
        data.PlayerOptions !== undefined && (this.PlayerOptions = new PlayerOptionsSettings(data.PlayerOptions));
        data.Modifiers !== undefined && (this.Modifiers = new ModifiersSettings(data.Modifiers));
        data.Environments !== undefined && (this.Environments = new Environments(data.Environments));
        data.Colors !== undefined && (this.Colors = new Colors(data.Colors));
        data.Graphics !== undefined && (this.Graphics = new GraphicsSettings(data.Graphics));
        data.Chroma !== undefined && (this.Chroma = new ChromaSettings(data.Chroma));
        data.CountersPlus !== undefined && (this.CountersPlus = data.CountersPlus);
        data.UITweaks !== undefined && (this.UITweaks = new UITweaksSettings(data.UITweaks));
        data.NoteTweaks !== undefined && (this.NoteTweaks = new NoteTweaksSettings(data.NoteTweaks));
    }
}