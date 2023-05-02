import IComponents from "../interfaces/components/components";
import IEnvironment from "../interfaces/environment/environment";
import { environment } from "../map/variables";
import lookupMethod from "../types/lookupMethod";
import { vec3 } from "../types/vectors";

/**
 * ### Lookup
 * 
 * The lookup method to use when matching the environment object.
 */
enum LOOKUP {
    /**
     * ### Regex
     * 
     * The environment object ID must match the lookup ID with regular expression.
     */ 
    REGEX = "Regex",
    /**
     * ### Contains
     * 
     * The environment object ID must contain the lookup ID.
     */
    CONTAINS = "Contains",
    /**
     * ### Exact
     * 
     * The environment object ID must be exactly the same as the lookup ID.
     */
    EXACT = "Exact",
    /**
     * ### Starts With
     * 
     * The environment object ID must start with the lookup ID.
     */
    STARTS_WITH = "Startswith",
    /**
     * ### Ends With
     * 
     * The environment object ID must end with the lookup ID.
     */
    ENDS_WITH = "Endswith"
}

export default class Environment implements IEnvironment {

    /**
     * The enumerator for the lookup methods.
     */
    public static readonly LOOKUP = LOOKUP;

    /**
     * ### ID
     * 
     * The lookup ID to match the environment object to.
     */
    public id: string | RegExp;
    /**
     * ### Lookup Method
     * 
     * The lookup method to use when matching the environment object.
     */
    public lookupMethod?: lookupMethod;
    /**
     * ### Components
     * 
     * The components to modify the environment object with.
     */
    public components?: IComponents;
    /**
     * ### Duplicate
     * 
     * The number of times to duplicate the environment object.
     * If you are going to duplicate the environment object, you should set this to 1.
     */
    public duplicate?: number;
    /**
     * ### Active
     * 
     * Whether or not the environment object should be active.
     */
    public active?: boolean;
    /**
     * ### Scale
     * 
     * The scale of the environment object.
     */
    public scale?: vec3;
    /**
     * ### Position
     * 
     * The position of the environment object.
     */
    public position?: vec3;
    /**
     * ### Local Position
     * 
     * The local position of the environment object.
     */
    public localPosition?: vec3;
    /**
     * ### Rotation
     * 
     * The rotation of the environment object.
     */
    public rotation?: vec3;
    /**
     * ### Local Rotation
     * 
     * The local rotation of the environment object.
     */
    public localRotation?: vec3;
    /**
     * ### Light ID
     * 
     * The light ID to assign to the environment object.
     */
    public lightID?: number;
    /**
     * ### Track
     * 
     * The track(s) to assign to the environment object.
     */
    public track?: string | string[];

    /**
     * ### Environment
     * 
     * Creates a new environment object.
     */
    constructor();
    /**
     * ### Environment
     * 
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
            if (typeof id !== 'undefined') this.id = id;
            if (typeof lookupMethod !== 'undefined') this.lookupMethod = lookupMethod;
            if (typeof components !== 'undefined') this.components = components;
            if (typeof duplicate !== 'undefined') this.duplicate = duplicate;
            if (typeof active !== 'undefined') this.active = active;
            if (typeof scale !== 'undefined') this.scale = scale;
            if (typeof position !== 'undefined') this.position = position;
            if (typeof localPosition !== 'undefined') this.localPosition = localPosition;
            if (typeof rotation !== 'undefined') this.rotation = rotation;
            if (typeof localRotation !== 'undefined') this.localRotation = localRotation;
            if (typeof lightID !== 'undefined') this.lightID = lightID;
            if (typeof track !== 'undefined') this.track = track;
        }
    }

    /**
     * ### Push
     * 
     * Pushes the environment object to the environment map.
     */
    push() : void {
        if (typeof this.id !== 'string') {
            this.id = this.id.toString().replace(/^\/|\/$/g, '');
        }
        environment.push(this);
    }
}