# Particle Tunnel

This effect creates a tunnel of fully opaque particles that rotate around the z axis using tiny [`wall`s](../objects/wall.md) as particles. This effect uses Chroma and Noodle Extensions to work. Example of what it would look like <a href="https://youtu.be/qufcAuPmGK4?t=55" target="_blank">here</a>.

The effect is highly customizable when it comes to both colors and dimensions. The radius of the tunnel can be changed, the number of particles can be changed, and the perimeter width of the tunnel can be changed. The colors of the particles can be changed as well. Noise can be added to the particles to make them vary in color a bit more.

## Usage

```ts
new ParticleTunnel({
    start: number,
    end: number,
    track?: string,
    radius?: number,
    spread?: number,
    distance?: number,
    noise?: number,
    density?: number,
    fadeInTime?: number,
    fadeOutTime?: number,
    particleSize?: number,
    color?: vec4
}).push();
```

## Properties

| Property      | Type                          | Description                                                   | Default       |
|---------------|-------------------------------|---------------------------------------------------------------|---------------|
| `start`       | `number`                      | The time to start the effect.                                 | `undefined`   |
| `end`         | `number`                      | The time to end the effect.                                   | `undefined`   |
| `track`       | [`Track`](../types/track.md)  | The track to apply the effect to. (optional)                  | `undefined`   |
| `radius`      | `number`                      | The radius of the tunnel. (optional)                          | `10`          |
| `spread`      | `number`                      | The spread of the tunnel. (optional)                          | `5`           |
| `distance`    | `number`                      | The distance between the particles. (optional)                | `25`          |
| `noise`       | `number`                      | The amount of variety in the hue. 0 - 255. (optional)         | `0`           |
| `density`     | `number`                      | The density of the particles. Higher = More (optional)        | `10`          |
| `fadeInTime`  | `number`                      | The time it takes for the particles to fade in. (optional)    | `1`           |
| `fadeOutTime` | `number`                      | The time it takes for the particles to fade out. (optional)   | `1`           |
| `particleSize`| `number`                      | The size of the particles. (optional)                         | `0.1`         |
| `color`       | [`vec4`](../types/vec4.md)    | The base color of the particles. (optional)                   | `[1, 1, 1, 1]`|

## Example

```ts
new Effect.ParticleTunnel({
    start: 0,
    end: 4,
    track: "exampleTrack",
    radius: 10,
    spread: 5,
    distance: 25,
    noise: 25,
    density: 16,
    fadeInTime: 0.25,
    fadeOutTime: 0.25,
    particleSize: 0.1,
    color: [1, 1, 1, 1]
}).push();
```
