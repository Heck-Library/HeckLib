import { writeFileSync } from "fs";
import { isValid } from "./animation.js";
import { isArr } from "./general.js";
import { getActiveDiff, mapData } from "./mapHandler.js";

export class Object {
    constructor(time) {
        this._time = time;
        this._lineIndex = 0;
        this._type = 0;
        this._customData = {};
        this._customData._animation = {};
    }
    LineIndex (x) {
        if (x >= 0 && x <= 3) { this._lineIndex = x }
        else throw new Error('Line index is a number 0 - 3');
        return this;
    }
    Pos (x) {
        if (isArr(x) && x.length == 2) { this._customData._position = x }
        else throw new Error('Object position should have 2 values');
        return this;
    }
    Rot (x) {
        if (isArr(x) && x.length == 3) { this._customData._rotation = x }
        else throw new Error('Object rotation should have 3 values');
        return this;
    }
    LocRot (x) {
        if (isArr(x) && x.length == 3) { this._customData._localRotation = x }
        else throw new Error('Object local rotation should have 3 values');
        return this;
    }
    NJS (x) {
        if (typeof x === 'number') { this._customData._noteJumpMovementSpeed = x }
        else throw new Error('NJS should be a number')
        return this;
    }
    Offset (x) {
        if (typeof x === 'number') { this._customData._noteJumpStartBeatOffset = x }
        else throw new Error('Offset should be a number')
        return this;
    }
    Fake (x) {
        if (typeof x === 'boolean') { this._customData._fake = x }
        else throw new Error('Fake value should be a boolean')
        return this;
    }
    Interactable (x) {
        if (typeof x === 'boolean') { this._customData._interactable = x }
        else throw new Error('Interactable value should be a boolean') 
        return this;
    }

    PosAnim (x) {
        if (isValid(x, 3)) { this._customData._animation._position = x }
        return this;
    }
    DefPosAnim (x) {
        if (isValid(x, 3)) { this._customData._animation._definitePosition = x }
        return this;
    }
    RotAnim (x) {
        if (isValid(x, 3)) { this._customData._animation._rotation = x }
        return this;
    }
    LocRotAnim (x) {
        if (isValid(x, 3)) { this._customData._animation._localRotation = x }
        return this;
    }
    ScaleAnim (x) {
        if (isValid(x, 3)) { this._customData._animation._scale = x }
        return this;
    }
    ColorAnim (x) {
        if (isValid(x, 4)) { this._customData._animation._color = x }
        return this;
    }
    InteractableAnim (x) {
        if (isValid(x, 1)) { this._customData._animation._interactable = x }
        return this;
    }
    DisAnim (x) {
        if (isValid(x, 1)) { this._customData._animation._dissolve = x }
        return this;
    }
    DisArrAnim (x) {
        if (isValid(x, 1)) { this._customData._animation._dissolveArrow = x }
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
        let map = mapData();
        map._notes.push(this);
        writeFileSync(getActiveDiff(true), JSON.stringify(map, null, 4));
        return this;
    }
}

export class Wall extends Object {
    constructor(obj) {
        super(obj);
        this._duration = 1;
    }
    Duration (x) {
        if (typeof x === 'number') { this._duration = x }
        else throw new Error('Duration must be a number');
    }
    End () {
        let map = mapData();
        map._obstacles.push(this);
        writeFileSync(getActiveDiff(true), JSON.stringify(map, null, 4));
        return this;
    }
}