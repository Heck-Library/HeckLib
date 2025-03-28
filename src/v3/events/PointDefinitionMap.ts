import { log } from "../../util/logs";
import { AnyAnimation } from "../../util/vec";

export class PointDefinitionMap extends Map<string, AnyAnimation> {
    public addFromJSON(pointDefinitions: Record<string, AnyAnimation>): void {
        for (const [key, value] of Object.entries(pointDefinitions)) {
            this.set(key, value);
        }
    }

    public addFromArray(...pointDefinitions: { name: string, points: AnyAnimation }[]): void {
        try {
            for (const {name, points} of pointDefinitions) this.set(name, points);
        } catch(e) {
            log.error(`Failed to add array to ${log.console.CLASS_MSG("PointDefinitions")}: ${e}`);
        }
    }

    public getKeys(): string[] {
        try {
            return Array.from(this.keys());
        } catch (e) {
            log.error(`Failed to get keys from ${log.console.CLASS_MSG("PointDefinitions")}: ${e}`);
            return [];
        }
    }

    public isEmpty(): boolean {
        return this.size === 0;
    }
}