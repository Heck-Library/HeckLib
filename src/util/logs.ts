import { AnyVec } from "./vec";

export enum LogLevel {
    Trace,
    Debug,
    Info,
    Success,
    Warning,
    Error,
    Critical,
    None
}

function nullOutput() { }

const outputMapping = {
    [LogLevel.Trace]: {
        color: "\x1b[1;32m",
        output: console.log,
    },
    [LogLevel.Debug]: {
        color: "\x1b[1;35m",
        output: console.debug,
    },
    [LogLevel.Info]: {
        color: "\x1b[1;36m",
        output: console.info,
    },
    [LogLevel.Success]: {
        color: "\x1b[1;32m",
        output: console.log,
    },
    [LogLevel.Warning]: {
        color: "\x1b[38;2;255;180;0;1m",
        output: console.warn,
    },
    [LogLevel.Error]: {
        color: "\x1b[1;31m",
        output: console.error,
    },
    [LogLevel.Critical]: {
        color: "\x1b[38;2;255;0;255;1m",
        output: console.error,
    },
    [LogLevel.None]: {
        color: "",
        output: nullOutput,
    },
}

interface LogExtra {
    StartTime: number;
}

function RGBtoANSI(r: number, g: number, b: number, ...additionalStyles: number[]): string {
    return `\x1b[38;2;${r};${g};${b}${additionalStyles.length > 0 ? `;${additionalStyles.join(";")}` : ""}m`;
}

function RGBtoANSIbg(r: number, g: number, b: number): string {
    return `\x1b[48;2;${r};${g};${b}m`;
}

function RGBtoANSImsg(r: number, g: number, b: number, message: string, ...additionalStyles: number[]): string {
    return RGBtoANSI(
        Math.round(r),
        Math.round(g),
        Math.round(b),
        ...additionalStyles
    )
    + message
    + "\x1b[0m";
}

export class Logger {
    public readonly console = {
        RGBtoANSI,
        RGBtoANSIbg,
        RGBtoANSImsg,

        FILE_MSG(msg: string) { return "\x1b[1;34m" + msg + "\x1b[0m" },
        NUM_MSG(msg: string | number) { return `\x1b[38;2;0;169;255;3;1m${msg}\x1b[0m` },
        STR_MSG(msg: string) { return `\x1b[38;2;255;255;255;3;1m"${msg}"\x1b[0m` },
        OBJ_MSG(msg: string) { return `\x1b[38;2;200;20;255;3;1m${msg}\x1b[0m` },
        CLASS_MSG(msg: string) { return `\x1b[38;2;255;150;0;3;1m${msg}\x1b[0m` },
        FIELD_MSG(msg: string) { return `\x1b[38;2;255;216;0;3;1m${msg}\x1b[0m` },
        BOOL_MSG(bool: boolean) { return bool ? "\x1b[38;2;50;220;50;3;1mtrue\x1b[0m" : "\x1b[38;2;255;50;50;3;1mfalse\x1b[0m" },
        TRUE: "\x1b[38;2;50;220;50;3;1mtrue\x1b[0m",
        FALSE: "\x1b[38;2;255;50;50;3;1mfalse\x1b[0m",
        TIME_MSG(start: number) { return "\x1b[1;4;37m[" + (performance.now() - start).toFixed(3) + "ms]\x1b[0m" },
        ERROR_MSG(msg: string) { return "\x1b[1;31m[ERROR] \x1b[0;31m" + msg + "\x1b[0m" },
    }

    logLevel: LogLevel = LogLevel.Info;

    private logBuffer: string[] = [];
    
