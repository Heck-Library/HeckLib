# Assign Track Parent

## Description

Assigns multiple tracks under one parent that can be controlled using [`AnimateTrack` events](./animateTrack.md).

## Usage

### Event Format

```ts
new AssignPlayerToTrack(time: number, {
    parentTrack: Track,         // The track to be assigned to
    childrenTracks: string[],   // The tracks to be controlled
}).push();
```

### Properties

| Property          | Type          | Description                  |
|-------------------|---------------|------------------------------|
| `parentTrack`     | `string`      | The track to be assigned to. |
| `childrenTracks`  | `string[]`    | The tracks to be controlled. |

## Example

```ts
new AssignTrackParent(0, {
    parentTrack: "parentTrack",
    childrenTracks: ["track1", "track2", "track3"]
}).push();

new AnimateTrack(0, {
    track: "parentTrack",
    duration: 4,
    easing: "easeOutQuad",
    position: [
        [0, 0, 0, 0],
        [0, 10, 0, 1]
    ]
}).push();
```