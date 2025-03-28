import { GeometryShape } from "../../util/enums";
import { Material, IMaterial, IMaterialJSON} from "./Material";

export type GeometryJSON = {
    type: keyof typeof GeometryShape;
    material: string | IMaterialJSON;
    collision?: boolean;
}

export interface IGeometry {
    Type?: GeometryShape | keyof typeof GeometryShape;
    Material?: IMaterial | string;
    Collision?: boolean;

    toJSON(): GeometryJSON;
}

export class Geometry implements IGeometry {
    public static readonly SHAPE = GeometryShape;

    private type: keyof typeof GeometryShape = Geometry.SHAPE.Cube;
    private material: Material | string;
    private collision?: boolean;
    
    public set Type(type: GeometryShape | keyof typeof GeometryShape) { this.type = type; }
    public set Material(material: IMaterial | string) { this.material = typeof material === "string" ? material : new Material(material); }
    public set Collision(collision: undefined | boolean) { this.collision = collision; }

    public get Type(): GeometryShape | keyof typeof GeometryShape { return this.type; }
    public get Material(): IMaterial | string {
        if (typeof this.material === "string") return this.material

        if (this.material === undefined) this.material = new Material();

        return this.material;
    }
    public get Collision(): undefined | boolean { return this.collision; }

    public toJSON(): GeometryJSON {
        return {
            type: this.type,
            material: typeof this.material === 'string' ? this.material : this.material.toJSON(),
            collision: this.collision
        };
    }

    constructor(data: IGeometry = {} as IGeometry) {
        this.type = data.Type || Geometry.SHAPE.Cube;
        this.material = typeof data.Material === "string" ? data.Material : new Material(data.Material);
        this.collision = data.Collision;
    }
}