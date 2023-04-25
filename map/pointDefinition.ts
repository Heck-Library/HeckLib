import { unknownAnim } from "../types/vectors";
import { pointDefinitions } from "./variables";

export default class PointDefinition {

    private pointDefinition: Record<string, unknownAnim> = {};

    constructor(name: string, points: unknownAnim) {
        this.pointDefinition = {
            [name]: points
        }
    }

    push() {
        Object.assign(pointDefinitions, this.pointDefinition);
    }
} 