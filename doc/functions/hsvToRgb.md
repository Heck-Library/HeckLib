# HSV to RGB

## Explanation

This function takes in a HSV color and converts it to RGB. The format of the HSV color is `[h, s, v]`, where `h` is the hue, `s` is the saturation and `v` is the value. The format of the RGB color is `[r, g, b]`, where `r`, `g` and `b` are numbers between 0 and 1.

## Usage

```ts
console.log(HSVtoRGB(0, 1, 1));   // [1, 0, 0]
console.log(HSVtoRGB(0.5, 1, 1)); // [0, 1, 0]
console.log(HSVtoRGB(1, 1, 1));   // [0, 0, 1]
// etc.
```

### Parameters

| Parameter     | Type      | Description                   |
|---------------|-----------|-------------------------------|
| `hue`         | `number`  | The hue of the color.         |
| `saturation`  | `number`  | The saturation of the color.  |
| `value`       | `number`  | The value of the color.       |

### Example

This example shows how you can use `HSVtoRGB` to create a color keyframe.
```ts
new AnimateTrack(0, {
    track: "exampleTrack",
    duration: 1,
    color: [...HSVtoRGB(0.5, 1, 1), 1],
}).push();
```


Here's how to do a basic rainbow gradient. Note that this is not the most efficient way to do this, but it's the easiest.

```ts
const colorArray: vec4anim = [];
for (let i = 0; i <= 1; i += 0.1) {
    colorArray.push([...HSVtoRGB(i, 1, 1), 1, 0]);
}

new AnimateTrack(0, {
    track: "exampleTrack",
    duration: 1,
    color: colorArray,
}).push();
```