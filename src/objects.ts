// deno-lint-ignore-file no-explicit-any

import { isArr } from "./general.ts";
import { notes, walls } from "./mapHandler.ts";
import { lineIndex, lineLayer, noteDir, objType, Track, vec1anim, vec2, vec3, vec3anim, vec4, vec4anim } from "./types.ts";


export function filter(obj: any, start: number, end: number, type?: 0|1|3, direction?: number) {
    if (obj == notes) {
        if (typeof type !== 'undefined' && type !== null && (typeof direction === 'undefined' || direction === null))
            return notes.filter((n: { _time: number; _type: number; }) => n._time >= start && n._time <= end && n._type == type);
        else if (typeof direction !== 'undefined' && direction !== null && (typeof type === 'undefined' || type === null))
            return notes.filter((n: { _time: number; _cutDirection: number; }) => n._time >= start && n._time <= end && n._cutDirection == direction);
        else if (typeof direction !== 'undefined' && direction !== null && typeof type !== 'undefined' && type !== null)
            return notes.filter((n: { _time: number; _type: number; _cutDirection: number; }) => n._time >= start && n._time <= end && n._type == type && n._cutDirection == direction)
        else
            return notes.filter((n: { _time: number; }) => n._time >= start && n._time <= end);
    }
    if (obj == walls) {
        return walls.filter((w: { _time: number; }) => w._time >= start && w._time <= end);
    }
    return notes[0];
}

export function track(note: any[], track: Track) {
    if (typeof track == 'undefined' || track == null) throw new Error("No track value given.")
    note.forEach((n: { _customData: any; }) => {
        const d = n._customData
        if (typeof d._track !== 'undefined' && d._track !== null) {
            if (isArr(d._track)) {
                const tracks = d._track;
                if (isArr(track))
                    tracks.push(...track);
                else
                    tracks.push(track);
            } else {
                if (isArr(track)) {
                    const a = [...track, d._track];
                    d._track = a;
                } else
                    d._track = [d._track, track];
            }
        } else
            d._track = track;
    })
}

export class Object {
    _time: number;
    _lineIndex: lineIndex;
    _type: objType;
    _customData: {
        _track?: Track,
        _color?: vec4,
        _position?: vec2,
        _rotation?: vec3,
        _localRotation?: vec3,
        _scale?: vec3,
        _noteJumpMovementSpeed?: number,
        _noteJumpStartBeatOffset?: number,
        _fake?: boolean,
        _interactable?: boolean,
        _animation: {
            _position?: vec3anim,
            _definitePosition?: vec3anim,
            _rotation?: vec3anim,
            _localRotation?: vec3anim,
            _scale?: vec3anim,
            _color?: vec4anim,
            _interactable?: vec1anim,
            _dissolve?: vec1anim,
            _dissolveArrow?: vec1anim
        }
    };
    constructor(time: number) {
        this._time = time;
        this._lineIndex = 0;
        this._type = 0;
        this._customData = {
            _animation: {}
        };
    }
    //#region customData
    track(x: Track) {
        this._customData._track = x;
        return this;
    }
    color (x: vec4) {
        this._customData._color = x
        return this;
    }
    lineIndex (x: 0|1|3) {
        this._lineIndex = x
        return this;
    }
    pos (x: vec2) {
        this._customData._position = x;
        return this;
    }
    rot (x: vec3) {
        this._customData._rotation = x
        return this;
    }
    localRot (x: vec3) {
        this._customData._localRotation = x
        return this;
    }
    scale (x: vec3) {
        this._customData._scale = x
        return this;
    }
    njs (x: number) {
        this._customData._noteJumpMovementSpeed = x
        return this;
    }
    offset (x: number) {
        this._customData._noteJumpStartBeatOffset = x
        return this;
    }
    fake (x: boolean) {
        this._customData._fake = x
        return this;
    }
    interactable (x: boolean) {
        this._customData._interactable = x
        return this;
    }
    //#endregion

