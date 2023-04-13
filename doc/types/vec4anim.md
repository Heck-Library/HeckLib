# Vector 4 Animation

## Usage

```ts
const animation: vec4anim = [
    [0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, ease.Out.Cubic]
];
```

## Explanation

`vec4anim` is an animation of a vector of 4 numbers. It can be used for the [`color`](../animations/color.md) animation property and only that.

## Example

The example below shows how to use `vec4anim` in an animation using an [`AnimateTrack`](../customEvents/animateTrack.md) event for a simple [color](../animations/color.md) animation.

```ts
new AnimateTrack(0, {
    track: "exampleTrack",
    duration: 1,
    color: [
        [0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, ease.Out.Cubic]
    ]
}).push();
```
