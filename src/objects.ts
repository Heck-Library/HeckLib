import { isValid } from "./animation";
import { ObjectProp } from "./consts";
import { isArr } from "./general";
import { notes, walls } from "./mapHandler";
import { direction, lineIndex, lineLayer, objType, rgbaAnim, rgbaStill, track, xAnim, xStill, xyStill, xyzAnim, xyzStill } from "./types";


export function filter(obj: any, start: number, end: number, type: objType, direction: direction) {
    if (obj == notes) {
        if (typeof type !== 'undefined' && type !== null && (typeof direction === 'undefined' || direction === null))
            return notes.filter(n => n._time >= start && n._time <= end && n._type == type);
        else if (typeof direction !== 'undefined' && direction !== null && (typeof type === 'undefined' || type === null))
            return notes.filter(n => n._time >= start && n._time <= end && n._cutDirection == direction);
        else if (typeof direction !== 'undefined' && direction !== null && typeof type !== 'undefined' && type !== null)
            return notes.filter(n => n._time >= start && n._time <= end && n._type == type && n._cutDirection == direction)
        else
            return notes.filter(n => n._time >= start && n._time <= end);
    }
    if (obj == walls) {
        return walls.filter(w => w._time >= start && w._time <= end);
    }
}

export function track(obj: any, trackName: track) {
    if (typeof trackName == 'undefined' || trackName == null) throw new Error("No track value given.")
    obj.forEach(n => {
        let d = n._customData;

        if (!d._track) { d._track = trackName }
        else {
            if (isArr(d._track)) {
                const tracks = d._track;
                if (isArr(trackName)) {
                    tracks.push(...trackName);
                } else { tracks.push(trackName) }
                d._track = tracks;
            } else {
                if (isArr(trackName)) {
                    const tracks = [...trackName, d._track];
                    d._track = tracks;
                } else {
                    d._track = [d._track, trackName];
                }
            }
        }
    })
}

export class Object {
    _time: number;
    _lineIndex: lineIndex;
    _type: objType;
    _customData: {
        _track?: track,
        _scale?: xyzStill,
        _position?: xyStill,
        _rotation?: xyzStill,
        _localRotation?: xyzStill,
        _color?: rgbaStill
        _noteJumpStartBeatOffset?: number,
        _noteJumpMovementSpeed?: number,
        _disableSpawnEffect?: boolean,
        _disableNoteGracity?: boolean,
        _disableNoteLook?: boolean,
        _interactable?: boolean,
        _fake?: boolean,
        _flip?: number,
        _animation: {
            _position?: xyzAnim|xyzStill,
            _definitePosition?: xyzAnim|xyzStill,
            _rotation?: xyzAnim|xyzStill,
            _localRotation?: xyzAnim|xyzStill,
            _scale?: xyzAnim|xyzStill,
            _color?: rgbaAnim|rgbaStill,
            _dissolve?: xAnim|xStill,
            _dissolveArrow?: xAnim|xStill,
            _interactable?: xAnim|xStill,
        }
    }
    constructor(time: number) {
        this._time = time;
        this._lineIndex = 0;
        this._type = 0;
        this._customData = {
            _animation: {}
        };
    }
    Track(x: track) {
        this._customData._track = x;
        return this;
    }
    Color (x: rgbaStill) {
        this._customData._color = x;
        return this;
    }
    LineIndex (x: lineIndex) {
        this._lineIndex = x;
        return this;
    }
    Pos (x: xyStill) {
        this._customData._position = x;
        return this;
    }
    Rot (x: xyzStill) {
        this._customData._rotation = x
        return this;
    }
    LocRot (x: xyzStill) {
        this._customData._localRotation = x
        return this;
    }
    Scale (x: xyzStill) {
        this._customData._scale = x
        return this;
    }
    NJS (x: number) {
        this._customData._noteJumpMovementSpeed = x
        return this;
    }
    Offset (x: number) {
        this._customData._noteJumpStartBeatOffset = x
        return this;
    }
    Fake (x: boolean) {
        this._customData._fake = x
        return this;
    }
    Interactable (x: boolean) {
        this._customData._interactable = x
        return this;
    }