    //#region animation
    posAnim (x: vec3anim) {
        this._customData._animation._position = x
        return this;
    }
    defPosAnim (x: vec3anim) {
        this._customData._animation._definitePosition = x
        return this;
    }
    rotAnim (x: vec3anim) {
        this._customData._animation._rotation = x
        return this;
    }
    localRotAnim (x: vec3anim) {
        this._customData._animation._localRotation = x
        return this;
    }
    scaleAnim (x: vec3anim) {
        this._customData._animation._scale = x
        return this;
    }
    colorAnim (x: vec4anim) {
        this._customData._animation._color = x
        return this;
    }
    interactableAnim (x: vec1anim) {
        this._customData._animation._interactable = x
        return this;
    }
    disAnim (x: vec1anim) {
        this._customData._animation._dissolve = x
        return this;
    }
    disArrAnim (x: vec1anim) {
        this._customData._animation._dissolveArrow = x
        return this;
    }
    //#endregion
}

export class Note extends Object {
    _lineLayer: lineLayer;
    _cutDirection: noteDir;
    _type: objType;
    declare _customData: {
        _track?: Track,
        _flip?: vec2,
        _color?: vec4,
        _position?: vec2,
        _rotation?: vec3,
        _localRotation?: vec3,
        _scale?: vec3,
        _noteJumpMovementSpeed?: number,
        _noteJumpStartBeatOffset?: number,
        _disableNoteGravity?: boolean,
        _disableSpawnEffect?: boolean,
        _disableNoteLook?: boolean,
        _fake?: boolean,
        _interactable?: boolean,
        _animation: {
            _position?: vec3anim,
            _definitePosition?: vec3anim,
            _rotation?: vec3anim,
            _localRotation?: vec3anim,
            _scale?: vec3anim,
            _color?: vec4anim,
            _interactable?: vec1anim,
            _dissolve?: vec1anim,
            _dissolveArrow?: vec1anim
        }
    };

    constructor(obj: any) {
        super(obj);
        this._lineLayer = 0
        this._cutDirection = 0;
        this._type = 0;
    }
    //#region vanilla
    direction (x: noteDir) {
        this._cutDirection = x
        return this;
    }
    lineLayer (x: lineLayer) {
        this._lineLayer = x
        return this;
    }
    type (x: objType) {
        this._type = x
        return this;
    }
    //#endregion
    //#region customData
    flip (x: vec2) {
        this._customData._flip = x
        return this;
    }
    disableNoteGravity (x: boolean) {
        this._customData._disableNoteGravity = x
        return this;
    }
    disableSpawnEffect (x: boolean) {
        this._customData._disableSpawnEffect = x
        return this;
    }
    disableNoteLook (x: boolean) {
        this._customData._disableNoteLook = x
        return this;
    }
    //#endregion
    push () {
        notes.push(this);
        return this;
    }
}

