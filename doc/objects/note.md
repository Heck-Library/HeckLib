# Note

## Explanation

The `Note` class is used to create notes. Notes are the objects that the player must hit to score points. Notes are created by calling the constructor in the [`Note`](../functions/addNote.md) class. The constructor takes in parameters that are used to create the note.

## Usage

The syntax below shows how to create a note without any special parameters.

```ts
new Note({
    time: number,
    type?: noteType,
    direction?: noteDir,
    x?: number,
    y?: number,
    angle?: number,
}).push();
```

Only the `time` parameter is actually required and if a number is specified instead, it will automatically be converted to a `Note` object.

### Parameters

- If there's a `?` after a property name, it means that the property is optional.
- `time` - The time in beats when the note should spawn. This is the only required parameter and can be provided individually.
- [`type`](../enums/note.md#note-type) - The type of note to spawn. This can be either `Note.Type.Red` or `Note.Type.Blue`. The default value is `Note.Type.Red`.
- [`direction`](../enums/note.md#note-direction) - The direction of the note. This can be any of the values in [`Note.Direction`](../enums/note.md#note-direction). The default value is `Note.Direction.Down`.
- `x` - The x position of the note. This is a number value between 0 and 3. The default value is `0`.
- `y` - The y position of the note. This is a number value between 0 and 2. The default value is `0`.
- `angle` - The angle of the note. This is a numerical value between 0 and 360. The default value is `0`. It is an offset angle to the note's cut direction.

```ts
new Note(0).push();
```

---
## Custom Data

To add additional custom data to the note, you can use the `data` property. It is the second parameter of the constructor. It is a type alias that allows you to add any custom data you want.

```ts
new Note(69, {
    track?: Track,
    color?: vec4,
    position?: vec2,
    rotation?: vec3,
    localRotation?: vec3,
    flip?: vec2,
    scale?: vec3,
    njs?: number,
    offset?: number,
    fake?: boolean,
    interactable?: boolean,
    disableNoteGravity?: boolean,
    disableNoteLook?: boolean,
    disableSpawnEffect?: boolean
}).push();
```

### Parameters

All of these parameters are completely optional and can be used to add custom data to the note.
- [`track`](../properties/track.md) - The track that the note should be assigned to. This can be any `string` value or an array of `string` values.
- [`color`](../properties/color.md) - The color of the note. This can be any [`vec4`](../types/vec4.md) value.
- [`position`](../properties/position.md) - The position of the note. This can be any [`vec2`](../types/vec2.md) value.
- [`rotation`](../properties/rotation.md) - The rotation of the note. This can be any [`vec3`](../types/vec3.md) value.
- [`localRotation`](../properties/localRotation.md) - The local rotation of the note. This can be any [`vec3`](../types/vec3.md) value.
- [`flip`](../properties/flip.md) - The flip of the note. This can be any [`vec2`](../types/vec2.md) value.
- [`scale`](../properties/scale.md) - The scale of the note. This can be any [`vec3`](../types/vec3.md) value.
- [`njs`](../properties/njs.md) - The note jump speed of the note. This can be any `number` value.
- [`offset`](../properties/offset.md) - The offset of the note. This can be any `number` value.
- [`fake`](../properties/fake.md) - Whether or not the note is fake. This can be any `boolean` value.
- [`interactable`](../properties/interactable.md) - Whether or not the note is interactable. This can be any `boolean` value.
- [`disableNoteGravity`](../properties/disableNoteGravity.md) - Whether or not the note's gravity should be disabled. This can be any `boolean` value.
- [`disableNoteLook`](../properties/disableNoteLook.md) - Whether or not the note's look should be disabled. This can be any `boolean` value.
- [`disableSpawnEffect`](../properties/disableSpawnEffect.md) - Whether or not the note's spawn effect should be disabled. This can be any `boolean` value.


---
## Animation Data

To add additional animation data to the note, you can use the `anim` property. It is the third parameter of the constructor. It is a type alias that allows you to add any custom animation data you want.

```ts
new Note(69, {}, {
    position?: vec3anim,
    definitePosition?: vec3anim,
    rotation?: vec3anim,
    localRotation?: vec3anim,
    scale?: vec3anim,
    color?: vec4anim,
    interactable?: vec1anim,
    dissolve?: vec1anim,
    dissolveArrow?: vec1anim,
}).push();
```

### Parameters

All of these parameters are completely optional and can be used to add custom animation data to the note.
- [`position`](../animations/position.md) - The position of the note. This can be any [`vec3anim`](../types/vec3anim.md) value.
- [`definitePosition`](../animations/definitePosition.md) - The definite position of the note. This can be any [`vec3anim`](../types/vec3anim.md) value.
- [`rotation`](../animations/rotation.md) - The rotation of the note. This can be any [`vec3anim`](../types/vec3anim.md) value.
- [`localRotation`](../animations/localRotation.md) - The local rotation of the note. This can be any [`vec3anim`](../types/vec3anim.md) value.
- [`scale`](../animations/scale.md) - The scale of the note. This can be any [`vec3anim`](../types/vec3anim.md) value.
- [`color`](../animations/color.md) - The color of the note. This can be any [`vec4anim`](../types/vec4anim.md) value.
- [`interactable`](../animations/interactable.md) - Whether or not the note is interactable. This can be any [`vec1anim`](../types/vec1anim.md) value.
- [`dissolve`](../animations/dissolve.md) - The dissolve of the note. This can be any [`vec1anim`](../types/vec1anim.md) value.
- [`dissolveArrow`](../animations/dissolveArrow.md) - The dissolve arrow of the note. This can be any [`vec1anim`](../types/vec1anim.md) value.

---
## Getters and Setters

You can also use the getters and setters to handle data inside the note.

```ts
const note = new Note(69);

note.data.track = "exampleTrack";
note.data.color = [1, 0, 0, 1];
note.data.rotation = [-90, 0, 0];
note.data.fake = true;
note.data.interactable = false;

note.anim.definitePosition = [
    [0, -10, 10, 0],
    [0, 10, 10, 1, ease.Out.Expo]
];

note.push();
```

Another way to utilize the `data` property is to use it in a similar manner as the constructor. However, it will override any data that was previously set in the said propery. This is useful if you want to set a lot of data at once but will not take into account previously assigned data.


```ts
note.data = {
    track: "exampleTrack",
    color: [1, 0, 0, 1],
    rotation: [-90, 0, 0],
    fake: true,
    interactable: false
};
note.anim = {
    definitePosition: [
        [0, -10, 10, 0],
        [0, 10, 10, 1, ease.Out.Expo]
    ]
}
```

A quicker way to not override all animations is just to set `note.data` to a variable and then set the animations to that variable. However, it is recommended to only use variables inside of a `forEach` loop.
```ts
filter(notes, 0, 10).forEach((n: NOTE) => {
    const d = note.data;
    const a = note.anim;

    d.track = "exampleTrack";
    d.color = [1, 0, 0, 1];
    d.rotation = [-90, 0, 0];
    d.fake = true;
    d.interactable = false;

    a.definitePosition = [
        [0, -10, 10, 0],
        [0, 10, 10, 1, ease.Out.Expo]
    ];
    a.dissolve = [
        [0, 0],
        [1, 0.125, ease.Out.Cubic],
        [1, 0.875],
        [0, 1, ease.In.Cubic]
    ];
    a.dissolveArrow = [
        [0, 0],
        [1, 0.125, ease.Out.Cubic],
        [1, 0.875],
        [0, 1, ease.In.Cubic]
    ];
});
```
