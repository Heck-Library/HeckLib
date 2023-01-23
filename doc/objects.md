# Objects
This page shows the basic usage of objects and what you can do with them.
## Basic usage
>Objects can be created using the following syntax.
>```ts
>new Note({
>    time: 4   
>})
>```
>This creates a new note with a time value of 4.
>
>You can add properties to it, such as .track("trackName"). Properties are added using methods in the following way.
>```ts
>new Note({
>    time: 4,
>    x: 2
>}, {
>    track: "trackName",
>    scale: [6.9, 1, 1]
>})
>```
>An object is pushed by calling the push() method. Like so.
>```ts
>new Note({
>    time: 4,
>    x: 2
>}, {
>    track: "trackName",
>    scale: [6.9, 1, 1]
>}).push();
>```
>This is the base syntax for all objects/events.
# Object types
>## Global object properties
>These properties are supported by both notes and walls.
>>### Supported properties
>>
>> #### Initial values
>> - `track: string|string[]` Assigns the object's track.
>> - `color: vec4` Assigns the object's color.
>> - `x: 0-3)` Assigns the object's.
>> - `position: vec2` Overrides the object's position.
>> - `rotation: vec3` Assigns the object's rotation.
>> - `localRotation: vec3` Assigns the object's localRotation.
>> - `scale: vec3` Assigns the object's scale.
>> - `njs: number` Assigns the object's NJS.
>> - `offset: number` Assigns the object's offset.
>> - `fake: boolean` Sets whether the object is fake or not.
>> - `interactable: number` Sets whether the object is interactable or not.
>> #### Animated values
>> - `position: vec3anim` Assigns the object's position animation.
>> - `definitePosition: vec3anim` Assigns the object's definitePosition animation.
>> - `rotation: vec3anim` Assigns the object's rotation animation.
>> - `localRotation: vec3anim` Assigns the object's localRotation animation.
>> - `scale: vec3anim` Assigns the object's scale animation.
>> - `color: vec4anim` Assigns the object's color animation.
>> - `interactable: vec1anim` Assigns the object's interactable animation.
>> - `dissolve: vec1anim` Assigns the object's dissolve animation.
>> - `dissolveArrow: vec1anim` Assigns the object's dissolveArrow animation.

>## Notes
>Notes are created with the following.
>```ts
>new Note(time)
>```
>>### Supported properties
>> - `direction: 0-8` Assigns the note's cutDirection.
>> - `lineLayer: 0-2` Assigns the note's lineLayer.
>> - `lineIndex: 0-2` Assigns the note's lineIndex.
>> - `type: 0, 1, 3` Assigns the note's type.
>> - `flip: vec2` Assigns the note's flip animation.
>> - `disableNoteGravity: boolean` Disables the notes's gravity animation.
>> - `disableSpawnEffect: boolean` Disables the notes's spawn flash effect.
>> - `disableNoteLook: boolean` Disables the notes's rotation relative to the player.

>## Walls
>Walls are created with the following.
>```ts
>new Wall(time)
>```
>>### Supported properties
>> - `.duration(number)` Sets the duration of the wall.

# Object editing
> ## Filtering
> You can edit objects by filtering them out first, the syntax for selecting notes between time values `8` and `16` would be.
> ```ts
> filter(notes, 8, 16);
> ```
> This selects all notes and allows you to edit them
>
> Doing this with walls is literally the same, you just replace `notes` with `walls`.
> ### Advanced Filters
> You can also add parameters to filters. These parameters are `type` and `direction`.
>
> The code below would target all red notes between times `69` and `420` that are facing down.
> ```ts
> filter(notes, 69, 420, Prop.Note.Type.Red, Prop.Note.Direction.Down);
> ```
> Yes, it is a bit long syntax but at least it's all in one function.
> ## Tracks
> To add a track to an object, you would use this syntax.
> ```ts
> track(filter(notes, 8, 16), ["deez", "nuts"]);
> ```
> That would add the tracks `deez` and `nuts` to all notes between `8` and `16`.
> ## Editing Custom Data
> Once you've filtered your notes, you can start adding custom data to them like this.
> ```ts
>new CustomData(filter(notes, 8, 16))
>   .fake(true)
>   .interactable(false)
>```
> The syntax above would make all notes between `8` and `16` fake and non-interactable.
>
> Animations work in a similar way.
> ```ts
>new Animation(filter(notes, 8, 16))
>    .pos([
>        [0, 5, 0, 0],
>        [0, 0, 0, 0.45, ease.Out.Circ]
>    ]);
> ```
> This makes all the notes spawn 5 units above normal and gradually come down to the player.
> ## Randomising values
> If you want to randomise an animation, such as position, you would have to use a `forEach` statement for that because of the way how classes work in TS.
>
> It is also recommended to create and reuse a variable for all filtered objects.
> 
> ```ts
> let f;
>
> f = filter(notes, 0, 27.9)
> f.forEach((x: any) => {
>     new CustomData([x])
>     .offset(0.5)
>     new Animation([x])
>     .pos([
>         [0, random(0, 5), 0, 0],
>         [0, 0, 0, 0.45, ease.Out.Circ]
>     ])
>     .localRot([
>         [random(-50, 50), random(-50, 50), random(-170, 170), 0],
>         [0, 0, 0, 0.25, ease.Out.Cubic]
>     ])
>     .rot([
>         [random(-20, 5), random(-20, 20), random(-40, 40), 0],
>         [0, 0, 0, 0.225, ease.Out.Circ]
>     ])
> });
> ```
> The reason for using a `forEach` statement is because otherwise every filtered object would have the same values. These values are different for every run but would still carry over to the next objects.