import Shape from "../consts/shape";
import Shader from "../consts/shader";
import { animateTrackData,pathAnimData,parentTrackType,playerTrackType,fogTrackData } from "../consts/types/animation";
import { geoShape, mat } from "../consts/types/environment/environment";
import { Track } from "../consts/types/objects";
import { vec3anim,vec4anim,vec1anim, vec3 } from "../consts/types/vec";
import { LookupMethod } from "../environment/environment";
import {V3, environment, events} from "../map/initialize";

interface IGeometry {
    _type: geoShape;
    _material: string | mat;
    _collision?: boolean;
}
interface IILightWithId {
    _lightID: number;
    _type: number;
}

interface IFog {
    _attenuation?: number;
    _offset?: number;
    _startY?: number;
    _height?: number;
}

interface ITubeBloom {
    _colorAlphaMultiplier?: number;
    _bloomFogIntensityMultiplier?: number;
}

interface IComponents {
    _ILightWithId?: IILightWithId,
    _BloomFogEnvironment?: IFog,
    _TubeBloomPrePassLight?: ITubeBloom
}

interface IEnvironment {
    _id?: string | RegExp;
    _lookupMethod?: LookupMethod;
    _components?: IComponents;
    _duplicate?: number;
    _active?: boolean;
    _scale?: vec3;
    _position?: vec3;
    _localPosition?: vec3;
    _rotation?: vec3;
    _localRotation?: vec3;
    _lightID?: number;
    _track?: Track;
    _geometry?: IGeometry;
}

// #region events
// deno-lint-ignore no-namespace
namespace Builders {
    abstract class BaseEvent {
        json : {
            time: number;
            type: string;
            data: Record < string,
            unknown >;
        };
        constructor(time : number) {
            this.json = {
                time: time,
                type: "",
                data: {}
            };
        }

        get time(): number {
            return this.json.time;
        }
        get type(): string {
            return this.json.type;
        }
        get data(): Record < string,
        unknown > {
            return this.json.data;
        }
        /**
   *  The track that should be animated.
   */
        track(track : Track) {
            this.json.data.track = track;
            return this;
        }
    }
    class BaseAnimEvent extends BaseEvent {
        constructor(time : number) {
            super(time);
        }

        // #region methods
        /**
   * Which easing the animation should use.
   */
        easing(easing : string) {
            this.json.data.easing = easing;
            return this;
        }
        /**
   * The duration of the animation (in beats).
   */
        duration(duration : number) {
            this.json.data.duration = duration;
            return this;
        }
        /**
   * Animates position.
   */
        pos(animation : vec3anim) {
            this.json.data.position = animation;
            return this;
        }
        /**
   * Animates rotation.
   */
        rot(animation : vec3anim) {
            this.json.data.rotation = animation;
            return this;
        }
        /**
   * Animates local rotation.
   */
        localRot(animation : vec3anim) {
            this.json.data.localRotation = animation;
            return this;
        }
        /**
   * Animates scale.
   */
        scale(animation : vec3anim) {
            this.json.data.scale = animation;
            return this;
        }
        /**
   * Animates color.
   */
        color(animation : vec4anim) {
            this.json.data.color = animation;
            return this;
        }
        /**
   * Animates the dissolve.
   */
        dis(animation : vec1anim) {
            this.json.data.dissolve = animation;
            return this;
        }
        /**
   * Animates the arrow dissolve.
   */
        disArr(animation : vec1anim) {
            this.json.data.dissolveArrow = animation;
            return this;
        }
        /**
   * Animates interactability (can either be 0 or 1).
   */
        interactable(animation : vec1anim) {
            this.json.data.interactable = animation;
            return this;
        }
    }
    export class AnimateTrack extends BaseAnimEvent {
        declare json : {
            time: number;
            type: string;
            data: animateTrackData;
        };
        constructor(time : number) {
            super(time);
            this.json = {
                time: time,
                type: "AnimateTrack",
                data: {
                    track: [],
                    duration: 1
                }
            };
            return this;
        }
        /**
   * Animates local position.
   */
        localPos(animation : vec3anim) {
            this.json.data.localPosition = animation;
            return this;
        }
        /**
   * Animates the time.
   */
        timeAnim(animation : vec1anim) {
            this.json.data.time = animation;
            return this;
        }
        // #endregion
        push() {
            events.push(this);
            return this;
        }
    }
    export class PathAnimation extends BaseAnimEvent {
        declare json : {
            time: number;
            type: string;
            data: pathAnimData;
        };
        constructor(time : number) {
            super(time);
            this.json = {
                time: time,
                type: "AssignPathAnimation",
                data: {
                    track: ""
                }
            };
        }
        definitePosition(animation : vec3anim) {
            this.json.data.definitePosition = animation;
            return this;
        }
        push() {
            events.push(this);
            return this;
        }
    }
    export class TrackParent extends BaseEvent {
        declare json : {
            time: number;
            type: string;
            data: parentTrackType;
        };
        constructor(time : number) {
            super(time);
            this.json = {
                time: time,
                type: "AssignTrackParent",
                data: {
                    parentTrack: "",
                    childrenTracks: [""]
                }
            };
        }
        track(track : Track) {
            this.json.data.parentTrack = track;
            return this;
        }
        children(x : string[]) {
            this.json.data.childrenTracks = x;
            return this;
        }
        push() {
            events.push(this);
            return this;
        }
    }
    export class PlayerTrack extends BaseEvent {
        declare json : {
            time: number;
            type: string;
            data: playerTrackType;
        };
        constructor(time : number, track : Track) {
            super(time);
            this.json = {
                time: time,
                type: "AssignPlayerToTrack",
                data: {
                    track
                }
            };
        }
        push() {
            events.push(this);
            return this;
        }
    }
    export class AssignFogTrack extends BaseEvent {
        declare json : {
            time: number;
            type: "AssignFogTrack";
            data: fogTrackData;
        };
        constructor(time : number, track : Track) {
            super(time);
            this.json = {
                time: time,
                type: "AssignFogTrack",
                data: {
                    track: track
                }
            };
        }
        push() {
            events.push(this);
            return this;
        }
    }
    export class Environment {
        private environment: IEnvironment;
    
