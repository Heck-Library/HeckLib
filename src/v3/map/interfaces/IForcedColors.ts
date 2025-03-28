import { Vec1, Vec2, Vec3, Vec4 } from "../../../util/vec";

type AnyVec = Vec1 | Vec2 | Vec3 | Vec4;

export interface IForcedColors {
    /**
     * ## Left
     * 
     * Force a specific color for left-handed notes and sliders.
     * 
     * ---
     * 
     * ### Type
     * 
     * Accepts any vector of length 1-4 (RGBA).
     * 
     * #### Cases
     * 
     * - `Vec1: [0.5]` -> `[0.5, 0.5, 0.5, 1]`
     * - `Vec2: [0.5, 0.5]` -> `[0.5, 0.5, 0, 1]`
     * - `Vec3: [0.5, 0.5, 0.5]` -> `[0.5, 0.5, 0.5, 1]`
     * - `Vec4: [0.5, 0.5, 0.5, 0.5]` -> `[0.5, 0.5, 0.5, 0.5]`
     * 
     * ---
     * 
     * ### Example
     * 
     * ```typescript
     * ForcedColors: {
     *     Left: [1, 0] // Red ([1, 0, 0, 1])
     * }
     * ```
     */
    Left?: AnyVec;
    /**
     * ## Right
     * 
     * Force a specific color for Right-handed notes and sliders.
     * 
     * ---
     * 
     * ### Type
     * 
     * Accepts any vector of length 1-4 (RGBA).
     * 
     * #### Cases
     * 
     * - `Vec1: [0.5]` -> `[0.5, 0.5, 0.5, 1]`
     * - `Vec2: [0.5, 0.5]` -> `[0.5, 0.5, 0, 1]`
     * - `Vec3: [0.5, 0.5, 0.5]` -> `[0.5, 0.5, 0.5, 1]`
     * - `Vec4: [0.5, 0.5, 0.5, 0.5]` -> `[0.5, 0.5, 0.5, 0.5]`
     * 
     * ---
     * 
     * ### Example
     * 
     * ```typescript
     * ForcedColors: {
     *     Right: [0, 0, 1] // Blue ([0, 0, 1, 1])
     * }
     * ```
     */
    Right?: AnyVec;
    /**
     * ## Obstacle
     * 
     * Force a specific color for obstacles/walls.
     * 
     * ---
     * 
     * ### Type
     * 
     * Accepts any vector of length 1-4 (RGBA).
     * 
     * #### Cases
     * 
     * - `Vec1: [0.5]` -> `[0.5, 0.5, 0.5, 1]`
     * - `Vec2: [0.5, 0.5]` -> `[0.5, 0.5, 0, 1]`
     * - `Vec3: [0.5, 0.5, 0.5]` -> `[0.5, 0.5, 0.5, 1]`
     * - `Vec4: [0.5, 0.5, 0.5, 0.5]` -> `[0.5, 0.5, 0.5, 0.5]`
     * 
     * ---
     * 
     * ### Example
     * 
     * ```typescript
     * ForcedColors: {
     *     Obstacle: [1, 0, 0, 1] // Red
     * }
     * ```
     */
    Obstacle?: AnyVec;
    /**
     * ## Bomb
     * 
     * Force a specific color for bombs.
     * 
     * ---
     * 
     * ### Type
     * 
     * Accepts any vector of length 1-4 (RGBA).
     * 
     * #### Cases
     * 
     * - `Vec1: [0.5]` -> `[0.5, 0.5, 0.5, 1]`
     * - `Vec2: [0.5, 0.5]` -> `[0.5, 0.5, 0, 1]`
     * - `Vec3: [0.5, 0.5, 0.5]` -> `[0.5, 0.5, 0.5, 1]`
     * - `Vec4: [0.5, 0.5, 0.5, 0.5]` -> `[0.5, 0.5, 0.5, 0.5]`
     * 
     * ---
     * 
     * ### Example
     * 
     * ```typescript
     * ForcedColors: {
     *     Bomb: [0] // Black ([0, 0, 0, 1])
     * }
     * ```
     */
    Bomb?: AnyVec;
}