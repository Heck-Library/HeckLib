# Random

Returns a random number between `min` and `max` values with an optional decimal precision which defaults to 1.

## Usage

```ts
console.log(random(0, 10, 0)); // 3
console.log(random(0, 10)); // 5.2
console.log(random(0, 10, 2)); // 1.58
console.log(random(0, 10, 3)); // 8.344
console.log(random(0, 10, 4)); // 9.2345
// etc.
```

### Parameters

| Parameter     | Type      | Description                       |
|---------------|-----------|-----------------------------------|
| `min`         | `number`  | The minimum value.                |
| `max`         | `number`  | The maximum value.                |
| `precision`   | `number`  | The decimal precision.            |