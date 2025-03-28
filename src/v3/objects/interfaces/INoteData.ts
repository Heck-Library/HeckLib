import { LineIndex, LineLayer, NoteColor, CutDirection } from "../../../util/enums";


export interface INoteData {
    /**
     * ## Beat
     * 
     * The beat the note will be hit on.
     * 
     * In seconds this is calculated as `Beat / BPM * 60`.
     * 
     * ---
     * 
     * **Type:** `number`
     * 
     * **Default:** `0`
     */
    Beat?: number;
    /**
     * ## X
     * 
     * The horizontal position of the note.
     * 
     * ---
     * 
     * ### Values
     * 
     * - `Note.LINEINDEX.Left` : `0`
     * - `Note.LINEINDEX.CenterLeft` : `1`
     * - `Note.LINEINDEX.CenterRight` : `2`
     * - `Note.LINEINDEX.Right` : `3`
     * 
     * ---
     * 
     * **Type:** `LineIndex`
     * 
     * **Default:** `LineIndex.Left`
     */
    X?: LineIndex;
    /**
     * ## Y
     * 
     * The vertical position of the note.
     * 
     * ---
     * 
     * ### Values
     * 
     * - `Note.LINELAYER.Bottom` : `0`
     * - `Note.LINELAYER.Middle` : `1`
     * - `Note.LINELAYER.Top` : `2`
     * 
     * ---
     * 
     * **Type:** `LineLayer`
     * 
     * **Default:** `LineLayer.Bottom`
     */
    Y?: LineLayer;
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
