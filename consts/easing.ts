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
const ease = {
    In,
    Out,
    InOut,
    Step
}
export default ease;