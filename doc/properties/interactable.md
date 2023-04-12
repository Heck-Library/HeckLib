# Interactable

Note: This is the static version of the interactable animation, if you're interested in the animatable parameter interactable, check out the [interactable animation](../animations/interactable) instead.

## Explanation

Interactable is a property that can be assigned to an object as a boolean. This means that it's either `true` or `false`. If it's `true`, the object can be interacted with. If it's `false`, the object can't be interacted with.

The property can be found from an object's `data` property. For example, if you want to change the interactable state of a note, you should use the `data.interactable` property of the note.