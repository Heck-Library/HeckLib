import {
    animationData,
    customNoteData,
    lineIndex,
    lineLayer,
    noteDir,
    noteType
} from "../consts/types/objects";
import {bombs, notes, V3} from "../map/initialize";
type noteData = {
    /**
     * Beat timing of the note
     */
    time: number;
    /**
     * The horizontal index position of the note
     */
    x?: lineIndex;
    /**
     * The vertical row index of the note
     */
    y?: lineLayer;
    /**
     * Angle offset of the note in degrees
     */
    angle?: number;
    /**
     * Type of the note (Red, Blue, Bomb)
     */
    type?: noteType;
    /**
     * Cut direction of the note
     */
    direction?: noteDir;
};

enum Direction {
    Up = 0,
    Down = 1,
    Left = 2,
    Right = 3,
    UpL = 4,
    UpR = 5,
    DownL = 6,
    DownR = 7,
    Dot = 8
}

enum Type {
    /**
     * Red note type
     */
    Red = 0,
    /**
     * Blue note type
     */
    Blue = 1,
    /**
     * Won't work in V3 due to bombs belonging to a separate array.
     */
    Bomb = 3
}

export default class Note {
    /**
     * Contains all possible note directions.
     */
    static readonly Direction = Direction;
    /**
     * Contains all possible note types.
     */
    static readonly Type = Type;

    private json : {
        nD: noteData;
        cD: customNoteData;
        aD: animationData;
    };
    /**
     * Creates a new note as a class object
     * ```ts
     * new Note({
     *     time: 69
     * }, {
     *     scale: [2, 2, 2]
     * }, {
     *     definitePosition: [
     *         [0, -10, 10, 0],
     *         [0, 7, 12, 1, ease.Out.Cubic]
     *     ]
     * }).push();
     * ```
     * @param noteData All the vanilla data for the note
     * @param customData All the custom data of the note, such as `color`
     * @param animationData All the animation data of the note, such as `dissolve`
     */
    constructor(noteData : noteData, customData? : customNoteData, animationData? : animationData) {
        this.json = {
            nD: noteData,
            cD: {},
            aD: {}
        };
        if (customData) this.json.cD = customData;
        if (animationData) this.json.aD = animationData;
        
        if (!noteData.time) this.json.nD.time = 0;
        if (!noteData.type) this.json.nD.type = 0;
        if (!noteData.angle) this.json.nD.angle = 0;
        if (!noteData.direction) this.json.nD.direction = 0;
        if (!noteData.x) this.json.nD.x = 0;
        if (!noteData.y) this.json.nD.y = 0;
        
    }

    // #region getters and setters-
    /**
     * Sets the time value of the note.
     */
    set time(time : number) {
        this.json.nD.time = time;
    }
    /**
     * Gets the time value of the note.
     */
    get time(): number {
        return this.json.nD.time;
    }

    /**
     * Sets the type value of the note.
     */
    set type(type : noteType) {
        this.json.nD.type = type;
    }
    /**
     * Gets the type value of the note.
     */
    get type(): noteType {
        if (this.json.nD.type) 
            return this.json.nD.type;
        
        return 0;
    }

    /**
     * Sets the horizontal position value of the note.
     */
    set x(x : lineIndex) {
        this.json.nD.x = x;
    }
    /**
     * Gets the horizontal position value of the note.
     */
    get x(): lineIndex {
        if (this.json.nD.x) 
            return this.json.nD.x;
        
        return 0;
    }

    /**
     * Sets the vertical position value of the note.
     */
    set y(y : lineLayer) {
        this.json.nD.y = y;
    }
    /**
     * Gets the vertical position value of the note.
     */
    get y(): lineLayer {
        if (this.json.nD.y) 
            return this.json.nD.y;
        
        return 0;
    }
    set angle(angle : number) {
        this.json.nD.angle = angle;
    }
    get angle(): number {
        return this.json.nD.angle;
    }

    /**
     * Sets the arrow direction value of the note.
     */
    set direction(direction : noteDir) {
        this.json.nD.direction = direction;
    }
    /**
     * Gets the arrow direction value of the note.
     */
    get direction(): noteDir {
        if (this.json.nD.direction) 
            return this.json.nD.direction;
        
        return 0;
    }

    /**
     * Sets the data values of the note.
     */
    set data(param : customNoteData) {
        this.json.cD = param;
    }
    /**
     * Gets the data values of the note.
     */
    get data(): customNoteData {
        return this.json.cD;
    }

    /**
     * Sets the animation values of the note.
     */
    set anim(param : animationData) {
        this.json.aD = param;
    }
    /**
     * Gets the animation values of the note.
     */
    get anim(): animationData {
        return this.json.aD;
    }
    // #endregion

    /**
     * Pushes the note to the map as a class.
     */
    push() {
        if (V3 && this.type == 3) {
            bombs.push(this);
            return this;
        }
        notes.push(this);
        return this;
    }
}
