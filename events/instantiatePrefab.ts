import { MyBaseEvent } from "../events/baseEvent";
import IInstPrefabData from "../interfaces/events/eventData/IInstPrefabData";

export default class InstantiatePrefab extends MyBaseEvent {
    public readonly type: string = "InstantiatePrefab";
    declare data: IInstPrefabData;

    constructor(time: number)
    constructor(time: number, data: IInstPrefabData);
    constructor(time: number, data?: IInstPrefabData) {
        if (typeof data === 'undefined') data = {
            asset: ""
        };

        super(time, data);
        this.type = "InstantiatePrefab";
    }
}