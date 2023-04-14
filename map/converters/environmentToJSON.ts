import { IEnvironment } from "../../environment/environment";
import { V3, environment } from "../initialize";

export default function environmentToJSON() {
    const envArr: any[] = [];
    if (environment) {
        environment.forEach((e: IEnvironment) => {
            const envJSON: Record<string, any> = {
                id: e.id,
                lookupMethod: e.lookupMethod,
                components: e.components,
                duplicate: e.duplicate,
                active: e.active,
                scale: e.scale,
                position: e.position,
                localPosition: e.localPosition,
                rotation: e.rotation,
                localRotation: e.localRotation,
                lightID: e.lightID,
                track: e.track
            }
            let stringified = JSON.stringify(envJSON);
            if (!V3) {
                stringified = stringified.replace(/"([^_][\w\d]+)":/g, '"_$1":');
            }
            envArr.push(JSON.parse(stringified));
        });
    }
    return envArr;
}