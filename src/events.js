
import { isValid } from "./animation.js";
import { validTrack } from "./general.js";
import { events } from "./mapHandler.js";

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

        events.push(this)

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
        events.push(this)

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
        events.push(this)

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
        events.push(this)
    }
}