import { readFileSync, writeFileSync } from "fs";
import { V3, activeInput, activeOutput, infoFile } from "./initialize";
import { wallsToJSON } from "./converters/wallsToJSON";
import { notesToJSON } from "./converters/notesToJSON";
import { customEventsToJSON } from "./converters/customEventsToJSON";
import { lightsToJSON } from "./converters/lightsToJSON";
import { chainsToJSON } from "./converters/chainsToJSON";
import { pointDefinitionsToV2JSON } from "./converters/pointDefinitionsToV2JSON";
import { arcsToJSON } from "./converters/arcsToJSON";
import environmentToJSON from "./converters/environmentToJSON";
import INote from "../interfaces/objects/note";
import IWall from "../interfaces/objects/wall";
import { notes, fakeNotes, walls, fakeWalls, lightEvents, pointDefinitions, environment, materials, events } from "./variables";
import ISettings from "../interfaces/info/settings";
import IMapV2 from "../interfaces/v2map";

interface IFinalizeProperties {
    /**
     * ### Sort Objects
     * 
     * Sorts the objects by time. This is recommended to be true for debugging and readability's sake.
     * 
     * ---
     * 
     * Type: `boolean`
     */
    sortObjects?: boolean;
    /**
     * ### Format File
     * 
     * Formats and indents the file.
     * SIGNIFICANTLY INCREASES FILESIZE, DISABLE BEFORE FINAL RUN
     */
    formatting?: boolean;
    /**
     * ### Vanilla Stats
     * 
     * Shows stats about the input difficulty.
     * 
     * showVanillaStats is VERY performance heavy and will slow down your script
     */
    showVanillaStats?: {
        /**
         * ### Notes
         * 
         * Shows the note count.
         */
        notes?: boolean;
        /**
         * ### Walls
         * 
         * Shows the wall count.
         */
        walls?: boolean;
        /**
         * ### Bombs
         * 
         * Shows the bomb count.
         */
        bombs?: boolean;
        /**
         * ### Lights
         * 
         * Shows the light event count.
         */
        lights?: boolean;
    };
    /**
     * ### Modded Stats
     * 
     * Shows stats about the output difficulty.
     * 
     * showModdedStats is VERY performance heavy and will slow down your script
     */
    showModdedStats?: {
        /**
         * ### Notes
         * 
         * Shows the note count.
         */
        notes?: boolean;
        /**
         * ### Walls
         * 
         * Shows the wall count.
         */
        walls?: boolean;
        /**
         * ### Bombs
         * 
         * Shows the bomb count.
         */
        bombs?: boolean;
        /**
         * ### Lights
         * 
         * Shows the light event count.
         */
        lights?: boolean;
        /**
         * ### Custom Events
         * 
         * Shows the custom event count.
         */
        customEvents?: boolean;
        /**
         * ### Point Definitions
         * 
         * Shows the point definition count.
         */
        pointDefinitions?: boolean;
        /**
         * ### Environment
         * 
         * Shows the environment object count.
         */
        showEnvironmentStats?: boolean;
    };
    /**
     * ## Requirements
     * 
     * Requirements adds required mods to the map.
     * 
     * This can be a string or an array of strings.
     * 
     * ### Example
     * ```ts
     * finalize(DIFFICULTY, {
     *     formatting: true,
     *     requirements: [
     *         "Noodle Extensions",
     *         "Chroma"
     *     ]
     * });
     * ```
     */
    requirements?: string[] | string;
    /**
     * ## Suggestions
     * 
     * Suggestions adds suggested mods to the map.
     * 
     * This can be a string or an array of strings.
     * 
     * ### Example
     * ```ts
     * finalize(DIFFICULTY, {
     *     formatting: true,
     *     suggestions: [
     *         "Chroma",
     *         "Cinema"
     *     ]
     * });
     * ```
     */
    suggestions?: string[] | string;
    /**
     * ## Warnings
     * 
     * Warnings adds warnings to the info/metadata of the map.
     *
     * This can be a string or an array of strings.
     * 
     * ### Example
     * ```ts
     * finalize(DIFFICULTY, {
     *     formatting: true,
     *     warnings: [
     *         "Flashing lights",
     *         "Motion sickness" 
     *     ]
     * });
     * ```
     */
    warnings?: string[] | string;
    /**
     * ## Settings
     * 
     * Settings adds a settings setter to the map. It will display as a popup to the user showing the recommended settings and a prompt to set them temporarily upon loading the map.
     * 
     * This is an object.
     * 
     * ### Example
     * ```ts
     * finalize(DIFFICULTY, {
     *     formatting: true,
     *     settings: {
     *         chroma: {
     *             disableChromaEvents: false,
     *             disableEnvironmentEnhancements: false,
     *             disableNoteColoring: false
     *         },
     *         countersPlus: {
     *             mainEnabled: false
     *         },
     *         graphics: {
     *             mainGraphicsSettings: true,
     *             screenDisplacementEffectsEnabled: true,
     *             smokeGraphicsSettings: false,
     *             maxShockwaveParticles: 0
     *         },
     *         playerOptions: {
     *             advancedHud: true,
     *             leftHanded: false,
     *             noTextsAndHuds: false,
     *         }
     *     }
     * });
     * ```
     */
    settings?: ISettings;
    /**
     * ## Round Numbers
     * 
     * Rounds the numbers in the map to the specified decimal place.
     * 
     * This is a number.
     * 
     * ### Example
     * ```ts
     * finalize(DIFFICULTY, {
     *     formatting: true,
     *     roundNumbers: 4
     * });
     * ```
     */
    roundNumbers?: number;
    /**
     * ### File Format
     * 
     * Formats the output file to either V2 or V3, depending on the user's setting.
     * 
     * This is optional btw
     * 
     * Valid inputs:
     * - `V2`
     * - `V3`
     */
    format?: 'V2' | 'V3';
};

