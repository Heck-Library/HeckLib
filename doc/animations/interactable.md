# Interactable

Note: This is the animatable version of the interactable property, if you're interested in the static parameter interactable, check out the [interactable property](../properties/interactable) instead.

## Explanation

The `interactable` animation is used to change the interactable state of an object. This animation is relative to the object's original interactable state. This means that changing the `interactable` value will change the interactable state of the object regardless to it's original interactable state. This means that if you're changing the interactable state of a note from 1 to 0, even if the  note's original interactable state would be `true`, you wouldn't be able to interact with said note.

`interactable` can be assigned as both a track animation and a path animation. If you want to assign a track animation, you should use the [`AnimateTrack`](../customEvents/AnimateTrack) event. If you want to assign a path animation, you should use the [`AssignPathAnimation`](../customEvents/assignPathAnimation) event or assign it to the object itself under it's `anim` property.

The format of `interactable` can be either a [`vec1`](../types/vec1.md) or a [`vec1anim`](../types/vec1anim.md). If you want to assign the values, [`vec1`](../types/vec1.md) should be used. If you want to assign the values as an animation, [`vec1anim`](../types/vec1anim.md) should be used.