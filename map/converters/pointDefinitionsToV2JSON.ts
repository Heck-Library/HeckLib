import { POINTDEFINITION, unknownAnimation } from "../../consts/mod";
import { definitions } from "../initialize";
type JSONDefV2 = { _name: string, _points: unknownAnimation };
export function pointDefinitionsToV2JSON(): JSONDefV2[] {
    const defArr: JSONDefV2[] = [];
    definitions.forEach((d: POINTDEFINITION) => {
        defArr.push({ _name: d.name, _points: d.points });
    });
    return defArr;
}