        /**
         * Creates a new Environment modification.
         * This feature uses Chroma, not Noodle.
         */
        constructor() {
            this.environment = {};
        }
        /**
         * Searches for an environment object using regex.
         * @param x Your regex lookup.
         */
        regex(x: string | RegExp) {
            let id: string;
            if (typeof x !== "string") {
                id = x.toString().replace(/(^\/|\/$)/g, "");
            } else {
                id = x;
            }
            this.environment._id = id;
            this.environment._lookupMethod = "Regex";
            return this;
        }
        /**
         * Searches for an environment object using contains lookup.
         * @param x Your ID match.
         */
        contains(x: string) {
            this.environment._id = x;
            this.environment._lookupMethod = "Contains";
            return this;
        }
        /**
         * Searches for an environment object using exact match.
         * @param x The object's entire ID.
         */
        exact(x: string) {
            this.environment._id = x;
            this.environment._lookupMethod = "Exact";
            return this;
        }
        /**
         * How many times to duplicate the environment piece.
         */
        duplicate(x: number) {
            this.environment._duplicate = x;
            return this;
        }
        /**
         * If the environment piece should be disabled or active.
         */
        active(x: boolean) {
            this.environment._active = x;
            return this;
        }
        /**
         * The scale of the environment piece.
         */
        scale(x: vec3) {
            this.environment._scale = x;
            return this;
        }
        /**
         * The position that this environment piece should be set to.
         */
        pos(x: vec3) {
            this.environment._position = x;
            return this;
        }
        /**
         *  The local position that this environment piece should be set to.
         */
        localPos(x: vec3) {
            this.environment._localPosition = x;
            return this;
        }
        /**
         * The rotation that this environment piece should have.
         */
        rot(x: vec3) {
            this.environment._rotation = x;
            return this;
        }
        /**
         * The local rotation that this environment piece should have.
         */
        localRot(x: vec3) {
            this.environment._localRotation = x;
            return this;
        }
        /**
         *  What the light id of this environment piece should be.
         */
        lightID(x: number) {
            this.environment._lightID = x;
            return this;
        }
        /**
         * Which track the environment piece should be assigned to.
         */
        track(x: Track) {
            this.environment._track = x;
            return this;
        }
        geometry() {
            this.environment._geometry = {
                _type: Shape.Cube,
                _material: { _color: [1, 1, 1], _shader: Shader.Standard },
            };
            return this;
        }
    
        shape(x: geoShape) {
            if (!this.environment._geometry)
                return this;
            this.environment._geometry._type = x;
            return this;
        }
        material(x: string | mat) {
            if (!this.environment._geometry)
                return this;
            this.environment._geometry._material = x;
            return this;
        }
        collision(x: boolean) {
            if (!this.environment._geometry)
                return this;
            this.environment._geometry._collision = x;
            return this;
        }
        /**
         * Push the environment piece to the map data.
         */
        push() {
            let out = this.environment;
            if (V3) {
                const stringified = JSON.stringify(this.environment).replace(/_/g, "");
                out = JSON.parse(stringified);
            }
            environment.push(out);
        }
    }
}

export default Builders;

// #endregion
