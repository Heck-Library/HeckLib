# Point Definitions

## Explanation

Point definitions are used to define animations in a map to reuse by calling it with a `string`. This is useful for optimization and conserving file size. It can also make your code more readable most of the time.

## Usage

Point definitions are saved in the map upon pushing them with the `push()` method in the `PointDefinition` class. This method has to be called manually. It will check for existing point definitions with the same name and will not push the point definition if it already exists. This will also print a warning in the console upon running. This is useful in case of duplicate point definitions.

A point definition allows 3 different types of values:
- [`vec1anim`](../types/vec1anim.md)
- [`vec3anim`](../types/vec3anim.md)
- [`vec4anim`](../types/vec4anim.md)

```ts
new PointDefinition("myPointDefinition", [
    [0, 0],
    [1, 0.25, ease.InOut.Cubic]
]).push();
```

This point definition can be called later on in the map on an animation using the defined name, in this case: `"myPointDefinition"`.

```ts
filter(notes, 69, 727).forEach((n: NOTE) => {
    const d = n.data;
    const a = n.anim;

    d.disableNoteGravity = true;
    d.disableNoteLook = true;
    d.disableSpawnEffect = true;
    d.offset = 2;
    
    a.dissolve = "myPointDefinition";
    a.dissolveArrow = "myPointDefinition";
    a.position = [
        [random(-5, 5), random(-1, 7), 0, 0],
        [0, 0, 0, 0.45, ease.Out.Circ]
    ];
});
```