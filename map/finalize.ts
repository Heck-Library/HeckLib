import { readFileSync, writeFileSync } from "fs";
import { V3, activeInput, activeOutput, infoFile } from "./initialize";
import { chainsToJSON } from "./converters/chainsToJSON";
import { pointDefinitionsToV2JSON } from "./converters/pointDefinitionsToV2JSON";
import { arcsToJSON } from "./converters/arcsToJSON";
import INote from "../interfaces/objects/note";
import IWall from "../interfaces/objects/wall";
import { lightEvents, pointDefinitions, environment, materials, events, geometry, fakeBombs } from "./variables";
import ISettings from "../interfaces/info/settings";
import IMapV2 from "../interfaces/v2map";
import ICustomEvent from "../interfaces/events/eventData/ICustomEvent";
import IEnvironment from "../interfaces/environment/environment";
import IGeometryEnvironment from "../interfaces/environment/geometry";
import ILightEvent from "../interfaces/environment/lightEvent";
import V2JsonNote from "../interfaces/objects/json/v2/v2jsonNote";
import { notes, fakeNotes} from "../objects/note";
import Wall, { walls, fakeWalls } from "../objects/wall";
import { fakeChains } from "../objects/chain";
import { fakeArcs } from "../objects/arc";
import V3JsonNote from "../interfaces/objects/json/v3/v3jsonNote";
import { bombs } from "./variables";
import Bomb from "../objects/bomb";
import animationsToDefinitions from "./animsToDefs";

interface IRGB {
    r: number;
    g: number;
    b: number;
}

interface IContributor {
    role: string;
    name: string;
    iconPath: string;
}

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
    /**
     * ### Difficulty Label
     * 
     * Adds a difficulty label to the map. This is the text that shows up in place of the difficulty name, such as "Expert" or "ExpertPlus". Leave empty to not add a difficulty label.
     */
    difficultyLabel?: string;
    colorLeft?: IRGB;
    colorRight?: IRGB;
    envColorLeft?: IRGB;
    envColorRight?: IRGB;
    envColorLeftBoost?: IRGB;
    envColorRightBoost?: IRGB;
    obstaclesColor?: IRGB;
    contributors?: IContributor[];
    optimizeDefinitions?: boolean;
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
function setColor(rgb: IRGB, section: "colorLeft" | "colorRight" | "envColorLeft" | "envColorRight" | "envColorLeftBoost" | "envColorRightBoost" | "obstaclesColor") {
    infoFile.difficultyBeatmapSets.forEach(set => {
        set.difficultyBeatmaps.forEach(diff => {
            if (diff.beatmapFilename === activeOutput) {
                diff.customData[section] = rgb;
            }
        });
    });
}

