import { BOMB, NOTE, WALL } from "../consts/mod";
import { LIGHT } from "../consts/types/lights/light";

type BPMEVENT = {
    b: number,
    m: number
}
type ROTATIONEVENT = {
    b: number,
    e: 0 | 1;
    r: number
}

export interface IV3Map {
    version: "3.2.0";
    bpmEvents: Record<string, any>[];
    rotationEvents: Record<string, any>[];
    colorNotes: Record<string, any>[];
    bombNotes: Record<string, any>[];
    obstacles: Record<string, any>[];
    sliders: Record<string, any>[];
    burstSliders: Record<string, any>[];
    waypoints: Record<string, any>[];
    basicBeatmapEvents: Record<string, any>[];
    colorBoostBeatmapEvents: Record<string, any>[];
    lightColorEventBoxGroups: Record<string, any>[],
    lightRotationEventBoxGroups: Record<string, any>[],
    lightTranslationEventBoxGroups: Record<string, any>[], // Introduced in version 3.2.0
    basicEventTypesWithKeywords: {},
    useNormalEventsAsCompatibleEvents: false,
}