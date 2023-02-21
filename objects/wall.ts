import { animationData, customWallData, lineIndex, lineLayer, wallData, wallType } from "../consts/types/objects.ts";
import { walls } from "../src/mapHandler.ts";

export default class Wall {
    /**
     * These only work with V2
     */
    static Type : Record <string, wallType> = {
        Full: 0,
        Crouch: 1
    };
    private json : {
        wD: wallData;
        cD: customWallData;
        aD: animationData;
    };
    constructor(wallData : wallData, customData? : customWallData, animationData? : animationData) {
        this.json = {
            wD: wallData,
            cD: {},
            aD: {}
        };
        if (customData) 
            this.json.cD = customData;
        
        if (animationData) 
            this.json.aD = animationData;
        

        if (!wallData.time) 
            this.json.wD.time = 0;
        
        if (!wallData.duration) 
            this.json.wD.duration = 1;
        
        if (!wallData.width) 
            this.json.wD.width = 1;
        
        if (!wallData.height) 
            this.json.wD.height = 1;
        
        if (!wallData.x) 
            this.json.wD.x = 0;
        
        if (!wallData.y) 
            this.json.wD.y = 0;
        

        return this;
    }

    // #region getters and setters
    set time(time : number) {
        this.json.wD.time = time;
    }
    get time(): number {
        return this.json.wD.time;
    }

    set duration(duration : number) {
        this.json.wD.duration = duration;
    }
    get duration(): number {
        if (this.json.wD.duration) 
            return this.json.wD.duration;
        
        return 0;
    }

    set width(width : number) {
        this.json.wD.width = width;
    }
    get width(): number {
        if (this.json.wD.width) 
            return this.json.wD.width;
        
        return 0;
    }

    set height(height : number) {
        this.json.wD.height = height;
    }
    get height(): number {
        if (this.json.wD.height) 
            return this.json.wD.height;
        
        return 0;
    }

    set x(x : lineIndex) {
        this.json.wD.x = x;
    }
    get x(): lineIndex {
        if (this.json.wD.x) 
            return this.json.wD.x;
        
        return 0;
    }

    set y(y : lineLayer) {
        this.json.wD.y = y;
    }
    get y(): lineLayer {
        if (this.json.wD.y) 
            return this.json.wD.y;
        
        return 0;
    }

    set data(param : customWallData) {
        this.json.cD = param;
    }
    get data(): customWallData {
        return this.json.cD;
    }

    set anim(param : animationData) {
        this.json.aD = param;
    }
    get anim(): animationData {
        return this.json.aD;
    }
    // #endregion
    push() {
        walls.push(this);
        return this;
    }
}
