import { VignetteType } from "../../enums";

type vec3obj = Record<"X" | "Y" | "Z", number>;

export interface ICinemaVignette {
    /**
     * ## Type
     * 
     * The type of the vignette. Either "elliptical" or "rectangular".
     * 
     * ---
     * 
     * Type: `string`
     * 
     * Default: `"rectangular"`
     */
    Type: VignetteType | keyof typeof VignetteType;
    /**
     * ## Radius
     * 
     * The radius of the vignette.
     * 
     * Valid range: 0 to 1.
     * 
     * If the type is "elliptical", the screen is only really elliptical if the radius is set to 0. Values above that simply round the corners of the screen to varying degrees.
     * 
     * ---
     * 
     * Type: `number`
     * 
     * Default: `1.0`
     */
    Radius: number;
    /**
     * ## Softness
     * 
     * The softness of the vignette.
     * 
     * Valid range: 0 to 1.
     * 
     * Defines the sharpness of the cutout. If you only want to soften the edges, leave the radius at 1 and only slightly increase the softness.
     * 
     * By default, videos have a very slight vignette which basically serves as antialiasing for the screen borders.
     * 
     * ---
     * 
     * Type: `number`
     * 
     * Default: `0.005`
     */
    Softness: number;
}

export interface ICinemaColorCorrection {
    /**
     * ## Brightness
     * 
     * The brightness of the video.
     * 
     * The value is a multiplier, so `1.0` is normal brightness, `0.5` is half brightness and `2` is double brightness.
     * 
     * **NOTE:** The valid range is from `0.0` to `2.0`, anything outside of this range will be clamped to the nearest value.
     * 
     * ---
     * 
     * Type: `number`
     * 
     * Default: `1.0`
     */
    Brightness: number;
    /**
     * ## Contrast
     * 
     * The contrast of the video.
     * 
     * The value is a multiplier, so `1.0` is normal contrast, `0.5` is half contrast and `2` is double contrast.
     * 
     * **NOTE:** The valid range is from `0.0` to `5.0`, anything outside of this range will be clamped to the nearest value.
     * 
     * ---
     * 
     * Type: `number`
     * 
     * Default: `1.0`
     */
    Contrast: number;
    /**
     * ## Saturation
     * 
     * The saturation of the video.
     * 
     * The value is a multiplier, so `1.0` is normal saturation, `0.5` is half saturation and `2` is double saturation.
     * 
     * **NOTE:** The valid range is from `0.0` to `5.0`, anything outside of this range will be clamped to the nearest value.
     * 
     * ---
     * 
     * Type: `number`
     * 
     * Default: `1.0`
     */
    Saturation: number;
    /**
     * ## Exposure
     * 
     * The exposure of the video.
     * 
     * The value is a multiplier, so `1.0` is normal exposure, `0.5` is half exposure and `2` is double exposure.
     * 
     * **NOTE:** The valid range is from `0.0` to `5.0`, anything outside of this range will be clamped to the nearest value.
     * 
     * ---
     * 
     * Type: `number`
     * 
     * Default: `1.0`
     */
    Exposure: number;
    /**
     * ## Gamma
     * 
     * The gamma of the video.
     * 
     * The value is a multiplier, so `1.0` is normal gamma, `0.5` is half gamma and `2` is double gamma.
     * 
     * **NOTE:** The valid range is from `0.0` to `5.0`, anything outside of this range will be clamped to the nearest value.
     * 
     * ---
     * 
     * Type: `number`
     * 
     * Default: `1.0`
     */
    Gamma: number;
    /**
     * ## Hue
     * 
     * The hue of the video.
     * 
     * The value is an offset in degrees, so `0.0` is no offset, `90.0` is a 90 degree offset and `180.0` is a 180 degree offset.
     * 
     * 360 looks the same as 0, because it's a full circle.
     * 
     * **NOTE:** The valid range is from `-360.0` to `360.0`, anything outside of this range will be clamped to the nearest value.
     * 
     * ---
     * 
     * Type: `number`
     * 
     * Default: `0.0`
     */
    Hue: number;
}

