import shape from "../../types/shape";
import IMaterial from "./material";

export default interface IGeometryProperties {
    shape: shape;
    material: string | IMaterial;
    collision?: boolean;
}