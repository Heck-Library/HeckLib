import ease from "../consts/easing";
import AnimateTrack from "../events/animateTrack";
import HSVtoRGB from "../functions/hsvToRgb";
import random from "../functions/random";
import RGBtoHSV from "../functions/rgbToHsv";
import PointDefinition from "../map/pointDefinition";
import { definitionNames } from "../map/variables";
import Wall from "../objects/wall";
import { vec4 } from "../types/vectors";

/**
 * Properties for the ParticleTunnel effect
 * ```ts
* start: number;          // The starting time of the particles
* end: number;            // The ending time of the tunnel
* radius?: number;        // Distance of the closest particles to the player
* spread?: number;        // Perimeter width of the particle tunnel
* distance?: number;      // How far in the z axis do the particles reach
* noise?: number;         // Noise to the colors
* density?: number;       // How densely are the particles generated (higher = more particles)
* fadeInTime?: number;    // How fast should the particles fade in
* fadeOutTime?: number;   // How fast should the particles fade out
* particleSize?: number;  // How big the particles should be
* track?: Track;          // The track the particles should be set on
* color?: vec4;           // The base color of the particles
* ```
*/
interface particleTunnelProperties {
   start: number;
   end: number;
   radius?: number;
   spread?: number;
   distance?: number;
   noise?: number;
   density?: number;
   fadeInTime?: number;
   fadeOutTime?: number;
   particleSize?: number;
   track?: string | string[];
   color?: vec4;
}

export default class ParticleTunnel {
   /**
    * The starting time of the particles
    * Default: undefined
    */
   start: number;
   /**
    * The end time of the tunnel
    * Default: undefined
    */
   end: number;
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
   track?: string | string[];
   /**
    * The base color of the particles
    * Default: [1, 1, 1, 1]
    */
   color: vec4;

   private duration: number;

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

       this.start = p.start;
       this.end = p.end;
       this.radius = 10;
       this.spread = 5;
       this.distance = 25;
       this.noise = 0;
       this.density = 10;
       this.fadeInTime = 1;
       this.fadeOutTime = 1;
       this.particleSize = 0.1;
       this.color = [1, 1, 1, 1];
       this.duration = p.end - p.start;

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
       let track: string | string[] = "ParticleTunnelTrack";
       if (this.track) {
           if (Array.isArray(this.track)) this.track = ["ParticleTunnelTrack", ...this.track]
           else track = ["ParticleTunnelTrack", this.track];
       }
       if (!definitionNames.includes(`PTWallDis${this.start}`)) {
           new PointDefinition(`PTWallDis${this.start}`, [
               [0, 0],
               [1, this.fadeInTime/this.duration, ease.Out.Sine],
               [1, (this.duration - this.fadeOutTime) / this.duration],
               [0, 1, ease.In.Sine]
           ]).push();
       }
       new AnimateTrack(this.start - 16, {
           track: track,
           duration: 0,
           dissolve: [0]
       }).push();
       new AnimateTrack(this.start, {
           track: track,
           duration: this.fadeInTime,
           dissolve: [
               [0, 0],
               [1, 1, ease.Out.Sine]
           ]
       }).push();
       new AnimateTrack(this.end, {
           track: track,
           duration: this.fadeOutTime,
           dissolve: [
               [1, 0],
               [0, 1, ease.In.Sine]
           ]
       }).push();
       for (let i = this.start - 4; i <= this.end + 4; i += 1/this.density) {
           let wallCol: vec4 = this.color;
           if (this.noise > 0) {
               const hsvColor = RGBtoHSV(this.color[0], this.color[1], this.color[2]);
               hsvColor[0] += random(-this.noise / 255, this.noise / 255);
               wallCol = [...HSVtoRGB(...hsvColor), this.color[3]];
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
               scale: [this.particleSize / 12, this.particleSize / 12, this.particleSize / 12],
           }, {
               //Animation data
               definitePosition: [0, random(this.radius, this.spread), random(-1, this.distance)],
               dissolve: `PTWallDis${this.start}`,
               rotation: [
                   [0, 0, random(-180, 180), 0],
                   [0, 0, 0, 1]
               ],
               scale: [12, 12, 12]
           }).push();
       }
   }
}