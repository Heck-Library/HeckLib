# Vector 3

## Usage

```ts
const vector: vec3 = [number, number, number];
```

## Explanation

`vec3` is a vector of 3 numbers. It can be used for the [`position`](../animations/position.md), [`definitePosition`](../animations/definitePosition.md), [`localPosition`](../animations/localPosition.md), [`rotation`](../animations/rotation.md), [`localRotation`](../animations/localRotation.md), and [`scale`](../animations/scale.md) animation properties in case the animation needs only 1 keyframe for a reason or another.

This is also used in some static properties, such as [`position`](../properties/position.md) (for environment objects), [`localPosition`](../properties/localPosition.md), [`scale`](../properties/scale.md), [`rotation`](../properties/rotation.md), and [`localRotation`](../properties/localRotation.md).