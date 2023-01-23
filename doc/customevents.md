# Custom events
This page documents custom events and their usage.

## Basic usage

>Custom events events can be created using the following syntax.
>```ts
>new AnimateTrack(4, {})
>```
>This creates a new AnimateTrack object with a time value of `4`.
>
>You can add properties to it, such as `track: "trackName"`. Properties are added using methods in the following way.
>```ts
>new AnimateTrack(4, {
>    track: "trackName",
>    duration: 1,
>    easing: ease.Out.Sine,
>    scale: [
>        [2, 2, 2, 0],
>        [1, 1, 1, 1]
>    ]
>})
>```
>A custom event is pushed by calling the `push()` method. Like so.
>```ts
>new AnimateTrack(4, {
>    track: "trackName",
>    duration: 1,
>    easing: ease.Out.Sine,
>    scale: [
>        [2, 2, 2, 0],
>        [1, 1, 1, 1]
>    ]
>}).push();
>```
>This is the base syntax for all objects/events.

# Event types
>## AnimateTrack
>AnimateTrack events are created with the following.
>```ts
>new AnimateTrack(time, data)
>```
>You can also use a snippet to create one by typing `animTrack` and pressing `enter`.
>> ### Supported properties
>> - `track: string|string[]` Assigns the track of the animation.
>> - `easing: string` Assigns the easing used for the animation.
>> - `duration: number` Assigns the animation duration in beats.
>> - `position: vec3|vec3[]` Assigns the position animation.
>> - `localPosition: vec3|vec3[]` Assigns the localPosition animation.
>> - `rotation: vec3|vec3[]` Assigns the rotation animation.
>> - `localRotation: vec3|vec3[]` Assigns the localRotation animation.
>> - `scale: vec3|vec3[]` Assigns the scale animation.
>> - `color: vec4|vec4[]` Assigns the color animation.
>> - `dissolve: vec1|vec1[]` Assigns the dissolve animation.
>> - `dissolveArrow: vec1|vec1[]` Assigns the dissolveArrow animation.
>> - `interactable: vec1|vec1[]` Assigns the interactable animation.
>> - `time: vec1|vec1[]` Assigns the time animation. (Try to avoid using this)

>## AssignPathAnimation
>AssignPathAnimation events are created with the following.
>```ts
>new AssignPathAnimation(time, data)
>```
>You can also use a snippet to create one by typing `pathAnim` and pressing `enter`.
>> ### Supported properties
>> - `track: string|string[]` Assigns the `track` of the animation.
>> - `easing: string` Assigns the `easing` used for the animation.
>> - `position: vec3|vec3[]` Assigns the `position` animation.
>> - `definitePosition: vec3|vec3[]` Assigns the `definitePosition` animation.
>> - `rotation: vec3|vec3[]` Assigns the `rotation` animation.
>> - `scale: vec3|vec3[]` Assigns the `scale` animation.
>> - `color: vec4|vec4[]` Assigns the `color` animation.
>> - `dissolve: vec1|vec1[]` Assigns the `dissolve` animation.
>> - `dissolveArrow: vec1|vec1[]` Assigns the `dissolveArrow` animation.
>> - `interactable: vec1|vec1[]` Assigns the `interactable` animation.

>## AssignPlayerToTrack
>AssignPlayerToTrack events are created with the following.
>```ts
>new AssignPlayerToTrack(time, track)
>```
>You can also use a snippet to create one by typing `playerTrack` and pressing `enter`.
>>### Supported properties
>> - `track: string` Assigns the track for the player.

>## AssignTrackParent
>AssignTrackParent events are created with the following.
>```ts
>new AssignTrackParent(time, data)
>```
>You can also use a snippet to create one by typing `trackParent` and pressing `enter`.
>>### Supported properties
>> - `parentTrack: string` Assigns the parent track for the children tracks.
>> - `childrenTracks: string[]` Assigns the children for the parent track.