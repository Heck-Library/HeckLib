import { AnyAnimation } from "../../util/vec";

export class PointDefinition {
    private name: string;
    private animation: AnyAnimation;

    get Name(): string { return this.name; }
    get Animation(): AnyAnimation { return this.animation; }

    set Name(name: string) { this.name = name; }
    set Animation(animation: AnyAnimation) { this.animation = animation; }

    constructor(name?: string, animation?: AnyAnimation) {
        this.name = name ?? "";
        this.animation = animation ?? [];
    }

    private static deepEqual(a: any, b: any): boolean {
        if (a === b) return true;
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length) return false;
            return a.every((item, index) => PointDefinition.deepEqual(item, b[index]));
        }
        if (typeof a === "object" && typeof b === "object" && a !== null && b !== null) {
            const keysA = Object.keys(a);
            const keysB = Object.keys(b);
            if (keysA.length !== keysB.length) return false;
            return keysA.every(key => PointDefinition.deepEqual(a[key], b[key]));
        }
        return false;
    }
}

