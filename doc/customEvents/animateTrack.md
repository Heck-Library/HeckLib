# AnimateTrack

Class that creates a new `AnimateTrack` event. For simultaneously controlling the animation of every object on a specified `track`.

## Usage

### Event Format

```ts
new AnimateTrack(time: number, {
    track: string|string[],     // The track to be controlled
    duration: number,           // The duration of the animation in beats
    easing?: string,            // Easing of the animation.
    position?: vec3anim,        // The position offset of the object.
    offsetPosition?: vec3anim,  // Same as position, but in V3 only.
    localPosition?: vec3anim,   // The local position of the environment object.
    rotation?: vec3anim,        // The rotation offset of the object.
    offsetWorldRotation?: vec3anim, // Same as rotation, but in V3 only.
    localRotation?: vec3anim,   // The local rotation offset of the object.
    scale?: vec3anim,           // The scale offset of the object.
    color?: vec4anim,           // The color of the object.
    dissolve?: vec1anim,        // The dissolve value of the object.
    dissolveArrow?: vec1anim,   // The dissolve value of the arrow.
    interactable?: vec1anim,    // Whether the object is interactable or not.
    time?: vec1anim,            // The time animation of the object.
}).push();
```

### Properties

| Property                                          | Type                                  | Description                                                                               |
|---------------------------------------------------|---------------------------------------|-------------------------------------------------------------------------------------------|
| `track`                                           | `string\|string[]`          | The track to be controlled. (Required)                                                    |
| `duration`                                        | `number`                              | The duration of the animation in beats. (Required)                                        |
| `easing`                                          | [`easing`](../enums/easings.md)       | The easing of the animation. If not specified, it will use the default easing (linear).   |
| [`position`](../animations/position.md)           | [`vec3anim`](../types/vec3anim.md)    |  The position of the object.                                                              |
| [`localPosition`](../animations/localPosition.md) | [`vec3anim`](../types/vec3anim.md)    | The local position of the object.                                                         |
| [`rotation`](../animations/rotation.md)           | [`vec3anim`](../types/vec3anim.md)    | The rotation of the object.                                                               |
| [`localRotation`](../animations/localRotation.md) | [`vec3anim`](../types/vec3anim.md)    | The local rotation of the object.                                                         |
| [`scale`](../animations/scale.md)                 | [`vec3anim`](../types/vec3anim.md)    | The scale of the object.                                                                  |
| [`color`](../animations/color.md)                 | [`vec4anim`](../types/vec4anim.md)    | The color of the object.                                                                  |
| [`dissolve`](../animations/dissolve.md)           | [`vec1anim`](../types/vec1anim.md)    | The dissolve value of the object.                                                         |
| [`dissolveArrow`](../animations/dissolveArrow.md) | [`vec1anim`](../types/vec1anim.md)    | The dissolve value of the arrow.                                                          |
| [`interactable`](../animations/interactable.md)   | [`vec1anim`](../types/vec1anim.md)    | Whether the object is interactable or not.                                                |
| [`time`](../animations/time.md)                   | [`vec1anim`](../types/vec3.md)        | The time of the object.                                                                   |

## Getters and Setters

You can also use getters and setters to handle data in customevents. This can be done by having a variable that is equal to the event you want to get data from. For example:

```ts
const a = new AnimateTrack();
a.data.track = "track";
a.data.duration = 1;
a.data.scale = [
    [2, 2, 2, 0],
    [1, 1, 1, 1]
];
a.push();
```

Getting data from an event would work in a similar manner. For example:

```ts
console.log(a.data.duration); // 1  
```
