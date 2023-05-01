# Color

Note: This page is about the animation color of objects, if you want to know about the static color, see [Color](../properties/color.md).

## Explanation

The `color` animation is used to change the color of an object.

`color` can be assigned as both a track animation and a path animation. If you want to assign a track animation, you should use the [`AnimateTrack`](../customEvents/animateTrack.md) event. If you want to assign a path animation, you should use the [`AssignPathAnimation`](../customEvents/assignPathAnimation.md) event or assign it to the object itself under it's `anim` property.

The format of `color` can be either a [`vec4`](../types/vec4.md) or a [`vec4anim`](../types/vec4anim.md). If you want to assign the values, [`vec4`](../types/vec4.md) should be used. If you want to assign the values as an animation, [`vec4anim`](../types/vec4anim.md) should be used.

The `color` format is `[r, g, b, a]`, where `r`, `g`, `b` and `a` are numbers between 0 and 1. If you want to use a color wheel for picking the color, divide your value by the max value (usually 255). For example, if you want to use the color `RGBA = [47, 90, 0, 255]`, you should use `[47/255, 90/255, 0, 1]`.

However, if you'd rather use HSV values, refer to the [`HSVtoRGB`](../functions/hsvToRgb.md) function.

// TODO: Add examples