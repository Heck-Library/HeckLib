// deno-lint-ignore-file no-explicit-any


import { pathAnimData } from "./main.ts";
import { events, V3 } from "./mapHandler.ts";
import { animateTrackData, Track, vec1anim, vec3anim, vec4anim } from "./types.ts";
/**
 * Places an AnimateTrack event
 */
export class AnimateTrack {
    stuff = {};
    json: {
        b: number
        t: string
        d: animateTrackData
    };
    constructor(eventData: animateTrackData) {
        this.json = {
            b: eventData.time,
            t: "AnimateTrack",
            d: eventData
        };
        return this;
    }
    //#region methods
    /**
     *  The track that should be animated.
     */
    Track (track: Track) {
            this.json.d.track = track
            return this
    }
    /**
     * Which easing the animation should use.
     */
    Easing (easing: string) {
            this.json.d.easing = easing;
            return this
    }
    /**
     * The duration of the animation (in beats).
     */
    Duration (duration: number) {
            this.json.d.duration = duration
            return this
    }
    /**
     * Animates position.
     */
    Pos (animation: vec3anim) {
            this.json.d.position = animation;
            return this
    }
    /**
     * Animates local position.
     */
    LocalPos (animation: vec3anim) {
            this.json.d.localPosition = animation;
            return this
    }
    /**
     * Animates rotation.
     */
    Rot (animation: vec3anim) {
            this.json.d.rotation = animation;
            return this
    }
    /**
     * Animates local rotation.
     */
    LocalRot (animation: vec3anim) {
            this.json.d.localRotation = animation;
            return this
    }
    /**
     * Animates scale.
     */
    Scale (animation: vec3anim) {
            this.json.d.scale = animation;
            return this
    }
    /**
     * Animates color.
     */
    Color (animation: vec4anim) {
            this.json.d.color = animation;
            return this
    }
    /**
     * Animates the dissolve.
     */
    Dis (animation: vec1anim) {
            this.json.d.dissolve = animation
            return this
    }
    /**
     * Animates the arrow dissolve.
     */
    DisArr (animation: vec1anim) {
            this.json.d.dissolveArrow = animation
            return this
    }
    /**
     * Animates interactability (can either be 0 or 1).
     */
    Interactable (animation: vec1anim) {
            this.json.d.interactable = animation
            return this
    }
    /**
     * Animates the time.
     */
    Time (animation: vec1anim) {
            this.json.d.timeAnim = animation
            return this
    }
    //#endregion

    //#region getters and setters
    set time(time: number) { this.json.b = time}
    get time(): number { return this.json.b; }

    set type(type: string) { this.json.t = type}
    get type(): string { return this.json.t; }

    set easing(easing: string) { this.json.d.easing = easing; }
    get easing(): string { if (!this.json.d.easing) return ""; else return this.json.d.easing; }

    set track(track: Track) { this.json.d.track = track}
    get track(): Track { if (!this.json.d.track) return ""; else return this.json.d.track; }

    set duration(duration: number) { this.json.d.duration = duration}
    get duration(): number { if (!this.json.d.duration) return 0; else return this.json.d.duration}

    set position(animation: vec3anim) { this.json.d.position = animation; }
    get position(): vec3anim { if (!this.json.d.position) return []; else return this.json.d.position; }

    set localPosition(animation: vec3anim) { this.json.d.localPosition = animation; }
    get localPosition(): vec3anim { if (!this.json.d.localPosition) return []; else return this.json.d.localPosition; }

    set rotation(animation: vec3anim) { this.json.d.rotation = animation; }
    get rotation(): vec3anim { if (!this.json.d.rotation) return []; else return this.json.d.rotation; }

    set localRotation(animation: vec3anim) { this.json.d.localRotation = animation; }
    get localRotation(): vec3anim { if (!this.json.d.localRotation) return []; else return this.json.d.localRotation; }

    set scale(animation: vec3anim) { this.json.d.scale = animation; }
    get scale(): vec3anim { if (!this.json.d.scale) return []; else return this.json.d.scale; }

    set color(animation: vec4anim) { this.json.d.color = animation; }
    get color(): vec4anim { if (!this.json.d.color) return []; else return this.json.d.color; }

    set dissolve(animation: vec1anim) { this.json.d.dissolve = animation; }
    get dissolve(): vec1anim { if (!this.json.d.dissolve) return []; else return this.json.d.dissolve; }

    set dissolveArrow(animation: vec1anim) { this.json.d.dissolveArrow = animation; }
    get dissolveArrow(): vec1anim { if (!this.json.d.dissolveArrow) return []; else return this.json.d.dissolveArrow; }

    set interactable(animation: vec1anim) { this.json.d.interactable = animation; }
    get interactable(): vec1anim { if (!this.json.d.interactable) return []; else return this.json.d.interactable; }

    set timeAnim(animation: vec1anim) { this.json.d.timeAnim = animation; }
    get timeAnim(): vec1anim { if (!this.json.d.timeAnim) return []; else return this.json.d.timeAnim; }
    //#endregion
    private jsonifyClasses() {
        const d: any = this.json;
        delete d.d.time;
        Object.assign(this.stuff, d)
        if (!V3) {
            this.stuff = JSON.parse(JSON.stringify(this.stuff)
                .replace(/"b":/g, '"time":')
                .replace(/"t":/g, '"type":')
                .replace(/"d":/g, '"data":')
                .replace(/"([\w\d]+)":/g, '"_$1":')
            )
        }
    }

    push() {
        this.jsonifyClasses()
        events.push(this.stuff)
        return this;
    }
}

export class AssignPathAnimation extends AnimateTrack {
    declare json: { b: number; t: string; d: pathAnimData; };
    constructor(customData: pathAnimData) {
        super(customData);
    }
    /**
     * Animates definite position.
     */
    set definitePosition(animation: vec3anim) { this.json.d.definitePosition = animation; }
    get definitePosition(): vec3anim { if (!this.json.d.definitePosition) return []; else return this.json.d.definitePosition; }
}

export class TrackParent {
    _time: number;
    _type: "AssignTrackParent";
    _data: {
        _parentTrack?: string,
        _childrenTracks?: string[]
    }

    constructor(time: number) {
        this._time = time;
        this._type = "AssignTrackParent";
        this._data = {}
    }

    /**
     * The name of the parent track.
     */
    parent(x: string) {
        this._data._parentTrack = x
        return this;
    }

    /**
     * The name of the child track.
     */
    children(x: string[]) {
        this._data._childrenTracks = x
        return this;
    } 
    
    /**
     * Push the track parent to the map data.
     */
    push () {
        let data = JSON.stringify(this);

        if (V3) {
            data = data.replace(/_/g, "")
                .replace("time", "b")
                .replace("type", "t")
                .replace("data", "d");
        }

        data = JSON.parse(data)
        events.push(data)

        return this;
    }
}

export class PlayerTrack {
    _time: number;
    _type: "AssignPlayerToTrack";
    _data: {
        _track?: string
    }

    constructor(time: number) {
        this._time = time;
        this._type = "AssignPlayerToTrack";
        this._data = {}
    }

    /**
     * The name of the track that the player should be assigned to.
     */
    track(x: string) {
        this._data._track = x;
        let data = JSON.stringify(this);

        if (V3) {
            data = data.replace(/_/g, "")
                .replace("time", "b")
                .replace("type", "t")
                .replace("data", "d");
        }

        data = JSON.parse(data)
        if (!this._data._track) throw new Error('no track set')
        return this;
    }
    push() {
        events.push(this)
        return this;
    }
}