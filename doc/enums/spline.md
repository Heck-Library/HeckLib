# Spline

Spline is essentially a rounded out corner. It is a curve that is defined by two points and a radius. The curve is tangent to the line between the two points and the radius defines the curvature.

Or in simple words: curve defined by three points.

## Usage

```ts
const splineAnim: vec3anim = [
    [-5, 0, 0, 0],
    [-5, 5, 0, 0.5, spline],
    [0, 5, 0, 1, spline]
];
```

## Explanation

Without a spline, this would be an animation going through a corner in a squarelike path. However, with a spline, the animation will round it out instead.

An animation without a spline would look like this:
![no spline](https://user-images.githubusercontent.com/58623854/178139857-6aa1f810-4b2d-40bb-a886-9dabfe8984e4.png)

And adding a spline would make it look like this:
![spline](https://user-images.githubusercontent.com/58623854/178139875-a2661dde-40b7-4bcc-bc2b-0e9f4fd5f49d.png)
