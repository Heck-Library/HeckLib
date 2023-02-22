import {
    animationData,
    customNoteData,
    lineIndex,
    lineLayer,
    noteData,
    noteDir,
    noteType
} from "../consts/types/objects.ts";
import {bombs, notes, V3} from "../src/mapHandler.ts";

export class Note { /**
     * Arrow direction values.
     * @example Note.Direction.Down returns 1
     */
    static Direction : Record < string,
    noteDir > = {
        Up: 0,
        Down: 1,
        Left: 2,
        Right: 3,
        UpL: 4,
        UpR: 5,
        DownL: 6,
        DownR: 7,
        Dot: 8
    };
    static Type : Record < string,
    noteType > = {
        Red: 0,
        Blue: 1,
        /**
       * Bomb type is a V2 only feature
       */
        Bomb: 3
    };
    private json : {
        nD: noteData;
        cD: customNoteData;
        aD: animationData;
    };
    constructor(noteData : noteData, customData? : customNoteData, animatinoData? : animationData) {
        this.json = {
            nD: noteData,
            cD: {},
            aD: {}
        };
        if (customData) 
            this.json.cD = customData;
        
        if (animatinoData) 
            this.json.aD = animatinoData;
        

        if (!noteData.time) 
            this.json.nD.time = 0;
        
        if (!noteData.type) 
            this.json.nD.type = 0;
        
        if (!noteData.direction) 
            this.json.nD.direction = 0;
        
        if (!noteData.x) 
            this.json.nD.x = 0;
        
        if (!noteData.y) 
            this.json.nD.y = 0;
        
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
     * @returns Note
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
