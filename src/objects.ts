// deno-lint-ignore-file no-explicit-any

import { isArr } from "./general.ts";
import { V3 } from "./main.ts";
import { bombs, fakeBombs, fakeNotes, fakeWalls, notes, walls } from "./mapHandler.ts";
import {
    lineIndex,
    lineLayer,
    noteDir,
    objType,
    Track,
    vec1anim,
    vec2,
    vec3,
    vec3anim,
    vec4,
    vec4anim,
} from "./types.ts";

/**
 * @param obj The objects to filter (either notes or walls).
 * @param start What the start beat to filter should be.
 * @param end What the end beat to filter should be.
 * @param type What the type to filter should be (CAN ONLY BE APPLIED TO NOTES).
 * @param direction What the direction to filter should be (CAN ONLY BE APPLIED TO NOTES).
 * @returns The filtered objects.
 */
 export function filter(
    obj: any,
    start: number,
    end: number,
    type?: 0 | 1 | 3,
    direction?: number,
) {
    if (!V3) {
        if (obj == notes) {
            if (
                typeof type !== "undefined" && type !== null &&
                (typeof direction === "undefined" || direction === null)
            ) {
                return notes.filter((n: { _time: number; _type: number }) =>
                    n._time >= start && n._time <= end && n._type == type
                );
            } else if (
                typeof direction !== "undefined" && direction !== null &&
                (typeof type === "undefined" || type === null)
            ) {
                return notes.filter((n: { _time: number; _cutDirection: number }) =>
                    n._time >= start && n._time <= end && n._cutDirection == direction
                );
            } else if (
                typeof direction !== "undefined" && direction !== null &&
                typeof type !== "undefined" && type !== null
            ) {
                return notes.filter((
                    n: { _time: number; _type: number; _cutDirection: number },
                ) =>
                    n._time >= start && n._time <= end && n._type == type &&
                    n._cutDirection == direction
                );
            } else {
                return notes.filter((n: { _time: number }) =>
                    n._time >= start && n._time <= end
                );
            }
        }
        if (obj == walls) {
            return walls.filter((w: { _time: number }) =>
                w._time >= start && w._time <= end
            );
        }
    }
    if (V3) {
        if (obj == notes) {
            if (
                typeof type !== "undefined" && type !== null &&
                (typeof direction === "undefined" || direction === null)
            ) {
                return notes.filter((n: { b: number; c: number }) =>
                    n.b >= start && n.b <= end && n.c == type
                );
            } else if (
                typeof direction !== "undefined" && direction !== null &&
                (typeof type === "undefined" || type === null)
            ) {
                return notes.filter((n: { b: number; d: number }) =>
                    n.b >= start && n.b <= end && n.d == direction
                );
            } else if (
                typeof direction !== "undefined" && direction !== null &&
                typeof type !== "undefined" && type !== null
            ) {
                return notes.filter((
                    n: { b: number; c: number; d: number },
                ) =>
                    n.b >= start && n.b <= end && n.c == type &&
                    n.d == direction
                );
            } else {
                return notes.filter((n: { b: number }) =>
                    n.b >= start && n.b <= end
                );
            }
        }
        if (obj == walls) {
            return walls.filter((w: { b: number }) =>
                w.b >= start && w.b <= end
            );
        }
    }
    return notes[0];
}

/**
 * Assign a track to notes or walls.
 * @param obj The array of objects that the track should be assigned to.
 * @param track The array of tracks or the name of the track that should be assigned.
 */
 export function track(obj: any[], track: Track) {
    obj.forEach((n: any) => {
        if (!V3) {
            const d = n._customData;
            if (typeof d._track !== "undefined" && d._track !== null) {
                if (isArr(d._track)) {
                    const tracks = d._track;
                    if (isArr(track)) {
                        tracks.push(...track);
                    } else {
                        tracks.push(track);
                    }
                } else {
                    if (isArr(track)) {
                        const a = [...track, d._track];
                        d._track = a;
                    } else {
                        d._track = [d._track, track];
                    }
                }
            } else {
                d._track = track;
            }
        }
        if (V3) {
            const d = n.customData;
            if (typeof d.track !== "undefined" && d.track !== null) {
                if (isArr(d.track)) {
                    const tracks = d.track;
                    if (isArr(track)) {
                        tracks.push(...track);
                    } else {
                        tracks.push(track);
                    }
                } else {
                    if (isArr(track)) {
                        const a = [...track, d.track];
                        d.track = a;
                    } else {
                        d.track = [d._rack, track];
                    }
                }
            } else {
                d.track = track;
            }
        }
    });
}