    public displayLogo(heck: [number, number, number], lib: [number, number, number]): void {
        log.pushToLogBuffer(
            log.console.RGBtoANSImsg(255, 255, 255, `\n ======================================================= `),
            log.console.RGBtoANSImsg(heck[0], heck[1], heck[2], "  __  __                 __      ") + log.console.RGBtoANSImsg(lib[0], lib[1], lib[2], "__           __        "),
            log.console.RGBtoANSImsg(heck[0], heck[1], heck[2], " /\\ \\/\\ \\               /\\ \\  _ ") + log.console.RGBtoANSImsg(lib[0], lib[1], lib[2], "/\\ \\       __/\\ \\       "),
            log.console.RGBtoANSImsg(heck[0], heck[1], heck[2], " \\ \\ \\_\\ \\     __    ___\\ \\ \\/ \\") + log.console.RGBtoANSImsg(lib[0], lib[1], lib[2], "\\ \\ \\     /\\_\\ \\ \\____  "),
            log.console.RGBtoANSImsg(heck[0], heck[1], heck[2], "  \\ \\  _  \\  / __ \\ / ___\\ \\   < ") + log.console.RGBtoANSImsg(lib[0], lib[1], lib[2], "\\ \\ \\    \\/\\ \\ \\  __ \\ "),
            log.console.RGBtoANSImsg(heck[0], heck[1], heck[2], "   \\ \\ \\ \\ \\/\\  __//\\ \\__/\\ \\ \\\\ \\") + log.console.RGBtoANSImsg(lib[0], lib[1], lib[2], "\\ \\ \\____\\ \\ \\ \\ \\_\\ \\"),
            log.console.RGBtoANSImsg(heck[0], heck[1], heck[2], "    \\ \\_\\ \\_\\ \\____\\ \\____\\\\ \\_\\ \\_") + log.console.RGBtoANSImsg(lib[0], lib[1], lib[2], "\\ \\____/ \\ \\_\\ \\____/"),
            log.console.RGBtoANSImsg(heck[0], heck[1], heck[2], "     \\/_/\\/_/\\/____/\\/____/ \\/_/\\/_/") + log.console.RGBtoANSImsg(lib[0], lib[1], lib[2], "\\/___/   \\/_/\\/___/ "),
            log.console.RGBtoANSImsg(255, 255, 255, "\n ======================================================= ")
        );
    }

    public pushToLogBuffer(...message: string[]) {
        this.logBuffer.push(...message);
    }

    public printLogBuffer() {
        if (this.logBuffer.length > 0) {
            console.log(this.logBuffer.join("\n"));
            this.logBuffer = [];
        }
    }

    private logCore(message: string, logLevel: LogLevel, logExtra?: Partial<LogExtra>) {
        if (this.logLevel > logLevel) {
            return;
        }

        const config = outputMapping[logLevel];
        const tag = LogLevel[logLevel].toUpperCase();

        let finalMessage = ` ${config.color}[${tag}]${logLevel < LogLevel.Error ? "\x1b[0m" : ""} ${message}`;

        if (logExtra !== undefined) {
            if (logExtra.StartTime === undefined) logExtra.StartTime = performance.now();

            const deltaTime = (performance.now() - logExtra.StartTime).toFixed(3)
            finalMessage += ` in: \x1b[1;4;37m[${deltaTime}ms]`;
        }

        finalMessage += "\x1b[0m";

        if (logLevel >= LogLevel.Success) {
            finalMessage += "\n";
        }

        if (logLevel >= LogLevel.Error) {
            config.output(finalMessage);
        }
        else {
            this.pushToLogBuffer(finalMessage);
        }
    }

    protected determineFieldColor(name: string, type: string): string {
        switch (type) {
            case "object": return this.console.OBJ_MSG(name);
            case "custom": return this.console.OBJ_MSG(name);
            default: return this.console.FIELD_MSG(name);
        }
    }

