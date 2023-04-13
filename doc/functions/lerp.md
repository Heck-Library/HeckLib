# Lerp

Lerp is a function that linearly interpolates between two values using a weight value. The weight is a value between 0 and 1. If the weight is 0, the function will return the first value. If the weight is 1, the function will return the second value. If the weight is 0.5, the function will return the average of the two values.

## Usage

```ts
console.log(lerp(0, 1, 0));   // 0
console.log(lerp(0, 1, 0.5)); // 0.5
console.log(lerp(0, 1, 1));   // 1
console.log(lerp(1, 2, 0.5)); // 1.5
console.log(lerp(10, 20, 0.25)); // 12.5
// etc.
```

### Parameters

| Parameter     | Type      | Description                       |
|---------------|-----------|-----------------------------------|
| `a`           | `number`  | The first value.                  |
| `b`           | `number`  | The second value.                 |
| `weight`      | `number`  | The weight of the interpolation.  |