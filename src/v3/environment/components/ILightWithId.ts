export class ILightWithID {
    private lightID: number = 0;
    private type: number = 0;
    
    public readonly ComponentType: string = "ILightWithID";

    get LightID(): number { return this.lightID; }
    get Type(): number { return this.type; }

    set LightID(lightID: number) { this.lightID = lightID; }
    set Type(type: number) { this.type = type; }

    constructor(lightID?: number, type?: number) {
        if (typeof lightID === "undefined") return this;
        if (typeof type === "undefined") return this;

        this.lightID = lightID;
        this.type = type;
        
        return this;
    }
}