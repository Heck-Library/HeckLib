# AssignPathAnimation

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

### Type explanation

- If there's a `?` after a property name, it means that the property is optional.
- <a href="../types/track.md">Track</a> : `string | string[]`
- <a href="../types/vec1.md">vec1</a> : `[number]`
- <a href="../types/vec1anim.md">vec1anim</a> : `vec1 | vec1[]`
- <a href="../types/vec3.md">vec3</a> : `[number, number, number]`
- <a href="../types/vec3anim.md">vec3anim</a> : `vec3 | vec3[]`
- <a href="../types/vec4.md">vec4</a> : `[number, number, number, number]`
- <a href="../types/vec4anim.md">vec4anim</a> : `vec4 | vec4[]`