    determineLogColorMessage(value: any, type: string): string {
        switch (type) {
            case "boolean":
                return this.console.BOOL_MSG(value);
            case "number":
                return this.console.NUM_MSG(value);
            case "string":
                return this.console.STR_MSG(value);
            case "object":
                let json = JSON.stringify(value, null, 1);
                let strings = json.replaceAll(/\{|\}/g, '').split('\n')
                strings.forEach((line, i) => {
                    const key = line.replace(/^.*"(.*)".*$/g, '$1');
                    strings[i] = "       " + strings[i]
                        .replace(/"_(.*)":/, `  ${this.console.FIELD_MSG('$1')}:`)
                        .replace(/: ?(.*)/, `: ${this.determineLogColorMessage('$1', typeof value[key])}`)
                        .replaceAll(/,/g, '');
                });
                return strings.join('\n').replaceAll(/\{|\}|\n.*?$/g, '') + '\n';
            case "undefined":
                return RGBtoANSImsg(200, 20, 200, "undefined");
            case "array":
                if (typeof value[0] === "number")
                    return this.console.NUM_MSG(value.toString());
                if (typeof value[0] === "string") return JSON.stringify(value, null, 10)
                    .replaceAll(/\[|\]|("),/g, "$1")
                    .replaceAll(/"(.*)"/g, this.console.STR_MSG("$1"))
                    .replace(/\n.*?$/, '\n');

                break;
            case "color":
                return this.vecToColorString(value);
            case "custom":
                return value.toString();
        }
        return value + type;
    }

    vecToColorString(vec: AnyVec): string {
        const v = this.vecToColor(vec);
        const c: number[] = [];
        const highest: number = Math.max(...v);

        c.push(...v);

        if (highest === 0) return RGBtoANSIbg(0, 0, 0) + '  \x1b[0m (0, 0, 0, 0)';

        if (highest > 1) {
            c[0] = v[0] / highest;
            c[1] = v[1] / highest;
            c[2] = v[2] / highest;
            c[3] = v[3] / highest;
        }

        return RGBtoANSIbg(Math.floor(c[0] * 255), Math.floor(c[1] * 255), Math.floor(c[2] * 255)) + '  \x1b[0m ('
            + RGBtoANSImsg(255, 0, 0, v[0].toString(), 1, 3) + ', '
            + RGBtoANSImsg(0, 255, 0, v[1].toString(), 1, 3) + ', '
            + RGBtoANSImsg(0, 0, 255, v[2].toString(), 1, 3) + ', '
            + RGBtoANSImsg(255, 255, 255, v[3].toString(), 1, 3);
    }

    vecToColor(vec: AnyVec = [0]): [number, number, number, number] {
        switch (vec.length) {
            case 1: return [vec[0], vec[0], vec[0], 1] as [number, number, number, number];
            case 2: return [vec[0], vec[1], 0, 1] as [number, number, number, number];
            case 3: return [vec[0], vec[1], vec[2], 1] as [number, number, number, number];
            case 4: return vec as [number, number, number, number];
            default: return [0, 0, 0, 1];
        }
    }

    change(parent: string, field: string, value: any, typeOverride?: string, fieldTypeOverride: "object" | "custom" = "object", intended = true) {
        const type = typeOverride || typeof value;
        this.info(
            this.console.CLASS_MSG(parent)
            + this.determineFieldColor('.' + field, fieldTypeOverride)
            + (intended ? '' : '\x1b[33m')
            + " set to: "
            + this.determineLogColorMessage(value, type)
        );
    }

    success(message: string, logExtra?: Partial<LogExtra>) {
        this.logCore(message, LogLevel.Success, logExtra);
    }

    trace(message: string, logExtra?: Partial<LogExtra>) {
        this.logCore(message, LogLevel.Trace, logExtra);
    }

    debug(message: string, logExtra?: Partial<LogExtra>) {
        this.logCore(message, LogLevel.Debug, logExtra);
    }

    info(message: string, logExtra?: Partial<LogExtra>) {
        this.logCore(message, LogLevel.Info, logExtra);
    }

    warning(message: string, logExtra?: Partial<LogExtra>) {
        this.logCore(message, LogLevel.Warning, logExtra);
    }

    error(message: string, logExtra?: Partial<LogExtra>) {
        this.logCore(message, LogLevel.Error, logExtra);
    }

    critical(message: string, logExtra?: Partial<LogExtra>) {
        this.logCore(message, LogLevel.Critical, logExtra);
    }

}

const log = new Logger();

export { log };