export class Object {
    _time: number;
    _lineIndex: lineIndex;
    _type: objType;
    _customData: {
        _track?: Track;
        _color?: vec4;
        _position?: vec2;
        _rotation?: vec3;
        _localRotation?: vec3;
        _scale?: vec3;
        _size?: vec3;
        _noteJumpMovementSpeed?: number;
        _noteJumpStartBeatOffset?: number;
        _fake?: boolean;
        _interactable?: boolean;
        _animation: {
            _position?: vec3anim;
            _definitePosition?: vec3anim;
            _rotation?: vec3anim;
            _localRotation?: vec3anim;
            _scale?: vec3anim;
            _color?: vec4anim;
            _interactable?: vec1anim;
            _dissolve?: vec1anim;
            _dissolveArrow?: vec1anim;
        };
    };
    constructor(time: number) {
        this._time = time;
        this._lineIndex = 0;
        this._type = 0;
        this._customData = {
            _animation: {},
        };
    }
    //#region customData
    /**
     * The track that should be applied to this object.
     */
    track(x: Track) {
        this._customData._track = x;
        return this;
    }
    /**
     * The color that should be applied to this object.
     */
    color(x: vec4) {
        this._customData._color = x;
        return this;
    }
    /**
     * The line that should be applied to this object.
     */
    lineIndex(x: 0 | 1 | 2 | 3) {
        this._lineIndex = x;
        return this;
    }
    /**
     * The position that should be applied to this object.
     */
    pos(x: vec2) {
        this._customData._position = x;
        return this;
    }
    /**
     * The rotation that should be applied to this object.
     */
    rot(x: vec3) {
        this._customData._rotation = x;
        return this;
    }
    /**
     * The local rotation that should be applied to this object.
     */
    localRot(x: vec3) {
        this._customData._localRotation = x;
        return this;
    }
    /**
     * The scale that should be applied to this object.
     */
    scale(x: vec3) {
        if (V3) {
            this._customData._size = x;
        } else this._customData._scale = x;
        return this;
    }
    /**
     * The NJS that should be applied to this object.
     */
    njs(x: number) {
        this._customData._noteJumpMovementSpeed = x;
        return this;
    }
    /**
     * The offset that should be applied to this object.
     */
    offset(x: number) {
        this._customData._noteJumpStartBeatOffset = x;
        return this;
    }
    /**
     * Whether the object should be fake or not.
     */
    fake(x: boolean) {
        this._customData._fake = x;
        return this;
    }
    /**
     * Whether the objects should be interactable or not.
     */
    interactable(x: boolean) {
        this._customData._interactable = x;
        return this;
    }
    //#endregion

    //#region animation
    /**
     * The position animation that should be applied to this object.
     */
    posAnim(x: vec3anim) {
        this._customData._animation._position = x;
        return this;
    }
    /**
     * The definite position animation that should be applied to this object.
     */
    defPosAnim(x: vec3anim) {
        this._customData._animation._definitePosition = x;
        return this;
    }
    /**
     * The rotation animation that should be applied to this object.
     */
    rotAnim(x: vec3anim) {
        this._customData._animation._rotation = x;
        return this;
    }
    /**
     * The local rotation animation that should be applied to this object.
     */
    localRotAnim(x: vec3anim) {
        this._customData._animation._localRotation = x;
        return this;
    }
    /**
     * The scale animation animation that should be applied to this object.
     */
    scaleAnim(x: vec3anim) {
        this._customData._animation._scale = x;
        return this;
    }
    /**
     * The color animation that should be applied to this object.
     */
    colorAnim(x: vec4anim) {
        this._customData._animation._color = x;
        return this;
    }
    /**
     * The interactable animation that should be applied to this object (0 = not interactable, > 0 = interactable).
     */
    interactableAnim(x: vec1anim) {
        this._customData._animation._interactable = x;
        return this;
    }
    /**
     * The dissolve animation that should be applied to this object.
     */
    disAnim(x: vec1anim) {
        this._customData._animation._dissolve = x;
        return this;
    }
    /**
     * The dissolve arrow animation that should be applied to this object.
     */
    disArrAnim(x: vec1anim) {
        this._customData._animation._dissolveArrow = x;
        return this;
    }
    //#endregion
}

