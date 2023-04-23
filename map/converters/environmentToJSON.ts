import IEnvironment from "../../interfaces/environment/environment";
import IGeometryEnvironment from "../../interfaces/environment/geometry";
import { V3 } from "../initialize";
import { environment, geometry } from "../variables";

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
        geometry.forEach((e: IGeometryEnvironment) => {
            const envJSON: Record<string, any> = {
                components: e.components,
                active: e.active,
                scale: e.scale,
                position: e.position,
                localPosition: e.localPosition,
                rotation: e.rotation,
                localRotation: e.localRotation,
                lightID: e.lightID,
                track: e.track,
                geometry: e.geometry
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