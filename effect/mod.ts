import ParticleTunnel from "./particleTunnel";
import RandomPath from "./randomPath";
import MovePath from "./movePath";
import NoteTrail from "./noteTrail";
import Distortion from "./distortion";

/**
 * A module that has multiple premade customizable effects that are very commonly seen in maps.
 * 
 * Very useful for beginners with no prior knowledge of noodle or JS/TS.
 * 
 * All the effects included are
 * 
 * ---
 * #### `Distortion`
 * Distorts the game using floating point errors.
 * 
 * ---
 * #### `MovePath`
 * Moves the starting point of the notes' path over a specified amount of time.
 * 
 * ---
 * #### `NoteTrail`
 * Creates a trail behind each individual note that can be customized.
 * 
 * ---
 * #### `ParticleTunnel`
 * Creates a hollow cylinder made out of small cubes around the player.
 * 
 * ---
 * #### `RandomPath`
 * Randomizes the path of all notes between `start` and `end`.
 */
const Effect = {
    Distortion,
    MovePath,
    NoteTrail,
    ParticleTunnel,
    RandomPath
}

export default Effect;