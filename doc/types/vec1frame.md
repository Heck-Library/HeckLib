# Vector 1 Keyframe

## Usage

```ts
const vector: vec1frame = [number, number, easing?];
```

## Explanation

`vec1frame` is a vector of a value and the percentage time for the animation. In addition to that an optional values can be added: any of the easings from the [`ease`](../enums/easings.md) enum. It can be used for the [`attenuation`](../animations/attenuation.md), [`dissolve`](../animations/dissolve.md), [`dissolveArrow`](../animations/dissolveArrow.md), [`height`](../animations/height.md), [`interactable`](../animations/interactable.md), [`offset`](../animations/offset.md), [`startY`](../animations/startY.md), and [`time`](../animations/time.md) properties. In an animation.

`vec1frame` most likely will not occur in any other place than in an animation of type [`vec1anim`](./vec1anim.md) as a keyframe.

## Example

The example below shows how to use `vec1frame` in an animation using an [`AnimateTrack`](../customEvents/animateTrack.md) event.
```ts
new AnimateTrack(0, {
    track: "exampleTrack",
    duration: 1,
    dissolve: [
        [1, 0],                 // vec1frame
        [0, 1, ease.Out.Quad]   // vec1frame
    ]
}).push();
```