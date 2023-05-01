# Fake

Note: This will not make the object invisible or uninteractable, it will only make it not count in the score and the note counter.

Makes an object fake. This means that the object will not count in the score if hit or missed. It also won't show in the map statistics. For example, when assigned to a [`wall`](../objects/wall.md), it will not be added to the stats counters in the map details.

Using this on a [`note`](../objects/note.md) will make the note not count as a miss or a hit in any case. However, if missed, it will show the miss message. And if hit, it will show the hit score visualizer.

Using this on a [`wall`](../objects/wall.md) will make the wall not reduce your health upon hitting it.

The property can be found in any object under their `[OBJECT].data` property. For example, if you want to make a note fake, you should use the `note.data.fake` property.

If you want to make an object uninteractable, consider using the [`interactable`](./interactable.md) property along with the `fake` property.