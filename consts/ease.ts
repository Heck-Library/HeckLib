enum In {
    Sine = "easeInSine",
    Cubic = "easeInCubic",
    Quint = "easeInQuint",
    Circ = "easeInCirc",
    Elastic = "easeInElastic",
    Quad = "easeInQuad",
    Quart = "easeInQuart",
    SinExpo = "easeInExpo",
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
    SinExpo = "easeOutExpo",
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
    SinExpo = "easeInOutExpo",
    Back = "easeInOutBack",
    Bounce = "easeInOutBounce"
}
const Step = "easeStep";
export const ease = {
    In,
    Out,
    InOut,
    Step
}