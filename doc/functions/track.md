# Track

The track function can be used to handle tracks for objects. If you want to assign multiple objects to a track individually, the `track` function will handle this for you without overwriting the existing tracks, if there are any.

## Usage

The usage of the `track` function can be used in multiple ways, for example:

```ts
const f = filter(notes, 0, 10);
track(f, "track1");
```

This will assign the track `track1` to all the notes in the `f` variable. However, you can also fit this on a single line, which is a bit messier but you won't have to use a variable for it.

```ts
track(filter(notes, 0, 10), "track1");
```

### Multiple Tracks

To assign multiple tracks to an object, you can use an array of strings.

```ts
track(filter(notes, 0, 10), ["track1", "track2"]);
```

You can also chain the `track` function if needed. This will add new tracks to the object but won't overwrite the existing tracks.

```ts
const f = filter(notes, 0, 10);
track(f, ["track1", "track2"]);
/*
Some funny haha code here
*/
track(f, "track3");
```

Would result to the notes having the tracks `["track1", "track2", "track3"]`.