function customEventsToJSON(): Record<string, any>[] {
    console.time("Wrote custom events in");
    const eventArr: any[] = [];
    if (events)
        events.forEach((e: ICustomEvent) => {
            const eventJSON: Record<string, any> = {
                b: e.time,
                t: e.type,
                d: e.data
            };
            let stringified = JSON.stringify(eventJSON);
            if (!V3FILE) {
                stringified = stringified
                    .replace('"b":', '"time":')
                    .replace('"t":', '"type":')
                    .replace('"d":', '"data":')
                    .replace(/"([^_][\w\d]+)":/g, '"_$1":');
            }
            eventArr.push(JSON.parse(stringified));
        });
    console.timeEnd("Wrote custom events in");
    return eventArr;
}
function environmentToJSON() {
    console.time("Wrote environments in");
    const envArr: any[] = [];
    if (environment) {
        environment.forEach((e: IEnvironment) => {
            const envJSON: Record<string, any> = {
                id: e.id,
                lookupMethod: e.lookupMethod,
                components: e.components,
                duplicate: e.duplicate,
                active: e.active,
                scale: e.scale,
                position: e.position,
                localPosition: e.localPosition,
                rotation: e.rotation,
                localRotation: e.localRotation,
                lightID: e.lightID,
                track: e.track
            }
            let stringified = JSON.stringify(envJSON);
            if (!V3FILE) {
                stringified = stringified.replace(/"([^_][\w\d]+)":/g, '"_$1":');
            }
            if (Object.keys(e).length != 0) envArr.push(JSON.parse(stringified));
        });
        geometry.forEach((e: IGeometryEnvironment) => {
            const envJSON: Record<string, any> = {
                components: e.components,
                active: e.active,
                scale: e.scale,
                position: e.position,
                localPosition: e.localPosition,
                rotation: e.rotation,
                localRotation: e.localRotation,
                lightID: e.lightID,
                track: e.track,
                geometry: e.geometry
            }
            let stringified = JSON.stringify(envJSON);
            if (!V3FILE) {
                stringified = stringified.replace(/"([^_][\w\d]+)":/g, '"_$1":');
            }
            if (Object.keys(e).length != 0) envArr.push(JSON.parse(stringified));
        });
    }
    console.timeEnd("Wrote environments in");
    return envArr;
}
function lightsToJSON(): Record<string, any>[] {
    console.time("Wrote lights in")
    const lightArr: any[] = [];
    lightEvents.forEach((l: ILightEvent) => {
        const lightJSON: Record<string, any> = {
            b: l.time,
            et: l.type,
            i: l.value,
        };
        if (l.float)
            lightJSON.f = l.float;
        if (l.data && Object.keys(l.data).length > 0)
            lightJSON.customData = l.data;
        let stringified = JSON.stringify(lightJSON);
        if (!V3FILE) {
            stringified = stringified
                .replace('"b":', '"time":')
                .replace('"et":', '"type":')
                .replace('"i":', '"value":')
                .replace('"f":', '"floatValue":')
                .replace('"lockRotation":', '"lockPosition":')
                .replace(/"([^_][\w\d]+)":/g, '"_$1":');
        }
        lightArr.push(JSON.parse(stringified));
    });
    console.timeEnd("Wrote lights in")
    return lightArr;
}
function notesToJSON(): V2JsonNote[] | V3JsonNote[] {
    console.time("Wrote notes in");
    const noteArr: any[] = [];
    if (notes) notes.forEach((n: INote) => {
        let noteJSON: V2JsonNote | V3JsonNote;
        let v3fake = false;
        if (V3FILE) {
            v3fake = n.customData.fake
            noteJSON = {
                b: n.time,
                x: n.x,
                y: n.y,
                c: n.type,
                d: n.direction,
                a: n.angle,
                f: 0,
                customData: {
                    color: n.customData.color,
                    disableNoteGravity: n.customData.disableNoteGravity,
                    spawnEffect: n.customData.disableSpawnEffect,
                    disableNoteLook: n.customData.disableNoteLook,
                    flip: n.customData.flip,
                    localRotation: n.customData.localRotation,
                    coordinates: n.customData.position,
                    uninteractable: undefined,
                    scale: n.customData.scale,
                    noteJumpMovementSpeed: n.customData.njs,
                    noteJumpStartBeatOffset: n.customData.offset,
                    track: n.customData.track,
                    worldRotation: n.customData.rotation,
                    animation: {
                        color: n.animation.color,
                        localRotation: n.animation.localRotation,
                        offsetPosition: n.animation.position,
                        offsetWorldRotation: n.animation.rotation,
                        definitePosition: n.animation.definitePosition,
                        dissolve: n.animation.dissolve,
                        dissolveArrow: n.animation.dissolveArrow,
                        scale: n.animation.scale
                    }
                }
            }
            if (n.customData.interactable === false) noteJSON.customData.uninteractable = true;
        } else {
            noteJSON = {
                _time: n.time,
                _lineIndex: n.x,
                _lineLayer: n.y,
                _type: n.type,
                _cutDirection: n.direction,
                _customData: {
                    _color: n.customData.color,
                    _disableNoteGravity: n.customData.disableNoteGravity,
                    _disableSpawnEffect: n.customData.disableSpawnEffect,
                    _disableNoteLook: n.customData.disableNoteLook,
                    _flip: n.customData.flip,
                    _localRotation: n.customData.localRotation,
                    _position: n.customData.position,
                    _fake: n.customData.fake,
                    _interactable: n.customData.interactable,
                    _scale: n.customData.scale,
                    _noteJumpMovementSpeed: n.customData.njs,
                    _noteJumpStartBeatOffset: n.customData.offset,
                    _track: n.customData.track,
                    _rotation: n.customData.rotation,
                    _animation: {
                        _color: n.animation.color,
                        _localRotation: n.animation.localRotation,
                        _position: n.animation.position,
                        _rotation: n.animation.rotation,
                        _definitePosition: n.animation.definitePosition,
                        _dissolve: n.animation.dissolve,
                        _dissolveArrow: n.animation.dissolveArrow,
                        _scale: n.animation.scale
                    }
                }
            };
        }
        if (v3fake) {
            fakeNotes.push(noteJSON);
        } else
            noteArr.push(noteJSON);
    });
    console.timeEnd("Wrote notes in");
    return noteArr;
}
function wallsToJSON(): Record<string, any>[] {
    console.time("Wrote walls in");
    const wallArr: any[] = [];
    walls.forEach((w: Wall) => {
        let wallJSON: Record<string, any>;
        if (V3FILE) {
            wallJSON = {
                b: w.time,
                x: w.x,
                y: w.y,
                d: w.duration,
                w: w.width,
                h: w.height,
                customData: {
                    track: w.customData.track,
                    noteJumpMovementSpeed: w.customData.njs,
                    noteJumpStartBeatOffset: w.customData.offset,
                    fake: w.customData.fake,
                    uninteractable: !w.customData.interactable,
                    scale: w.customData.scale,
                    coordinates: w.customData.position,
                    worldRotation: w.customData.rotation,
                    localRotation: w.customData.localRotation,
                    color: w.customData.color,
                    animation: {
                        dissolve: w.animation.dissolve,
                        dissolveArrow: w.animation.dissolveArrow,
                        position: w.animation.position,
                        rotation: w.animation.rotation,
                        localRotation: w.animation.localRotation,
                        scale: w.animation.scale,
                        color: w.animation.color,
                        definitePosition: w.animation.definitePosition
                    }
                }
            };
        } else {
            wallJSON = {
                _time: w.time,
                _lineIndex: w.x,
                _type: w.y,
                _duration: w.duration,
                _width: w.width,
                _customData: {
                    _track: w.customData.track,
                    _noteJumpMovementSpeed: w.customData.njs,
                    _noteJumpStartBeatOffset: w.customData.offset,
                    _fake: w.customData.fake,
                    _interactable: w.customData.interactable,
                    _scale: w.customData.scale,
                    _position: w.customData.position,
                    _rotation: w.customData.rotation,
                    _localRotation: w.customData.localRotation,
                    _color: w.customData.color,
                    _animation: {
                        _dissolve: w.animation.dissolve,
                        _dissolveArrow: w.animation.dissolveArrow,
                        _position: w.animation.position,
                        _rotation: w.animation.rotation,
                        _localRotation: w.animation.localRotation,
                        _scale: w.animation.scale,
                        _color: w.animation.color,
                        _definitePosition: w.animation.definitePosition
                    }
                }
            }
        }
        if (wallJSON.customData && Object.keys(wallJSON.customData.animation).length < 1)
            delete wallJSON.customData.animation;
        if (wallJSON.customData && Object.keys(wallJSON.customData).length < 1)
            delete wallJSON.customData;
        if (V3FILE && wallJSON.customData && Object.keys(wallJSON.customData).includes("fake")) {
            delete wallJSON.customData.fake;
            delete walls[walls.indexOf(w)];
            fakeWalls.push(wallJSON);
        } else {
            wallArr.push(wallJSON);
        }
    });
    console.timeEnd("Wrote walls in");
    return wallArr;
}
function bombsToJSON(): Record<string, any>[] {
    console.time("Wrote bombs in");
    const bombArr: any[] = [];
    bombs.forEach((b: Bomb) => {
        const bomb = {
            b: b.time,
            x: b.x,
            y: b.y,
            customData: {
                track: b.customData.track,
                noteJumpMovementSpeed: b.customData.njs,
                noteJumpStartBeatOffset: b.customData.offset,
                fake: b.customData.fake,
                uninteractable: !b.customData.interactable,
                scale: b.customData.scale,
                coordinates: b.customData.position,
                worldRotation: b.customData.rotation,
                localRotation: b.customData.localRotation,
                color: b.customData.color,
                animation: {
                    dissolve: b.animation.dissolve,
                    offsetPosition: b.animation.position,
                    offsetWorldRotation: b.animation.rotation,
                    localRotation: b.animation.localRotation,
                    scale: b.animation.scale,
                    color: b.animation.color,
                    definitePosition: b.animation.definitePosition
                }
            }
        };
        if (bomb.customData.fake) {
            delete bomb.customData.fake;
            fakeBombs.push(bomb);
        } else {
            bombArr.push(bomb);
        }
    });
    console.timeEnd("Wrote bombs in");
    return bombArr;
}



