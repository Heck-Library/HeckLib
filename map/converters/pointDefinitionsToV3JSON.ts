import { POINTDEFINITION, unknownAnimation } from "../../consts/mod";
import { definitions } from "../initialize";
type JSONDefV3 = Record<string, unknownAnimation>;
export function pointDefinitionsToV3JSON(): Record<string, JSONDefV3> {
    const defCollection: Record<string, JSONDefV3> = {};
    definitions.forEach((d: POINTDEFINITION) => {
        const definition = { [d.name]: d.points };
        Object.assign(defCollection, definition);
    });
    return defCollection;
}
