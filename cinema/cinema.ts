import { writeFileSync } from "fs";
import { vec3 } from "../types/vectors";
import ICinemaConfig from "../interfaces/cinema/cinema";
import { IColorCorrection } from "../interfaces/cinema/colorCorrection";
import { IVignette } from "../interfaces/cinema/vignette";
import { IAdditionalScreen } from "../interfaces/cinema/additionalScreen";
import ICinemaCoordinates from "../interfaces/cinema/cinemaCoords";

export default class Cinema implements ICinemaConfig {
    /**
     * ### Video ID
     * 
     * The YouTube video ID from the part after the `?v=` in the URL, e.g.: youtube.com/watch?v=**dQw4w9WgXcQ**
     * 
     * Default: `undefined`
     */
    videoID?: string;
    /**
     * ### Video URL
     * 
     * Use this parameter instead of videoID if you want to use a video hoster other than YouTube. Provide the full video URL for this parameter. Currently supported are the following video sources: **YouTube, Facebook, Dailymotion, Vimeo**.
     * 
     * Default: `undefined`
     */
    videoUrl?: string;
    /**
     * ### Title
     * 
     * The title of the video. Will be shown to the user.
     * 
     * Default: `"Untitled Video"`
     */
    title?: string;
    /**
     * ### Author
     * 
     * The name of the video's uploader. Will be shown to the user.
     * 
     * Default: `"Unknown Author"`
     */
    author?: string;
    /**
     * ### Video File
     * 
     * Name of the video file on the local file system.
     * Path is not included, the file is assumed to be in the map's folder.
     * Will be set automatically after downloading and set to the title of the video, with illegal characters replaced by `_`.
     * 
     * Default: `undefined`
     */
    videoFile: string;
    /**
     * ### Duration
     * 
     * Video duration in **seconds**. Will be shown to the user, but has no other function than that.
     * 
     * Default: `0`
     */
    duration?: number;
    /**
     * ### Offset
     * 
     * The offset in **milliseconds** to align the video with the map. Use the video menu in-game to determine the offset.
     * 
     * Default: `0`
     */
    offset?: number;
    /**
     * ### Config By Mapper
     * 
     * Used to indicate whether the config was created by the mapper (as opposed to by the user). Changes the UI in various small ways.
     * 
     * Default: `false`
     */
    configByMapper?: boolean;
    /**
     * ### Environment Name
     * 
     * The environment that is supposed to be loaded.
     * This allows you to force a specific environment that is only used if the user has Cinema installed and the video downloaded.
     * This also disables the user's choice in the Override Environment setting of the base game, so please only use it if you have a good reason to do so.
     */
    environmentName?: string;
    /**
     * ### Playback Speed
     * 
     * The playback speed of the video. 1 is normal speed, 0.5 is half speed, 2 is double speed, etc.
     * 
     * Default: `1`
     */
    playbackSpeed?: number;
    /**
     * ### Loop
     * 
     * Whether the video should loop or not.
     * 
     * Default: `false`
     */
    loop?: boolean;
    /**
     * ### End Video At
     * 
     * This parameter allows you to let a video end early (e.g. to hide sponsor segments, credits, logos etc.).
     * The time references the video time, not the map time.
     * The video will start fading out one second before this time is reached.
     * Value is in seconds (e.g.: 296.5 would be 4 minutes and 56.5 seconds).
     * 
     * Default: `undefined`
     */
    endVideoAt?: number;
    /**
     * ### Screen Position
     * 
     * This setting can be used to create a custom positioning of the video player.
     * x is the deviation from the center, y is up/down and z controls the distance.
     * y should usually be about half of the video height minus 0.1 if you want the video to be above the track.
     * 
     * **This setting prevents the user from overriding the environment.**
     * 
     * Default:
     * ```json
     * { "x": 0, "y": 12.4, "z": 67.8 }
     * ```
     */
    screenPosition?: ICinemaCoordinates;
    /**
     * ### Screen Rotation
     * 
     * Rotates the video screen. By default, it tilts down by 8 degrees for better visibility.
     * 
     * Default:
     * ```json
     * { "x": -8, "y": 0, "z": 0 }
     * ```
     */
    screenRotation?: ICinemaCoordinates;
    /**
     * ### Screen Height
     * 
     * Determines the size of the screen.
     * There is no setting for the width, since that is calculated automatically by the height and the aspect ratio of the video.
     * If you change the height, you might want to also change the y positioning of the screen so it doesn't float above the ground.
     * 
     * **This setting prevents the user from overriding the environment.**
     * 
     * Default: `25`
     */
    screenHeight?: number;
    /**
     * ### Screen Curvature
     * 
     * Use this setting to force a specific curvature of the screen.
     * The allowed range of values is 0-180 (degrees).
     * Setting this to 0 forces curvature to be disabled.
     * If this parameter is not included and the user has curvature enabled, the curvature is calculated automatically based on the distance and the width of the screen.
     * 
     * Default: automatic
     */
    screenCurvature?: number;
    /**
     * ### Screen Subsurfaces
     * 
     * This allows you to specify how many sub-surfaces the curved screen uses, which lets you control the smoothness of the curvature.
     * Valid range is 1 to 256.
     * The default of 32 looks great in most cases and doesn't cost much performance.
     * 
     * Default: `32`
     */
    screenSubsurfaces?: number;
    /**
     * ### Allow Custom Platform
     * 
     * When set to false, will prevent the CustomPlatforms mod from loading a custom platform for this map if the video is playing.
     * Can be used to override the user setting if the user set it to true for all maps.
     * 
     * Default: `false` (user's choice)
     */
    allowCustomPlatform?: boolean;
    /**
     * ### Disable Default Modifications
     * 
     * If set to true, will disable any environment modifications Cinema does by default for the selected environment.
     * Only use this if you plan on modifying the environment in a different way to make the video player fit in.
     * 
     * Default: `false`
     */
    disableDefaultModifications?: boolean;
    /**
     * ### Force Environment Modifications
     * 
     * Set this to `true` to have your environment modifications applied even if no video is defined or downloaded by the user.
     * 
     * Default: `false`
     */
    forceEnvironmentModifications?: boolean;
    /**
     * ### Merge Prop Groups
     * 
     * If this is set to `true`, all cloned lights will be merged with existing prop groups, based on the specified z-position.
     * Note: This will make lighting using light IDs nearly impossible, if you plan on using that.
     * Also, if your cloned light is placed at a z-position where no pre-existing lights are, a new prop group will be created, which will change the IDs of other prop groups and potentially mess up your lightshow.
     * 
     * Default: `false`
     */
    mergePropGroups?: boolean;
    /**
     * ### Transparency
     * 
     * Include this in your config if you want to override the user's choice and force transparency to be enabled or disabled.
     * This does not disable the color blending, it only prevents light sources behind the screen from shining through.
     * 
     * Default: `true` (user's choice)
     */
    transparency?: boolean;
    /**
     * ### Bloom
     * 
     * Sets the amount of bloom (glow) that appears around the video player during brightly colored parts of the video.
     * 
     * Default: `1` (user's choice)
     */
    bloom?: number;
    /**
     * ### Color Correction
     * 
     * If you want to make slight modifications to how the video looks, you can use these color correction options which get applied at runtime.
     * This should be easier to use than having to make the edits in the video file itself and then re-uploading the edited version to YouTube.
     * These settings are categorized under a top-level property named `colorCorrection`.
     * See the example below.
     * When adjusting these values, you can make use of the hot reloading capability of Cinema. Simply start the map, pause the game at a frame of the video you want to look differently, and start editing the config to see the results immediately.

     * | Property       | Default   | Description |
     * | ---------------|-----------| ----------- |
     * | `brightness`	| 1.0		| Valid range: 0 to 2 |
     * | `contrast`		| 1.0		| Valid range: 0 to 5 |
     * | `saturation`	| 1.0		| Valid range: 0 to 5 |
     * | `exposure`		| 1.0		| Valid range: 0 to 5 |
     * | `gamma`		| 1.0		| Valid range: 0 to 5 |
     * | `hue`			| 0.0		| Valid range: -360 to +360 (in degrees) |
     * 
     * Example:
     * ```ts
     * colorCorrection: {
     *     gamma: 0.95,
     *     exposure: 1.15,
     *     saturation: 1.2
     * }
     * ```
     */
    colorCorrection?: IColorCorrection;
    /**
     * Using the vignette effect you can change the shape of the video player or soften its edges.
     *
     * | Property                   		| Data Type | Default       	    				| Description |
     * | --------------------------------- |:---------:|:-------------------------------------:| ----------- |
     * | `type`					 		| string	| "rectangular"		 					| Either "elliptical" or "rectangular". Changes how the radius and softness parameters behave. |
     * | `radius`					 		| float		| 1.0				 					| Valid range: 0 to 1. If the type is "elliptical", the screen is only really elliptical if the radius is set to 0. Values above that simply round the corners of the screen to varying degrees. |
     * | `softness`				 		| float		| 0.005				 					| Valid range: 0 to 1. Defines the sharpness of the cutout. If you only want to soften the edges, leave the radius at 1 and only slightly increase the softness. By default, videos have a very slight vignette which basically serves as antialiasing for the screen borders. |
     * 
     * Example:
     * ```ts
     * vignette: {
     *   type: "elliptical",
     *   radius: 0.5,
     *   softness: 0.1
     * }
     * ```
     */
    vignette?: IVignette;
    /**
     * ### Additional Screens
     * 
     * You can create clones of the "main screen" by using the `additionalScreens` property. 
     * You can place, rotate and scale these screens independently from each other,
     * but all other properties like color correction, vignetting, curvature and, most importantly, the video that is playing, are cloned from the main screen.
     * You can also use Chroma's environment enhancement to duplicate the screen, in that case use the regex lookup `CinemaScreen$`.
     * Please note: Adding additional screens currently disables the bloom effect on all screens, even the main one.
     * Hot reload support is limited to changing the parameters of existing screens, but to add or remove screens you will need to restart the map.
     * 
     * Example:
     * ```ts
     * additionalScreens: [
     *     {
     *       position: {
     *         x: -50.0,
     *         y: 12.4,
     *         z: 0.0
     *       },
     *       rotation: {
     *         x: 0.0,
     *         y: 270.0,
     *         z: 0.0
     *       }
     *     },
     *     {
     *       position: {
     *         x: 50.0,
     *         y: 12.4,
     *         z: 0.0
     *       },
     *       rotation: {
     *         x: 0.0,
     *         y: 90.0,
     *         z: 0.0
     *       }
     *     }
     * ]
     * ```
     */
    additionalScreens?: IAdditionalScreen[];
    
