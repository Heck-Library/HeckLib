import ISettings from "./settings";

export default interface IDifficultyCustomData {
    _settings?: ISettings;
    _suggestions?: string[];
    _requirements?: string[];
    _warnings?: string[];
    _information?: string[];
}