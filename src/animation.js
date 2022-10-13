import { isArr, toLinear } from "./general.js";
import { definitions, pointDefinitions } from "./mapHandler.js";


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
    } else if (typeof x == 'string' && pointDefinitions.includes(x)) {
        return true;
    } else throw new Error('Point definition doesn\'t exist.')
    return false
}

export class PointDefinition {
    constructor() {
        this._name = "newPointDef";
        this._points = [];

        return this;
    }

    Name (x) {
        if (typeof x == 'string') {
            if (!pointDefinitions.includes(x)) {
                this._name = x;
                return this;
            } else throw new Error('Point definition already exists.')
        } else throw new Error('Point definition name should be a string.');
    }

    Points (x) {
        if (isArr(x)) {
            this._points = x;
            return this;
        } else throw new Error('Point definition animation should be an array.');
    }

    End () {
        if (this._name !== "newPointDef" && this._points.length > 0) {
            pointDefinitions.push(this._name);
            definitions.push(this);
            return this._name;
        }
    }
}