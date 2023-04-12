# AnimateTrack

## Explanation

Class that creates a new `AnimateTrack` event. For simultaneously controlling the animation of every object on a specified `track`.

## Usage

```ts
new AnimateTrack(time: number, {
    track: string | string[],
    duration: number,
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