export class Note extends Object {
    _lineLayer: lineLayer;
    _cutDirection: noteDir;
    _type: objType;
    declare _customData: {
        _track?: Track;
        _flip?: vec2;
        _color?: vec4;
        _position?: vec2;
        _rotation?: vec3;
        _localRotation?: vec3;
        _scale?: vec3;
        _noteJumpMovementSpeed?: number;
        _noteJumpStartBeatOffset?: number;
        _disableNoteGravity?: boolean;
        _disableSpawnEffect?: boolean;
        _disableNoteLook?: boolean;
        _fake?: boolean;
        _interactable?: boolean;
        _animation: {
            _position?: vec3anim;
            _definitePosition?: vec3anim;
            _rotation?: vec3anim;
            _localRotation?: vec3anim;
            _scale?: vec3anim;
            _color?: vec4anim;
            _interactable?: vec1anim;
            _dissolve?: vec1anim;
            _dissolveArrow?: vec1anim;
        };
    };

    constructor(time: number) {
        super(time);
        this._lineLayer = 0;
        this._cutDirection = 0;
        this._type = 0;
    }
    //#region vanilla
    /**
     * The direction of the note.
     */
    direction(x: noteDir) {
        this._cutDirection = x;
        return this;
    }
    /**
     * The line layer of the note.
     */
    lineLayer(x: lineLayer) {
        this._lineLayer = x;
        return this;
    }
    /**
     * The type of the note.
     */
    type(x: objType) {
        this._type = x;
        return this;
    }
    //#endregion
    //#region customData
    /**
     * The flip amount of the note.
     */
    flip(x: vec2) {
        this._customData._flip = x;
        return this;
    }
    /**
     * Whether to disabled note gravity or not.
     */
    disableNoteGravity(x: boolean) {
        this._customData._disableNoteGravity = x;
        return this;
    }
    /**
     * Whether to disabled spawn effect or not.
     */
    disableSpawnEffect(x: boolean) {
        this._customData._disableSpawnEffect = x;
        return this;
    }
    /**
     * Whether to disabled note look or not.
     */
    disableNoteLook(x: boolean) {
        this._customData._disableNoteLook = x;
        return this;
    }
    //#endregion
    /**
     * Push the note to the map data.
     */
    push() {
        let data = JSON.stringify(this);
        let out;
        let bomb;
        if (V3) {
            data = data.replace(/_/g, "")
                .replace("time", "b")
                .replace("lineIndex", "x")
                .replace("lineLayer", "y")
                .replace("\"type", "\"a\": 0,\"c")
                .replace("cutDirection", "d");
            out = JSON.parse(data);
            if (out.c == 3) {
                bomb = {
                    b: out.b,
                    x: out.x,
                    y: out.y,
                    customData: out.customData
                }
                if (JSON.stringify(bomb).includes("fake")) {
                    let stringBomb = JSON.stringify(bomb);
                    stringBomb = stringBomb.replace(/,?"fake":(true|false)/g, "")
                    bomb = JSON.parse(stringBomb);
                    fakeBombs.push(bomb);
                    return;
                }
                bombs.push(bomb);
            }
            if (data.includes("fake")) {
                data = data.replace(/"fake":(true|false),?/g, "")
                out = JSON.parse(data);
                fakeNotes.push(out);
                return;
            }
        }
        if (!V3) {
            out = this;
        }
        notes.push(out);
    }
}

export class Wall extends Object {
    _duration: number;
    _width: number;
    constructor(time: number) {
        super(time);
        this._duration = 1;
        this._width = 1;
    }
    duration(x: number) {
        this._duration = x;
        return this;
    }
    push(edge?: number) {
        if (
            typeof edge !== "undefined" && edge !== null && this._customData._scale
        ) {
            if (!this._customData._animation._scale) {
                this._customData._animation._scale = [edge, edge, edge];
            }
            const wallScale = this._customData._scale;
            const scaledUp = JSON.parse(JSON.stringify(wallScale));
            scaledUp[0] *= edge;
            scaledUp[1] *= edge;
            scaledUp[2] *= edge;
            this._customData._animation._scale = [...scaledUp];
            wallScale[0] /= edge;
            wallScale[1] /= edge;
            wallScale[2] /= edge;
            this._customData._scale = [...wallScale];
        }
        let out;
        if (V3) {
            let data = JSON.stringify(this);
            data = data.replace(/_/g, "")
                .replace("time", "b")
                .replace("\"lineIndex", "\"y\":0,\"x")
                .replace("duration", "d")
                .replace("\"width", "\"h\":5,\"w")
                .replace(/"type":\d+,?/, "")
            out = JSON.parse(data);
            if (data.includes("fake")) {
                data = data.replace(/"fake":(true|false),?/g, "")
                out = JSON.parse(data);
                fakeWalls.push(out);
                return;
            }
        }
        if (!V3) {
            out = this;
        }
        walls.push(out);
    }
}

