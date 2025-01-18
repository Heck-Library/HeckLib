import { MyBaseEvent } from "../events/baseEvent";
import IDestroyPrefabData from "../interfaces/events/eventData/IDestroyPrefabData";

export default class DestroyPrefab extends MyBaseEvent {
    public readonly type: string = "DestroyPrefab";
    declare data: IDestroyPrefabData;

    constructor(time: number);
    constructor(time: number, data: IDestroyPrefabData | string | string[]);
    constructor(time?: number, data?: IDestroyPrefabData | string | string[]) {
        if (typeof data === 'undefined') data = {
            id: ""
        }
        if (typeof data === 'string' || Array.isArray(data)) data = { id : data };
        super(time, data);
        this.type = "DestroyPrefab";
    }
}