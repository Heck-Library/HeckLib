# Random Path Animation

Creates an effect that randomizes the path of notes between two time values. It is customizable with a few properties. The effect is applied to all notes between two times and only those.

## Usage

```ts
new RandomPath({
    start: number,
    end: number,
    track?: string,
    offset?: number,
    opaqueBy?: number
}).push();
```

## Properties

| Property      | Type      | Description                                               | Default       |
|---------------|-----------|-----------------------------------------------------------|---------------|
| `start`       | `number`  | The time to start the effect.                             | `undefined`   |
| `end`         | `number`  | The time to end the effect.                               | `undefined`   |
| `track`       | `string`  | The track to apply the effect to. (optional)              | `undefined`   |
| `offset`      | `number`  | The offset of the notes. (optional)                       | `2`           |
| `opaqueBy`    | `number`  | The point where the notes should be opaque. (optional)    | `0.125`       |

## Example

```ts
new Effect.RandomPath({
    start: 0,
    end: 4,
    track: "exampleTrack",
    offset: 2,
    opaqueBy: 0.125
}).push();
```