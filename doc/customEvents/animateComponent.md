# AnimateComponent

## Explanation

Class that creates a new `AnimateComponent` event. For simultaneously controlling the components on a specified `track`.

## Usage

### Event Format

```ts
new AnimateComponent(time: number, {
    track: Track,
    duration: number,
    easing?: string,
    ILightWithId?: {
        lightID: number,
        type: number
    },
    BloomFogEnvironment?: {
        attenuation?: vec1anim,
        offset?: vec1anim,
        startY?: vec1anim,
        height?: vec1anim
    },
    TubeBloomPrePassLight?: {
        colorAlphaMultiplier?: vec1anim,
        bloomFogIntensityMultiplier?: vec1anim,
    }
}).push();
```

### Type explanation

- If there's a `?` after a property name, it means that the property is optional.
- `Track` : `string | string[]`
- `vec1` : `[number]`
- `vec1anim` : `vec1 | vec1[]`