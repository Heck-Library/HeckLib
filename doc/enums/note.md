# Note Enums

This page is about the different enumerations that can be used for the [`note`s](../objects/note.md).

---
## Note Direction

Note direction is a static enumerator found in the [`Note`](../objects/note.md) class. It is used to set the direction of the note without the need to memorize all of the corresponding numerical values.

Direction enumerators are the following:
|       Enumerators         | Value     |   Meaning     |
|:-------------------------:|:---------:|:-------------:|
| `Note.Direction.Up`       | 0         | Up            |
| `Note.Direction.Down`     | 1         | Down          |
| `Note.Direction.Left`     | 2         | Left          |
| `Note.Direction.Right`    | 3         | Right         |
| `Note.Direction.UpL`      | 4         | Up Left       |
| `Note.Direction.UpR`      | 5         | Up Right      |
| `Note.Direction.DownL`    | 6         | Down Left     |
| `Note.Direction.DownR`    | 7         | Down Right    |
| `Note.Direction.Dot`      | 8         | Dot           |

---
## Note Type

Note type is a static enumerator found in the [`Note`](../objects/note.md) class. It is used to set the type of the note without the need to memorize all of the corresponding numerical values.

Type enumerators are the following:

|       Enumerators         | Value     |   Meaning         |
|:-------------------------:|:---------:|:-----------------:|
| `Note.Type.Red`           | 0         | Red Note          |
| `Note.Type.Blue`          | 1         | Blue Note         |
| `Note.Type.Bomb`          | 3         | Bomb (*V2 only*)  |