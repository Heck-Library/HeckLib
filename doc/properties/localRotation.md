# Local Rotation

Note: This page is about the static local rotation of the object. If you're looking for the animatable local rotation, see [localRotation](../animations/localRotation.md).

## Explanation

The `localRotation` property is used to change the local rotation of the object. This property is a [`vec3`](../types/vec3.md) value. The values are in degrees. The rotation is applied in the order of `x`, `y`, `z`. Local rotation is an offset to the object's initial rotation or cut direction. For example, if a note's cut direction is set to [`Note.Direction.Down`](../enums/note.md) and a `localRotation` of `[0, 0, 90]` is applied, the note will be pointing left instead of down.

Unlike [`rotation`](./rotation.md), local rotation is a rotation offset anchored to the object's local origin. This means that the rotation will be applied relative to the object's origin, not the world origin.

// TODO: Add examples