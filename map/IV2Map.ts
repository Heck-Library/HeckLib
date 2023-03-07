import { CUSTOMEVENT, NOTE, POINTDEFINITION, WALL } from "../consts/mod"
import { LIGHT } from "../consts/types/lights/light"

export interface IV2Map {
    _version: "2.2.0";
    _notes: Record<string, any>[];
    _obstacles: Record<string, any>[];
    _events: Record<string, any>[];
    _waypoints: Record<string, any>[];
    _customData?: Record<string, any>;
}