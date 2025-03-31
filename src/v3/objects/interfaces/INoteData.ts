import { NoteColor, CutDirection } from "../../../util/enums";
import { IBaseObject } from "./IBaseObject";


export interface INoteData extends IBaseObject {
    /**
     * ## Color
     * 
     * The color of the note.
     * 
     * ---
     * 
     * ### Values
     * 
     * - `Note.COLOR.Red` : `0`
     * - `Note.COLOR.Blue` : `1`
     * 
     * ---
     * 
     * **Type:** `NoteColor`
     * 
     * **Default:** `NoteColor.Red`
     */
    Color?: NoteColor;
    /**
     * ## CutDirection
     * 
     * The direction the note will be cut in.
     * 
     * ---
     * 
     * ### Values
     * 
     * - `Note.DIRECTION.Up` : `0`
     * - `Note.DIRECTION.Down` : `1`
     * - `Note.DIRECTION.Left` : `2`
     * - `Note.DIRECTION.Right` : `3`
     * - `Note.DIRECTION.UpLeft` : `4`
     * - `Note.DIRECTION.UpRight` : `5`
     * - `Note.DIRECTION.DownLeft` : `6`
     * - `Note.DIRECTION.DownRight` : `7`
     * - `Note.DIRECTION.Any` : `8`
     * 
     * ---
     * 
     * **Type:** `CutDirection`
     * 
     * **Default:** `CutDirection.Up`
     */
    CutDirection?: CutDirection;
    /**
     * ## Angle
     * 
     * The angle offset of the note in degrees.
     * 
     * ---
     * 
     * **Type:** `number`
     * 
     * **Default:** `0`
     */
    Angle?: number;
}
