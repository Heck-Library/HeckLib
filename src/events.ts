import { readFileSync, writeFileSync } from "fs";
import { isValid } from "./animation.js";
import { validTrack } from "./general.js";
import { rgbaAnim, rgbaStill, track, xAnim, xStill, xyzAnim, xyzFrame, xyzStill } from "./types"
import { eventsVar, getActiveDiff } from "./mapHandler.js";

/*

export class BaseEvent {
    json = {
        _time: 0,
        _type: "",
        _data: {}
    }
    constructor(time) {
        if (typeof time === "object") {
            Object.assign(this.json, time);
            return;
        }
        this._time = time;
    }

    get pos () { return this.json._data._position }
    get defPos () { return this.json._data._definitePosition }
    get locPos () { return this.json._data._localPosition }
    get rot () { return this.json._data._rotation }
    get locRot () { return this.json._data._localRotation }
    get scale () { return this.json._data._scale }
    get color () { return this.json._data._color }
    get dis () { return this.json._data._dissolve }
    get disArr () { return this.json._data._dissolveArrow }
    get interact () { return this.json._data._interactable }
    get time () { return this.json._data._time }

    set pos (x) {
        if (isValid(x, 3)) {
            this.json._data._position = pos;
        }
    }
    set defPos (x) {
        if (isValid(x, 3)) {
            this.json._data._definitePosition = x;
        }
    }
    set locPos (x) {
        if (isValid(x, 3)) {
            this.json._data._localPosition = x;
        }
    }
    set rot (x) {
        if (isValid(x, 3)) {
            this.json._data._rotation = x;
        }
    }
    set locRot (x) {
        if (isValid(x, 3)) {
            this.json._data._localRotation = x;
        }
    }
    set scale (x) {
        if (isValid(x, 3)) {
            this.json._data._scale = x;
        }
    }
    set color (x) {
        if (isValid(x, 4)) {
            this.json._data._color = x;
        }
    }
    set dis (x) {
        if (isValid(x, 1)) {
            this.json._data._dissolve = x
        }
    }
    set disArr (x) {
        if (isValid(x, 1)) {
            this.json._data._dissolveArrow = x
        }
    }
    set interact (x) {
        if (isValid(x, 1)) {
            this.json._data._interactable = x
        }
    }
    set time (x) {
        if (isValid(x, 1)) {
            this.json._data._time = x
        }
    }
}

*/
/**
 * Places an AnimateTrack event
 */
export class AnimateTrack {
    _time: number;
    _type: string;
    _data: {
        _track?: track,
        _easing?: string,
        _duration?: number,
        _position?: xyzAnim|xyzStill,
        _localPosition?: xyzAnim|xyzStill,
        _rotation?: xyzAnim|xyzStill,
        _localRotation?: xyzAnim|xyzStill,
        _scale?: xyzAnim|xyzStill,
        _color?: rgbaAnim|rgbaStill,
        _dissolve?: xAnim|xStill,
        _dissolveArrow?: xAnim|xStill,
        _interactable?: xAnim|xStill,
        _time?: xAnim|xStill
    };
    _track: track;

    /**
     * 
     * @param {number} time 
     */
    constructor(time: number) {
        this._time = time;
        this._type = "AnimateTrack"
        this._data = {}
    };

