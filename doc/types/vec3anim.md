# Vector 3 Animation

## Usage

```ts
const animation: vec3anim = [
    [0, 0, 0, 0],
    [1, 1, 1, 1, ease.Out.Cubic]
];
```

## Explanation

`vec3anim` is an animation of a vector of 3 numbers. It can be used for the [`position`](../animations/position.md), [`definitePosition`](../animations/definitePosition.md), [`localPosition`](../animations/localPosition.md), [`rotation`](../animations/rotation.md), [`localRotation`](../animations/localRotation.md), and [`scale`](../animations/scale.md) animation properties.

## Example

The example below shows how to use `vec3anim` in an animation using an [`AnimateTrack`](../customEvents/animateTrack.md) event for a simple [position](../animations/position.md) [spline](../enums/spline.md) animation.

```ts
new AnimateTrack(0, {
    track: "exampleTrack",
    duration: 1,
    position: [
        [0, 0, 0, 0],
        [0, 10, 0, 0.5, ease.In.Cubic, spline],
        [10, 10, 0, 1, ease.Out.Cubic, spline]
    ]
}).push();
```
