# Rotation

Note: This page is about the static rotation value of objects. If you want to know about animating rotation, see [this page](../animations/rotation.md) instead.

## Explanation

The `rotation` value is used to set the rotation of an object. This value is relative to the world origin. This means that changing the `rotation` value will rotate around the player similar to how the Beat Saber's 90 degree and 360 degree modes work.

The format of `rotation` can be only a [`vec3`](../types/vec3.md) on [notes](../objects/note.md), [walls](../objects/wall.md), and [bombs](../objects/bomb.md) under the `data` property.

// TODO: Add examples