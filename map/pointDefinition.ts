import { POINTDEFINITION } from "../consts/types/animation";
import { unknownAnimation } from "../consts/types/vec";
import { definitions,pointDefinitions } from "./initialize";

export default class PointDefinition {
    private json: POINTDEFINITION;
    constructor(name: string, points: unknownAnimation) {
        this.json = {
            name: name,
            points: points, };
        return this;
    }

    set name(name: string) {
        this.json.name = name;
    }
    get name():string {
        return this.json.name;
    }

    set points(animation: unknownAnimation) {
        this.json.points = animation;
    }
    get points():unknownAnimation {
        return this.json.points;
    }

    push() {
        definitions.push(this);
        pointDefinitions.push(this.json.name);
    }
}
