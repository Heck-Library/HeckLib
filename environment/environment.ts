import IComponents from "../interfaces/components/components";
import IEnvironment from "../interfaces/environment/environment";
import { environment } from "../map/initialize";
import lookupMethod from "../types/lookupMethod";
import { vec3 } from "../types/vectors";

enum LOOKUP {
    REGEX = "Regex",
    CONTAINS = "Contains",
    EXACT = "Exact",
    STARTS_WITH = "Startswith",
    ENDS_WITH = "Endswith"
}

export default class Environment implements IEnvironment {

    /**
     * The enumerator for the lookup methods.
     */
    public static readonly LOOKUP = LOOKUP;

    /**
     * The lookup ID to match the environment object to.
     */
    public id: string | RegExp;
    /**
     * The lookup method to use when matching the environment object.
     */
    public lookupMethod?: lookupMethod;
    /**
     * The components to modify the environment object with.
     */
    public components?: IComponents;
    /**
     * The number of times to duplicate the environment object.
     * If you are going to duplicate the environment object, you should set this to 1.
     */
    public duplicate?: number;
    /**
     * Whether or not the environment object should be active.
     */
    public active?: boolean;
    /**
     * The scale of the environment object.
     */
    public scale?: vec3;
    /**
     * The position of the environment object.
     */
    public position?: vec3;
    /**
     * The local position of the environment object.
     */
    public localPosition?: vec3;
    /**
     * The rotation of the environment object.
     */
    public rotation?: vec3;
    /**
     * The local rotation of the environment object.
     */
    public localRotation?: vec3;
    /**
     * The light ID to assign to the environment object.
     */
    public lightID?: number;
    /**
     * The track(s) to assign to the environment object.
     */
    public track?: string | string[];

    /**
     * Creates a new environment object.
     */
    constructor();
    /**
     * Creates a new environment object using the provided parameters.
     * ```ts
     * new Environment({
     *     id: /HUD/,
     *     lookupMethod: "Regex",
     *     active: false
     * }).push();
     * ```
     */
    constructor(environment: IEnvironment);
    constructor(environment?: IEnvironment) {
        const { id, lookupMethod, components, duplicate, active, scale, position, localPosition, rotation, localRotation, lightID, track } = environment || {};

        this.id = '';
        this.lookupMethod = Environment.LOOKUP.EXACT;

        if (typeof environment !== 'undefined') {
            if (id) this.id = id;
            if (lookupMethod) this.lookupMethod = lookupMethod;
            if (components) this.components = components;
            if (duplicate) this.duplicate = duplicate;
            if (active) this.active = active;
            if (scale) this.scale = scale;
            if (position) this.position = position;
            if (localPosition) this.localPosition = localPosition;
            if (rotation) this.rotation = rotation;
            if (localRotation) this.localRotation = localRotation;
            if (lightID) this.lightID = lightID;
            if (track) this.track = track;
        }
    }

    /**
     * Pushes the environment object to the environment map.
     */
    push() : void {
        environment.push(this);
    }
}