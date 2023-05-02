export interface IVignette {
    /**
     * ### Type
     * 
     * Either "elliptical" or "rectangular".
     * Changes how the radius and softness parameters behave.
     */
    type?: "elliptical" | "rectangular";
    /**
     * ### Radius
     * 
     * Valid range: 0 to 1. If the type is "elliptical", the screen is only really elliptical if the radius is set to 0.
     * Values above that simply round the corners of the screen to varying degrees.
     */
    radius?: number;
    /**
     * ### Softness
     * 
     * Valid range: 0 to 1.
     * Defines the sharpness of the cutout.
     * If you only want to soften the edges, leave the radius at 1 and only slightly increase the softness.
     * By default, videos have a very slight vignette which basically serves as antialiasing for the screen borders.
     */
    softness?: number;
}
