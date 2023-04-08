import ParticleTunnel from "./particleTunnel";
import RandomPath from "./randomPath";
import MovePath from "./movePath";
import NoteTrail from "./noteTrail";

/**
 * A module that has multiple premade customizable effects that are very commonly seen in maps.
 * 
 * Very useful for beginners with no prior knowledge of noodle or JS/TS.
 * 
 * All the effects included are
 * 
 * ---
 * #### `ParticleTunnel`
 * Creates a hollow cylinder made out of small cubes around the player.
 * 
 * ---
 * #### `RandomPath`
 * Randomizes the path of all notes between `start` and `end`.
 * 
 * ---
 * #### `MovePath`
 * Moves the starting point of the notes' path over a specified amount of time.
 * 
 * ---
 * #### `NoteTrail`
 * Creates a trail behind each individual note that can be customized.
 */
const Effect = {
    ParticleTunnel,
    RandomPath,
    MovePath,
    NoteTrail
}

export default Effect;