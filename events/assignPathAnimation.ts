import { pathAnimData } from "../consts/types/animation";
import BaseEvent from "./baseEvent";

export default class AssignPathAnimation extends BaseEvent {
    declare json: {
        time: number
        type: "AssignPathAnimation"
        data: pathAnimData
    };
    constructor(time: number, eventData: pathAnimData) {
        super();
        this.json = {
            time: time,
            type: "AssignPathAnimation",
            data: eventData
        }
    }
}