// CREDITS TO REDDEK FOR HELPING ME WITH THIS

import { Obstacle } from "v3/objects";
import { IPolygonParams } from "./interfaces/IPolygonParams";

/**
 * ## Polygon
 * 
 * Creates a polygon
 * 
 * ---
 * 
 * ### Example
 * 
 * ```ts
 * fakeWalls.push(new polygon({
 *     Time: 0,
 *     Track: "track1",
 *     Duration: 4,
 *     Radius: 5,
 *     Amount: 3,
 *     Height: 1,
 *     Length: 1,
 *     Position: [0, 0, 0], 
 *     Color: [1, 1, 1, 1]
 * }).ToWalls());
 * ```
 */
export class Polygon implements IPolygonParams {
    public Time: number;
    public Track?: string;
    public Duration: number;
    public Radius: number;
    public Sides: number;
    public Height: number;
    public Length: number;
    public Position: [number, number, number];
    public Color: [number, number, number, number];

    constructor(params: Partial<IPolygonParams> = {} as IPolygonParams) {
        this.Time = params.Time ?? 0;
        this.Duration = params.Duration ?? 1;
        this.Radius = params.Radius ?? 1;
        this.Sides = params.Sides ?? 8;
        this.Height = params.Height ?? .1;
        this.Length = params.Length ?? .1;
        this.Position = params.Position ?? [0, 0, 0];
        this.Color = params.Color ?? [1, 1, 1, 1];
        this.Track = params.Track;
    }

    /**
     * ## ToWalls
     * 
     * Returns the polygon object as an array of obstacles, so it can be pushed to the map.
     */
    ToWalls(): Obstacle[] {
        const tempWalls: Obstacle[] = [];
        const { Time, Track, Duration, Radius, Sides, Height, Length, Position, Color } = this;

        for (let i = 0; i < Sides; i++) {
            const angle = Math.PI * 2 / Sides;
            const rot = 360 / Sides * i;
            const radians = angle * i
            const Width = 2 * Radius * Math.tan(Math.PI / Sides);
            const sx = Position[0] + Math.cos(radians) * Radius - (Width / 2);
            const sy = Position[0] + Math.sin(radians) * Radius - (Height / 2);

            const w = new Obstacle();
            const d = w.CustomData;
            const a = w.Animation;

            w.Beat = Time;
            w.Duration = Duration;
            
            d.Uninteractable = true;
            d.Track = Track;
            d.Scale = [Width, Height, Length];
            d.WorldRotation = [0, 0, 0];
            d.LocalRotation = [0, 0, 90 + rot];
            d.Coordinates = [sx, sy];

            a.DefinitePosition = Position;
            a.Color = (Color) ? Color : [1, 1, 1, 1];

            tempWalls.push(w);
        }

        return tempWalls;
    }
}