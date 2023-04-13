# Position

Note: This page is about the animation value of objects, if you want to know about the static value, see [Position](../properties/position.md).

## Explanation

The `position` animation is used to change the position offset of an object. This animation is relative to the object's original position. This means that if you want to move an object to a specific position, you should use the <a href="./definitePosition.md">`definitePosition`</a> animation instead.

`position` can be assigned as both a track animation and a path animation. If you want to assign a track animation, you should use the <a href="../customEvents/AnimateTrack.md">`AnimateTrack`</a> event. If you want to assign a path animation, you should use the <a href="../customEvents/assignPathAnimation.md">`AssignPathAnimation`</a> event or assign it to the object itself under it's `anim` property.

The format of `position` can be either a <a href="../types/vec3.md">`vec3`</a> or a <a href="../types/vec3anim.md">`vec3anim`</a>. If you want to assign the values, <a href="../types/vec3.md">`vec3`</a> should be used. If you want to assign the values as an animation, <a href="../types/vec3anim.md">`vec3anim`</a> should be used.

// TODO: Add examples 