    constructor();
    constructor(video: string);
    constructor(video: ICinemaConfig);
    constructor(video?: string | ICinemaConfig) {
        if (typeof video === 'string') this.videoUrl = video;
        else if (typeof video === 'object') {
            this.videoUrl = video.videoUrl;

            if (video.title !== undefined) this.title = video.title;
            if (video.author !== undefined) this.author = video.author;
            if (video.videoFile !== undefined) this.videoFile = video.videoFile;
            if (video.duration !== undefined) this.duration = video.duration;
            if (video.offset !== undefined) this.offset = video.offset;
            if (video.configByMapper !== undefined) this.configByMapper = video.configByMapper;
            if (video.environmentName !== undefined) this.environmentName = video.environmentName;
            if (video.playbackSpeed !== undefined) this.playbackSpeed = video.playbackSpeed;
            if (video.loop !== undefined) this.loop = video.loop;
            if (video.endVideoAt !== undefined) this.endVideoAt = video.endVideoAt;
            if (video.screenPosition !== undefined) this.screenPosition = video.screenPosition;
            if (video.screenRotation !== undefined) this.screenRotation = video.screenRotation;
            if (video.screenHeight !== undefined) this.screenHeight = video.screenHeight;
            if (video.screenCurvature !== undefined) this.screenCurvature = video.screenCurvature;
            if (video.screenSubsurfaces !== undefined) this.screenSubsurfaces = video.screenSubsurfaces;
            if (video.allowCustomPlatform !== undefined) this.allowCustomPlatform = video.allowCustomPlatform;
            if (video.disableDefaultModifications !== undefined) this.disableDefaultModifications = video.disableDefaultModifications;
            if (video.forceEnvironmentModifications !== undefined) this.forceEnvironmentModifications = video.forceEnvironmentModifications;
            if (video.mergePropGroups !== undefined) this.mergePropGroups = video.mergePropGroups;
            if (video.transparency !== undefined) this.transparency = video.transparency;
            if (video.bloom !== undefined) this.bloom = video.bloom;
            if (video.colorCorrection !== undefined) this.colorCorrection = video.colorCorrection;
            if (video.vignette !== undefined) this.vignette = video.vignette;
            if (video.additionalScreens !== undefined) this.additionalScreens = video.additionalScreens;
        }
    }

    //#region additional screens
    /**
     * Adds an additional screen to the environment.
     */
    addScreen(pos: vec3, rot: vec3) {
        if (!this.additionalScreens) this.additionalScreens = [];
        const screen = {
            position: {
                x: pos[0],
                y: pos[1],
                z: pos[2]
            },
            rotation: {
                x: rot[0],
                y: rot[1],
                z: rot[2]
            }
        }
        this.additionalScreens.push(screen);
        return this;
    }
    push() {
        writeFileSync('cinema-video.json', JSON.stringify(this, null, 4));
    }
    //#endregion
} 