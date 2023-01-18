// deno-lint-ignore-file no-namespace no-explicit-any

import { animateTrackData, pathAnimData } from "./main.ts"
import { events } from "./mapHandler.ts"
import { parentTrackType, playerTrackType, Track, vec1anim, vec3anim, vec4anim } from "./types.ts"

export namespace Builder {
    //#region events
    class BaseEvent {
        json: {
            time: number
            type: string
            data: Record<string, any>
        }
        constructor(time: number) {
            this.json = {
                time: time,
                type: "",
                data: {}
            }
        }
        
        get time(): number { return this.json.time; }
        get type(): string { return this.json.type; }
        get data(): Record<string, any> { return this.json.data; }
        /**
         *  The track that should be animated.
         */
        track (track: Track) {
                this.json.data.track = track
                return this
        }
        push() {
            events.push(this);
            return this;
        }
    }
    class BaseAnimEvent extends BaseEvent {
        constructor(time: number) {
            super(time);
        }
        
        //#region methods
        /**
         * Which easing the animation should use.
         */
        easing (easing: string) {
                this.json.data.easing = easing;
                return this
        }
        /**
         * The duration of the animation (in beats).
         */
        duration (duration: number) {
                this.json.data.duration = duration
                return this
        }
        /**
         * Animates position.
         */
        pos (animation: vec3anim) {
                this.json.data.position = animation;
                return this
        }
        /**
         * Animates rotation.
         */
        rot (animation: vec3anim) {
                this.json.data.rotation = animation;
                return this
        }
        /**
         * Animates local rotation.
         */
        localRot (animation: vec3anim) {
                this.json.data.localRotation = animation;
                return this
        }
        /**
         * Animates scale.
         */
        scale (animation: vec3anim) {
                this.json.data.scale = animation;
                return this
        }
        /**
         * Animates color.
         */
        color (animation: vec4anim) {
                this.json.data.color = animation;
                return this
        }
        /**
         * Animates the dissolve.
         */
        dis (animation: vec1anim) {
                this.json.data.dissolve = animation
                return this
        }
        /**
         * Animates the arrow dissolve.
         */
        disArr (animation: vec1anim) {
                this.json.data.dissolveArrow = animation
                return this
        }
        /**
         * Animates interactability (can either be 0 or 1).
         */
        interactable (animation: vec1anim) {
                this.json.data.interactable = animation
                return this
        }
    }
    export class AnimateTrack extends BaseAnimEvent{
        json: {
            time: number
            type: string
            data: animateTrackData
        }
        constructor(time: number) {
            super(time);
            this.json = {
                time: time,
                type: "AnimateTrack",
                data: {
                    track: [],
                    duration: 1
                }
            }
            return this
        }
        /**
         * Animates local position.
         */
        localPos (animation: vec3anim) {
                this.json.data.localPosition = animation;
                return this
        }
        /**
         * Animates the time.
         */
        timeAnim (animation: vec1anim) {
                this.json.data.timeAnim = animation
                return this
        }
        //#endregion

    }
    export class PathAnimation extends BaseAnimEvent {
        json: {
            time: number
            type: string
            data: pathAnimData
        }
        constructor(time: number) {
            super(time);
            this.json = {
                time: time,
                type: "AssignPathAnimation",
                data: {
                    track: ""
                }
            }
        }
        definitePosition(animation: vec3anim) {
            this.json.data.definitePosition = animation;
            return this;
        }
    }
    export class TrackParent extends BaseEvent {
        json: {
            time: number
            type: string
            data: parentTrackType
        }
        constructor(time: number) {
            super(time);
            this.json = {
                time: time,
                type: "AssignTrackParent",
                data: {
                    parentTrack: "",
                    childrenTracks: [""]
                }
            }
        }
        track(track: Track) {
            this.json.data.parentTrack = track;
            return this;
        }
        children(x: string[]) {
            this.json.data.childrenTracks = x;
            return this;
        }
    }
    export class PlayerTrack extends BaseEvent {
        json: {
            time: number
            type: string
            data: playerTrackType
        }
        constructor(time: number, track: Track) {
            super(time);
            this.json = {
                time: time,
                type: "AssignPlayerToTrack",
                data: {
                    track
                }
            }
        } 
    }
    //#endregion
}