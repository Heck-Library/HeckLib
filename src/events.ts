

import { events, V3 } from "./mapHandler.ts";
import { Track, vec1anim, vec3anim, vec4anim } from "./types.ts";
/**
 * Places an AnimateTrack event
 */
export class AnimateTrack {
    _time: number;
    _type: string;
    _data: {
        _track?: Track,
        _duration?: number,
        _easing?: string,
        _position?: vec3anim,
        _localPosition?: vec3anim,
        _rotation?: vec3anim,
        _localRotation?: vec3anim,
        _scale?: vec3anim,
        _color?: vec4anim,
        _dissolve?: vec1anim,
        _dissolveArrow?: vec1anim,
        _interactable?: vec1anim,
        _time?: vec1anim
    }

    constructor(time: number) {
        this._time = time
        this._type = "AnimateTrack"
        this._data = {}
    }
    /**
     *  The track that should be animated.
     */
    track (track: Track) {
        this._data._track = track
        this.push("_track");
        return this
    }
    /**
     * Which easing the animation should use.
     */
    easing (easing: string) {
            this._data._easing = easing;
            this.push("_easing");
            return this
    }
    /**
     * The duration of the animation (in beats).
     */
    duration (duration: number) {
            this._data._duration = duration
            this.push("_duration");
            return this
    }
    /**
     * Animates position.
     */
    pos (animation: vec3anim) {
            this._data._position = animation;
            this.push("_position");
            return this
    }
    /**
     * Animates local position.
     */
    localPos (animation: vec3anim) {
            this._data._localPosition = animation;
            this.push("_localPosition");
            return this
    }
    /**
     * Animates rotation.
     */
    rot (animation: vec3anim) {
            this._data._rotation = animation;
            this.push("_rotation");
            return this
    }
    /**
     * Animates local rotation.
     */
    localRot (animation: vec3anim) {
            this._data._localRotation = animation;
            this.push("_localRotation");
            return this
    }
    /**
     * Animates scale.
     */
    scale (animation: vec3anim) {
            this._data._scale = animation;
            this.push("_scale");
            return this
    }
    /**
     * Animates color.
     */
    color (animation: vec4anim) {
            this._data._color = animation;
            this.push("_color");
            return this
    }
    /**
     * Animates the dissolve.
     */
    dis (animation: vec1anim) {
            this._data._dissolve = animation
            this.push("_dissolve");
            return this
    }
    /**
     * Animates the arrow dissolve.
     */
    disArr (animation: vec1anim) {
            this._data._dissolveArrow = animation
            this.push("_dissolveArrow");
            return this
    }
    /**
     * Animates interactability (can either be 0 or 1).
     */
    interactable (animation: vec1anim) {
            this._data._interactable = animation
            this.push("_interactable");
            return this
    }
    /**
     * Animates the time.
     */
    time (animation: vec1anim) {
            this._data._time = animation
            this.push("_time");
            return this
    }
    /**
     * Push the animation to map data.
     */
    private push (param: string) {
        
        let data = JSON.stringify(this);

        if (V3) {
            data = data.replace(/_/g, "")
                .replace("time", "b")
                .replace("type", "t")
                .replace("data", "d")
                .replace("\"position\"", "\"offsetPosition\"")
                .replace("\"rotation\"", "\"offsetWorldRotation\"");
            param = param.replace(/_/g, "")
                .replace("\"position\"", "\"offsetPosition\"")
                .replace("\"rotation\"", "\"offsetWorldRotation\"");
        }

        data = JSON.parse(data)

        const d = this._data;
        if (!d._track) {
            throw new Error('No track given.')
        }

        const aaaa = JSON.stringify(events);
        const tempEvent = JSON.parse(JSON.stringify(data));
        if (!V3) delete tempEvent._data[param]
        if (V3) delete tempEvent.d[param]
        const bbbb = JSON.stringify(tempEvent)

        if (aaaa.includes(bbbb)) {
            events.pop()
        }
        events.push(data)
        return this;
    }
}

export class PathAnimation extends AnimateTrack {
    declare _data: {
        _track?: Track;
        _duration?: number;
        _easing?: string;
        _position?: vec3anim;
        _rotation?: vec3anim;
        _localRotation?: vec3anim;
        _scale?: vec3anim;
        _color?: vec4anim;
        _dissolve?: vec1anim;
        _dissolveArrow?: vec1anim;
        _interactable?: vec1anim;
        _time?: vec1anim;
        _definitePosition?: vec3anim;
    };
    // deno-lint-ignore no-explicit-any
    constructor(time: number, event?: any) {
        super(event);
        this._time = time;
        this._type = "AssignPathAnimation";
    }

    /**
     * Animates definite position.
     */
    defPos (animation: vec3anim) {
        this._data._definitePosition = animation;
        return this
    }
}

export class TrackParent {
    _time: number;
    _type: "AssignTrackParent";
    _data: {
        _parentTrack?: string,
        _childrenTracks?: string[]
    }

    constructor(time: number) {
        this._time = time;
        this._type = "AssignTrackParent";
        this._data = {}
    }

    /**
     * The name of the parent track.
     */
    parent(x: string) {
        this._data._parentTrack = x
        this.push("_parentTrack")
        return this;
    }

    /**
     * The name of the child track.
     */
    children(x: string[]) {
        this._data._childrenTracks = x
        this.push("_childrenTracks")
        return this;
    } 
    
    /**
     * Push the track parent to the map data.
     */
    private push (param: string) {
        let data = JSON.stringify(this);

        if (V3) {
            data = data.replace(/_/g, "")
                .replace("time", "b")
                .replace("type", "t")
                .replace("data", "d");
            param = param.replace(/_/g, "")
        }

        data = JSON.parse(data)

        const aaaa = JSON.stringify(events);
        const tempEvent = JSON.parse(JSON.stringify(data));
        if (!V3) delete tempEvent._data[param]
        if (V3) delete tempEvent.d[param]
        const bbbb = JSON.stringify(tempEvent)

        if (aaaa.includes(bbbb)) {
            events.pop()
        }
        events.push(data)

        return this;
    }
}

export class PlayerTrack {
    _time: number;
    _type: "AssignPlayerToTrack";
    _data: {
        _track?: string
    }

    constructor(time: number) {
        this._time = time;
        this._type = "AssignPlayerToTrack";
        this._data = {}
    }

    /**
     * The name of the track that the player should be assigned to.
     */
    track(x: string) {
        this._data._track = x;
        let data = JSON.stringify(this);

        if (V3) {
            data = data.replace(/_/g, "")
                .replace("time", "b")
                .replace("type", "t")
                .replace("data", "d");
        }

        data = JSON.parse(data)
        if (!this._data._track) throw new Error('no track set')
        events.push(data)
        return this;
    }
}