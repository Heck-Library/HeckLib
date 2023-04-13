# Filter

Filters and returns an array of objects, such as notes, walls, or bombs, based on given conditions. This is useful for getting a specific note, wall, or bomb, or for getting all notes, walls, or bombs of a certain type. Think of it as a selection tool.

## Syntax

```ts
filter(objects: ARC[] | BOMB[] | CHAIN[] | NOTE[] | WALL[], start: number, end: number);
```

- `objects` - The array of objects to filter. This can be an array of arcs, bombs, chains, notes, or walls. These are variables that are already defined in the library. Their names are `arcs`, `bombs`, `chains`, `notes`, and `walls`.
- `start` - The start time of the filter. This is the time in seconds that the filter will start at. This is a number.
- `end` - The end time of the filter. This is the time in seconds that the filter will end at. This is a number.

### Additional filters

There are additional filters that can be used to filter objects based on their properties. These filters are used by adding them to the end of the `filter` function. These filters are different depending on the type of the object filtered. These are completely optional and can be used in any combination.

---
#### Arcs

```ts
filter(arcs, 0, 10, {
    type?: 0 | 1,
    x?: lineIndex,
    y?: lineLayer,
    tailX?: lineIndex,
    tailY?: lineLayer
});
```

- `type` - The type of the arc. This is a number. The number can be 0 or 1. 0 is a red arc, 1 is a blue arc.
- `x` - The line index of the arc's head. This is a number between 0 and 3.
- `y` - The line layer of the arc's head. This is a number between 0 and 4.
- `tailX` - The line index of the arc's tail. This is a number between 0 and 3.
- `tailY` - The line layer of the arc's tail. This is a number between 0 and 4.
---
#### Bombs

```ts
filter(bombs, 0, 10, {
    x?: lineIndex,
    y?: lineLayer
});
```

- `x` - The line index of the bomb. This is a number between 0 and 3.
- `y` - The line layer of the bomb. This is a number.
---
#### Chains

```ts
filter(chains, 0, 10, {
    type?: 0 | 1,
    x?: lineIndex,
    y?: lineLayer,
    tailX?: lineIndex,
    tailY?: lineLayer
});
```

- `type` - The type of the chain. This is a number. The number can be 0 or 1. 0 is a red chain, 1 is a blue chain.
- `x` - The line index of the chain's head. This is a number between 0 and 3.
- `y` - The line layer of the chain's head. This is a number between 0 and 4.
- `tailX` - The line index of the chain's tail. This is a number between 0 and 3.
- `tailY` - The line layer of the chain's tail. This is a number between 0 and 4.
---
#### Notes

```ts
filter(notes, 0, 10, {
    type?: noteType,
    direction?: noteDir,
    x?: lineIndex,
    y?: lineLayer
});
```

- `type` - The type of the note. This is a number. The number can be 0, 1, or 3. 0 is a red note, 1 is a blue note, and 3 is a bomb note in V2. In V3, type 3 does not exist. Bombs are in a separate array called `bombs`. All of these values can be found predefined in the library under the `Note.Type` enum.
- `direction` - The direction of the note. This is a number between 0 and 8. All of these values can be found predefined in the library under the `Note.Direction` enum.
- `x` - The line index of the note. This is a number between 0 and 3.
- `y` - The line layer of the note. This is a number.
---
#### Walls

```ts
filter(walls, 0, 10, {
    type?: wallType,
    x?: lineIndex,
    y?: lineLayer
});
```

- `type` - The type of the wall. This is a number. The number can be 0 or 1. 0 is a full wall, 1 is a crouch wall. All of these values can be found predefined in the library under the `Wall.Type` enum.
- `x` - The line index of the wall. This is a number between 0 and 3.
- `y` - The line layer of the wall. This is a number. (This is only used in V3)
