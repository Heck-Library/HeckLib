import { IBPMEvent } from "./interfaces/IBPMEvent";

export class BPMEvent implements IBPMEvent{
    private b: number = 0;
    private m: number = 0;

    set Beat(b: number) { this.b = b; }
    set BPM(m: number) { this.m = m; }

    get Beat(): number { return this.b; }
    get BPM(): number { return this.m; }


    /**
     * ## BPM Event
     * 
     * Represents a BPM change event.
     * 
     * ---
     * 
     * ### Example
     * ```typescript
     * const bpmEvent = new BPMEvent({
     *     Beat: 16,
     *     BPM: 120
     * });
     * bpmEvent.Beat = 32;
     * bpmEvent.BPM = 240;
     * bpmEvent.Push();
     * ```
     */
    constructor(data: IBPMEvent = {
        Beat: 0,
        BPM: 0
    }) {
        if (!data) return this;
        
        data.Beat && (this.b = data.Beat);
        data.BPM && (this.m = data.BPM);
    }

    public static fromJSON(json: Record<string, any>): BPMEvent[] {
        const events: BPMEvent[] = [];

        if (!json.bpmChanges) return events;

        json.bpmChanges.forEach((event: any) => {

            const bpmEvent = new BPMEvent();

            bpmEvent.Beat = event.b;
            bpmEvent.BPM = event.m;

            events.push(bpmEvent);

        });

        return events;
    }
}