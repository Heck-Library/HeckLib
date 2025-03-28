import { BaseCustomEvent } from "./BaseCustomEvent";

interface IDestroyObjectData {
    ID: string | string[];
}

class DestroyObjectData implements IDestroyObjectData {
    private id: string | string[] = "";

    public set ID(id: string | string[]) { this.id = id; }
    public get ID(): string | string[] { return this.id; }

    constructor(data: IDestroyObjectData = { ID: "" }) { data.ID && (this.id = data.ID); }
}

export class DestroyObject extends BaseCustomEvent {
    protected declare d: DestroyObjectData;

    public set Data(data: IDestroyObjectData) { this.d = new DestroyObjectData(data); }
    public set ID(id: string | string[]) { this.d.ID = id; }

    public get Data(): IDestroyObjectData { return this.d; }
    public get ID(): string | string[] { return this.d.ID; }

    constructor(beat: number = 0, data: IDestroyObjectData = new DestroyObjectData()) {
        super(beat, "DestroyObject");
        this.d = new DestroyObjectData(data);
    }
}