let formatting = false

interface IStatsType {
    moddedStats: {
        notes: number;
        fakeNotes: number;
        walls: number;
        fakeWalls: number;
        bombs: number;
        fakeBombs: number;
        lights: number;
        customEvents: {
            animTrack: number;
            pathAnim: number;
            trackParent: number;
            playerTrack: number;
            fogTrack: number;
        };
        pointDefinitions: number;
        environments: number;
    };
    vanillaStats: {
        notes: number;
        walls: number;
        bombs: number;
        lights: number;
    };
};

function showStats(properties?: IFinalizeProperties): IStatsType {
    const vs = {
        notes: 0,
        walls: 0,
        bombs: 0,
        lights: 0
    };
    const ms = {
        notes: 0,
        fakeNotes: 0,
        walls: 0,
        fakeWalls: 0,
        bombs: 0,
        fakeBombs: 0,
        lights: 0,
        customEvents: {
            animTrack: 0,
            pathAnim: 0,
            trackParent: 0,
            playerTrack: 0,
            fogTrack: 0
        },
        pointDefinitions: 0,
        environments: 0
    }
    if (!properties) return {
        moddedStats: ms,
        vanillaStats: vs
    };
    const p = properties;
    if (p.showModdedStats) {
        const s = p.showModdedStats;
        if (s.notes) {
            if (V3) {
                ms.notes = notes.length;
                ms.fakeNotes = fakeNotes.length;
            } else {
                notes.forEach((n: INote) => {
                    if (n.customData.fake) ms.fakeNotes++
                    else ms.notes++
                })
            }
        }
        if (s.walls) {
            if (V3) {
                ms.walls = walls.length;
                ms.fakeWalls = fakeWalls.length;
            } else {
                walls.forEach((w: IWall) => {
                    if (w.customData.fake) ms.fakeWalls++;
                    else ms.walls++;
                })
            }
        }
        // if (s.bombs) {
        //     if (V3) {
        //         ms.bombs = bombs.length;
        //         ms.fakeBombs = fakeBombs.length;
        //     } else {
        //         bombs.forEach((n: INote) => {
        //             if (n.customData.fake) ms.fakeBombs++;
        //             else ms.bombs++;
        //         })
        //     }
        // }
        if (s.lights) ms.lights = lightEvents.length;
        if (s.customEvents) {
            events.forEach((e: Record<string, any>) => {
                switch (e.type) {
                    case "AnimateTrack":
                        ms.customEvents.animTrack++;
                        break;
                    case "AssignPathAnimation":
                        ms.customEvents.pathAnim++;
                        break;
                    case "AssignTrackParent":
                        ms.customEvents.trackParent++;
                        break;
                    case "AssignPlayerToTrack":
                        ms.customEvents.playerTrack++;
                        break;
                    case "AssignFogTrack":
                        ms.customEvents.fogTrack++;
                        break;
                }
            });
        }
        if (s.pointDefinitions) ms.pointDefinitions = Object.keys(pointDefinitions).length;
        if (s.showEnvironmentStats) ms.environments = environment.length;
    }
    if (p.showVanillaStats) {
        const s = p.showVanillaStats;
        const d = JSON.parse(readFileSync(activeInput, 'utf-8'));
        if (V3) {
            if (s.notes) vs.notes = d.colorNotes.length;
            if (s.bombs) vs.bombs = d.bombNotes.length;
            if (s.lights) vs.lights = d.basicBeatmapEvents.length;
            if (s.walls) vs.walls = d.obstacles.length;
        }
    }
    return {
        moddedStats: ms,
        vanillaStats: vs
    };
}

