import { Ease } from "../../../util/easings";
import { BaseCustomEvent } from "./BaseCustomEvent";
import { IMaterialPropertyData } from "./properties/IProperty";
import { ColorProperty, FloatProperty, KeywordProperty, MaterialPropertyData, TextureProperty, VectorProperty} from "./properties/Properties";
import { ISetGlobalPropertyData, SetGlobalPropertyData } from "./properties/PropertyData";

export class SetGlobalProperty extends BaseCustomEvent {
    protected d: SetGlobalPropertyData = new SetGlobalPropertyData();

    set Data(data: SetGlobalPropertyData) { this.d = data; }
    set Duration(duration: number) { this.d.Duration = duration; }
    set Easing(easing: Ease) { this.d.Easing = easing; }
    set Properties(properties: IMaterialPropertyData[] | IMaterialPropertyData) {
        if (Array.isArray(properties)) {
            const props: MaterialPropertyData[] = [];
            properties.forEach(p => props.push(SetGlobalProperty.GetCorrectPropertyType(p)));
            this.d.Properties = props;
            return;
        }
        this.d.Properties = SetGlobalProperty.GetCorrectPropertyType(properties);
    }

    get Data(): SetGlobalPropertyData { return this.d; }
    get Duration(): number | undefined { return this.d.Duration; }
    get Easing(): Ease | undefined { return this.d.Easing; }
    get Properties(): MaterialPropertyData[] | MaterialPropertyData { return this.d.Properties; }

    private static GetCorrectPropertyType(property: IMaterialPropertyData): MaterialPropertyData {
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

    constructor(beat: number = 0, data: ISetGlobalPropertyData = new SetGlobalPropertyData(), type: string = "SetGlobalProperty") {
        super(beat, type);
        this.d = new SetGlobalPropertyData(data);
    }
}