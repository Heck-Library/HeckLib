# Track

## Explanation

Tracks are used to control the animation of multiple objects at once. This is useful for controlling the animation of multiple objects at once. For example, if you want to control the animation of all the notes on a track, you can use the [`AnimateTrack`](../customEvents/AnimateTrack) event.

Tracks can be assigned to objects using either the [`filter`](../functions/filter.md) function combined with a `forEach` loop (snippet for this is `forEachNote`). Or by using the [`track`](../functions/track.md) function (snippet for this is `noteTrack`).

A track is usually a `string` but can be an array of `strings`. If you want to assign multiple objects to a track individually, the [`track`](../functions/track.md) function will handle this for you without overwriting the existing tracks, if there are any. If you want to assign multiple objects to a track using the [`filter`](../functions/filter.md) function, you will need to use a `forEach` loop to assign the tracks by doing the following:

```ts
filter(notes, 0, 10).forEach((n: NOTE) => {
    n.data.track = [
        "track1",
        "track2",
        "track3"
    ];
});
```

This, of course will overwrite any existing tracks on the notes which is why the [`track`](../functions/track.md) function is recommended in most use cases.

The usage of [`track`](../functions/track.md) function can be used in multiple ways, for example:

```ts
const f = filter(notes, 0, 10);
track(f, "track1");
```

This will assign the track `track1` to all the notes in the `f` variable. However, you can also fit this on a single line, which is a bit messier but you won't have to use a variable for it.

```ts
track(filter(notes, 0, 10), "track1");
```
