import { Ease } from "../../../../util/easings";
import { IMaterialPropertyData, IAnimatorPropertyData } from "./IProperty";
import { AnimatorPropertyData, BoolProperty, ColorProperty, FloatProperty, IntegerProperty, KeywordProperty, MaterialPropertyData, TextureProperty, TriggerProperty, VectorProperty } from "./Properties";

interface ISetPropertyData {
    Duration?: number;
    Easing?: Ease;
}

export interface ISetAnimatorPropertyData extends ISetPropertyData {
    ID: string;
    Properties: IAnimatorPropertyData[] | IAnimatorPropertyData;
}
export interface ISetGlobalPropertyData extends ISetPropertyData {
    Properties: IMaterialPropertyData[] | IMaterialPropertyData;
}
export interface ISetMaterialPropertyData extends ISetGlobalPropertyData {
    Asset: string;
}

export class SetPropertyData implements ISetPropertyData {
    protected duration?: number;
    protected easing?: Ease;

    public set Duration(duration: number) { this.duration = duration; }
    public set Easing(easing: Ease) { this.easing = easing; }
    
    public get Duration(): undefined | number { return this.duration; }
    public get Easing(): undefined | Ease { return this.easing; }
}
export class SetGlobalPropertyData extends SetPropertyData implements ISetGlobalPropertyData {
    private properties: MaterialPropertyData[] = [];

    public set Properties(properties: IMaterialPropertyData[] | IMaterialPropertyData) {
        if (Array.isArray(properties)) {
            const props: MaterialPropertyData[] = [];
            properties.forEach(p => props.push(this.GetCorrectPropertyType(p)));
            this.properties = props;
            return;
        }
        this.properties = [this.GetCorrectPropertyType(properties)];
    }

    public get Properties(): MaterialPropertyData[] | MaterialPropertyData { return this.properties; }

    constructor(data?: ISetGlobalPropertyData) {
        super();
        if (data === undefined) return;
        data.Duration && (this.duration = data.Duration);
        data.Easing && (this.easing = data.Easing);
        data.Properties && (this.Properties = data.Properties);
    }

    GetCorrectPropertyType(property: IMaterialPropertyData): MaterialPropertyData {
        switch (property.Type) {
            case "Float":
                return new FloatProperty(property);
            case "Color":
                return new ColorProperty(property);
            case "Texture":
                return new TextureProperty(property);
            case "Keyword":
                return new KeywordProperty(property);
            case "Vector":
                return new VectorProperty(property);
        }
    }
}

export class SetMaterialPropertyData extends SetGlobalPropertyData {
    private asset: string = "";

    set Asset(asset: string) { this.asset = asset; }
    get Asset(): string { return this.asset; }

    constructor(data?: ISetMaterialPropertyData) {
        super(data);
        if (data === undefined) return;
        data.Asset && (this.asset = data.Asset);
    }
}

export class SetAnimatorPropertyData extends SetPropertyData implements ISetAnimatorPropertyData {
    private id: string = "";
    private properties: AnimatorPropertyData[] = [];

    public set ID(id: string) { this.id = id; }
    public set Properties(properties: IAnimatorPropertyData[] | IAnimatorPropertyData) {
        if (Array.isArray(properties)) {
            const props: AnimatorPropertyData[] = [];
            properties.forEach(p => props.push(this.GetCorrectPropertyType(p)));
            this.properties = props;
            return;
        }
        this.properties = [this.GetCorrectPropertyType(properties)];
    }

    public get ID(): string { return this.id; }
    public get Properties(): AnimatorPropertyData[] { return this.properties; }

    constructor(data?: ISetAnimatorPropertyData) {
        super();
        if (data === undefined) return;
        data.Duration && (this.duration = data.Duration);
        data.Easing && (this.easing = data.Easing);
        data.Properties && (this.Properties = data.Properties);
    }

    GetCorrectPropertyType(property: IAnimatorPropertyData): AnimatorPropertyData {
        switch (property.Type) {
            case "Float":
                return new FloatProperty(property);
            case "Bool":
                return new BoolProperty(property);
            case "Integer":
                return new IntegerProperty(property);
            case "Trigger":
                return new TriggerProperty(property);
        }
    }
}