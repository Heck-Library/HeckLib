# Wall

The `Wall` class is used to create walls in the map. Walls can be used in various ways, in vanilla mapping they are used as obstacles the player must dodge. In Noodle Extensions, they can be used to create custom decorative elements of various colors. Walls are created by calling the constructor in the `Wall` class. The constructor takes in parameters that are used to create the wall.

## Usage

The syntax below shows how to create a wall without any special parameters.

```ts
new Wall({
    time: number,
    duration?: number,
    width?: number,
    height?: number,
    x?: number,
    y?: number,
}).push();
```

Only the `time` parameter is actually required and if a number is specified instead, it will automatically be converted to a `Wall` object.

### Parameters

| Property      | Type      | Description
| ------------- | --------- | ---
| `time`        | `number`  | The time in beats when the wall should spawn. This is the only required parameter and can be provided individually. **(Required)**
| `duration`    | `number`  | The duration in beats of the wall. The default value is `0`.
| `width`       | `number`  | The width of the wall. The default value is `1`.
| `height`      | `number`  | The height of the wall. The default value is `1`.
| `x`           | `number`  | The x position of the wall. The default value is `0`.
| `y`           | `number`  | The y position of the wall. The default value is `0`.

```ts
new Wall(0).push();
```