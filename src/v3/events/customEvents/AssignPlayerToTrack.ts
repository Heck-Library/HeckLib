import { BaseCustomEvent } from "./BaseCustomEvent";

export type playerTrackTarget = "Root" | "Head" | "LeftHand" | "RightHand";

export interface IAssignPlayerToTrackData {
    Track: string;
    Target?: playerTrackTarget;
}

class AssignPlayerToTrackData implements IAssignPlayerToTrackData {
    private track: string = "";
    private target?: playerTrackTarget;

    public set Track(value: string) { this.track = value; }
    public set Target(value: undefined | playerTrackTarget) { this.target = value; }

    public get Track(): string { return this.track; }
    public get Target(): undefined | playerTrackTarget { return this.target; }

    constructor(data: IAssignPlayerToTrackData = {} as IAssignPlayerToTrackData) {
        this.track = data.Track;
        this.target = data.Target;
    }
}

export class AssignPlayerToTrack extends BaseCustomEvent {
    protected d: AssignPlayerToTrackData = new AssignPlayerToTrackData();

    public set Data(value: IAssignPlayerToTrackData) {
        this.d.Track = value.Track;
        this.d.Target = value.Target
    }
    public set Track(value: string) { this.d.Track = value; }
    public set Target(value: undefined | playerTrackTarget) { this.d.Target = value; }

    public get Data(): IAssignPlayerToTrackData { return this.d; }
    public get Track(): string { return this.d.Track; }
    public get Target(): undefined | playerTrackTarget { return this.d.Target; }

    constructor(beat: number = 0, data: IAssignPlayerToTrackData = {} as IAssignPlayerToTrackData) {
        super(beat, "AssignPlayerToTrack");
        this.Data = data;
    }
}