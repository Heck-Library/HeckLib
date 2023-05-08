import ISettings from "./settings";

interface IRGB {
    r: number;
    g: number;
    b: number;
}

export default interface IDifficultyCustomData {
    settings?: ISettings;
    suggestions?: string[];
    requirements?: string[];
    warnings?: string[];
    information?: string[];
    difficultyLabel?: string;
    editorOffset?: number;
    editorOldOffset?: number;
    colorLeft?: IRGB;
    colorRight?: IRGB;
    envColorLeft?: IRGB;
    envColorRight?: IRGB;
    envColorLeftBoost?: IRGB;
    envColorRightBoost?: IRGB;
    obstaclesColor?: IRGB;
}