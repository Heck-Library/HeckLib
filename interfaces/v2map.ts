export default interface IMapV2 {
    _version: "2.2.0";
    _notes: Record<string,any>[];
    _obstacles: Record<string, unknown>[];
    _events: Record<string, unknown>[];
    _waypoints: Record<string, unknown>[];
    _customData: {
        _time?: number;
        _environment: Record<string, any>[];
        _customEvents: Record<string, unknown>[];
        _bookmarks: Record<string, unknown>[];
        _pointDefinitions: Record<string, unknown>[];
        _materials: Record<string, any>;
    };
};