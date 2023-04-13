# Distortion

Distortion is a type of effect that distorts everything on the screen. It's a very simple effect, but it can be used to create some interesting effects. Be careful with it, though, as it can become very hard to play with since it doesn't only affect the visuals.

## Usage

```ts
new Distortion({
    start: number,
    end: number,
    intensity: number,
}).push();
```

## Properties

| Property      | Type      | Description                       |
|---------------|-----------|-----------------------------------|
| `start`       | `number`  | The time to start the effect.     |
| `end`         | `number`  | The time to end the effect.       |
| `intensity`   | `number`  | The intensity of the distortion.  |

## Example

```ts
new Effect.Distortion({
    start: 0,
    end: 4,
    intensity: 1,
}).push();
```