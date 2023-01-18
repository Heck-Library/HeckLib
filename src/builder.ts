// deno-lint-ignore-file no-namespace

import { animateTrackData } from "./main.ts"
import { events } from "./mapHandler.ts"
import { Track, vec1anim, vec3anim, vec4anim } from "./types.ts"

export namespace Builder {
    export class AnimateTrack {
        json: {
            time: number
            type: string
            data: animateTrackData
        }
        constructor(time: number) {
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
        //#region methods
        /**
         *  The track that should be animated.
         */
        track (track: Track) {
                this.json.data.track = track
                return this
        }
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
         * Animates local position.
         */
        localPos (animation: vec3anim) {
                this.json.data.localPosition = animation;
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
        /**
         * Animates the time.
         */
        time (animation: vec1anim) {
                this.json.data.timeAnim = animation
                return this
        }
        //#endregion
    
        push() {
            events.push(this);
        }
    }
}