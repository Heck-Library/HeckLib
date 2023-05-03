import ease from "../consts/easing";
import SPLINE from "../consts/spline";
import random from "../functions/random";
import { IParticleGenerator } from "../interfaces/particleGenerator";
import PointDefinition from "../map/pointDefinition";
import Wall from "../objects/wall";
import { vec1anim, vec3, vec3anim, vec4 } from "../types/vectors";

export default class ParticleGenerator implements IParticleGenerator {
    /**
     * ### Start Time
     * 
     * The time in beats when the particle generator will be spawned in.
     * 
     * Default: `0`
     */
    public startTime: number = 0;
    /**
     * ### End Time
     * 
     * The time in beats when the particle generator will be destroyed.
     * 
     * Default: `1`
     */
    public endTime: number = 1;
    /**
     * ### Lifetime
     * 
     * The lifetime of the particles in beats.
     * 
     * Default: `1`
     */
    public lifetime: number = 1;
    /**
     * ### Lifetime Variation
     * 
     * The amount of lifetime variation the particles will have.
     * 
     * Default: `0`
     */
    public lifetimeVariation: number = 0;
    /**
     * ### Path
     * 
     * The path the particles will follow. This is a `vec3anim` array.
     * 
     * Default:
     * ```ts
     * [
     *     [0, 0, 0, 0],
     *     [0, 5, 0, 0.5, ease.In.Cubic, SPLINE],
     *     [0, 5, 10, 1, ease.Out.Cubic, SPLINE],
     * ]
     * ```
     */
    public pathPosition: vec3anim = [
        [0, 0, 0, 0],
        [0, 5, 0, 0.5, ease.In.Cubic, SPLINE],
        [0, 5, 10, 1, ease.Out.Cubic, SPLINE],
    ];
    /**
     * ### Path Position Variation
     * 
     * The amount of path variation the particles will have on each axis.
     * 
     * Default: `[0, 0, 0]`
     */
    public pathPositionVariation: vec3 = [0, 0, 0];
    /**
     * ### Path Rotation
     * 
     * The rotation of the path in degrees. This is a `vec3anim` array.
     * 
     * Default:
     * ```ts
     * [
     *     [10, 0, 0, 0],
     *     [0, 0, 0, 1]
     * ]
     * ```
     */
    public pathRotation: vec3anim = [
        [10, 0, 0, 0],
        [0, 0, 0, 1]
    ];
    /**
     * ### Path Rotation Variation
     * 
     * The amount of path rotation variation the particles will have on each axis.
     * 
     * Default: `[0, 0, 0]`
     */
    public pathRotationVariation: vec3 = [0, 0, 0];
    /**
     * ### Density
     * 
     * The amount of particles to be generated within a beat.
     * 
     * Default: `10`
     */
    public density: number = 10;
    /**
     * ### Size
     * 
     * The size of the particles.
     * 
     * Default: `0.1`
     */
    public size: number = 0.1;
    /**
     * ### Size Variation
     * 
     * The amount of size variation the particles will have.
     * 
     * Default: `0`
     */
    public sizeVariation: number = 0;
    /**
     * ### Hue Variation
     * 
     * The amount of hue variation the particles will have valid values are between 0 and 1.
     * 
     * Default: `0`
     */
    public hueVariation: number = 0;
    /**
     * ### Base Color
     * 
     * The base color of the particles in `[r, g, b, a, colorSpace]`. The last value is the color space, either "HSV" or "RGB".
     * '
     * Default: `[1, 1, 1, 1, "RGB"]`
     */
    public baseColor: [number, number, number, number, "HSV" | "RGB"] = [1, 1, 1, 1, "RGB"];
    /**
     * ### Velocity
     * 
     * The velocity of the particles.
     * 
     * Default: `2`
     */
    public velocity: number = 2;
    /**
     * ### Velocity Variation
     * 
     * The amount of velocity variation the particles will have.
     * 
     * Default: `0`
     */
    public velocityVariation: number = 0;
    /**
     * ### Base Direction
     * 
     * The base direction of the particles. This is a rotation value in degrees. Format is `[pitch, yaw, roll]`.
     * 
     * Default: `[0, 0, 0]`
     */
    public baseDirection: vec3 = [0, 0, 0];
    /**
     * ### Direction Variation
     * 
     * The amount of direction variation the particles will have. This is a rotation value in degrees. Format is `[pitch, yaw, roll]`.
     * 
     * Default: `[0, 0, 0]`
     */
    public directionVariation: vec3 = [0, 0, 0];
    /**
     * ### Position
     * 
     * The origin position of the particles in `[x, y, z]`.
     */
    public position: vec3 = [0, 0, 0];
    /**
     * ### Position Variation
     * 
     * The amount of position variation the particles will have in `[x, y, z]`.
     * 
     * Default: `[0, 0, 0]`
     */
    public positionVariation: vec3 = [0, 0, 0];
    /**
     * ### Dissolve
     * 
     * The dissolve animation of the particles. This is an array of `[value, time, easing?]` values.
     * 
     * Default: `[[0, 0], [1, 0.125, ease.Out.Cubic], [1, 0.875], [0, 1, ease.In.Cubic]]`
     */
    public dissolve: vec1anim = [
        [0, 0],
        [1, 0.125, ease.Out.Cubic],
        [1, 0.875],
        [0, 1, ease.In.Cubic]
    ];

