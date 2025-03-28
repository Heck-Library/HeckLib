import { LogLevel } from "../../../util/logs";
import { IForcedColors } from "./IForcedColors";

export interface IInitParameters {
    /**
     * ## Logs
     * 
     * What logs to display in the console upon runtime.
     * 
     * ---
     * 
     * ### Options
     * 
     * Options for the `Logs` property can be found under the `LogType` enum that can be imported.
     * 
     * - `All` - Display all logs **(DEFAULT)**
     * - `OnlyImportant` - Display only important logs
     * - `OnlyTimes` - Display only the time logs
     * - `None` - Display no logs (Does not affect errors or the logo)
     */
    Logs?: LogLevel | keyof typeof LogLevel;
    /**
     * ## NoLogo
     * 
     * Whether or not to display the logo ASCII art in console upon runtime.
     * 
     * ---
     * 
     * ### Options
     * 
     * - `false` - Display the logo **(DEFAULT)**
     * - `true` - Do not display the logo
     */
    NoLogo?: boolean;
    LogoColors?: {
        Heck?: [number, number, number] | "random";
        Lib?: [number, number, number] | "random";
    }
    /**
     * ## InitializeCustomDataFields
     * 
     * Whether or not to initialize the custom data fields for all objects in the map.
     * 
     * ---
     * 
     * ### Options
     * 
     * - `true` - Initialize the custom data fields **(DEFAULT)**
     * - `false` - Do not initialize the custom data fields
     * 
     * ---
     * 
     * ### Functionality
     * 
     * This parameter runs a `forEach` loop for every object in the map and sets the custom data field of every object to an empty object.
     * This is useful for when you want to add custom data to the objects without having to do an "`undefined` check" on every object.
     * 
     * ---
     * 
     * ### Note
     * 
     * - This will not do anything to objects that already have something in their `customData` field.
     */
    InitializeCustomDataFields?: boolean;
    /**
     * ## InitializeAnimationFields
     * 
     * Whether or not to initialize the animation fields for all objects in the map.
     * 
     * ---
     * 
     * ### Options
     * 
     * - `true` - Initialize the animation fields **(DEFAULT)**
     * - `false` - Do not initialize the animation fields
     * 
     * ---
     * 
     * ### Functionality
     * 
     * This parameter runs a `forEach` loop for every object in the map and sets the animation field of every object to an empty object.
     * This is useful for when you want to add custom animation fields to the map without having to do an "`undefined` check" on every object.
     * 
     * ---
     * 
     * ### Note
     * 
     * - This **WILL** force `InitializeCustomDataFields` to be `true` if this is set to `true`.
     * - This won't do anything to objects that already have something in their `animation` field.
     */
    InitializeAnimationFields?: boolean;
    /**
     * @type { IForcedColors }
     * 
     * ## ForcedColors
     * 
     * Force a specific color for each object type in the map.
     * 
     * ---
     * 
     * ### Options
     * 
     * - `Left` - Force a specific color for left notes and sliders
     * - `Right` - Force a specific color for right notes and sliders
     * - `Obstacle` - Force a specific color for obstacles
     * - `Bomb` - Force a specific color for bombs
     * 
     * ---
     * 
     * ### Functionality
     * 
     * - This **WILL** force `InitializeCustomDataFields` to be `true` if this is set.
     * - Essentially, what this parameter does when it's called is it runs a `forEach` loop for every object in the map and sets the color to the value specified in this parameter.
     */
    ForcedColors?: IForcedColors;
    /**
     * ## ForcedNJS
     * 
     * Force a specific Note Jump Speed (NJS) for all notes, walls, bombs, and sliders in the map.
     * 
     * ---
     * 
     * ### Options
     * 
     * - `number` - The NJS to force for all objects in the map.
     * - `"inherit"` - Inherit the NJS from the original map.
     * 
     * ---
     * 
     * ### Functionality
     * 
     * Essentially, what this parameter does when it's called is it runs a `forEach` loop for every object in the map and sets the NJS to the value specified in this parameter.
     * 
     * ---
     * 
     * ### Note
     * 
     * - This **WILL** force `InitializeCustomDataFields` to be `true` if this is set.
     * - `"inherit"` will inherit the NJS from the `info.dat` file, so setting the NJS with the script will not affect the forced NJS until the second run because the Forced values are run before you can call any of the info setters.
     */
    ForcedNJS?: number | "inherit";
    /**
     * ## ForcedOffset
     * 
     * Force a specific offset for all notes, walls, bombs, and sliders in the map.
     * 
     * ---
     * 
     * ### Options
     * 
     * - `number` - The offset to force for all objects in the map.
     * - `"inherit"` - Inherit the offset from the original map.
     * 
     * ---
     * 
     * ### Functionality
     * 
     * Essentially, what this parameter does when it's called is it runs a `forEach` loop for every object in the map and sets the offset to the value specified in this parameter.
     * 
     * ---
     * 
     * ### Note
     * 
     * - This **WILL** force `InitializeCustomDataFields` to be `true` if this is set.
     * - `"inherit"` will inherit the offset from the `info.dat` file, so setting the NJS with the script will not affect the forced offset until the second run because the Forced values are run before you can call any of the info setters.
     */
    ForcedOffset?: number | "inherit";
}