export interface ICinemaEnvironment {
    /**
     * ## Name
     * 
     * The name of the object to modify. This is the name that is shown in the RUE and the one that is used in the game scene.
     * 
     * ---
     * 
     * Type: `string`
     */
    Name: string;
    /**
     * ## Parent Name
     * 
     * The name of the object's parent in the scene hierarchy. This is used to differentiate between objects with the same name.
     * 
     * ---
     * 
     * Type: `string`
     */
    ParentName?: string;
    /**
     * ## Clone From
     * 
     * The name of the object to clone from. This is used to create a new object with the same properties as the original object.
     * 
     * ---
     * 
     * Type: `string`
     */
    CloneFrom?: string;
    /**
     * ## Active
     * 
     * Whether the object should be active or not. This is used to hide or show the object.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    Active?: boolean;
    /**
     * ## Position
     * 
     * The position of the object. This is used to move the object to a new location.
     * 
     * ---
     * 
     * Type: `vec3obj`
     */
    Position?: vec3obj;
    /**
     * ## Rotation
     * 
     * The rotation of the object. This is used to rotate the object to a new orientation.
     * 
     * ---
     * 
     * Type: `vec3obj`
     */
    Rotation?: vec3obj;
    /**
     * ## Scale
     * 
     * The scale of the object. This is used to scale the object to a new size.
     * 
     * ---
     * 
     * Type: `vec3obj`
     */
    Scale?: vec3obj;
};

export interface ICinema {
    // Basic Properties
    /**
     * ## Video
     * 
     * The video URL from YouTube or some other place.
     * 
     * YouTube URLs will be regex matched and will automatically be converted to the video ID in JSON.
     * 
     * Other URLs will be used as is.
     * ---
     * 
     * Type: `string`
     */
    URL: string;
    /**
     * ## Video Title
     * 
     * The title of the video. Will be shown to the user.
     * 
     * ---
     * 
     * Type: `string`
     * 
     * Default: `"Untitled Video"`
     */
    Title: string;
    /**
     * ## Video Author
     * 
     * The name of the video's uploader. Will be shown to the user.
     * 
     * ---
     * 
     * Type: `string`
     * 
     * Default: `"Unknown Author"`
     */
    Author: string;
    /**
     * ## Video File
     * 
     * Name of the video file on the local file system. Path is not included, the file is assumed to be in the map's folder.
     * 
     * ---
     * 
     * Type: `string`
     * 
     * Default: `"video.mp4"`
     */
    VideoFile: string;
    /**
     * ## Video Duration
     * 
     * Video duration in **seconds**. Will be shown to the user, but has no other function than that.
     * 
     * **This setting is an integer value and any decimal point will be rounded down with `Math.floor();`**
     * 
     * ---
     * 
     * Type: `number`
     * 
     * Default: `0`
     */
    Duration: number;
    /**
     * ## Offset
     * 
     * The offset in **milliseconds** to align the video with the map. Use the video menu in-game to determine the offset.
     * 
     * **This setting is an integer value and any decimal point will be rounded down with `Math.floor();`**
     * 
     * ---
     * 
     * Type: `number`
     * 
     * Default: `0`
     */
    Offset: number;