    PosAnim (x: xyzStill) {
        this._customData._animation._position = x
        return this;
    }
    DefPosAnim (x) {
        this._customData._animation._definitePosition = x
        return this;
    }
    RotAnim (x) {
        this._customData._animation._rotation = x
        return this;
    }
    LocRotAnim (x) {
        this._customData._animation._localRotation = x
        return this;
    }
    ScaleAnim (x) {
        this._customData._animation._scale = x
        return this;
    }
    ColorAnim (x) {
        this._customData._animation._color = x
        return this;
    }
    InteractableAnim (x) {
        this._customData._animation._interactable = x
        return this;
    }
    DisAnim (x) {
        this._customData._animation._dissolve = x
        return this;
    }
    DisArrAnim (x) {
        this._customData._animation._dissolveArrow = x
        return this;
    }
}

export class Note extends Object {
    constructor(obj) {
        super(obj);
        this._lineLayer = 0
    }
    Direction (x) {
        if (typeof x === 'number' && x >= 0 && x <= 8) { this._cutDirection = x }
        else throw new Error('Invalid direction.')
        return this;
    }
    LineLayer (x) {
        if (typeof x === 'number' && x >= 0 && x <= 2) { this._lineLayer = x }
        else throw new Error('Line layer is a number 0 - 2');
        return this;
    }
    Type (x) {
        if (typeof x === 'number' && x >= 0 && x <= 3 && x != 2) { this._type = x }
        else throw new Error('Invalid type.')
        return this;
    }
    Flip (x) {
        if (x.length == 2) { this._customData._flip = x }
        return this;
    }
    DisableNoteGravity (x) {
        if (typeof x === 'boolean') { this._customData._disableNoteGravity = x }
        else throw new Error('Note gravity must be a boolean')
        return this;
    }
    DisableSpawnEffect (x) {
        if (typeof x === 'boolean') { this._customData._disableSpawnEffect = x }
        else throw new Error('Spawn effect must be a boolean')
        return this;
    }
    DisableNoteLook (x) {
        if (typeof x === 'boolean') { this._customData._disableNoteLook = x }
        else throw new Error('Note look must be a boolean')
        return this;
    }
    End () {
        notes.push(this);
        return this;
    }
}

export class Wall extends Object {
    constructor(obj) {
        super(obj);
        this._duration = 1;
        this._width = 1;
    }
    Duration (x) {
        if (typeof x === 'number') { this._duration = x }
        else throw new Error('Duration must be a number');
        return this;
    }
    End (edge) {
        if (typeof edge !== 'undefined' && edge !== null) {
            if (!this._customData._animation._scale) {
                this._customData._animation._scale = [edge, edge, edge];
            }
            let wallScale = this._customData._scale
            let scaledUp = [...wallScale]
            scaledUp[0] *= edge;
            scaledUp[1] *= edge;
            scaledUp[2] *= edge;
            this._customData._animation._scale = [...scaledUp];
            wallScale[0] /= edge
            wallScale[1] /= edge
            wallScale[2] /= edge
            this._customData._scale = [...wallScale];
        }
        walls.push(this);
        return this;
    }
}
export class Data {
    constructor(t) {
        this._customData = t._customData
    }
    /**
     * 
     * @param {boolean} x
     * @description If true, object will be fake.
     */
    Fake (x) {
        if (typeof x == 'boolean') { this._customData._fake = x }
        else throw new Error('Fake value should be a boolean');
        return this;
    }
    /**
     * 
     * @param {boolean} x
     * @description If false, object cannot be interacted with.
     */
    Interactable (x) {
        if (typeof x == 'boolean') { this._customData._interactable = x }
        else throw new Error('Interactable value should be a boolean');
        return this;
    }
    /**
     * 
     * @param {number} x
     * @description Sets the NJS of the object.
     */
    NJS (x) {
        if (typeof x == 'number') { this._customData._noteJumpMovementSpeed = x }
        else throw new Error('NJS should be a number');
        return this; 
    }
    /**
     * 
     * @param {number} x 
     * @description Sets the offset of the object.
     */
    Offset (x) {
        if (typeof x == 'number') { this._customData._noteJumpStartBeatOffset = x }
        else throw new Error('Offset should be a number');
        return this; 
    }
    /**
     * 
     * @param {[number, number]} x
     * @description Sets the position of the object
     */
    Pos (x) {
        if (isArr(x) && x.length == 2) { this._customData._position = x }
        else throw new Error('Position in this context should be an array with two values');
        return this; 
    }
    /**
     * 
     * @param {[number, number, number]} x 
     * @description Sets the initial rotation of the object
     */
    Rot (x) {
        if (isArr(x) && x.length == 3) { this._customData._rotation = x }
        else throw new Error('Rotation should be an array with 3 values');
        return this; 
    }
    /**
     * 
     * @param {[number, number, number]} x 
     * @description Sets the initial local rotation of the object
     */
    LocRot (x) {
        if (isArr(x) && x.length == 3) { this._customData._localRotation = x }
        else throw new Error('Local rotation should be an array with 3 values');
        return this; 
    }
    /**
     * 
     * @param {[number, number, number]} x 
     * @returns 
     */
    Scale (x) {
        if (isArr(x) && x.length == 3) { this._customData._scale = x }
        else throw new Error('Scale should be an array with 3 values');
        return this;
    }
    /**
     * 
     * @param {[number, number, number, number?]} x 
     * @description Sets the initial RGBA values of the object
     */
    Col (x) {
        if (isArr(x) && x.length == 4) { this._customData._color = x }
        else throw new Error('Color should be an array with 3 values');
        return this; 
    }
    /**
     *
     * @param {[number, number]} x 
     * @description DEPRECATED, DO NOT USE
     */
    Flip (x) {
        if (isArr(x) && x.length == 2) { this._customData._flip = x }
        else throw new Error('Flip should be an array with 2 values');
        return this; 
    }
    /**
     *
     * @param {number} x  
     * @description Overrides the vanilla _cutDirection with a degrees value.
     */
    Dir (x) {
        if (typeof x == 'number') { this._customData._cutDirection = x }
        else throw new Error('Cutdirection should be a number');
        return this; 
    }
}