    setTime (x: number) {
        if (typeof x === 'number') { this._time = x }
        else throw new Error('Time is a number.')
    }
    Track (x: track) {
        this._data._track = x
        return this
        
    }
    Easing (x: string) {
            this._data._easing = x;
            return this
    }
    Duration (x: number) {
        this._data._duration = x
        return this
    }
    Pos (x: xyzAnim|xyzStill) {
        this._data._position = x;
        return this
    }
    LocPos (x: xyzAnim|xyzStill) {
        this._data._localPosition = x;
        return this
    }
    Rot (x: xyzAnim|xyzStill) {
        this._data._rotation = x;
        return this
    }
    LocRot (x: xyzAnim|xyzStill) {
        this._data._localRotation = x;
        return this
    }
    Scale (x: xyzAnim|xyzStill) {
        this._data._scale = x;
        return this
    }
    Color (x: rgbaAnim|rgbaStill) {
        this._data._color = x;
        return this
    }
    Dis (x: xAnim|xStill) {
        if (isValid(x, 1)) {
            this._data._dissolve = x
            return this
        }
    }
    DisArr (x: xAnim|xStill) {
        if (isValid(x, 1)) {
            this._data._dissolveArrow = x
            return this
        }
    }
    Interact (x: xAnim|xStill) {
        if (isValid(x, 1)) {
            this._data._interactable = x
            return this
        }
    }
    Time (x: xAnim|xStill) {
        if (isValid(x, 1)) {
            this._data._time = x
            return this
        }
    }

    End () {
        let d = this._data;
        if (!d._track) {
            throw new Error('No track given.')
        }
        if (!d._duration) {
            throw new Error('No duration given.')
        }

        eventsVar.push(this)

        return this;
    }
}

export class PathAnimation extends AnimateTrack {
    /**
     * 
     * @param {number} time 
     */
    _data: {
        _definitePosition?: xyzAnim|xyzStill,
        _track?: track,
        _easing?: string,
        _duration?: number,
        _position?: xyzAnim|xyzStill,
        _rotation?: xyzAnim|xyzStill,
        _localRotation?: xyzAnim|xyzStill,
        _scale?: xyzAnim|xyzStill,
        _color?: rgbaAnim|rgbaStill,
        _dissolve?: xAnim|xStill,
        _dissolveArrow?: xAnim|xStill,
        _interactable?: xAnim|xStill,
        _time?: xAnim|xStill
    };
    constructor(event, time : number) {
        super(event);
        this._time = time;
        this._type = "AssignPathAnimation";
        this._data = {};
    }

    DefPos (x: xyzAnim|xyzStill) {
        if (isValid(x, 3)) {
            this._data._definitePosition = x;
            return this
        }
    }

    End () {
        let d = this._data;
        if (!d._track) {
            throw new Error('No track given.')
        }
        if (typeof d._duration !== 'undefined' || d._duration !== null) {
            throw new Error('Path animation doesn\'t use duration.')
        }
        eventsVar.push(this)

        return this;
    }
}

export class TrackParent {
    _time: number;
    _type: string;
    _data: {
        _parentTrack: string,
        _childrenTracks: string[]
    }
    /**
     * 
     * @param {number} time 
     */
    constructor(time) {
        this._time = time;
        this._type = "AssignTrackParent";
        this._data = {
            _parentTrack: "",
            _childrenTracks: [""] 
        }
    }

    /**
     * 
     * @param {string} x Parent track 
     */
    Parent(x: string) {
        if (typeof x === 'string') { this._data._parentTrack = x }
        else throw new Error('Parent track is supposed to be a string.')
        return this;
    }
    /**
     * 
     * @param {string[]} x Children tracks 
     */
    Children(x: string[]) {
        if (Array.isArray(x)) { this._data._childrenTracks = x }
        else throw new Error('Children tracks are supposed to be in arrays.')
        return this;
    } 
    
    End () {
        let d = this._data;
        if (!d._parentTrack) {
            throw new Error('No parent track given.')
        }
        if (!d._childrenTracks) {
            throw new Error('No children tracks given.')
        }
        eventsVar.push(this)

        return this;
    }
}

export class PlayerTrack {
    _time: number;
    _type: string;
    _data: {
        _track: string;
    }
    /**
     * 
     * @param {number} time 
     */
    constructor(time: number, track: string) {
        this._time = time;
        this._type = "AssignPlayerToTrack";
        this._data = {
            _track: track
        }
    }

    Track(x: string) {
        if (typeof x === 'string') { this._data._track = x;}
        return this;
    }
    End() {
        if (!this._data._track) throw new Error('no track set')
        eventsVar.push(this)
    }
}