    // Advanced Properties
    /**
     * ## Environment Name
     * 
     * The environment that is supposed to be loaded. This allows you to force a specific environment that is only used if the user has Cinema installed and the video downloaded. This also disables the user's choice in the Override Environment setting of the base game, so please only use it if you have a good reason to do so. The internal names of all the environments are listed as `Info.dat Name` [here](https://bsmg.wiki/mapping/basic-lighting.html#environment-previews).
     * 
     * ---
     * 
     * Type: `string`
     */
    EnvironmentName: string;
    /**
     * ## Playback Speed
     * 
     * Allows you to adjust the playback speed of the video.
     * 
     * Works as a multiplier of the normal speed. For example, `0.5` is half speed, `1` is normal speed, and `2` is double speed.
     * 
     * ---
     * 
     * Type: `number`
     * 
     * Default: `1.0`
     */
    PlaybackSpeed: number;
    /**
     * ## Loop
     * 
     * Whether the video should loop if it ends before the map does.
     * 
     * ---
     * 
     * Type: `boolean`
     * 
     * Default: `false`
     */
    Loop: boolean;
    /**
     * ## End Video At
     * 
     * This parameter allows you to let a video end early (e.g. to hide sponsor segments, credits, logos etc.). The time references the video time, not the map time. The video will start fading out one second before this time is reached. Value is in seconds (e.g.: 296.5 would be 4 minutes and 56.5 seconds)
     * 
     * ---
     * 
     * Type: `number`
     * 
     * Default: `0`
     */
    EndVideoAt: number;
    /**
     * ## Screen Position
     * 
     * This setting can be used to create a custom positioning of the video player. **x** is the deviation from the center, **y** is up/down and **z** controls the distance. **y** should usually be about half of the video height minus 0.1 if you want the video to be above the track.
     * 
     * **This setting prevents the user from overriding the environment.**
     * 
     * ---
     * 
     * Type: `{x: number, y: number, z: number}`,
     * 
     * Default: `{"x": 0.0,"y": 12.4,"z": 67.8}`
     */
    ScreenPosition: vec3obj;
    /**
     * ## Screen Rotation
     * 
     * Rotates the video screen. By default, it tilts down by 8 degrees for better visibility.
     * 
     * ---
     * 
     * Type: `{x: number, y: number, z: number}`,
     * 
     * Default: `{"x": -8.0,"y": 0.0,"z": 0.0}`
     */
    ScreenRotation: vec3obj;
    /**
     * ## Screen Height
     * 
     * Determines the size of the screen. There is no setting for the width, since that is calculated automatically by the height and the aspect ratio of the video. If you change the height, you might want to also change the **y** positioning of the screen so it doesn't float above the ground.
     * 
     * **This setting prevents the user from overriding the environment.**
     * 
     * ---
     * 
     * Type: `number`
     * 
     * Default: `25.0`
     */
    ScreenHeight: number;
    /**
     * ## Screen Curvature
     * 
     * Use this setting to force a specific curvature of the screen. The allowed range of values is 0-180 (degrees).
     * 
     * Setting this to 0 forces curvature to be disabled.
     * 
     * If this parameter is not included and the user has curvature enabled, the curvature is calculated automatically based on the distance and the width of the screen.
     * 
     * ---
     * 
     * Type: `number`
     * 
     * Default: *automatic*
     */
    ScreenCurvature: number;
    /**
     * ## Screen Subsurfaces
     * 
     * This allows you to specify how many sub-surfaces the curved screen uses, which lets you control the smoothness of the curvature.
     * 
     * Valid range is 1 to 256.
     * 
     * The default of 32 looks great in most cases and doesn't cost much performance.
     * 
     * **This setting is an integer value and any decimal point will be rounded down with `Math.floor();`**
     * 
     * ---
     * 
     * Type: `number`
     * 
     * Default: `32`
     */
    ScreenSubsurfaces: number;
    /**
     * ## Allow Custom Platform
     * 
     * When set to `false`, will prevent the CustomPlatforms mod from loading a custom platform for this map if the video is playing.
     * 
     * Can be used to override the user setting if the user set it to `true` for all maps.
     * 
     * ---
     * 
     * Type: `boolean`
     * 
     * Default: `false` (user's choice)
     */
    AllowCustomPlatform: boolean;
    /**
     * ## Disable Default Modifications
     * 
     * If set to `true`, will disable any environment modifications Cinema does by default for the selected environment.
     * 
     * Only use this if you plan on modifying the environment in a different way to make the video player fit in.
     * 
     * ---
     * 
     * Type: `boolean`
     * 
     * Default: `false`
     */
    DisableDefaultModifications: boolean;
    /**
     * ## Force Environment Modifications
     * 
     * Set this to `true` to have your environment modifications applied even if no video is defined or downloaded by the user.
     * 
     * ---
     * 
     * Type: `boolean`
     * 
     * Default: `false`
     */
    ForceEnvironmentModifications: boolean;
    /**
     * ## Merge Prop Groups
     * 
     * If this is set to `true`, all cloned lights will be merged with existing prop groups, based on the specified z-position.
     * 
     * **Note**: This will make lighting using light IDs nearly impossible, if you plan on using that. Also, if your cloned light is placed at a z-position where no pre-existing lights are, a new prop group will be created, which will change the IDs of other prop groups and potentially mess up your lightshow.
     * 
     * ---
     * 
     * Type: `boolean`
     * 
     * Default: `false`
     */
    MergePropGroups: boolean;
    /**
     * ## Transparency
     * 
     * Include this in your config if you want to override the user's choice and force transparency to be enabled or disabled.
     * 
     * This does not disable the color blending, it only prevents light sources behind the screen from shining through.
     * 
     * ---
     * 
     * Type: `boolean`
     * 
     * Default: `true` (user's choice)
     */
    Transparency: boolean;
    /**
     * ## Bloom
     * 
     * Sets the amount of bloom (glow) that appears around the video player during brightly colored parts of the video.
     * 
     * ---
     * 
     * Type: `number`
     * 
     * Default: `1.0` (user's choice)
     */
    Bloom: number;
    /**
     * ## Color Correction
     * 
     * If you want to make slight modifications to how the video looks, you can use these color correction options which get applied at runtime. This should be easier to use than having to make the edits in the video file itself and then re-uploading the edited version to YouTube.
     * 
     * When adjusting these values, you can make use of the hot reloading capability of Cinema. Simply start the map, pause the game at a frame of the video you want to look differently, and start editing the config to see the results immediately.
     * 
     * | Property                   		| Data Type | Default       	    				| Description                            |
     * | ---------------------------------- |:---------:|:-------------------------------------:| --------------------------------------:|
     * | `Brightness`				 		| float		| 1.0				 					| Valid range: 0 to 2                    |
     * | `Contrast`				 		    | float		| 1.0				 					| Valid range: 0 to 5                    |
     * | `Saturation`				 		| float		| 1.0				 					| Valid range: 0 to 5                    |
     * | `Exposure`				 		    | float		| 1.0				 					| Valid range: 0 to 5                    |
     * | `Gamma`				 			| float		| 1.0				 					| Valid range: 0 to 5                    |
     * | `Hue`				 				| float		| 0.0				 					| Valid range: -360 to +360 (in degrees) |
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * const cinema = new Cinema();
     * cinema.ColorCorrection.Gamma = .95;
     * cinema.ColorCorrection.Exposure = 1.15;
     * cinema.ColorCorrection.Saturation = 1.2;
     * cinema.ColorCorrection.Brightness = 3; // Becomes 2.0, since the max is 2.0
     * ```
     */
    ColorCorrection: Partial<ICinemaColorCorrection>;
    /**
     * ## Vignette
     * 
     * Using the vignette effect you can change the shape of the video player or soften its edges.
     * 
     * | Property                   		| Data Type | Default       	    				| Description |
     * | ---------------------------------- |:---------:|:-------------------------------------:| -----------:|
     * | `Type`					 		    | string	| "rectangular"		 					| Either "elliptical" or "rectangular". Changes how the radius and softness parameters behave. |
     * | `Radius`					 		| float		| 1.0				 					| Valid range: 0 to 1. If the type is "elliptical", the screen is only really elliptical if the radius is set to 0. Values above that simply round the corners of the screen to varying degrees. |
     * | `Softness`				 		    | float		| 0.005				 					| Valid range: 0 to 1. Defines the sharpness of the cutout. If you only want to soften the edges, leave the radius at 1 and only slightly increase the softness. By default, videos have a very slight vignette which basically serves as antialiasing for the screen borders. |
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * const cinema = new Cinema();
     * 
     * cinema.Vignette.Type = "elliptical";
     * cinema.Vignette.Radius = .5;
     * cinema.Vignette.Softness = .1;
     * ```
     */
    Vignette: Partial<ICinemaVignette>;
    /**
     * ## Additional Screens
     * 
     * You can create clones of the "main screen" by using the `additionalScreens` property.
     * 
     * You can place, rotate and scale these screens independently from each other, but all other properties like color correction, vignetting, curvature and, most importantly, the video that is playing, are cloned from the main screen.
     * 
     * You can also use Chroma's environment enhancement to duplicate the screen, in that cause se the regex lookup `CinemaScreen$`.
     * 
     * **Please note**: Adding additional screens currently disables the bloom effect on all screens, even the main one.
     * 
     * Hot reload support is limited to changing the parameters of existing screens, but to add or remove screens you will need to restart the map.
     * 
     * ---
     * 
     * ### Example
     * 
     * ```ts
     * const cinema = new Cinema();
     * for (let i = -1; i <= 1; i += 2) {
     *     const screen: Record<"Position" | "Rotation", Record<"X"|"Y"|"Z", number>> = {
     *         Position: {
     *             X: 50.0 * i,
     *             Y: 12.4,
     *             Z: 0.0
     *         },
     *         Rotation: {
     *             X: 0.0,
     *             Y: -90 * i,
     *             Z: 0.0
     *         }
     *     };
     *     cinema.AdditionalScreens.push(screen);
     * }
     * ```
     * 
     * This example would create two additional screens to the sides of the player with a distance of 50 units.
     * 
     * If you want a screen behind the player, use a rotation of y=180 and a negative z-position.
     */
    AdditionalScreens: Record<"Position" | "Rotation", vec3obj>[];
    /**
     * ### Modifying the environment
     * 
     * There is an additional property called `environment` which can be used to alter other objects in the game scene.
     * 
     * Using this disables player overrides for the environment, since these modifications are specific to the mapper-chosen environment.
     * 
     * The `environment` parameter is an array that contains `EnvironmentModification` objects, which currently can have the following parameters:
     * 
     * | Property                   		| Data Type | Example 	                        | Description |
     * | ---------------------------------- |:---------:| --------------------------------- | -----------:|
     * | `Name`							    | string	| "Floor" 	                        | Specifies the name of the object. The name needs to be an exact match, not a substring. If there are multiple objects with the given name, all of them will be modified.
     * | `ParentName`						| string	| "Environment"                     | Specifies the name object's parent in the scene hierarchy. Can be used to differentiate between objects with the same name. Example: KDA has two different objects named "Construction", with the parent's names being "Environment" and "PlayersPlace".
     * | `CloneFrom`						| string	| "Laser"                           | If this is set, a new object will be created (cloned). In this case, the `name` parameter will set the name of the newly created object, while the `cloneFrom` parameter will be the object that is cloned.
     * | `Active`							| bool		| false		                        | Set this to false to hide the object, or to true to show it if it's hidden by default.
     * | `Position`						    | Vector3	| `{"x": 0.0,"y": 12.4,"z": 100.0}` | Moves the object to the specified location.
     * | `Rotation`						    | Vector3	| `{"x": -8.0,"y": 0.0,"z": 0.0}` 	| Rotates the object.
     * | `Scale`							| Vector3	| `{"x": 2.0,"y": 2.0,"z": 1.0}` 	| Scales the object. Default for each axis is usually 1.0. Setting any axis to 0 may cause the object to become invisible.
     * 
     * To find the names of objects you want to modify, you can use [this document](https://docs.google.com/spreadsheets/d/1I64e4nG56zOFSlWiF-AEK4zwX0W_AAGW18WEYU9TrFM/edit#gid=477555873) as a reference.
     * 
     * Another option would be to use the *RuntimeUnityEditor*, which you can find in the pins of BSMG's #pc-mod-dev Discord channel. If you install that, press "G" while your map is playing to be able to browse all objects in the scene.
     * 
     * **Please note:** Changing the active scene (restarting the map, loading a new map or going to the main menu) after the RUE has been opened causes a lot of objects to no longer show up in the RUE until the game is restarted.
     */
    Environment: ICinemaEnvironment[];
}