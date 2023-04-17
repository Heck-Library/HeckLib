export default interface IMapV2 {
    _version: "2.2.0";
    _notes: Record<string, any>[];
    _obstacles: Record<string, any>[];
    _events: Record<string, any>[];
    _waypoints: Record<string, any>[];
    _customData?: Record<string, any>;
}