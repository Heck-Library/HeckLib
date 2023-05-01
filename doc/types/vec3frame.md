# Vector 3 frame

## Usage

```ts
const frame: vec3frame = [number, number, number, number, easing?, spline?];
```

## Explanation

`vec3frame` is a vector of 3 numbers and a time. It can be used for the [`position`](../animations/position.md), [`definitePosition`](../animations/definitePosition.md), [`localPosition`](../animations/localPosition.md), [`rotation`](../animations/rotation.md), [`localRotation`](../animations/localRotation.md), and [`scale`](../animations/scale.md) animation properties.

In addition to the 3 numbers, the last value is the percentage time for the animation as a decimal (0 is 0% and 1 is 100%). In addition to that two optional values can be added: any of the easings from the [`ease`](../enums/easings.md) enum, and a [`spline`](../enums/spline.md).

You will most likely only see `vec3frame` in an animation of type [`vec3anim`](./vec3anim.md) as a keyframe.

## Example

The example below shows how to use `vec3frame` in an animation using an [`AnimateTrack`](../customEvents/animateTrack.md) event for a simple [scale](../animations/scale.md) pulse animation.

```ts
new AnimateTrack(0, {
    track: "exampleTrack",
    duration: 1,
    scale: [
        [2, 2, 2, 0],               // vec3frame
        [1, 1, 1, 1, ease.Out.Sine] // vec3frame
    ]
}).push();
```