    /**
     * ### Constructor
     * 
     * Creates a new particle generator. This is used to generate particles for the particle system. You can use this to create your own particle generators.
     * 
     * ```ts
     * const generator = new ParticleGenerator();
     * ```
     */
    constructor();
    constructor(parameters: IParticleGenerator);
    constructor(parameters?: any) {
        if (parameters) {
            const { startTime, endTime, lifetime, pathPosition, pathPositionVariation, pathRotation, pathRotationVariation, density, sizeVariation, size, hueVariation, baseColor, velocity, velocityVariation, baseDirection, directionVariation, position, positionVariation, dissolve } = parameters;
            if (startTime !== undefined) this.startTime = startTime;
            if (endTime !== undefined) this.endTime = endTime;
            if (lifetime !== undefined) this.lifetime = lifetime;
            if (pathPosition !== undefined) this.pathPosition = pathPosition;
            if (pathPositionVariation !== undefined) this.pathPositionVariation = pathPositionVariation;
            if (pathRotation !== undefined) this.pathRotation = pathRotation;
            if (pathRotationVariation !== undefined) this.pathRotationVariation = pathRotationVariation;
            if (density !== undefined) this.density = density;
            if (size !== undefined) this.size = size;
            if (sizeVariation !== undefined) this.sizeVariation = sizeVariation;
            if (hueVariation !== undefined) this.hueVariation = hueVariation;
            if (baseColor !== undefined) this.baseColor = baseColor;
            if (velocity !== undefined) this.velocity = velocity;
            if (velocityVariation !== undefined) this.velocityVariation = velocityVariation;
            if (baseDirection !== undefined) this.baseDirection = baseDirection;
            if (directionVariation !== undefined) this.directionVariation = directionVariation;
            if (position !== undefined) this.position = position;
            if (positionVariation !== undefined) this.positionVariation = positionVariation;
            if (dissolve !== undefined) this.dissolve = dissolve;
        }
    }

    push(): void {
        if (this.pathPositionVariation[0] === 0 && this.pathPositionVariation[1] === 0 && this.pathPositionVariation[2] === 0) new PointDefinition(`particlePosition${this.startTime}`, this.pathPosition);
        if (this.pathRotationVariation[0] === 0 && this.pathRotationVariation[1] === 0 && this.pathRotationVariation[2] === 0) new PointDefinition(`particleRotation${this.startTime}`, this.pathRotation);
        new PointDefinition(`particleDissolve${this.startTime}`, this.dissolve);
        for (let i = this.startTime; i <= this.endTime; i += 1 / this.density) {
            const startingPoint = [
                this.position[0] + random(-this.positionVariation[0], this.positionVariation[0]),
                this.position[1] + random(-this.positionVariation[1], this.positionVariation[1]),
                this.position[2] + random(-this.positionVariation[2], this.positionVariation[2])
            ];
            const defPosPath = this.pathPosition;
            for (let point of defPosPath) {
                point[0] += random(-this.pathPositionVariation[0], this.pathPositionVariation[0]) + startingPoint[0];
                point[1] += random(-this.pathPositionVariation[1], this.pathPositionVariation[1]) + startingPoint[1];
                point[2] += random(-this.pathPositionVariation[2], this.pathPositionVariation[2]) + startingPoint[2];
            }
            const defRotPath = this.pathRotation;
            for (let point of defRotPath) {
                point[0] += random(-this.pathRotationVariation[0], this.pathRotationVariation[0]);
                point[1] += random(-this.pathRotationVariation[1], this.pathRotationVariation[1]);
                point[2] += random(-this.pathRotationVariation[2], this.pathRotationVariation[2]);
            }
            const color: vec4 = [this.baseColor[0], this.baseColor[1], this.baseColor[2], this.baseColor[3]];
            if (this.baseColor[4] === "HSV") {
                
            }
            new Wall({
                time: i,
                duration: this.lifetime + random(-this.lifetimeVariation, this.lifetimeVariation)
            }, {
                scale: [this.size, this.size, this.size],
                color: color
            })
        }
    }
}