export class CustomData {
    objs: any[]
    //_customData: {
    //    _track?: Track;
    //    _flip?: vec2;
    //    _color?: vec4;
    //    _position?: vec2;
    //    _rotation?: vec3;
    //    _localRotation?: vec3;
    //    _scale?: vec3;
    //    _noteJumpMovementSpeed?: number;
    //    _noteJumpStartBeatOffset?: number;
    //    _disableNoteGravity?: boolean;
    //    _disableSpawnEffect?: boolean;
    //    _disableNoteLook?: boolean;
    //    _fake?: boolean;
    //    _interactable?: boolean;
    //    _cutDirection?: number;
    //};
    constructor(t: any[]) {
        this.objs = [...t];
    }
    track(x: Track) {
        this.objs.forEach((n: any) => {
            if (!V3) {
                n._customData._track = x;
            }
            if (V3) {
                n.customData.track = x;
            }
        });
        return this;
    }
    disableNoteGravity(x: boolean) {
        this.objs.forEach((n: any) => {
            if (!V3) {
                n._customData._disableNoteGravity = x;
            }
            if (V3) {
                n.customData.disableNoteGravity = x;
            }
        })
        return this;
    }
    disableNoteLook(x: boolean) {
        this.objs.forEach((n: any) => {
            if (!V3) {
                n._customData._disableNoteLook = x;
            }
            if (V3) {
                n.customData.disableNoteLook = x;
            }
        })
        return this;
    }
    disableSpawnEffect(x: boolean) {
        this.objs.forEach((n: any) => {
            if (!V3) {
                n._customData._disableSpawnEffect = x;
            }
            if (V3) {
                let thing = true;
                if (x) {
                    thing = false
                }
                n.customData.spawnEffect = thing;
            }
        })
        return this;
    }
    /**
     * Whether the object should be fake or not.
     */
    fake(x: boolean) {
        this.objs.forEach((n:any) => {
            if (!V3) {
                n._customData._fake = x;
            } if (V3 && x) {
                if (n.x && n.y && n.a && n.c) {
                    if (notes.includes(n)) {
                        delete notes[notes.indexOf(n)]
                        fakeNotes.push(n);
                    } else if (bombs.includes(n)) {
                        delete bombs[bombs.indexOf(n)]
                        fakeBombs.push(n);
                    }
                } else if (n.w && n.h) {
                    if (walls.includes(n)) {
                        delete walls[walls.indexOf(n)]
                        fakeWalls.push(n);
                    }
                }
            }
        });
        return this;
    }
    /**
     * Whether the object should be interactable or not.
     */
    interactable(x: boolean) {
        if (!V3) this.objs.forEach((n:any) => n._customData._interactable = x);
        if (V3) {
            let ye: boolean;
            if (x) ye = false
            if (!x) ye = true
            this.objs.forEach((n:any) => n.customData.uninteractable = ye);
        }
        this.final()
        return this;
    }
    /**
     * What the NJS of the object should be.
     */
    njs(x: number) {
        if (!V3) this.objs.forEach((n:any) => n._customData._noteJumpMovementSpeed = x);
        if (V3) this.objs.forEach((n:any) => n.customData.noteJumpMovementSpeed = x);
        this.final()
        return this;
    }
    /**
     * What the offset of the object should be.
     */
    offset(x: number) {
        if (!V3) this.objs.forEach((n:any) => n._customData._noteJumpStartBeatOffset = x);
        if (V3) this.objs.forEach((n:any) => n.customData.noteJumpStartBeatOffset = x);
        this.final()
        return this;
    }
    /**
     * What the position value of the object should be.
     */
    pos(x: vec2) {
        if (!V3) this.objs.forEach((n:any) => n._customData._position = x);
        if (V3) this.objs.forEach((n:any) => n.customData.coordinates = x);
        this.final()
        return this;
    }
    /**
     * What the rotation value of the object should be.
     */
    rot(x: vec3) {
        if (!V3) this.objs.forEach((n:any) => n._customData._rotation = x);
        if (V3) this.objs.forEach((n:any) => n.customData.worldRotation = x);
        this.final()
        return this;
    }
    /**
     * What the local rotation value of the object should be.
     */
    localRot(x: vec3) {
        if (!V3) this.objs.forEach((n:any) => n._customData._localRotation = x);
        if (V3) this.objs.forEach((n:any) => n.customData.localRotation = x);
        this.final()
        return this;
    }
    /**
     * What the scale of the object should be.
     */
    scale(x: vec3) {
        if (!V3) this.objs.forEach((n:any) => n._customData._scale = x);
        if (V3) {
            this.objs.forEach((n:any) => {
                if (notes.includes(n) || fakeNotes.includes(n) || bombs.includes(n) || fakeBombs.includes(n)) {
                    n.customData.scale = x
                }
                if (walls.includes(n) || fakeWalls.includes(n)) {
                    n.customData.size = x;
                }
            });
        }
        this.final()
        return this;
    }
    /**
     * What the color of the object should be
     */
    color(x: vec4) {
        if (!V3) this.objs.forEach((n:any) => n._customData._color = x);
        if (V3) this.objs.forEach((n:any) => n.customData.color = x);
        this.final()
        return this;
    }
    /**
     * The direction that the note should be faced towards in degrees.
     */
    dir(x: number) {
        if (!V3) this.objs.forEach((n:any) => n._customData._cutDirection = x);
        if (V3) this.objs.forEach((n:any) => n.a = x);
        this.final()
        return this;
    }
    private final() {
        let data = JSON.stringify(this.objs)
        if (V3) {
            data = data
                .replace("_interactable", "uninteractable")
                .replace("_disableSpawnEffect", "spawnEffect")
                .replace(/_/g, "")
                .replace("position", "coordinates")
                .replace("rotation", "worldRotation");
        }
        return data;
    }
}

