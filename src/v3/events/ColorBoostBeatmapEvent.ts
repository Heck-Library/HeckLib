export class ColorBoostBeatmapEvent {
    private b: number;
    private o: boolean;

    public set Beat(value: number) { this.b = value; }
    public get Beat() { return this.b; }

    public set On(value: boolean) { this.o = value; }
    public get On() { return this.o; }

    constructor(beat: number, on: boolean) {
        this.b = beat;
        this.o = on;
    }

    public static fromJSON(...json: Record<string, any>[]): ColorBoostBeatmapEvent[] {
        const events: ColorBoostBeatmapEvent[] = [];
        json.forEach(e => {
            const event = new ColorBoostBeatmapEvent(e.b, e.o);
            events.push(event);
        });
        return events;
    }
}