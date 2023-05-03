import { vec1anim, vec3, vec3anim } from "../types/vectors";

export interface IParticleGenerator {
    /**
     * ### Start Time
     * 
     * The time in beats when the particle generator will be spawned in.
     * 
     * Default?: `0`
     */
    startTime: number;
    /**
     * ### End Time
     * 
     * The time in beats when the particle generator will be destroyed.
     * 
     * Default?: `1`
     */
    endTime: number;
    /**
     * ### Lifetime
     * 
     * The lifetime of the particles in beats.
     * 
     * Default?: `1`
     */
    lifetime?: number;
    /**
     * ### Lifetime Variation
     * 
     * The amount of lifetime variation the particles will have.
     * 
     * Default: `0`
     */
    lifetimeVariation?: number;
    /**
     * ### Path Position
     * 
     * The path the particles will follow. This is a `vec3anim` array.
     * 
     * Default?:
     * ```ts
    * [
    *     [0, 0, 0, 0],
    *     [0, 5, 0, 0.5, ease.In.Cubic, SPLINE],
    *     [0, 5, 10, 1, ease.Out.Cubic, SPLINE],
    * ]
    * ```
    */
    pathPosition?: vec3anim;
    /**
     * ### Path Position Variation
     * 
     * The amount of path variation the particles will have on each axis.
     * 
     * Default?: `[0, 0, 0]`
     */
    pathPositionVariation?: vec3;
    /**
     * ### Path Rotation
     * 
     * The rotation of the path in degrees. This is a `vec3anim` array.
     * 
     * Default?:
     * ```ts
     * [
     *     [10, 0, 0, 0],
     *     [0, 0, 0, 1]
     * ]
     * ```
     */
    pathRotation?: vec3anim;
    /**
     * ### Path Rotation Variation
     * 
     * The amount of path rotation variation the particles will have on each axis.
     * 
     * Default?: `[0, 0, 0]`
     */
    pathRotationVariation?: vec3;
    /**
     * ### Density
     * 
     * The amount of particles to be generated within a beat.
     * 
     * Default?: `10`
     */
    density?: number;
    /**
     * ### Size
     * 
     * The size of the particles.
     * 
     * Default?: `0.1`
     */
    size?: number;
    /**
     * ### Size Variation
     * 
     * The amount of size variation the particles will have.
     * 
     * Default?: `0`
     */
    sizeVariation?: number;
    /**
     * ### Hue Variation
     * 
     * The amount of hue variation the particles will have valid values are between 0 and 1.
     * 
     * Default?: `0`
     */
    hueVariation?: number;
    /**
     * ### Base Color
     * 
     * The base color of the particles in `[r, g, b, a, colorSpace]`. The last value is the color space, either "HSV" or "RGB".
     * '
     * Default?: `[1, 1, 1, 1, "RGB"]`
     */
    baseColor?: [number, number, number, number, "HSV" | "RGB"];
    /**
     * ### Velocity
     * 
     * The velocity of the particles.
     * 
     * Default?: `2`
     */
    velocity?: number;
    /**
     * ### Velocity Variation
     * 
     * The amount of velocity variation the particles will have.
     * 
     * Default?: `0`
     */
    velocityVariation?: number;
    /**
     * ### Base Direction
     * 
     * The base direction of the particles. This is a rotation value in degrees. Format is `[pitch, yaw, roll]`.
     * 
     * Default?: `[0, 0, 0]`
     */
    baseDirection?: vec3;
    /**
     * ### Direction Variation
     * 
     * The amount of direction variation the particles will have. This is a rotation value in degrees. Format is `[pitch, yaw, roll]`.
     * 
     * Default?: `[0, 0, 0]`
     */
    directionVariation?: vec3;
    /**
     * ### Position
     * 
     * The origin position of the particles in `[x, y, z]`.
     */
    position?: vec3;
    /**
     * ### Position Variation
     * 
     * The amount of position variation the particles will have in `[x, y, z]`.
     * 
     * Default?: `[0, 0, 0]`
     */
    positionVariation?: vec3;
    /**
     * ### Dissolve
     * 
     * The dissolve animation of the particles. This is an array of `[value, time, easing?]` values.
     * 
     * Default?: `[[0, 0], [1, 0.125, ease.Out.Cubic], [1, 0.875], [0, 1, ease.In.Cubic]]`
     */
    dissolve?: vec1anim;
}