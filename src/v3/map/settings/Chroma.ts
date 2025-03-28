import { BaseSettings } from "./BaseSettings";
import { IChromaSettings } from "./interfaces/IChroma";

export class ChromaSettings extends BaseSettings implements IChromaSettings {
    private _disableChromaEvents?: boolean;
    private _disableEnvironmentEnhancements?: boolean;
    private _disableNoteColoring?: boolean;
    private _forceZenModeWalls?: boolean;

    set DisableChromaEvents(disableChromaEvents: undefined | boolean) { this._disableChromaEvents = disableChromaEvents; }
    set DisableEnvironmentEnhancements(disableEnvironmentEnhancements: undefined | boolean) { this._disableEnvironmentEnhancements = disableEnvironmentEnhancements; }
    set DisableNoteColoring(disableNoteColoring: undefined | boolean) { this._disableNoteColoring = disableNoteColoring; }
    set ForceZenModeWalls(forceZenModeWalls: undefined | boolean) { this._forceZenModeWalls = forceZenModeWalls; }

    get DisableChromaEvents(): undefined | boolean { return this._disableChromaEvents; }
    get DisableEnvironmentEnhancements(): undefined | boolean { return this._disableEnvironmentEnhancements; }
    get DisableNoteColoring(): undefined | boolean { return this._disableNoteColoring; }
    get ForceZenModeWalls(): undefined | boolean { return this._forceZenModeWalls; }

    constructor(data?: IChromaSettings) {
        super();
        if (!data) return;
        data.DisableChromaEvents !== undefined && (this._disableChromaEvents = data.DisableChromaEvents);
        data.DisableEnvironmentEnhancements !== undefined && (this._disableEnvironmentEnhancements = data.DisableEnvironmentEnhancements);
        data.DisableNoteColoring !== undefined && (this._disableNoteColoring = data.DisableNoteColoring);
        data.ForceZenModeWalls !== undefined && (this._forceZenModeWalls = data.ForceZenModeWalls);
    }
}
