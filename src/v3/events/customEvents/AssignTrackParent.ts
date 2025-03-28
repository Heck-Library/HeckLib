import { BaseCustomEvent } from "./BaseCustomEvent";

export interface ITrackParentData {
    ChildrenTracks?: string | string[];
    ParentTrack?: string;
}

class AssignTrackParentData implements ITrackParentData {
    private childrenTracks: string | string[] = [];
    private parentTrack: string = "";

    public set ChildrenTracks(childrenTracks: string | string[]) { this.childrenTracks = childrenTracks; }
    public set ParentTrack(parentTrack: string) { this.parentTrack = parentTrack; }

    public get ChildrenTracks(): string | string[] { return this.childrenTracks; }
    public get ParentTrack(): string { return this.parentTrack; }

    private static readonly defaultData: ITrackParentData = {
        ChildrenTracks: [],
        ParentTrack: "",
    };

    constructor(data: ITrackParentData = AssignTrackParentData.defaultData) {
        if (data === AssignTrackParentData.defaultData) return this;
        data.ChildrenTracks && (this.childrenTracks = data.ChildrenTracks);
        data.ParentTrack && (this.parentTrack = data.ParentTrack);
    }
}

export class AssignTrackParent extends BaseCustomEvent {
    protected d: AssignTrackParentData = new AssignTrackParentData();

    public set Data(data: ITrackParentData) { this.d = new AssignTrackParentData(data); }
    public set ChildrenTracks(childrenTracks: string | string[]) { this.d.ChildrenTracks = childrenTracks; }
    public set ParentTrack(parentTrack: string) { this.d.ParentTrack = parentTrack; }

    public get Data(): ITrackParentData { return this.d; }
    public get ChildrenTracks(): string | string[] { return this.d.ChildrenTracks; }
    public get ParentTrack(): string { return this.d.ParentTrack; }

    constructor(beat: number = 0, data: ITrackParentData = new AssignTrackParentData()) {
        super(beat, "AssignTrackParent");
        this.d = new AssignTrackParentData(data);
    }
}