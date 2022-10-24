

import { events } from "./mapHandler.ts";
import { Track, vec1anim, vec3anim, vec4anim } from "./types.ts";
/**
 * Places an AnimateTrack event
 */
export class AnimateTrack {
    /**
     * 
     * @param {number} time 
     */
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

    setTime (time: number) {
        this._time = time;
        return this;
    }
    track (track: Track) {
        this._data._track = track
        return this
    }
    easing (easing: string) {
            this._data._easing = easing;
            return this
    }
    duration (duration: number) {
            this._data._duration = duration
            return this
    }
    pos (animation: vec3anim) {
            this._data._position = animation;
            return this
    }
    localPos (animation: vec3anim) {
            this._data._localPosition = animation;
            return this
    }
    rot (animation: vec3anim) {
            this._data._rotation = animation;
            return this
    }
    localRot (animation: vec3anim) {
            this._data._localRotation = animation;
            return this
    }
    scale (animation: vec3anim) {
            this._data._scale = animation;
            return this
    }
    color (animation: vec4anim) {
            this._data._color = animation;
            return this
    }
    dis (animation: vec1anim) {
            this._data._dissolve = animation
            return this
    }
    disArr (animation: vec1anim) {
            this._data._dissolveArrow = animation
            return this
    }
    interactable (animation: vec1anim) {
            this._data._interactable = animation
            return this
    }
    time (animation: vec1anim) {
            this._data._time = animation
            return this
    }
    end () {
        const d = this._data;
        if (!d._track) {
            throw new Error('No track given.')
        }
        if (!d._duration) {
            throw new Error('No duration given.')
        }

        events.push(this)

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
    /**
     * 
     * @param {number} time 
     */
    // deno-lint-ignore no-explicit-any
    constructor(event: any, time: number) {
        super(event);
        this._time = time;
        this._type = "AssignPathAnimation";
    }

    defPos (animation: vec3anim) {
        this._data._definitePosition = animation;
        return this
    }

    end () {
        const d = this._data;
        if (!d._track) {
            throw new Error('No track given.')
        }
        if (typeof d._duration !== 'undefined' || d._duration !== null) {
            throw new Error('Path animation doesn\'t use duration.')
        }
        events.push(this)

        return this;
    }
}

export class TrackParent {
    _time: number;
    _type: "AssignTrackParent";
    _data: {
        _parentTrack?: string,
        _childrenTracks?: string[]
    }
    /**
     * 
     * @param {number} time 
     */
    constructor(time: number) {
        this._time = time;
        this._type = "AssignTrackParent";
        this._data = {}
    }

    /**
     * 
     * @param {string} x Parent track 
     */
    parent(x: string) {
        this._data._parentTrack = x
        return this;
    }
    /**
     * 
     * @param {string[]} x Children tracks 
     */
    children(x: string[]) {
        this._data._childrenTracks = x
        return this;
    } 
    
    end () {
        const d = this._data;
        if (!d._parentTrack) {
            throw new Error('No parent track given.')
        }
        if (!d._childrenTracks) {
            throw new Error('No children tracks given.')
        }
        events.push(this)

        return this;
    }
}

export class PlayerTrack {
    _time: number;
    _type: "AssignPlayerToTrack";
    _data: {
        _track?: string
    }
    /**
     * 
     * @param {number} time 
     */
    constructor(time: number) {
        this._time = time;
        this._type = "AssignPlayerToTrack";
        this._data = {}
    }

    track(x: string) {
        this._data._track = x;
        return this;
    }
    end () {
        if (!this._data._track) throw new Error('no track set')
        events.push(this)
    }
}