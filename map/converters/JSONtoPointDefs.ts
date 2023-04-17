
import { unknownAnim } from "../../types/vectors";
import PointDefinition from "../pointDefinition";

export function JSONtoPointDefs(pointDefInput: { _name: string; _points: unknownAnim; }[]) {
    pointDefInput.forEach(p => {
        new PointDefinition(p._name, p._points).push();
    });
}
