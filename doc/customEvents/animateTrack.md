# AnimateTrack

## Explanation

Class that creates a new `AnimateTrack` event. For simultaneously controlling the animation of every object on a specified `track`.

## Usage

```ts
new AnimateTrack(time: number, {
    track: string | string[],
    duration: number,
    
}).push();