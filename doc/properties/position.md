# Position

Note: This page is about the static value of objects, if you want to know about animating position, see [Position](../animations/position).

## Explanation

The `position` value is used to set the position of an object similar to the way it worked in [Mapping Extensions](https://github.com/Kylemc1413/MappingExtensions). This value is sort of a more precise placement of notes on the grid, which can exceed the grid's limits. This value overrides the `lineIndex` and `lineLayer` values. (`x` and `y`)

The format of `position` can be only a [`vec2`](../types/vec2) on [notes](../objects/note.md), [walls](../objects/wall.md), and [bombs](../objects/bomb.md) under the `data` property.
