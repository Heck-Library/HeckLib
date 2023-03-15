import { vec1anim, vec3anim, vec4anim } from "../../consts/mod";
import PointDefinition from "../pointDefinition";
import { V3 } from "../initialize";

export function JSONtoPointDefs(pointDefInput: Record<string, vec1anim | vec3anim | vec4anim> | { _name: string; _points: vec1anim | vec3anim | vec4anim; }[]) {
    if (!V3 && Array.isArray(pointDefInput)) {
        pointDefInput.forEach(p => {
            new PointDefinition(p._name, p._points).push();
        });
    } else if (V3) {
        Object.keys(pointDefInput).forEach(p => {
            new PointDefinition(p, pointDefInput[p]).push();
        });
    }
}
