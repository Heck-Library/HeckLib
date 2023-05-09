import cutDirection from "../../../../types/cutDirection";
import lineIndex from "../../../../types/lineIndex";
import lineLayer from "../../../../types/lineLayer";
import noteType from "../../../../types/noteType";
import { vec1anim, vec2, vec3, vec3anim, vec4, vec4anim } from "../../../../types/vectors";

export default interface V2JsonNote {
    _time: number;
    _lineIndex: lineIndex;
    _lineLayer: lineLayer;
    _type: noteType;
    _cutDirection: cutDirection;
    _customData?: {
        _color?: vec4;
        _track?: string | string[];
        _cutDirection?: cutDirection;
        _disableSpawnEffect?: boolean;
        _disableNoteGravity?: boolean;
        _disableNoteLook?: boolean;
        _fake?: boolean;
        _interactable?: boolean;
        _position?: vec2;
        _rotation?: vec3;
        _scale?: vec3;
        _flip?: vec2;
        _localRotation?: vec3;
        _noteJumpStartBeatOffset?: number;
        _noteJumpMovementSpeed?: number;
        _animation?: {
            _definitePosition?: vec3anim;
            _rotation?: vec3anim;
            _localRotation?: vec3anim;
            _position?: vec3anim;
            _scale?: vec3anim;
            _dissolve?: vec1anim;
            _dissolveArrow?: vec1anim;
            _color?: vec4anim;
        }
    }
}