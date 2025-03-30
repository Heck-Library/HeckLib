export interface IPolygonParams {
    /**
     * ## Time
     *
     * The time the polygon is created
     */
    Time: number;
    /**
     * ## Track
     *
     * The track the polygon is created on
     */
    Track?: string;
    /**
     * ## Duration
     *
     * The duration of the polygon
     */
    Duration: number;
    /**
     * ## Radius
     *
     * The radius of the polygon
     */
    Radius: number;
    /**
     * ## Sides
     *
     * The amount of sides the polygon has
     */
    Sides: number;
    /**
     * ## Height
     *
     * The height of the polygon
     */
    Height: number;
    /**
     * ## Length
     *
     * The length of the polygon
     */
    Length: number;
    /**
     * ## Position
     *
     * The position of the polygon
     */
    Position: [number, number, number];
    /**
     * ## Color
     *
     * The color of the polygon
     */
    Color: [number, number, number, number];
}
