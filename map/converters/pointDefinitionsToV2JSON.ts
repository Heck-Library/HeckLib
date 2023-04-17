import { unknownAnim } from "../../types/vectors";
import { pointDefinitions } from "../initialize";

type JSONDefV2 = { _name: string, _points: unknownAnim };
export function pointDefinitionsToV2JSON(): JSONDefV2[] {
    const defArr: JSONDefV2[] = [];
    for (const def in Object.keys(pointDefinitions)) {
        defArr.push( { _name: def, _points: pointDefinitions[def] });
    }
    return defArr;
}
