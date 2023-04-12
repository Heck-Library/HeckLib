# Duplication

## Description

Returns a duplicate of the object passed in. Use this to create a copy of an object that can be modified without affecting the original.

## Usage

```ts
const duplicatedNotes = dupe(notes);
notes.push(duplicatedNotes);
```

## Example

```ts
filter(notes, 69, 727).forEach((n: NOTE) => {
    const duplicatedNote = dupe(n);
    const d = duplicatedNote.data;
    const a = duplicatedNote.anim;

    d.fake = true;
    d.interactable = false;
    d.color = [1, 1, 1, 1];

    a.dissolve = [
        [random(0, 5) / 5, 0],
        [random(0, 5) / 5, 0.5, ease.Out.Cubic]
    ];
    a.dissolveArrow = [0];
    
    notes.push(duplicatedNote);
});
```