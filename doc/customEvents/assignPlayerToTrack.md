# Assign Player To Track

Assigns a player to a track that can be controlled using [`AnimateTrack` events](./animateTrack.md).

## Usage

### Event Format

```ts
new AssignPlayerToTrack(time: number, track: Track).push();
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `time`   | `number` | The time of the event in beats. |
| `track`  | `string` | The track to be assigned to. |

### Example

```ts
new AssignPlayerToTrack(0, "track").push();
```