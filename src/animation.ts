
import { definitions, pointDefinitions, V3 } from "./mapHandler.ts";
import { vec1, vec1frame, vec3, vec3frame, vec4, vec4frame } from "./types.ts";

export class PointDefinition {
    stuff?: {
        points: vec1frame[]|vec3frame[]|vec4frame[]|vec1|vec3|vec4
    };
    _name?: string;
    _points: vec1frame[]|vec3frame[]|vec4frame[]|vec1|vec3|vec4;

    constructor() {
        this._name = undefined;
        this._points = [1, 1, 1];
        return this;
    }

    /**
     * The name of a point definition
     */

    name (name: string) {
            if (!pointDefinitions.includes(name)) {
                this._name = name;
                return this;
            } else throw new Error('Point definition already exists.')
    }

    /**
     * An animation to add to the point definition
     */

    points (animation: vec1frame[]|vec3frame[]|vec4frame[]|vec1|vec3|vec4) {
            this._points = animation;
            return this;
    }

    /**
     * Pushes the point definition to the map data.
     */

    push () {
        if (typeof this._name !== 'undefined' && this._points.length > 0) {
            if (!V3) {
                definitions.push(this);
            }
            if (V3) {
                this.stuff = JSON.parse(`{"${this._name}":[${this._points}]}`)
                Object.assign(definitions, this.stuff)
            }
            pointDefinitions.push(this._name);
        }
    }
}