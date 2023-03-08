import { animComponentData } from "../consts/types/animation";
import { V3 } from "../map/initialize";
import BaseEvent from "./baseEvent";

export default class AnimateComponent extends BaseEvent {
    declare json: {
        time: number,
        type: "AnimateComponent",
        data: animComponentData
    }
    constructor(time: number, eventData: animComponentData) {
        super();
        if (!V3) throw new Error('AnimateComponent is a V3 feature');
        this.json = {
            time: time,
            type: "AnimateComponent",
            data: eventData
        }
    }
}