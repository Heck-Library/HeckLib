import { isArr, toLinear, vecLengthMatch } from "./general.js";


export function isValid (x, y) {
    let keyframeCount = x.length;
    let linear = false;
    if (isArr(x)) {
        if (isArr(x[0])) {
            for (let j = 0; j < keyframeCount; j++) {
                let keyframe = [...x[j]];
                let linearKeyframe = toLinear(x[j]);

                if (linearKeyframe.length == keyframe.length) {
                    linear = true;
                }

                if (!linear) {
                    let stringAmount = 0;

                    for (let i = 0; i < keyframe.length; i++) {
                        if (typeof keyframe[i] === 'string') stringAmount++;
                    }

                    if (stringAmount > 2) {
                        throw new Error('Too many strings on keyframe number ' + (j + 1))
                    }
                }

                if (linearKeyframe.length == y + 1) {
                    return true;
                } else {
                    throw new Error('Incorrect amount of points given.')
                }
            }
        } else if (x.length == y) {
            return true;
        } else {
            throw new Error('Incorrect amount of points given.')
        }
    }
    return false
}