export let V3FILE = V3;
/**
 * @param difficulty The difficulty that the map should be written to.
 * @param properties Miscellaneous properties for the script, such as how it's exported and requirements.
 * ```ts
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
 * ```
 */
export function finalize(difficulty: any, properties?: IFinalizeProperties): void {
    console.log("\n ===== Map Debug Above =====\n")
    console.time("\x1b[36mFinalized in");
    let precision = 5;
    if (properties) {
        const p = properties;
        if (p.formatting) formatting = true;
        console.time("Info.dat written in");
        if (p.contributors) infoFile.customData.contributors = p.contributors;
        if (p.colorLeft) setColor(p.colorLeft, "colorLeft");
        if (p.colorRight) setColor(p.colorRight, "colorRight");
        if (p.envColorLeft) setColor(p.envColorLeft, "envColorLeft");
        if (p.envColorRight) setColor(p.envColorRight, "envColorRight");
        if (p.envColorLeftBoost) setColor(p.envColorLeftBoost, "envColorLeftBoost");
        if (p.envColorRightBoost) setColor(p.envColorRightBoost, "envColorRightBoost");
        if (p.obstaclesColor) setColor(p.obstaclesColor, "obstaclesColor");
        if (p.requirements) setRequirements(p.requirements);
        if (p.suggestions) setSuggestions(p.suggestions);
        if (p.warnings) setWarnings(p.warnings);
        if (p.settings) setSettings(p.settings);
        if (p.roundNumbers) precision = p.roundNumbers;
        if (p.optimizeDefinitions) animationsToDefinitions();
        const stringifiedInfo = JSON.stringify(infoFile, null, 4).replace(/"(\w+)":/g, '"_$1":');
        writeFileSync('Info.dat', stringifiedInfo);
        console.timeEnd("Info.dat written in");
        console.log("")
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
        environmentToJSON();
        const mats = JSON.parse(JSON.stringify(materials).replace(/"(\w+)": ?([^\{])/g, '"_$1":$2'));
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
                _materials: mats
            }
        }
        if (properties && properties.sortObjects) {
            console.time("Objects sorted in")
            newDiff._notes.sort((a: { _time: number; _lineIndex: number; _lineLayer: number; }, b: { _time: number; _lineIndex: number; _lineLayer: number; }) => (Math.round((a._time + Number.EPSILON) * sortP) / sortP) - (Math.round((b._time + Number.EPSILON) * sortP) / sortP) || (Math.round((a._lineIndex + Number.EPSILON) * sortP) / sortP) - (Math.round((b._lineIndex + Number.EPSILON) * sortP) / sortP) || (Math.round((a._lineLayer + Number.EPSILON) * sortP) / sortP) - (Math.round((b._lineLayer + Number.EPSILON) * sortP) / sortP));
            newDiff._obstacles.sort((a: any, b: any) => a._time - b._time);
            newDiff._events.sort((a: any, b: any) => a._time - b._time);
            newDiff._customData._customEvents.sort((a: any, b: any) => a._time - b._time);
            console.timeEnd("Objects sorted in")
        }

        if (newDiff._customData._materials.length < 1) {
            delete (difficulty._customData._materials)
        }
        console.log("");
        console.time("Numbers rounded in");
        newDiff = deeperDaddy(newDiff);
        console.timeEnd("Numbers rounded in");
        let outputtedDiff = JSON.stringify(newDiff)
        if (formatting == true) {
            console.time("Formatted output file in")
            outputtedDiff = JSON.stringify(newDiff, null, 4)
            console.timeEnd("Formatted output file in")
        }
        writeFileSync(activeOutput, outputtedDiff)
    }
    if (V3FILE) {
        difficulty.colorNotes = notesToJSON();
        difficulty.bombNotes = bombsToJSON();
        difficulty.burstSliders = chainsToJSON();
        difficulty.sliders = arcsToJSON();
        difficulty.obstacles = wallsToJSON();
        difficulty.basicBeatmapEvents = lightsToJSON();
        difficulty.customData.customEvents = customEventsToJSON();
        difficulty.customData.environment = environmentToJSON();
        difficulty.customData.pointDefinitions = pointDefinitions;
        difficulty.customData.fakeObstacles = fakeWalls;
        difficulty.customData.fakeColorNotes = fakeNotes;
        difficulty.customData.fakeSliders = fakeArcs;
        difficulty.customData.fakeBurstSliders = fakeChains;
        difficulty.customData.fakeBombs = fakeBombs;
        difficulty.customData.materials = materials;
        if (properties && properties.sortObjects) {
            console.time("Objects sorted in")
            difficulty.colorNotes.sort((a: { b: number; x: number; y: number; }, b: { b: number; x: number; y: number; }) => (Math.round((a.b + Number.EPSILON) * sortP) / sortP) - (Math.round((b.b + Number.EPSILON) * sortP) / sortP) || (Math.round((a.x + Number.EPSILON) * sortP) / sortP) - (Math.round((b.x + Number.EPSILON) * sortP) / sortP) || (Math.round((a.y + Number.EPSILON) * sortP) / sortP) - (Math.round((b.y + Number.EPSILON) * sortP) / sortP));
            difficulty.burstSliders.sort((a: { b: number; x: number; y: number; }, b: { b: number; x: number; y: number; }) => (Math.round((a.b + Number.EPSILON) * sortP) / sortP) - (Math.round((b.b + Number.EPSILON) * sortP) / sortP) || (Math.round((a.x + Number.EPSILON) * sortP) / sortP) - (Math.round((b.x + Number.EPSILON) * sortP) / sortP) || (Math.round((a.y + Number.EPSILON) * sortP) / sortP) - (Math.round((b.y + Number.EPSILON) * sortP) / sortP));
            difficulty.obstacles.sort((a: any, b: any) => a.b - b.b);
            difficulty.basicBeatmapEvents.sort((a: any, b: any) => a.b - b.b);
            difficulty.customData.customEvents.sort((a: any, b: any) => a.b - b.b);
            console.timeEnd("Objects sorted in")
        }
        if (difficulty.customData.materials && Object.keys(difficulty.customData.materials).length < 1) {
            delete difficulty.customData.materials
        }
        console.log("");
        if (properties && properties.roundNumbers) {
            console.time("Numbers rounded in");
            difficulty = deeperDaddy(difficulty);
            console.timeEnd("Numbers rounded in");
        }
        let outputtedDiff = JSON.stringify(difficulty)
        if (formatting == true) {
            console.time("Formatted output file in")
            outputtedDiff = JSON.stringify(difficulty, null, 4)
            console.timeEnd("Formatted output file in")
        }

        console.time("Wrote difficulty file in");
        writeFileSync(activeOutput, outputtedDiff)
        console.timeEnd("Wrote difficulty file in");
    }

    const stats = showStats(properties);
    const ms = stats.moddedStats;
    const vs = stats.vanillaStats;

    console.log("");
    console.timeEnd("\x1b[36mFinalized in");
    console.log("");

    //#region Console logs :) (DON'T LOOK)

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
    console.log("\x1b[0m\n =============== \n")
    console.timeEnd('HeckLib ran in')
}