export class Wall extends Object {
    _duration: number;
    _width: number;
    constructor(obj: any) {
        super(obj);
        this._duration = 1;
        this._width = 1;
    }
    duration (x: number) {
        this._duration = x
        return this;
    }
    push (edge?: number) {
        if (typeof edge !== 'undefined' && edge !== null && this._customData._scale) {
            if (!this._customData._animation._scale) {
                this._customData._animation._scale = [edge, edge, edge];
            }
            const wallScale = this._customData._scale
            const scaledUp = JSON.parse(JSON.stringify(wallScale));
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
export class CustomData {
    _customData: {
        _track?: Track,
        _flip?: vec2,
        _color?: vec4,
        _position?: vec2,
        _rotation?: vec3,
        _localRotation?: vec3,
        _scale?: vec3,
        _noteJumpMovementSpeed?: number,
        _noteJumpStartBeatOffset?: number,
        _disableNoteGravity?: boolean,
        _disableSpawnEffect?: boolean,
        _disableNoteLook?: boolean,
        _fake?: boolean,
        _interactable?: boolean,
        _cutDirection?: number
    }
    constructor(t: { _customData: any; }) {
        this._customData = t._customData
    }
    /**
     * 
     * @param {boolean} x
     * @description If true, object will be fake.
     */
    fake (x: boolean) {
        this._customData._fake = x
        return this;
    }
    /**
     * 
     * @param {boolean} x
     * @description If false, object cannot be interacted with.
     */
    interactable (x: boolean) {
        this._customData._interactable = x
        return this;
    }
    /**
     * 
     * @param {number} x
     * @description Sets the NJS of the object.
     */
    njs (x: number) {
        this._customData._noteJumpMovementSpeed = x
        return this; 
    }
    /**
     * 
     * @param {number} x 
     * @description Sets the offset of the object.
     */
    offset (x: number) {
        this._customData._noteJumpStartBeatOffset = x
        return this; 
    }
    /**
     * 
     * @param {[number, number]} x
     * @description Sets the position of the object
     */
    pos (x: vec2) {
        this._customData._position = x
        return this; 
    }
    /**
     * 
     * @param {[number, number, number]} x 
     * @description Sets the initial rotation of the object
     */
    rot (x: vec3) {
        this._customData._rotation = x
        return this; 
    }
    /**
     * 
     * @param {[number, number, number]} x 
     * @description Sets the initial local rotation of the object
     */
    localRot (x: vec3) {
        this._customData._localRotation = x
        return this; 
    }
    /**
     * 
     * @param {[number, number, number]} x 
     * @returns 
     */
    scale (x: vec3) {
        this._customData._scale = x
        return this;
    }
    /**
     * 
     * @param {[number, number, number, number?]} x 
     * @description Sets the initial RGBA values of the object
     */
    color (x: vec4) {
        this._customData._color = x
        return this; 
    }
    /**
     *
     * @param {[number, number]} x 
     * @description DEPRECATED, DO NOT USE
     */
    flip (x: vec2) {
        this._customData._flip = x
        return this; 
    }
    /**
     *
     * @param {number} x  
     * @description Overrides the vanilla _cutDirection with a degrees value.
     */
    dir (x: number) {
        this._customData._cutDirection = x
        return this; 
    }
}


export class Animation {
    _customData: {
        _animation: {
            _position?: vec3anim,
            _definitePosition?: vec3anim,
            _rotation?: vec3anim,
            _localRotation?: vec3anim,
            _scale?: vec3anim,
            _color?: vec4anim,
            _interactable?: vec1anim,
            _dissolve?: vec1anim,
            _dissolveArrow?: vec1anim
        }
    }
    // deno-lint-ignore ban-types
    constructor(t: { _customData: { _animation: {}; }; }) {
        if (!t._customData._animation) t._customData._animation = {}
        this._customData = t._customData
    }
    /**
     * 
     * @param {Array} x Keyframe array
     * @description Position animation
     */
    pos (x: vec3anim) {
        this._customData._animation._position = x
        return this;
    }
    /**
     * 
     * @param {Array} x Keyframe array
     * @description Definite position animation
     */
    defPos (x: vec3anim) {
        this._customData._animation._definitePosition = x
        return this;
    }
    /**
     * 
     * @param {Array} x Keyframe array
     * @description Rotation animation
     */
    rot (x: vec3anim) {
        this._customData._animation._rotation = x
        return this;
    }
    /**
     * 
     * @param {Array} x Keyframe array
     * @description Local rotation animation
     */
    localRot (x: vec3anim) {
        this._customData._animation._localRotation = x
        return this;
    }
    /**
     * 
     * @param {Array} x Keyframe array
     * @description Scale animation
     */
    scale (x: vec3anim) {
        this._customData._animation._scale = x
        return this;
    }
    /**
     * 
     * @param {Array} x Keyframe array
     * @description Dissolve animation
     */
    dis (x: vec1anim) {
        this._customData._animation._dissolve = x
        return this;
    }
    /**
     * 
     * @param {Array} x Keyframe array
     * @description Dissolve arrow animation
     */
    disArr (x: vec1anim) {
        this._customData._animation._dissolveArrow = x
        return this;
    }
    /**
     * 
     * @param {Array} x Keyframe array
     * @description Dissolve arrow animation
     */
    interactable (x: vec1anim) {
        this._customData._animation._interactable = x
        return this;
    }
    /**
     * 
     * @param {Array} x Keyframe array
     * @description Color animation
     */
    color (x: vec4anim) {
        this._customData._animation._color = x
        return this;
    }
}