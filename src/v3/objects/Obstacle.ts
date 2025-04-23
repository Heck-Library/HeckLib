import { LineIndex, LineLayer } from "../../util/enums";
import { log } from "../../util/logs";
import { IPathAnimationData } from "../events/customEvents/interfaces/IPathAnimationData";
import { BaseObject } from "./BaseObject";
import { ObjectAnimationData } from "./customData/ObjectAnimationData";
import { ObstacleCustomData } from "./customData/ObstacleCustomData";
import { IObstacleCustomData } from "./customData/interfaces/IObstacleCustomData";
import { IObstacleData } from "./interfaces/IObstacleData";

type ObstacleFilters = {
    StartBeat: number,
    EndBeat: number,
    MinDuration: number,
    MaxDuration: number,
    Xs: LineIndex[],
    Ys: LineLayer[],
    Widths: number[],
    Heights: number[],
}

export class ObstacleArray extends Array<Obstacle> {
    private fake: boolean = false;

    private determineName(): string { return this.fake ? "FakeObstacles" : "Obstacles" }

    private filtersToString(filters: Partial<ObstacleFilters>): string {
        return (filters.StartBeat !== undefined ? "\n          StartBeat: "+ filters.StartBeat : '')
            + (filters.EndBeat !== undefined ? "\n          EndBeat: "+ filters.EndBeat : '')
            + (filters.MinDuration !== undefined ? "\n          MinDuration: "+ filters.MinDuration : '')
            + (filters.MaxDuration !== undefined ? "\n          MaxDuration: "+ filters.MaxDuration : '')
            + (filters.Xs !== undefined ? "\n          Xs: "+ filters.Xs.join(', ') : '')
            + (filters.Ys !== undefined ? "\n          Ys: "+ filters.Ys.join(', ') : '')
            + (filters.Widths !== undefined ? "\n          Widths: "+ filters.Widths.join(', ') : '')
            + (filters.Heights !== undefined ? "\n          Heights: "+ filters.Heights.join(', ') :'');
    }
    /**
     * ## Select
     * 
     * Selects obstacles based on the filters provided and returns them as a new array.
     * 
     * @param filters All potential filters to select the obstacles by.
     * @returns Filtered array of obstacles.
     * @example
     * walls.select({
     *     StartBeat: 6.9,
     *     EndBeat: 69
     * }).forEach(n => {
     *     n.CustomData.Track = "TestTrack";
     * });
     */
    public select(filters: Partial<ObstacleFilters>): Obstacle[] {
        try {
            log.info(`Selecting ${this.determineName()} with filters: ${this.filtersToString(filters)}`);
            const filtered = this.filter(obstacle => {
                if (filters.StartBeat !== undefined && obstacle.Beat < filters.StartBeat) return false;
                if (filters.EndBeat !== undefined && obstacle.Beat > filters.EndBeat) return false;
                if (filters.MinDuration !== undefined && obstacle.Duration < filters.MinDuration) return false;
                if (filters.MaxDuration !== undefined && obstacle.Duration > filters.MaxDuration) return false;
                if (filters.Xs !== undefined && !filters.Xs.includes(obstacle.X)) return false;
                if (filters.Ys !== undefined && !filters.Ys.includes(obstacle.Y)) return false;
                if (filters.Widths !== undefined && !filters.Widths.includes(obstacle.Width)) return false;
                if (filters.Heights !== undefined && !filters.Heights.includes(obstacle.Height)) return false;
                return true;
            });
            log.success(`Selected ${filtered.length} ${this.determineName()}.`);
            return filtered;
        } catch (e) {
            if (e instanceof Error) {
                log.error(`Could not filter ${this.determineName()}: ${e.message}`);
            } else {
                log.error(`Could not filter ${this.determineName()}: Unknown error`);
            }
            return [];
        }
    }

    /**
     * ## Push
     * 
     * Pushes obstacle(s) to the array. This method is significantly slower than `fastPush` with the advantage of keeping the functions and methods of the object.
     * 
     * @param items Obstacle(s) to push to the map. 
     * @returns Length of the array (How many obstacles are in the map).
     * @example
     * walls.push(new Obstacle());
     * 
     * walls[0].CustomData // Returns a valid object
     */
    push(...items: Obstacle[]): number {
        items.forEach(n => super.push(n.Duplicate()));
        log.debug(`Pushed ${log.console.NUM_MSG(items.length)} obstacles to ${this.determineName()}`);
        return this.length;
    }

