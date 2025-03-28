import { ISetMaterialPropertyData, SetMaterialPropertyData } from "./properties/PropertyData";
import { SetMaterialProperty } from "./SetMaterialProperty";

export interface IBlitData extends ISetMaterialPropertyData {
    Priority?: number;
    Pass?: number;
    Order?: string;
    Source?: string;
    Destination?: string;
}

class BlitData extends SetMaterialPropertyData implements IBlitData {
    private priority?: number;
    private pass?: number;
    private order?: string;
    private source?: string;
    private destination?: string;

    public set Priority(priority: undefined | number) { this.priority = priority; }
    public set Pass(pass: undefined | number) { this.pass = pass; }
    public set Order(order: undefined | string) { this.order = order; }
    public set Source(source: undefined | string) { this.source = source; }
    public set Destination(destination: undefined | string) { this.destination = destination; }

    public get Priority(): undefined | number { return this.priority; }
    public get Pass(): undefined | number { return this.pass; }
    public get Order(): undefined | string { return this.order; }
    public get Source(): undefined | string { return this.source; }
    public get Destination(): undefined | string { return this.destination; }

    constructor(data: IBlitData = {} as IBlitData) {
        super(data);

        this.priority = data.Priority;
        this.pass = data.Pass;
        this.order = data.Order;
        this.source = data.Source;
        this.destination = data.Destination;
    }
}

export class Blit extends SetMaterialProperty {
    protected declare d: BlitData;

    set Priority(priority: undefined | number) { this.d.Priority = priority; }
    set Pass(pass: undefined | number) { this.d.Pass = pass; }
    set Order(order: undefined | string) { this.d.Order = order; }
    set Source(source: undefined | string) { this.d.Source = source; }
    set Destination(destination: undefined | string) { this.d.Destination = destination; }

    get Priority(): undefined | number { return this.d.Priority; }
    get Pass(): undefined | number { return this.d.Pass; }
    get Order(): undefined | string { return this.d.Order; }
    get Source(): undefined | string { return this.d.Source; }
    get Destination(): undefined | string { return this.d.Destination; }

    constructor(beat: number = 0, data: IBlitData = {} as IBlitData) {
        super(beat, new BlitData(data), "Blit");

        this.t = "Blit";
        this.d = new BlitData(data);
    }
}