function setRequirements(requirements: string | string[]) {
    infoFile.difficultyBeatmapSets.forEach(set => {
        set.difficultyBeatmaps.forEach(diff => {
            if (diff.beatmapFilename === activeOutput) {
                if (typeof requirements === "string") diff.customData.requirements = [requirements];
                else diff.customData.requirements = requirements;
            }
        });
    });
}
function setSettings(settings: ISettings) {
    infoFile.difficultyBeatmapSets.forEach(set => {
        set.difficultyBeatmaps.forEach(diff => {
            if (diff.beatmapFilename === activeOutput) {
                diff.customData.settings = settings;
            }
        });
    });
}
function setSuggestions(suggestions: string | string[]) {
    infoFile.difficultyBeatmapSets.forEach(set => {
        set.difficultyBeatmaps.forEach(diff => {
            if (diff.beatmapFilename === activeOutput) {
                if (typeof suggestions === "string") diff.customData.suggestions = [suggestions];
                else diff.customData.requirements = suggestions;
            }
        });
    });
}
function setWarnings(warnings: string | string[]) {
    infoFile.difficultyBeatmapSets.forEach(set => {
        set.difficultyBeatmaps.forEach(diff => {
            if (diff.beatmapFilename === activeOutput) {
                if (typeof warnings === "string") diff.customData.warnings = [warnings];
                else diff.customData.warnings = warnings;
            }
        });
    });
}


export let V3FILE = V3;
/**
 * @param difficulty The difficulty that the map should be written to.
 * @param properties Miscellaneous properties for the script, such as how it's exported.
 * Map.finalize(difficulty, {
 *     formatting: true,
 *     showModdedStats: {
 *         customEvents: true,
 *         notes: true,
 *         lights: true,
 *         pointDefinitions: true,
 *         walls: true
 *     }
 * });
 */
