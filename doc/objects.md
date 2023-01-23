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
>> #### Vanilla Values
>> - `time: number` Assigns the object's time value.
>> - `x: 0-3` assigns the object's `x` value or line index.
>> #### Custom Data values
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
> Or you can also use the `note` snippet to create the entire structure instantly.
>>### Supported properties
>>#### Note values
>> - `time: number` Assigns the note's time.
>> - `direction: 0-8` Assigns the note's cutDirection.
>> - `x: 0-2` Assigns the note's lineLayer.
>> - `y: 0-2` Assigns the note's lineIndex.
>> - `type: 0, 1, 3` Assigns the note's type.
>>#### Custom Data Values
>> - `flip: vec2` Assigns the note's flip animation.
>> - `disableNoteGravity: boolean` Disables the notes's gravity animation.
>> - `disableSpawnEffect: boolean` Disables the notes's spawn flash effect.
>> - `disableNoteLook: boolean` Disables the notes's rotation relative to the player.

>## Walls
>Walls are created with the following.
>```ts
>new Wall(time)
>```
> Or you can also use the `wall` snippet to create the entire structure instantly.
>>### Supported properties
>> - `duration: number` Sets the duration of the wall.

# Object editing
> ## Filtering
> You can edit objects by filtering them out first, the syntax for selecting notes between time values `8` and `16` would be.
> ```ts
> filter(notes, 8, 16);
> ```
> This selects all notes and allows you to edit them
>
> You can also filter other types of stuff. Here's a list of everything you can filter:
>> - `notes` Filters notes.
>> - `walls` Filters walls.
>> - `events` Filters customEvents.
>> - `lights` Filters light events.
>> - `bombs` Filters bombs. (V3 only)
> ### Advanced Filters
> You can also add parameters to filters. These parameters are `type` and `direction`.
>
> The code below would target all red notes between times `69` and `420` that are facing down.
> ```ts
> filter(notes, 69, 420, Note.Type.Red, Note.Direction.Down);
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
> filter(notes, 8, 16).forEach((n: NOTE) => {
>     n.data.disableNoteGravity = true;
> })
>```
> The syntax above would make all notes between `8` and `16` not have the note jump gravity effect.
>
> Animations work in a similar way.
> ```ts
> filter(notes, 8, 16).forEach((n: NOTE) => {
>     n.anim.position = [
>         [0, 5, 0, 0],
>         [0, 0, 0, 0.45, ease.Out.Circ]
>     ];
> })
> ```
> This makes all the notes spawn 5 units above normal and gradually come down to the player.
>
> It is very much recommended to use variables when editing a lot of values to prevent messy and long code.
>
> For example:
> ```ts
> filter(notes, 8, 16).forEach((n: NOTE) => {
>     n.data.fake = true;
>     n.data.interactable = false;
>     n.data.disableNoteGravity = true;
>     n.data.disableSpawnEffect = true;
>     n.data.disableNoteLook = true;
> })
> ```
> Can be shortened to
>```ts
> filter(notes, 8, 16).forEach((n: NOTE) => {
>     const d = n.data;
>     d.fake = true;
>     d.interactable = false;
>     d.disableNoteGravity = true;
>     d.disableSpawnEffect = true;
>     d.disableNoteLook = true;
> })
>```
> This way, you don't have to type `n.data` before the actual property, but instead just do `d`.