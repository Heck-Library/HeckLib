# AnimateTrack

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

### Properties

| Property                                          | Type                                  | Description                                                                               |
|---------------------------------------------------|---------------------------------------|-------------------------------------------------------------------------------------------|
| `track`                                           | [`Track`](../types/track.md)          | The track to be controlled. (Required)                                                    |
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
