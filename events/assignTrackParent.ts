import { parentTrackType } from "../consts/types/animation";
import BaseEvent from "./baseEvent";

export default class AssignTrackParent extends BaseEvent{
    declare json: {
        time: number
        type: "AssignTrackParent"
        data: parentTrackType
    }
    
    constructor(time: number, eventData: parentTrackType) {
        super()
        this.json = {
            time: time,
            type: "AssignTrackParent",
            data: eventData
        }
    }
}