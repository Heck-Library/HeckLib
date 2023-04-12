# Local Rotation

Note: This page is about the animation value of objects, if you want to know about the static value, see [Local Rotation](../properties/localRotation).

## Explanation

The `localRotation` animation is used to change the rotation of an object. This animation is relative to the object's original rotation. This means that changing the `localRotation` value will rotate around the object's origin.

`localRotation` can be assigned as both a track animation and a path animation. If you want to assign a track animation, you should use the [`AnimateTrack`](../customEvents/AnimateTrack) event. If you want to assign a path animation, you should use the [`AssignPathAnimation`](../customEvents/assignPathAnimation) event or assign it to the object itself under it's `anim` property.

The format of `localRotation` can be either a [`vec3`](../types/vec3) or a [`vec3anim`](../types/vec3anim). If you want to assign the values, [`vec3`](../types/vec3) should be used. If you want to assign the values as an animation, [`vec3anim`](../types/vec3anim) should be used.

// TODO: Add examples