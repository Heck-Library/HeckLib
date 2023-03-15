import { LIGHT } from "../../consts/types/lights/light";
import { V3, lights } from "../initialize";

export function lightsToJSON(): Record<string, any>[] {
    const lightArr: any[] = [];
    lights.forEach((l: LIGHT) => {
        const lightJSON: Record<string, any> = {
            b: l.time,
            et: l.type,
            i: l.value,
        };
        if (l.float)
            lightJSON.f = l.float;
        if (l.data && Object.keys(l.data).length > 0)
            lightJSON.customData = l.data;
        let stringified = JSON.stringify(lightJSON);
        if (!V3) {
            stringified = stringified
                .replace('"b":', '"time":')
                .replace('"et":', '"type":')
                .replace('"i":', '"value":')
                .replace('"f":', '"floatValue":')
                .replace('"lockRotation":', '"lockPosition":')
                .replace(/"([^_][\w\d]+)":/g, '"_$1":');
        }
        lightArr.push(JSON.parse(stringified));
    });
    return lightArr;
}
