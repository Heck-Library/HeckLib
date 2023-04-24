import ISettings from "./settings";

export default interface IDifficultyCustomData {
    settings?: ISettings;
    suggestions?: string[];
    requirements?: string[];
    warnings?: string[];
    information?: string[];
}