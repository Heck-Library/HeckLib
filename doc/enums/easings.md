# Easings

Easings are a way to make your animations look smoother using predefined math equations.

## Usage

You can use any of the easings from the ease enum in an animation keyframe's property after the `time` value, like so:

```ts
new AnimateTrack(0, {
    track: "exampleTrack",
    duration: 1,
    scale: [
        [2, 2, 2, 0],
        [1, 1, 1, 1, ease.Out.Sine]
    ]
}).push();
```

You can also use it in an event as a property:

```ts
new AnimateTrack(0, {
    track: "exampleTrack",
    duration: 1,
    easing: ease.Out.Sine,
    scale: [
        [2, 2, 2, 0],
        [1, 1, 1, 1]
    ]
}).push();
```

## Easing definitions

### Linear

This is the default easing and is not defined in the enum due to it being used by default.

### In

In easings start slow and end fast. They are defined as `ease.In.[Easing]`. All the easings in the In enum are

- `ease.In.Sine`
- `ease.In.Quad`
- `ease.In.Cubic`
- `ease.In.Quart`
- `ease.In.Quint`
- `ease.In.Expo`
- `ease.In.Circ`
- `ease.In.Back`
- `ease.In.Elastic`

### Out

Out easings start fast and end slow. They are defined as `ease.Out.[Easing]`. All the easings in the Out enum are

- `ease.Out.Sine`
- `ease.Out.Quad`
- `ease.Out.Cubic`
- `ease.Out.Quart`
- `ease.Out.Quint`
- `ease.Out.Expo`
- `ease.Out.Circ`
- `ease.Out.Back`
- `ease.Out.Elastic`

### InOut

InOut easings start slow, speed up, and then slow down again. They are defined as `ease.InOut.[Easing]`. All the easings in the InOut enum are

- `ease.InOut.Sine`
- `ease.InOut.Quad`
- `ease.InOut.Cubic`
- `ease.InOut.Quart`
- `ease.InOut.Quint`
- `ease.InOut.Expo`
- `ease.InOut.Circ`
- `ease.InOut.Back`
- `ease.InOut.Elastic`

## Preview

All the easings can be previewed on [easings.net](https://easings.net/) by hovering over the easing name with your mouse.