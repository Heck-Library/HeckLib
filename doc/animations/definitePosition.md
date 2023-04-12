# Definite Position

## Explanation

The `definitePosition` animation is used to change the absolute position of an object. This animation is absolute, meaning that it will set the object's position to the specified value. However, this will take into account the object's `lineIndex` or `x` value.

`definitePosition` can be assigned only as a path animation. If you want to assign a path animation, you should use the [`AssignPathAnimation`](../customEvents/assignPathAnimation) event or assign it to the object itself under it's `anim` property.

The format of `definitePosition` can be either a [`vec3`](../types/vec3) or a [`vec3anim`](../types/vec3anim). If you want to assign the values, [`vec3`](../types/vec3) should be used. If you want to assign the values as an animation, [`vec3anim`](../types/vec3anim) should be used.

// TODO: Add examples