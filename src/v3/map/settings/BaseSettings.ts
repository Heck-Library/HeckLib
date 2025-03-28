import { log } from "../../../util/logs";

export abstract class BaseSettings {
    private valueTypeColor(value: any): string {
        switch (typeof value) {
            case "boolean": return log.console.BOOL_MSG(value);
            case "number": return log.console.NUM_MSG(value);
            case "string": return log.console.STR_MSG(value);
            case "object": return log.console.OBJ_MSG(value.constructor.name);
            case "undefined": return log.console.RGBtoANSImsg(200, 20, 200, "undefined");
            default: return log.console.RGBtoANSImsg(255, 255, 255, value.toString());
        }
    }

    public toString(): string {
        if (Object.keys(this).length <= 0) return "";
        let str = '';
        Object.keys(this).forEach(key => {
            if ((this as Record<string, any>)[key] !== undefined) {
                str += `\n          ${log.console.FIELD_MSG(key.replace('_', ''))}: ${this.valueTypeColor((this as Record<string, any>)[key])}`;
            }
        });
        return str+'\n';
    }
}
