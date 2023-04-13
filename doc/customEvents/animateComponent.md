# AnimateComponent

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

### Properties
| Property                                                          | Type                                                              | Description |
|-------------------------------------------------------------------|-------------------------------------------------------------------|-------------|
| [`track`](../types/track.md)                                      | [`Track`](../types/track.md)                                      | The track to be controlled.
| `duration`                                                        | `number`                                                          | The duration of the animation in beats.
| [`easing`](../enums/easings.md)                                   | `string`                                                          | The easing of the animation. If not specified, it will use the default easing (linear).
| [`ILightWithId`](../components/ilightwithid.md)                   | `{lightID: number, type: number}`                                 | The `ILightWithId` component.
| [`BloomFogEnvironment`](../components/bloomfogenvironment.md)     | [`BloomFogEnvironment`](../components/bloomfogenvironment.md)     | The `BloomFogEnvironment` component.
| [`TubeBloomPrePassLight`](../components/tubebloomprepasslight.md) | [`TubeBloomPrePassLight`](../components/tubebloomprepasslight.md) | The `TubeBloomPrePassLight` component.
