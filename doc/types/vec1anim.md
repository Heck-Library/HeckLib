# Vector 1 Animation

## Usage

```ts
const animation: vec1anim = [
    [0, 0],
    [1, 1, ease.Out.Cubic]
];
```

## Explanation

`vec1anim` is an animation of a vector of 1 number. It can be used for the [`attenuation`](../animations/attenuation.md), [`dissolve`](../animations/dissolve.md), [`dissolveArrow`](../animations/dissolveArrow.md), [`height`](../animations/height.md), [`interactable`](../animations/interactable.md), [`offset`](../animations/offset.md), [`startY`](../animations/startY.md), and [`time`](../animations/time.md) properties.

The type `vec1anim` consists of multiple [`vec1frame`](./vec1frame.md) vectors. Each vector represents a keyframe in the animation. The first value in the vector is the value of the property at that keyframe. The second value is the percentage time for the animation as a decimal (0 is 0% and 1 is 100%). In addition to that an optional value can be added: any of the easings from the [`ease`](../enums/easings.md) enum.