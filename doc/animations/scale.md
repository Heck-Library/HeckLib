# Scale

Note: This is the animation scale, if you're interested in the static parameter scale, check out the [scale property](../properties/scale) instead.

## Explanation

The `scale` animation is used to change the scale of an object. This animation is relative to the object's original scale. This means that changing the `scale` value will scale the object relative to it's original scale. This means that if you're scaling a note, the note's original scale will be XYZ = 1 (`[1, 1, 1]`). This is unique to the `scale` animation, as the [`position`](./position.md) and [`rotation`](./rotation.md) animations' default value is XYZ = 0 (`[0, 0, 0]`).

`scale` can be assigned as both a track animation and a path animation. If you want to assign a track animation, you should use the [`AnimateTrack`](../customEvents/AnimateTrack) event. If you want to assign a path animation, you should use the [`AssignPathAnimation`](../customEvents/assignPathAnimation) event or assign it to the object itself under it's `anim` property.

The format of `scale` can be either a [`vec3`](../types/vec3) or a [`vec3anim`](../types/vec3anim). If you want to assign the values, [`vec3`](../types/vec3) should be used. If you want to assign the values as an animation, [`vec3anim`](../types/vec3anim) should be used.

If both track animation `scale` and path animation `scale` are manipulating the same object, the values will be multiplied together.

// TODO: Add Examples