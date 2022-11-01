
import { definitions, pointDefinitions } from "./mapHandler.ts";
import { vec1anim, vec3anim, vec4anim } from "./types.ts";

export class PointDefinition {
    _name?: string;
    _points: vec1anim|vec3anim|vec4anim;

    constructor() {
        this._name = undefined;
        this._points = [];
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

    points (animation: vec1anim|vec3anim|vec4anim) {
            this._points = animation;
            return this;
    }

    /**
     * Pushes the point definition to the map data.
     */

    end () {
        if (typeof this._name !== 'undefined' && this._points.length > 0) {
            pointDefinitions.push(this._name);
            definitions.push(this);
            return this._name;
        }
    }
}