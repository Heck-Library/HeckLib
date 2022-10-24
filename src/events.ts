

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
    Track (track: Track) {
        this._data._track = track
        return this
    }
    Easing (easing: string) {
            this._data._easing = easing;
            return this
    }
    Duration (duration: number) {
            this._data._duration = duration
            return this
    }
    Pos (animation: vec3anim) {
            this._data._position = animation;
            return this
    }
    LocPos (animation: vec3anim) {
            this._data._localPosition = animation;
            return this
    }
    Rot (animation: vec3anim) {
            this._data._rotation = animation;
            return this
    }
    LocRot (animation: vec3anim) {
            this._data._localRotation = animation;
            return this
    }
    Scale (animation: vec3anim) {
            this._data._scale = animation;
            return this
    }
    Color (animation: vec4anim) {
            this._data._color = animation;
            return this
    }
    Dis (animation: vec1anim) {
            this._data._dissolve = animation
            return this
    }
    DisArr (animation: vec1anim) {
            this._data._dissolveArrow = animation
            return this
    }
    Interact (animation: vec1anim) {
            this._data._interactable = animation
            return this
    }
    Time (animation: vec1anim) {
            this._data._time = animation
            return this
    }

    Push () {
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

    DefPos (animation: vec3anim) {
        this._data._definitePosition = animation;
        return this
    }

    Push () {
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
    Parent(x: string) {
        this._data._parentTrack = x
        return this;
    }
    /**
     * 
     * @param {string[]} x Children tracks 
     */
    Children(x: string[]) {
        this._data._childrenTracks = x
        return this;
    } 
    
    Push () {
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

    Track(x: string) {
        this._data._track = x;
        return this;
    }
    Push () {
        if (!this._data._track) throw new Error('no track set')
        events.push(this)
    }
}