    toJSON() {
        return this.map(o => o.toJSON());
    }

    constructor(fake: boolean = false, ...items: Obstacle[]) {
        super(...items);
        this.fake = fake;
    }
}

export class Obstacle extends BaseObject implements IObstacleData {
    public static readonly LINEINDEX = LineIndex;
    public static readonly LINELAYER = LineLayer;

    private d: number = 0;
    private w: number = 1;
    private h: 1 | 2 | 3 | 4 | 5 = 1;
    protected declare customData?: ObstacleCustomData;

    set Duration(d: number) { this.d = d; }
    set Width(w: number) { this.w = w; }
    set Height(h: 1 | 2 | 3 | 4 | 5) { this.h = h; }
    set CustomData(customData: IObstacleCustomData) { this.customData = new ObstacleCustomData(customData); }
    set Animation(animation: Partial<IPathAnimationData>) {
        this.ifUndefinedNewCustomData();
        
        (this.customData as ObstacleCustomData).Animation = new ObjectAnimationData(animation);
    }

    get Duration(): number { return this.d; }
    get Width(): number { return this.w; }
    get Height(): 1 | 2 | 3 | 4 | 5 { return this.h; }
    get CustomData(): ObstacleCustomData {
        this.ifUndefinedNewCustomData();

        return this.customData as ObstacleCustomData;
    }
    get Animation(): Partial<IPathAnimationData> {
        this.ifUndefinedNewCustomData();
        
        return (this.customData as ObstacleCustomData).Animation 
    }

    private ifUndefinedNewCustomData(): void {
        if (this.customData === undefined) this.customData = new ObstacleCustomData();
    }

    constructor(vanillaData: IObstacleData = {} as IObstacleData, customData?: IObstacleCustomData) {
        super(vanillaData.Beat, vanillaData.X, vanillaData.Y);
        
        this.d = vanillaData.Duration ?? 0;
        this.w = vanillaData.Width ?? 1;
        this.h = vanillaData.Height ?? 1;
        
        customData && (this.customData = new ObstacleCustomData(customData));
    }

    public toJSON() {
        const json: Record<string, any> = {};

        json.b = this.b;
        json.d = this.d;
        json.x = this.x;
        json.y = this.y;
        json.w = this.w;
        json.h = this.h;

        if (this.customData !== undefined) json.customData = this.customData.toJSON();

        return json;
    }

    public static fromJSON(...json: Record<string, any>[]): Obstacle[] {
        const obstacles: Obstacle[] = [];
        json.forEach(w => {
            const obstacle = new Obstacle()
            obstacle.Beat = w.b;
            obstacle.Duration = w.d;
            obstacle.X = w.x;
            obstacle.Y = w.y;
            obstacle.Width = w.w;
            obstacle.Height = w.h;
            w.customData && (obstacle.CustomData = ObstacleCustomData.fromJSON(w.customData));
            obstacles.push(obstacle);
        });
        return obstacles;
    }
    
    public SetCustomData(customData?: IObstacleCustomData): void {
        this.customData = new ObstacleCustomData(customData);
    }

    public ClearAllEmptyData() : void {
        if (this.customData?.Animation) this.customData.deleteAnimation();
        this.customData?.isEmpty() && (this.customData = undefined);
    }

    public AddTrack(...tracks: string[]): void {
        if (Array.isArray(this.CustomData.Track)) {
            this.CustomData.Track.push(...tracks);
            return;
        }

        if (typeof this.CustomData.Track === "string") {
            this.CustomData.Track = [this.CustomData.Track, ...tracks];
            return;
        }
        
        if (this.CustomData.Track === undefined) {
            this.CustomData.Track = tracks;
            return;
        }
    }
    
    public Duplicate = () : Obstacle => { 
        const wall = new Obstacle()
        wall.Beat = this.Beat;
        wall.Duration = this.Duration;
        wall.X = this.X;
        wall.Y = this.Y;
        wall.Width = this.Width;
        wall.Height = this.Height;
        wall.SetCustomData(this.customData);
        return wall;
    }
}