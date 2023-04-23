import { unknownAnim } from "../../types/vectors";
import { pointDefinitions } from "../variables";

type JSONDefV2 = { _name: string, _points: unknownAnim };
export function pointDefinitionsToV2JSON(): JSONDefV2[] {
    const defArr: JSONDefV2[] = [];
    Object.keys(pointDefinitions).forEach(key => {
        defArr.push({
            _name: key,
            _points: pointDefinitions[key]
        });
    })
    return defArr;
}
