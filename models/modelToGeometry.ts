import { vec3 } from "../types/vectors";
import IModel from "../interfaces/model";
import IGeometryEnvironment from "../interfaces/environment/geometry";
import { readFileSync } from "fs";
import Geometry from "../environment/geometry";
import { geometry, materialNames } from "../map/variables";
import Material from "../environment/material";

export default class ModelToGeometry {
    public path: string;
    public position: vec3;
    public scale: vec3;
    public rotation: vec3;
    private model: IModel[] = [];
    private geometry: IGeometryEnvironment[] = [];

    constructor(filePath: string) {
        this.path = filePath;
        this.model = JSON.parse(readFileSync(filePath, "utf8"));
        for (let m of this.model) {
            const matName = `r${m.color[0]}g${m.color[1]}b${m.color[2]}modGeoMat`;
            if (!materialNames.includes(matName)) {
                new Material(matName, {
                    color: m.color,
                    shader: "Standard",
                }).push();
            }
            const geo = new Geometry({
                geometry: {
                    material: matName,
                    shape: m.shape,
                },
                position: m.position,
                rotation: m.rotation,
                scale: m.scale
            });
            this.geometry.push(geo);
        }
    }

    push(): void {
        for (let g of this.geometry) {
            geometry.push(g);
        }
    }
}