export function finalize(difficulty: any, properties?: IFinalizeProperties): void {
    let precision = 5;
    if (properties) {
        const p = properties;
        if (p.formatting) formatting = true;
        if (p.requirements) setRequirements(p.requirements);
        if (p.suggestions) setSuggestions(p.suggestions);
        if (p.warnings) setWarnings(p.warnings);
        if (p.settings) setSettings(p.settings);
        if (p.roundNumbers) precision = p.roundNumbers;
        const stringifiedInfo = JSON.stringify(infoFile, null, 4).replace(/"(\w+)":/g, '"_$1":');
        writeFileSync('Info.dat', stringifiedInfo);
    }
    switch (properties.format) {
        case "V2": V3FILE = false; break;
        case "V3": V3FILE = true; break;
        default: V3FILE = V3; break; // Just for backup :3
    }
    const sortP = Math.pow(10, 2);
    const jsonP = Math.pow(10, precision);

    
    function deeperDaddy(obj: any) {
        if (obj) for (const key in obj) {
            if (obj[key] == null) {
                delete obj[key];
            } else if (typeof obj[key] === "object" || Array.isArray(obj[key])) {
                deeperDaddy(obj[key]);
            } else if (typeof obj[key] === "number") {
                obj[key] = Math.round(obj[key] * jsonP) / jsonP;
            }
        }
        return obj;
    }

    if (!V3FILE) {
        environmentToJSON()
        let newDiff: IMapV2 = {
            _version: "2.2.0",
            _notes: notesToJSON(),
            _obstacles: wallsToJSON(),
            _events: lightsToJSON(),
            _waypoints: [],
            _customData: {
                _bookmarks: [],
                _customEvents: customEventsToJSON(),
                _environment: environmentToJSON(),
                _pointDefinitions: pointDefinitionsToV2JSON(),
                _materials: materials
            }
        }
        if (properties && properties.sortObjects) {
            newDiff._notes.sort((a: { _time: number; _lineIndex: number; _lineLayer: number; }, b: { _time: number; _lineIndex: number; _lineLayer: number; }) => (Math.round((a._time + Number.EPSILON) * sortP) / sortP) - (Math.round((b._time + Number.EPSILON) * sortP) / sortP) || (Math.round((a._lineIndex + Number.EPSILON) * sortP) / sortP) - (Math.round((b._lineIndex + Number.EPSILON) * sortP) / sortP) || (Math.round((a._lineLayer + Number.EPSILON) * sortP) / sortP) - (Math.round((b._lineLayer + Number.EPSILON) * sortP) / sortP));
            newDiff._obstacles.sort((a: any, b: any) => a._time - b._time);
            newDiff._events.sort((a: any, b: any) => a._time - b._time);
        }

        if (newDiff._customData._materials.length < 1) {
            delete (difficulty._customData._materials)
        }
        newDiff = deeperDaddy(newDiff);
        let outputtedDiff = JSON.stringify(newDiff)
        if (formatting == true) {
            outputtedDiff = JSON.stringify(newDiff, null, 4)
        }
        writeFileSync(activeOutput, outputtedDiff)
    }
    if (V3FILE) {
        difficulty.colorNotes = notesToJSON();
        difficulty.burstSliders = chainsToJSON();
        difficulty.sliders = arcsToJSON();
        difficulty.obstacles = wallsToJSON();
        difficulty.basicBeatmapEvents = lightsToJSON();
        difficulty.customData.customEvents = customEventsToJSON();
        difficulty.customData.environment = environmentToJSON();
        difficulty.customData.pointDefinitions = pointDefinitions;
        difficulty.customData.materials = materials;
        if (properties && properties.sortObjects) {
            difficulty.colorNotes.sort((a: { b: number; x: number; y: number; }, b: { b: number; x: number; y: number; }) => (Math.round((a.b + Number.EPSILON) * sortP) / sortP) - (Math.round((b.b + Number.EPSILON) * sortP) / sortP) || (Math.round((a.x + Number.EPSILON) * sortP) / sortP) - (Math.round((b.x + Number.EPSILON) * sortP) / sortP) || (Math.round((a.y + Number.EPSILON) * sortP) / sortP) - (Math.round((b.y + Number.EPSILON) * sortP) / sortP));
            difficulty.burstSliders.sort((a: { b: number; x: number; y: number; }, b: { b: number; x: number; y: number; }) => (Math.round((a.b + Number.EPSILON) * sortP) / sortP) - (Math.round((b.b + Number.EPSILON) * sortP) / sortP) || (Math.round((a.x + Number.EPSILON) * sortP) / sortP) - (Math.round((b.x + Number.EPSILON) * sortP) / sortP) || (Math.round((a.y + Number.EPSILON) * sortP) / sortP) - (Math.round((b.y + Number.EPSILON) * sortP) / sortP));
            difficulty.obstacles.sort((a: any, b: any) => a.b - b.b);
            difficulty.basicBeatmapEvents.sort((a: any, b: any) => a.b - b.b);
        }
        if (difficulty.customData.materials && Object.keys(difficulty.customData.materials).length < 1) {
            delete difficulty.customData.materials
        }
        difficulty = deeperDaddy(difficulty);
        let outputtedDiff = JSON.stringify(difficulty)
        if (formatting == true) {
            outputtedDiff = JSON.stringify(difficulty, null, 4)
        }

        writeFileSync(activeOutput, outputtedDiff)
    }

    const stats = showStats(properties);
    const ms = stats.moddedStats;
    const vs = stats.vanillaStats;

    //#region Console logs :) (DON'T LOOK)

    console.log(" \x1b[5m\x1b[35m\x1b[1m __  __                 __      \x1b[37m__           __        ")
    console.log(" \x1b[35m/\\ \\/\\ \\               /\\ \\  _ \x1b[37m/\\ \\       __/\\ \\       ")
    console.log(" \x1b[35m\\ \\ \\_\\ \\     __    ___\\ \\ \\/ \\\x1b[37m\\ \\ \\     /\\_\\ \\ \\____  ")
    console.log(" \x1b[35m \\ \\  _  \\  / __ \\ / ___\\ \\   < \x1b[37m\\ \\ \\    \\/\\ \\ \\  __ \\ ")
    console.log(" \x1b[35m  \\ \\ \\ \\ \\/\\  __//\\ \\__/\\ \\ \\\\ \\\x1b[37m\\ \\ \\____\\ \\ \\ \\ \\_\\ \\")
    console.log(" \x1b[35m   \\ \\_\\ \\_\\ \\____\\ \\____\\\\ \\_\\ \\_\x1b[37m\\ \\____/ \\ \\_\\ \\____/")
    console.log(" \x1b[35m    \\/_/\\/_/\\/____/\\/____/ \\/_/\\/_/\x1b[37m\\/___/   \\/_/\\/___/ ")
    console.log(" \x1b[0m ")
    console.log(" ======================================================= \n")
    if (properties?.showVanillaStats) console.log(" \x1b[36m\x1b[1m\x1b[4m" + "=== VANILLA MAP INFO ===" + "\x1b[0m" +
        "\n\n Notes: \x1b[32m\x1b[1m" + vs.notes +
        "\x1b[0m\n Bombs: \x1b[32m\x1b[1m" + vs.bombs +
        "\x1b[0m\n Walls: \x1b[32m\x1b[1m" + vs.walls + "\x1b[0m\n\n")
    if (properties?.showModdedStats) console.log(" \x1b[36m\x1b[1m\x1b[4m" + "=== MODDED MAP INFO ===" +
        "\x1b[0m" + "\n\n Notes: \x1b[32m\x1b[1m" + ms.notes +
        "\x1b[0m\n" + " Fake Notes: \x1b[32m\x1b[1m" + ms.fakeNotes +
        "\x1b[0m\n Walls: \x1b[32m\x1b[1m" + ms.walls +
        "\x1b[0m\n Fake Walls: \x1b[32m\x1b[1m" + ms.fakeWalls +
        "\x1b[0m\n" + " Lights: \x1b[32m\x1b[1m" + ms.lights + "\x1b[0m\n\n")
    if (properties?.showModdedStats?.customEvents) console.log(" \x1b[36m\x1b[1m\x1b[4m" + "=== CUSTOM EVENTS INFO ===" + "\x1b[0m" +
        "\n\n AnimateTracks: \x1b[32m\x1b[1m" + ms.customEvents.animTrack +
        "\x1b[0m\n AssignPathAnimations: \x1b[32m\x1b[1m" + ms.customEvents.pathAnim +
        "\x1b[0m\n AssignTrackParents: \x1b[32m\x1b[1m" + ms.customEvents.trackParent +
        "\x1b[0m\n AssignPlayerToTracks: \x1b[32m\x1b[1m" + ms.customEvents.playerTrack +
        "\x1b[0m\n AssignFogTracks: \x1b[32m\x1b[1m" + ms.customEvents.fogTrack +
        "\x1b[0m\n PointDefinitions: \x1b[32m\x1b[1m" + ms.pointDefinitions +
        "\x1b[0m\n\n");
    if (properties?.showModdedStats?.showEnvironmentStats) console.log(" \x1b[36m\x1b[1m\x1b[4m" + "=== ENVIRONMENT INFO ===" + "\x1b[0m" +
        "\n\n Environment Objects: \x1b[32m\x1b[1m" + environment.length + "\x1b[0m\n\n")
    //#endregion Console logs :) (DON'T LOOK)
    
    console.timeEnd('HeckLib ran in')
}