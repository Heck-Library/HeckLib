# Track

## Explanation

Tracks are used to control the animation of multiple objects at once. This is useful for controlling the animation of multiple objects at once. For example, if you want to control the animation of all the notes on a track, you can use the [`AnimateTrack`](../customEvents/animateTrack.md) event.

Tracks can be assigned to objects using either the [`filter`](../functions/filter.md) function combined with a `forEach` loop (snippet for this is `forEachNote`). Or by using the [`track`](../functions/track.md) function (snippet for this is `noteTrack`).

A track is usually a `string` but can be an array of `string`s. 
