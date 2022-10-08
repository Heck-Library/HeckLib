import { readFileSync, writeFileSync } from "fs";
import { isValid } from "./animation.js";
import { validTrack } from "./general.js";
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
    /**
     * 
     * @param {number} time 
     */
    constructor(time) {
        this._time = time
        this._type = "AnimateTrack"
        this._data = {}
    };

    // get time() { return this._time }
    // get track () { return this._data._track }
    // get duration () { return this._data._duration }
    // get pos () { return this._data._position }
    // get locPos () { return this._data._localPosition }
    // get rot () { return this._data._rotation }
    // get locRot () { return this._data._localRotation }
    // get scale () { return this._data._scale }
    // get color () { return this._data._color }
    // get dis () { return this._data._dissolve }
    // get disArr () { return this._data._dissolveArrow }
    // get interact () { return this._data._interactable }
    // get animTime () { return this._data._time }

    // set time(x) { this._time = x }
    // set track (x) { this._data._track = x }
    // set duration (x) { this._data._duration = x }
    // set pos (x) { this._data._position = x }
    // set locPos (x) { this._data._localPosition = x }
    // set rot (x) { this._data._rotation = x }
    // set locRot (x) { this._data._localRotation = x }
    // set scale (x) { this._data._scale = x }
    // set color (x) { this._data._color = x }
    // set dis (x) { this._data._dissolve = x }
    // set disArr (x) { this._data._dissolveArrow = x }
    // set interact (x) { this._data._interactable = x }
    // set animTime (x) { this._data._time = x }

    setTime (x) {
        if (typeof x === 'number') { this._time = x }
        else throw new Error('Time is a number.')
    }
    Track (x) {
        if (typeof x === 'string' || Array.isArray(x) && validTrack(x)) {
            this._data._track = x
            return this
        }
    }
    Easing (x) {
        if (typeof x === 'string') {
            this._data._easing = x;
            return this
        }
    }
    Duration (x) {
        if (typeof x === 'number') {
            this._data._duration = x
            return this
        }
    }
    Pos (x) {
        if (isValid(x, 3)) {
            this._data._position = x;
            return this
        }
    }
    LocPos (x) {
        if (isValid(x, 3)) {
            this._data._localPosition = x;
            return this
        }
    }
    Rot (x) {
        if (isValid(x, 3)) {
            this._data._rotation = x;
            return this
        }
    }
    LocRot (x) {
        if (isValid(x, 3)) {
            this._data._localRotation = x;
            return this
        }
    }
    Scale (x) {
        if (isValid(x, 3)) {
            this._data._scale = x;
            return this
        }
    }
    Color (x) {
        if (isValid(x, 4)) {
            this._data._color = x;
            return this
        }
    }
    Dis (x) {
        if (isValid(x, 1)) {
            this._data._dissolve = x
            return this
        }
    }
    DisArr (x) {
        if (isValid(x, 1)) {
            this._data._dissolveArrow = x
            return this
        }
    }
    Interact (x) {
        if (isValid(x, 1)) {
            this._data._interactable = x
            return this
        }
    }
    Time (x) {
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
    constructor(event, time) {
        super(event);
        this._time = time;
        this._type = "AssignPathAnimation";
    }

    DefPos (x) {
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
    /**
     * 
     * @param {number} time 
     */
    constructor(time) {
        this._time = time;
        this._type = "AssignTrackParent";
        this._data = {}
    }

    /**
     * 
     * @param {string} x Parent track 
     */
    Parent(x) {
        if (typeof x === 'string') { this._data._parentTrack = x }
        else throw new Error('Parent track is supposed to be a string.')
        return this;
    }
    /**
     * 
     * @param {string[]} x Children tracks 
     */
    Children(x) {
        if (Array.isArray()) { this._data._childrenTracks = x }
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
    /**
     * 
     * @param {number} time 
     */
    constructor(time) {
        this._time = time;
        this._type = "AssignPlayerToTrack";
        this._data = {}
    }

    Track(x) {
        if (typeof x === 'string') { this._data._track = x;}
        return this;
    }
    End() {
        if (!this._data._track) throw new Error('no track set')
        eventsVar.push(this)
    }
}