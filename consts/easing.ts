enum In {
    Sine = "easeInSine",
    Cubic = "easeInCubic",
    Quint = "easeInQuint",
    Circ = "easeInCirc",
    Elastic = "easeInElastic",
    Quad = "easeInQuad",
    Quart = "easeInQuart",
    Expo = "easeInExpo",
    Back = "easeInBack",
    Bounce = "easeInBounce"
}
enum Out {
    Sine = "easeOutSine",
    Cubic = "easeOutCubic",
    Quint = "easeOutQuint",
    Circ = "easeOutCirc",
    Elastic = "easeOutElastic",
    Quad = "easeOutQuad",
    Quart = "easeOutQuart",
    Expo = "easeOutExpo",
    Back = "easeOutBack",
    Bounce = "easeOutBounce"
}
enum InOut {
    Sine = "easeInOutSine",
    Cubic = "easeInOutCubic",
    Quint = "easeInOutQuint",
    Circ = "easeInOutCirc",
    Elastic = "easeInOutElastic",
    Quad = "easeInOutQuad",
    Quart = "easeInOutQuart",
    Expo = "easeInOutExpo",
    Back = "easeInOutBack",
    Bounce = "easeInOutBounce"
}
const Step = "easeStep";
/**
 * ### Ease
 * 
 * Easing functions specify the rate of change of a parameter over time.
 * 
 * @see https://easings.net/ for all easing functions.
 */
const ease = {
    /**
     * ### easeIn
     * 
     * In easings, the motion starts slowly and then accelerates as the motion progresses.
     */
    In,
    /**
     * ### easeOut
     * 
     * Out easings, the motion starts quickly and then decelerates to a stop.
     */
    Out,
    /**
     * ### easeInOut
     * 
     * InOut easings, the motion starts slowly, accelerates motion, then decelerates to a stop.
     */
    InOut,
    /**
     * ### easeStep
     * 
     * Instant transition.
     */
    Step
}
export default ease;