# Assign Fog Track

Note: Will only work in V2. Does not work in V3.

Assigns a track to the fog that can be controlled using [`AnimateTrack` events](./animateTrack.md).

## Usage

### Event Format

```ts
new AssignFogTrack(time: number, track: Track).push();
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `time`   | `number` | The time of the event in beats. |
| `track`  | `string` | The track to be assigned to. |

### Example

```ts
new AssignFogTrack(0, "track").push();
```
