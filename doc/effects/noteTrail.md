# Note Trail

Note Trail is a visual effect for notes that leaves a dissolved trail behind the notes. It is fairly common in visual maps. It is customizable with a few properties. The effect is applied to all notes between two time values.

## Usage

```ts
new NoteTrail({
    start: number,
    end: number,
    track?: string,
    stretch?: number,
    dissolve?: number,
    noteCount?: number,
}).push();
```

## Properties

| Property      | Type      | Description                                                           | Default       |
|---------------|-----------|-----------------------------------------------------------------------|---------------|
| `start`       | `number`  | The time to start the effect.                                         | `undefined`   |
| `end`         | `number`  | The time to end the effect.                                           | `undefined`   |
| `track`       | `string`  | The tracks to add to the trails. (optional)                           | `undefined`   |
| `stretch`     | `number`  | How many beats should the trails stretch. (optional)                  | `0.5`         |
| `dissolve`    | `number`  | How intense should the dissolve effect on the trails be. (optional)   | `0.5`         |
| `noteCount`   | `number`  | How many notes should be in the trails. (optional)                    | `4`           |
