import Distortion from "./distortion";
import GlitchDistortion from "./glitchDistortion";
import NoteTrail from "./noteTrail";
import ParticleTunnel from "./particleTunnel";
import RandomPath from "./randomPath";

/**
 * ### Effect
 * 
 * `Effect` is a collection of commonly used premade effects that can be applied to the map. These effects are highly customizable, hence they are classes.
 */
const Effect = {
    /**
     * ### Distortion
     * 
     * `Distortion` is a premade effect that distorts the vision in a way where everything looks wavy.
     */
    Distortion,
    /**
     * ### Glitch Distortion
     * 
     * `GlitchDistortion` is a premade effect that distorts the vision in a way where everything looks glitchy.
     */
    GlitchDistortion,
    /**
     * ### Note Trail
     * 
     * `NoteTrail` is a premade effect that creates a trail of notes behind each note.
     */
    NoteTrail,
    /**
     * ### Particle Tunnel
     * 
     * `ParticleTunnel` is a premade effect that creates a tunnel of particles around the player and the track.
     */
    ParticleTunnel,
    /**
     * ### Random Path
     * 
     * `RandomPath` is a premade effect that randomizes the path of the notes.
     */
    RandomPath
}

export default Effect;