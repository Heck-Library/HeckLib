# AnimateTrack

## Explanation

Class that creates a new `AnimateTrack` event. For simultaneously controlling the animation of every object on a specified `track`.

## Usage

### Event Format

```ts
new AnimateTrack(time: number, {
    track: Track,               // The track to be controlled
    duration: number,           // The duration of the animation in beats
    easing?: string,
    position?: vec3anim,
    localPosition?: vec3anim,
    rotation?: vec3anim,
    localRotation?: vec3anim,
    scale?: vec3anim,
    color?: vec4anim,
    dissolve?: vec1anim,
    dissolveArrow?: vec1anim,
    interactable?: vec1anim,
    time?: vec1anim,
}).push();
```

### Property explanation

- `track` : The track to be controlled.
- `duration` : The duration of the animation in beats.
- `easing` : The easing of the animation. If not specified, it will use the default easing (linear).
- [`position`](../animations/position.md) : The position of the object.
- [`localPosition`](../animations/localPosition.md) : The local position of the object.
- [`rotation`](../animations/rotation.md) : The rotation of the object.
- [`localRotation`](../animations/localRotation.md) : The local rotation of the object.
- [`scale`](../animations/scale.md) : The scale of the object.
- [`color`](../animations/color.md) : The color of the object.
- [`dissolve`](../animations/dissolve.md) : The dissolve value of the object.
- [`dissolveArrow`](../animations/dissolveArrow.md) : The dissolve value of the arrow.
- [`interactable`](../animations/interactable.md) : Whether the object is interactable or not.
- [`time`](../animations/time.md) : The time of the object.

### Type explanation

- If there's a `?` after a property name, it means that the property is optional.
- <a href="../types/track.md">Track</a> : `string | string[]`
- <a href="../types/vec1.md">vec1</a> : `[number]`
- <a href="../types/vec1anim.md">vec1anim</a> : `vec1 | vec1[]`
- <a href="../types/vec3.md">vec3</a> : `[number, number, number]`
- <a href="../types/vec3anim.md">vec3anim</a> : `vec3 | vec3[]`
- <a href="../types/vec4.md">vec4</a> : `[number, number, number, number]`
- <a href="../types/vec4anim.md">vec4anim</a> : `vec4 | vec4[]`