export class Anim {
    constructor(t) {
        if (!t._customData._animation) t._customData._animation = {}
        this._customData = t._customData
    }
    /**
     * 
     * @param {Array} x Keyframe array
     * @description Position animation
     */
    Pos (x) {
        if (isValid(x, 3)) { this._customData._animation._position = x }
        else throw new Error('Position formatted incorrectly');
        return this;
    }
    /**
     * 
     * @param {Array} x Keyframe array
     * @description Definite position animation
     */
    DefPos (x) {
        if (isValid(x, 3)) { this._customData._animation._definitePosition = x }
        else throw new Error('Definite position incorrectly');
        return this;
    }
    /**
     * 
     * @param {Array} x Keyframe array
     * @description Rotation animation
     */
    Rot (x) {
        if (isValid(x, 3)) { this._customData._animation._rotation = x }
        else throw new Error('Rotation incorrectly');
        return this;
    }
    /**
     * 
     * @param {Array} x Keyframe array
     * @description Local rotation animation
     */
    LocRot (x) {
        if (isValid(x, 3)) { this._customData._animation._localRotation = x }
        else throw new Error('Local rotation incorrectly');
        return this;
    }
    /**
     * 
     * @param {Array} x Keyframe array
     * @description Scale animation
     */
    Scale (x) {
        if (isValid(x, 3)) { this._customData._animation._scale = x }
        else throw new Error('Scale formatted incorrectly');
        return this;
    }
    /**
     * 
     * @param {Array} x Keyframe array
     * @description Dissolve animation
     */
    Dis (x) {
        if (isValid(x, 1)) { this._customData._animation._dissolve = x }
        else throw new Error('Dissolve formatted incorrectly');
        return this;
    }
    /**
     * 
     * @param {Array} x Keyframe array
     * @description Dissolve arrow animation
     */
    DisArr (x) {
        if (isValid(x, 1)) { this._customData._animation._dissolveArrow = x }
        else throw new Error('Dissolve arrow formatted incorrectly');
        return this;
    }
    /**
     * 
     * @param {Array} x Keyframe array
     * @description Dissolve arrow animation
     */
    Interactable (x) {
        if (isValid(x, 1)) { this._customData._animation._interactable = x }
        else throw new Error('Interactable animation formatted incorrectly');
        return this;
    }
    /**
     * 
     * @param {Array} x Keyframe array
     * @description Color animation
     */
    Col (x) {
        if (isValid(x, 4)) { this._customData._animation._color = x }
        else throw new Error('Color formatted incorrectly');
        return this;
    }
}