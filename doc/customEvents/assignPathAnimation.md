# AssignPathAnimation

Assigns an animation for the objects' lifetime instead of simultaneous duration. This is useful for creating animations for objects with individual timings. For example, you can make notes dissolve in upon spawning instead of all at once. 

## Usage

### Event Format

```ts
new AssignPathAnimation(time: number, {
    track: Track,                   // The track to be controlled
    easing?: string,                // The easing of the animation
    position?: vec3anim,            // The position of the object
    definitePosition?: vec3anim,    // The definite position of the object
    rotation?: vec3anim,            // The rotation of the object
    localRotation?: vec3anim,       // The local rotation of the object
    scale?: vec3anim,               // The scale of the object
    color?: vec4anim,               // The color of the object
    dissolve?: vec1anim,            // The dissolve value of the object
    dissolveArrow?: vec1anim,       // The dissolve value of the arrow
    interactable?: vec1anim,        // Whether the object is interactable or not
}).push();
```

### Properties

| Property                                                  | Type                                  | Description
|-----------------------------------------------------------|---------------------------------------|-------------
| [`track`](../types/track.md)                              | [`Track`](../types/track.md)          | The track to be controlled.
| [`easing`](../enums/easings.md)                           | `string`                              | The easing of the animation. If not specified, it will use the default easing (linear).
| [`position`](../animations/position.md)                   | [`vec3anim`](../types/vec3anim.md)    | The position of the object.
| [`definitePosition`](../animations/definitePosition.md)   | [`vec3anim`](../types/vec3anim.md)    | The definite position of the object.
| [`rotation`](../animations/rotation.md)                   | [`vec3anim`](../types/vec3anim.md)    | The rotation of the object.
| [`localRotation`](../animations/localRotation.md)         | [`vec3anim`](../types/vec3anim.md)    | The local rotation of the object.
| [`scale`](../animations/scale.md)                         | [`vec3anim`](../types/vec3anim.md)    | The scale of the object.
| [`color`](../animations/color.md)                         | [`vec4anim`](../types/vec4anim.md)    | The color of the object.
| [`dissolve`](../animations/dissolve.md)                   | [`vec1anim`](../types/vec1anim.md)    | The dissolve value of the object.
| [`dissolveArrow`](../animations/dissolveArrow.md)         | [`vec1anim`](../types/vec1anim.md)    | The dissolve value of the arrow.
| [`interactable`](../animations/interactable.md)           | [`vec1anim`](../types/vec1anim.md)    | Whether the object is interactable or not.

### Example

The example below will make every note on `"exampleTrack"` start their path with a 5 unit offset on the Y axis, and then move to their original position with a circular easing.

```ts
new AssignPathAnimation(0, {
    track: "exampleTrack",
    position: [
        [0, 5, 0, 0],
        [0, 0, 0, 0.45, ease.Out.Circ]
    ]
}).push();
```