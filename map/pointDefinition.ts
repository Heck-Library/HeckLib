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

    push() : void {
        if (pointDefinitions.includes(this.json.name)) {
            console.warn("PointDefinition with name " + this.json.name + " already exists. Skipping push.");
            return;
        }
        definitions.push(this);
        pointDefinitions.push(this.json.name);
    }
}
