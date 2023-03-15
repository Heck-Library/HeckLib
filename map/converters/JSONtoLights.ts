import LightEvent from "../../objects/lights";
import { LIGHT } from "../../consts/types/lights/light";
import { V3 } from "../initialize";

export function JSONtoLights(lightInput: Record<string, any>[]): LIGHT[] {
    const lightArr: LIGHT[] = [];
    if (V3) {
        lightInput.forEach((l: Record<string, any>) => {
            l = JSON.parse(JSON.stringify(l).replace(/"_(\w+)":/g,'"$1":').replace(/"lockPosition":/g,'"lockRotation":'))
            if (!l.customData.lightGradient) {
                const light: LIGHT = new LightEvent({
                    time: l.b,
                    type: l.et,
                    value: l.i,
                    float: l.f
                }, l.customData);
                lightArr.push(light);
            }
        });
    } else {
        lightInput.forEach((l: Record<string, any>) => {
            const light: LIGHT = new LightEvent({
                time: l._time,
                type: l._type,
                value: l._value,
                float: l._floatValue
            });
            if (l._customData) {
                light.data = {
                    color: l._customData._color,
                    lightID: l._customData._lightID,
                    easing: l._customData._easing,
                    lerpType: l._customData._lerpType,
                    lockPosition: l._customData._lockRotation,
                    speed: l._customData._speed,
                    direction: l._customData._direction,
                    nameFilter: l._customData._nameFilter,
                    rotation: l._customData._rotation,
                    step: l._customData._step,
                    prop: l._customData._prop
                };
            }
            lightArr.push(light);
        });
    }
    return lightArr;
}
