import { pathAnimData } from "./main.ts";
import { events, V3 } from "./mapHandler.ts";
import { animateTrackData, Track, vec1anim, vec3anim, vec4anim } from "./types.ts";
/**
 * Places an AnimateTrack event
 */
export class AnimateTrack {
    json: {
        time: number
        type: string
        data: animateTrackData
    };
    constructor(time: number, eventData: animateTrackData) {
        this.json = {
            time: time,
            type: "AnimateTrack",
            data: eventData
        };
        return this;
    }
    //#region methods
    /**
     *  The track that should be animated.
     */
    Track (track: Track) {
            this.json.data.track = track
            return this
    }
    /**
     * Which easing the animation should use.
     */
    Easing (easing: string) {
            this.json.data.easing = easing;
            return this
    }
    /**
     * The duration of the animation (in beats).
     */
    Duration (duration: number) {
            this.json.data.duration = duration
            return this
    }
    /**
     * Animates position.
     */
    Pos (animation: vec3anim) {
            this.json.data.position = animation;
            return this
    }
    /**
     * Animates local position.
     */
    LocalPos (animation: vec3anim) {
            this.json.data.localPosition = animation;
            return this
    }
    /**
     * Animates rotation.
     */
    Rot (animation: vec3anim) {
            this.json.data.rotation = animation;
            return this
    }
    /**
     * Animates local rotation.
     */
    LocalRot (animation: vec3anim) {
            this.json.data.localRotation = animation;
            return this
    }
    /**
     * Animates scale.
     */
    Scale (animation: vec3anim) {
            this.json.data.scale = animation;
            return this
    }
    /**
     * Animates color.
     */
    Color (animation: vec4anim) {
            this.json.data.color = animation;
            return this
    }
    /**
     * Animates the dissolve.
     */
    Dis (animation: vec1anim) {
            this.json.data.dissolve = animation
            return this
    }
    /**
     * Animates the arrow dissolve.
     */
    DisArr (animation: vec1anim) {
            this.json.data.dissolveArrow = animation
            return this
    }
    /**
     * Animates interactability (can either be 0 or 1).
     */
    Interactable (animation: vec1anim) {
            this.json.data.interactable = animation
            return this
    }
    /**
     * Animates the time.
     */
    Time (animation: vec1anim) {
            this.json.data.timeAnim = animation
            return this
    }
    //#endregion

    //#region getters and setters
    set time(time: number) { this.json.time = time}
    get time(): number { return this.json.time; }

    get type(): string { return this.json.type; }

    set data(data: animateTrackData) { this.json.data = data; }
    get data(): animateTrackData { return this.json.data; }

    push() {
        events.push(this)
        return this;
    }
}

export class AssignPathAnimation extends AnimateTrack  {
    declare json: {
        time: number
        type: string
        data: pathAnimData
    };
    constructor(time: number, eventData: pathAnimData) {
        super(time, eventData);
        this.json.type = "AssignPathAnimation"
        this.json.data = eventData;
    }
    /**
     * Animates definite position.
     */
    set definitePosition(animation: vec3anim) { this.json.data.definitePosition = animation; }
    get definitePosition(): vec3anim { if (!this.json.data.definitePosition) return []; else return this.json.data.definitePosition; }

    set data(data: animateTrackData) { this.json.data = data; }
    get data(): pathAnimData { return this.json.data; }

    push() {
        events.push(this)
        return this;
    }
}

type parentTrackType = {
    parentTrack: Track,
    childrenTracks: string[]
}

export class TrackParent {
    json: {
        time: number
        type: string
        data: parentTrackType
    }
    
    constructor(time: number, eventData: parentTrackType) {
        this.json = {
            time: time,
            type: "AssignTrackParent",
            data: eventData
        }
    }
    
    set time(time: number) { this.json.time = time; }
    get time(): number { return this.json.time; }

    get type(): string { return this.json.type; }

    set data(data: parentTrackType) { this.json.data = data; }
    get data(): parentTrackType { return this.json.data; }

    /**
     * The name of the parent track.
     */
    parent(x: string) {
        this.json.data.parentTrack = x
        return this;
    }

    /**
     * The name of the child track.
     */
    children(x: string[]) {
        this.json.data.childrenTracks = x
        return this;
    } 
    
    /**
     * Push the track parent to the map data.
     */
    push () {
        events.push(this);
        return this;
    }
}

type playerTrackType = {
    track: Track
}

export class PlayerTrack {
    json: {
        time: number
        type: "AssignPlayerToTrack"
        data: playerTrackType
    }

    constructor(time: number, track: Track) {
        this.json = {
            time: time,
            type: "AssignPlayerToTrack",
            data: {
                track: track
            }
        }
    }

    set time(time: number) { this.json.time = time; }
    get time(): number { return this.json.time; }

    get type(): string { return this.json.type; }

    set data(data: playerTrackType) { this.json.data = data; }
    get data(): playerTrackType { return this.json.data; }

    /**
     * The name of the track that the player should be assigned to.
     */
    track(x: string) {
        this.data.track = x;
        let data = JSON.stringify(this);

        if (V3) {
            data = data.replace(/_/g, "")
                .replace("time", "b")
                .replace("type", "t")
                .replace("data", "d");
        }

        data = JSON.parse(data)
        if (!this.data.track) throw new Error('no track set')
        return this;
    }
    push() {
        events.push(this)
        return this;
    }
}