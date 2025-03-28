import { Vec1Animation, Vec4, Vec4Animation } from "../../../../util/vec";
import { IBaseProperty, IBoolProperty, IColorProperty, IFloatProperty, IIntegerProperty, IKeywordProperty, ITextureProperty, ITriggerProperty, IVectorProperty } from "./IProperty";

export type materialPropertyType = "Texture" | "Float" | "Color" | "Vector" | "Keyword";
export type animatorPropertyType = "Float" | "Bool" | "Integer" | "Trigger";

export class BaseProperty implements IBaseProperty {
    private id: string;

    set ID(id: string) { this.id = id; }

    get ID(): string { return this.id; }

    constructor(data?: IBaseProperty) {
        if (data === undefined) data = {} as IBaseProperty;

        this.id = data.ID;
    }
}

export class BoolProperty extends BaseProperty implements IBoolProperty {
    private type: "Bool" = "Bool";
    private value: boolean | Vec1Animation;

    set Type(type: "Bool") { this.type = type; }
    set Value(value: boolean | Vec1Animation) { this.value = value; }

    get Type(): "Bool" { return this.type; }
    get Value(): boolean | Vec1Animation { return this.value; }

    constructor(data?: IBoolProperty) {
        super(data);

        if (data === undefined) data = {} as IBoolProperty;

        this.value = data.Value;
    }
}

export class FloatProperty extends BaseProperty implements IFloatProperty {
    private type: "Float" = "Float";
    private value: number | Vec1Animation;

    set Type(type: "Float") { this.type = type; }
    set Value(value: number | Vec1Animation) { this.value = value; }

    get Type(): "Float" { return this.type; }
    get Value(): number | Vec1Animation { return this.value; }

    constructor(data?: IFloatProperty) {
        super(data);

        if (data === undefined) data = {} as IFloatProperty;

        this.value = data.Value;
    }
}

export class IntegerProperty extends BaseProperty implements IIntegerProperty {
    private type: "Integer" = "Integer";
    private value: number | Vec1Animation;

    set Type(type: "Integer") { this.type = type; }
    set Value(value: number | Vec1Animation) { this.value = IntegerProperty.convertToInt(value); }

    get Type(): "Integer" { return this.type; }
    get Value(): number | Vec1Animation { return this.value; }

    private static convertToInt(value: number | Vec1Animation): number | Vec1Animation {
        if (typeof value === "string") return value;
        if (typeof value === "number") return Math.floor(value);
        if (typeof value[0] === "number") return [Math.floor(value[0])];
        if (Array.isArray(value[0]) && Array.isArray(value[0][0])) {
            return value.map(v => Array.isArray(v) ? [Math.floor(v[0] as number)] : v) as unknown as Vec1Animation;
        }
        return value;
    }

    constructor(data?: IIntegerProperty) {
        super(data);

        if (data === undefined) data = {} as IIntegerProperty;

        this.value = IntegerProperty.convertToInt(data.Value);
    }
}

export class TriggerProperty extends BaseProperty implements ITriggerProperty {
    private type: "Trigger" = "Trigger";
    private value: boolean;

    set Type(type: "Trigger") { this.type = type; }
    set Value(value: boolean) { this.value = value; }

    get Type(): "Trigger" { return this.type; }
    get Value(): boolean { return this.value; }

    constructor(data?: ITriggerProperty) {
        super(data);

        if (data === undefined) data = {} as ITriggerProperty;

        this.value = data.Value;
    }
}

export class ColorProperty extends BaseProperty implements IColorProperty {
    private type: "Color" = "Color";
    private value: Vec4 | Vec4Animation;

    set Type(type: "Color") { this.type = type; }
    set Value(value: Vec4 | Vec4Animation) { this.value = value; }

    get Type(): "Color" { return this.type; }
    get Value(): Vec4 | Vec4Animation { return this.value; }

    constructor(data?: IColorProperty) {
        super(data);

        if (data === undefined) data = {} as IColorProperty;

        this.value = data.Value;
    }
}

export class TextureProperty extends BaseProperty implements ITextureProperty {
    private type: "Texture" = "Texture";
    private value: string;

    set Type(type: "Texture") { this.type = type; }
    set Value(value: string) { this.value = value; }

    get Type(): "Texture" { return this.type; }
    get Value(): string { return this.value; }

    constructor(data?: ITextureProperty) {
        super(data);

        if (data === undefined) data = {} as ITextureProperty;

        this.value = data.Value;
    }
}

export class KeywordProperty extends BaseProperty implements IKeywordProperty {
    private type: "Keyword" = "Keyword";
    private value: boolean | Vec1Animation;

    set Type(type: "Keyword") { this.type = type; }
    set Value(value: boolean | Vec1Animation) { this.value = value; }

    get Type(): "Keyword" { return this.type; }
    get Value(): boolean | Vec1Animation { return this.value; }

    constructor(data?: IKeywordProperty) {
        super(data);

        if (data === undefined) data = {} as IKeywordProperty;

        this.value = data.Value;
    }
}

export class VectorProperty extends BaseProperty implements IVectorProperty {
    private type: "Vector" = "Vector";
    private value: any[];

    set Type(type: "Vector") { this.type = type; }
    set Value(value: any[]) { this.value = value; }

    get Type(): "Vector" { return this.type; }
    get Value(): any[] { return this.value; }

    constructor(data?: IVectorProperty) {
        super(data);

        if (data === undefined) data = {} as IVectorProperty;

        this.value = data.Value;
    }
}

export type MaterialPropertyData = FloatProperty | ColorProperty | TextureProperty | KeywordProperty | VectorProperty;
export type AnimatorPropertyData = FloatProperty | BoolProperty | IntegerProperty | TriggerProperty;