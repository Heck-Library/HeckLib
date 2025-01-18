import IMatPropertyData from "../interfaces/events/eventData/IMatPropertyData";
import SetMaterialProperty from "./setMaterialProperty";

export default class SetGlobalProperty extends SetMaterialProperty {
    readonly type: string = "SetGlobalProperty";
    
    constructor(time: number);
    constructor(time: number, data: IMatPropertyData);
    constructor(time: number, data?: IMatPropertyData) {
        super(time, data);
        this.type = "SetGlobalProperty";
    }
}