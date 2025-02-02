import IObjectPrefabData from "../interfaces/events/eventData/IObjectPrefabData";
import { MyBaseEvent } from "./baseEvent";

export default class AssignObjectPrefab extends MyBaseEvent {
    public readonly type: string = "AssignObjectPrefab";
    declare data: IObjectPrefabData;

    constructor(time: number);
    constructor(time: number, data: IObjectPrefabData);
    constructor(time: number, data?: IObjectPrefabData) {
        super(time, data);
        this.type = "AssignObjectPrefab";
    }
}