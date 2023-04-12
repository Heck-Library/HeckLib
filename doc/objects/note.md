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
| Property      | Type                                                          | Description
| ------------- | ------------------------------------------------------------- | ---
| `time`        | `number`                                                      | The time in beats when the note should spawn. This is the only required parameter and can be provided individually. **(Required)**
| `type`        | [`Note.Type.[VALUE]`](../enums/note.md#note-type)             | The type of note to spawn. This can be either `Note.Type.Red` or `Note.Type.Blue`. The default value is `Note.Type.Red`.
| `direction`   | [`Note.Direction.[VALUE]`](../enums/note.md#note-direction)   | The direction of the note. The default value is `Note.Direction.Down`.
| `x`           | 0 - 3                                                         | The x position of the note. The default value is `0`.
| `y`           | 0 - 2                                                         | The y position of the note. The default value is `0`.
| `angle`       | 0 - 360                                                       | The angle offset of the note. The default value is `0`.

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

| Property                                                      | Type                                                          | Description
| ------------------------------------------------------------- | ------------------------------------------------------------- | ---
| [`track`](../properties/track.md)                             | [`Track`](../types/track.md "string or string[]")             | The track that the note should be assigned to.
| [`color`](../properties/color.md)                             | [`vec4`](../types/vec4.md "[number, number, number, number]") | The color of the note.
| [`position`](../properties/position.md)                       | [`vec2`](../types/vec2.md "[number, number]")                 | The position of the note.
| [`rotation`](../properties/rotation.md)                       | [`vec3`](../types/vec3.md "[number, number, number]")         | The rotation of the note.
| [`localRotation`](../properties/localRotation.md)             | [`vec3`](../types/vec3.md "[number, number, number]")         | The local rotation of the note.
| [`flip`](../properties/flip.md)                               | [`vec2`](../types/vec2.md "[number, number]")                 | The flip of the note.
| [`scale`](../properties/scale.md)                             | [`vec3`](../types/vec3.md "[number, number, number]")         | The scale of the note.
| [`njs`](../properties/njs.md)                                 | `number`                                                      | The note jump speed of the note.
| [`offset`](../properties/offset.md)                           | `number`                                                      | The offset of the note.
| [`fake`](../properties/fake.md)                               | `boolean`                                                     | Whether or not the note is fake.
| [`interactable`](../properties/interactable.md)               | `boolean`                                                     | Whether or not the note is interactable.
| [`disableNoteGravity`](../properties/disableNoteGravity.md)   | `boolean`                                                     | Whether or not the note should have the jump up animation.
| [`disableNoteLook`](../properties/disableNoteLook.md)         | `boolean`                                                     | Whether or not the note should face the player constantly.
| [`disableSpawnEffect`](../properties/disableSpawnEffect.md)   | `boolean`                                                     | Whether or not the note should have the spawn effect.

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
| Property                                                  | Type                                  | Description
| --------------------------------------------------------- | ------------------------------------- | ---
| [`position`](../animations/position.md)                   | [`vec3anim`](../types/vec3anim.md)    | The position of the note.
| [`definitePosition`](../animations/definitePosition.md)   | [`vec3anim`](../types/vec3anim.md)    | The definite position of the note.
| [`rotation`](../animations/rotation.md)                   | [`vec3anim`](../types/vec3anim.md)    | The rotation of the note relative to the world origin.
| [`localRotation`](../animations/localRotation.md)         | [`vec3anim`](../types/vec3anim.md)    | The rotation of the note relative to the note itself.
| [`scale`](../animations/scale.md)                         | [`vec3anim`](../types/vec3anim.md)    | The scale of the note.
| [`color`](../animations/color.md)                         | [`vec4anim`](../types/vec4anim.md)    | The color of the note.
| [`interactable`](../animations/interactable.md)           | [`vec1anim`](../types/vec1anim.md)    | Whether or not the note is interactable.
| [`dissolve`](../animations/dissolve.md)                   | [`vec1anim`](../types/vec1anim.md)    | The dissolve of the note.
| [`dissolveArrow`](../animations/dissolveArrow.md)         | [`vec1anim`](../types/vec1anim.md)    | The dissolve of the note's arrow.

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
filter(notes, 0, 10).forEach((note: NOTE) => {
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
