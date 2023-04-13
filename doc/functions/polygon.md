# Polygon

Generates a polygon out of walls based on the given parameters.

## Usage

```ts
polygon({
    time: number,
    track: string,
    duration: number,
    radius: number,
    amount: number,
    h: number,
    l: number,
    position: vec3,
    color: vec4,
    rotations?: number,
    dissolveTime?: number,
});
```

### Properties

| Property      | Type                          | Description                                                    |
|---------------|-------------------------------|----------------------------------------------------------------|
| `time`        | `number`                      | The time of the polygon in beats.                              |
| `track`       | `string`                      | The track to be assigned to.                                   |
| `duration`    | `number`                      | The duration of the polygon in beats.                          |
| `radius`      | `number`                      | The radius of the polygon.                                     |
| `amount`      | `number`                      | The amount of walls in the polygon.                            |
| `h`           | `number`                      | The height of the polygon.                                     |
| `l`           | `number`                      | The length of the polygon.                                     |
| `position`    | [`vec3`](../types/vec3.md)    | The position of the polygon.                                   |
| `color`       | [`vec4`](../types/vec4.md)    | The color of the polygon.                                      |
| `rotations`   | `number`                      | The amount of rotations the polygon should have. (optional)    |
| `dissolveTime`| `number`                      | The time it takes for the polygon to dissolve. (optional)      |

### Example

```ts
polygon({
    time: 0,
    track: "track",
    duration: 4,
    radius: 10,
    amount: 4,
    h: 10,
    l: 10,
    position: [0, 0, 0],
    color: [1, 1, 1, 1],
    rotations: 1,
    dissolveTime: 1,
});
```