export class Animation {
    objs: any[];
    //_customData: {
    //    _animation: {
    //        _position?: vec3anim;
    //        _definitePosition?: vec3anim;
    //        _rotation?: vec3anim;
    //        _localRotation?: vec3anim;
    //        _scale?: vec3anim;
    //        _color?: vec4anim;
    //        _interactable?: vec1anim;
    //        _dissolve?: vec1anim;
    //        _dissolveArrow?: vec1anim;
    //    };
    //};
    constructor(t: any) {
        this.objs = [...t];
        this.objs.forEach((n: any) => {
            if (!V3)
                if (!n._customData._animation) n._customData._animation = {};
            if (V3)
                if (!n.customData.animation) n.customData.animation = {};
        });
    }
    /**
     * The position animation that should be applied to this object.
     */
    pos(x: vec3anim) {
        if (!V3) this.objs.forEach((n: any) => n._customData._animation._position = x);
        if (V3) this.objs.forEach((n: any) => n.customData.animation.position = x);
        return this;
    }
    /**
     * The definite position animation that should be applied to this object.
     */
    defPos(x: vec3anim) {
        if (!V3) this.objs.forEach((n: any) => n._customData._animation._definitePosition = x);
        if (V3) this.objs.forEach((n: any) => n.customData.animation.definitePosition = x);
        return this;
    }
    /**
     * The rotation animation that should be applied to this object.
     */
    rot(x: vec3anim) {
        if (!V3) this.objs.forEach((n: any) => n._customData._animation._rotation = x);
        if (V3) this.objs.forEach((n: any) => n.customData.animation.rotation = x);
        return this;
    }
    /**
     * The local rotation animation that should be applied to this object.
     */
    localRot(x: vec3anim) {
        if (!V3) this.objs.forEach((n: any) => n._customData._animation._localRotation = x);
        if (V3) this.objs.forEach((n: any) => n.customData.animation.localRotation = x);
        return this;
    }
    /**
     * The scale animation animation that should be applied to this object.
     */
    scale(x: vec3anim) {
        if (!V3) this.objs.forEach((n: any) => n._customData._animation._scale = x);
        if (V3) this.objs.forEach((n: any) => n.customData.animation.scale = x);
        return this;
    }
    /**
     * The dissolve animation that should be applied to this object.
     */
    dis(x: vec1anim) {
        if (!V3) this.objs.forEach((n: any) => n._customData._animation._dissolve = x);
        if (V3) this.objs.forEach((n: any) => n.customData.animation.dissolve = x);
        return this;
    }
    /**
     * The dissolve arrow animation that should be applied to this object.
     */
    disArr(x: vec1anim) {
        if (!V3) this.objs.forEach((n: any) => n._customData._animation._dissolveArrow = x);
        if (V3) this.objs.forEach((n: any) => n.customData.animation.dissolveArrow = x);
        return this;
    }
    /**
     * The interactable animation that should be applied to this object (0 = not interactable, > 0 = interactable).
     */
    interactable(x: vec1anim) {
        if (!V3) this.objs.forEach((n: any) => n._customData._animation._interactable = x);
        if (V3) this.objs.forEach((n: any) => n.customData.animation.interactable = x);
        return this;
    }
    /**
     * The color animation that should be applied to this object.
     */
    color(x: vec4anim) {
        if (!V3) this.objs.forEach((n: any) => n._customData._animation._color = x);
        if (V3) this.objs.forEach((n: any) => n.customData.animation.color = x);
        return this;
    }
}
