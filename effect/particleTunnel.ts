import ease from "../consts/ease";
import { Track, vec4 } from "../consts/mod";
import AnimateTrack from "../events/animateTrack";
import random from "../functions/random";
import { pointDefinitions } from "../map/initialize";
import PointDefinition from "../map/pointDefinition";
import Wall from "../objects/wall";

type particleTunnelProperties = {
    /**
     * The starting time of the particles
     * Default: undefined
     */
    time: number;
    /**
     * The duration of the tunnel
     * Default: undefined
     */
    duration: number;
    /**
     * Distance of the closest particles to the player
     * Default: 10
     */
    radius?: number;
    /**
     * Perimeter width of the particle tunnel
     * Default: 5
     */
    spread?: number;
    /**
     * How far in the z axis do the particles reach
     * Default: 25
     */
    distance?: number;
    /**
     * Noise to the colors
     * Default: 0
     */
    noise?: number;
    /**
     * How densely are the particles generated (higher = more particles)
     * Default: 10
     */
    density?: number;
    /**
     * How fast should the particles fade in
     * Default: 0.25
     */
    fadeInTime?: number;
    /**
     * How fast should the particles fade out
     * Default: 0.25
     */
    fadeOutTime?: number;
    /**
     * How big the particles should be
     * Default: 0.1
     */
    particleSize?: number;
    /**
     * The track the particles should be set on
     * Default: undefined
     */
    track?: Track;
    /**
     * The base color of the particles
     * Default: [1, 1, 1, 1]
     */
    color?: vec4;
}

export default class ParticleTunnel {
    /**
     * The starting time of the particles
     * Default: undefined
     */
    time: number;
    /**
     * The duration of the tunnel
     * Default: undefined
     */
    duration: number;
    /**
     * Distance of the closest particles to the player
     * Default: 10
     */
    radius: number;
    /**
     * Perimeter width of the particle tunnel
     * Default: 5
     */
    spread: number;
    /**
     * How far in the z axis do the particles reach
     * Default: 25
     */
    distance: number;
    /**
     * Noise to the colors
     * Default: 0
     */
    noise: number;
    /**
     * How densely are the particles generated (higher = more particles)
     * Default: 10
     */
    density: number;
    /**
     * How fast should the particles fade in
     * Default: 1
     */
    fadeInTime: number;
    /**
     * How fast should the particles fade out
     * Default: 1
     */
    fadeOutTime: number;
    /**
     * How big the particles should be
     * Default: 0.1
     */
    particleSize: number;
    /**
     * The track the particles should be set on
     * Default: undefined
     */
    track?: Track;
    /**
     * The base color of the particles
     * Default: [1, 1, 1, 1]
     */
    color: vec4;

    /**
     * Makes a "tunnel" of particles.
     * 
     * Example:
     * ```ts
     * new Effect.ParticleTunnel({
     *     time: 18, // The beat the particles spawn on
     *     duration: 16, // How long the particles should last
     *     fadeInTime: 2 // The particles will spawn in 2 beats
     * }).push();
     * ```
     */
    constructor(properties: particleTunnelProperties) {
        const p = properties

        this.time = p.time;
        this.duration = p.duration;
        this.radius = 10;
        this.spread = 5;
        this.distance = 25;
        this.noise = 0;
        this.density = 10;
        this.fadeInTime = 1;
        this.fadeOutTime = 1;
        this.particleSize = 0.1;
        this.color = [1, 1, 1, 1];

        if (p.radius) this.radius = p.radius
        if (p.spread) this.spread = p.spread
        if (p.distance) this.distance = p.distance
        if (p.noise) this.noise = p.noise
        if (p.density) this.density = p.density
        if (p.fadeInTime) this.fadeInTime = p.fadeInTime;
        if (p.fadeOutTime) this.fadeOutTime = p.fadeOutTime;
        if (p.particleSize) this.particleSize = 0.1;
        if (p.track) this.track = p.track;
        if (p.color) this.color = p.color;

        return this;
    }

    /**
     * Pushes the wall particles in the map.
     */
    push() : void {
        let track: Track = "ParticleTunnelTrack";
        if (this.track) {
            if (Array.isArray(this.track)) this.track = ["ParticleTunnelTrack", ...this.track]
            else track = ["ParticleTunnelTrack", this.track];
        }
        if (!pointDefinitions.includes(`PTWallDis${this.time}`)) {
            new PointDefinition(`PTWallDis${this.time}`, [
                [0, 0],
                [1, this.fadeInTime/this.duration, ease.Out.Sine],
                [1, (this.duration - this.fadeOutTime) / this.duration],
                [0, 1, ease.In.Sine]
            ]).push();
        }
        new AnimateTrack(this.time - 16, {
            track: track,
            duration: 0,
            dissolve: [0]
        }).push();
        new AnimateTrack(this.time, {
            track: track,
            duration: this.fadeInTime,
            dissolve: [
                [0, 0],
                [1, 1, ease.Out.Sine]
            ]
        }).push();
        new AnimateTrack(this.time + this.duration, {
            track: track,
            duration: this.fadeOutTime,
            dissolve: [
                [1, 0],
                [0, 1, ease.In.Sine]
            ]
        }).push();
        for (let i = this.time - 4; i <= this.time + this.duration + 4; i += 1/this.density) {
            let wallCol: vec4 = this.color;
            if (this.noise > 0) {
                for (let i = 0; i <= 3; i++) {
                    const currentCol = this.color[i];
                    wallCol[i] = currentCol + random(-this.noise / 255, this.noise / 255, 3);
                }
            }
            new Wall({
                //Vanilla data
                time: Math.round(i * 1000)/1000,
                duration: 8,
            }, {
                //Custom data
                track: track,
                fake: true,
                interactable: false,
                color: wallCol,
                rotation: [0, 0, random(-180, 180)],
                scale: [this.particleSize, this.particleSize, this.particleSize],
            }, {
                //Animation data
                definitePosition: [0, random(this.radius, this.spread), random(-1, this.distance)],
                dissolve: `PTWallDis${this.time}`,
                rotation: [
                    [0, 0, random(-180, 180), 0],
                    [0, 0, 0, 1]
                ],
            }).push();
        }
    }
}