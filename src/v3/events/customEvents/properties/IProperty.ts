import { Vec1Animation, Vec4, Vec4Animation } from "../../../../util/vec";

export interface IBaseProperty {
    ID: string;
}

export interface IFloatProperty extends IBaseProperty {
    Type: "Float";
    Value: number | Vec1Animation;
}

export interface IBoolProperty extends IBaseProperty {
    Type: "Bool";
    Value: boolean | Vec1Animation;
}

export interface IIntegerProperty extends IBaseProperty {
    Type: "Integer";
    Value: number | Vec1Animation;
}

export interface ITriggerProperty extends IBaseProperty {
    Type: "Trigger";
    Value: boolean;
}

export interface IColorProperty extends IBaseProperty {
    Type: "Color";
    Value: Vec4 | Vec4Animation;
}

export interface ITextureProperty extends IBaseProperty {
    Type: "Texture";
    Value: string;
}

export interface IKeywordProperty extends IBaseProperty {
    Type: "Keyword";
    Value: boolean | Vec1Animation;
}

export interface IVectorProperty extends IBaseProperty {
    Type: "Vector";
    Value: any[];
}

export type IMaterialPropertyData = IFloatProperty | IColorProperty | ITextureProperty | IKeywordProperty | IVectorProperty;
export type IAnimatorPropertyData = IFloatProperty | IBoolProperty | IIntegerProperty | ITriggerProperty;