# Rotation

## Explanation

The `rotation` animation is used to change the rotation of an object. This animation is relative to the world origin. This means that changing the `rotation` value will rotate around the player similar to how the Beat Saber's 90 degree and 360 degree modes work.

`rotation` can be assigned as both a track animation and a path animation. If you want to assign a track animation, you should use the [`AnimateTrack`](../customEvents/AnimateTrack) event. If you want to assign a path animation, you should use the [`AssignPathAnimation`](../customEvents/assignPathAnimation) event or assign it to the object itself under it's `anim` property.

The format of `rotation` can be either a [`vec3`](../types/vec3) or a [`vec3anim`](../types/vec3anim). If you want to assign the values, [`vec3`](../types/vec3) should be used. If you want to assign the values as an animation, [`vec3anim`](../types/vec3anim) should be used.

// TODO: Add examples