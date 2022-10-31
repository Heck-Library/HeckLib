import { activeOutput } from "./mapHandler.ts";

// deno-lint-ignore-file no-explicit-any prefer-const no-explicit-any
export let scuffedWallsInUse = false;
export const __dirname = new URL('.', import.meta.url).pathname.slice(1).replace(/\//g, "\\").replace(/src\\/g, "");

class swJSON {
    sw: {
        HideMapInRPC: true,
        MapFolderPath: string,
        SWFilePath: string,
        InfoPath: string
        MapFilePath: string
        OldMapPath: string
        ClearConsoleOnRefresh: true,
        IsAutoImportEnabled: true,
        IsBackupEnabled: true,
        Debug: false,
        IsAutoSimplifyPointDefinitionsEnabled: true,
        PrettyPrintJson: boolean,
        BackupPaths: {
            BackupFolderPath: string
            BackupSWFolderPath: string
            BackupMAPFolderPath: string
        }
    }
    constructor(diffName: string) {
        this.sw = {
            HideMapInRPC: true,
            MapFolderPath: __dirname + "temp",
            SWFilePath: `${__dirname}temp\\swTemp.sw`,
            InfoPath: __dirname + 'temp\\Info.dat',
            MapFilePath: `${__dirname}temp\\tempOut.dat`,
            OldMapPath: `${__dirname}temp\\temp.dat`,
            ClearConsoleOnRefresh: true,
            IsAutoImportEnabled: true,
            IsBackupEnabled: true,
            Debug: false,
            IsAutoSimplifyPointDefinitionsEnabled: true,
            PrettyPrintJson: true,
            BackupPaths: {
                BackupFolderPath: `${__dirname}temp\\${diffName.slice(0, -4)}Backup`,
                BackupSWFolderPath: `${__dirname}temp\\${diffName.slice(0, -4)}Backup\\` + 'SW_History',
                BackupMAPFolderPath: `${__dirname}temp\\${diffName.slice(0, -4)}Backup\\` + 'Map_History'
            }
        }
    }
}

export function isPresent(x: any) {
    if (typeof x !== 'undefined' && x !== null) return true;
    return false;
}

export function scuffedWalls(enabled: boolean, diffName: string) {
    scuffedWallsInUse = enabled;
    const thing = JSON.stringify({_version: "2.2.0", _notes: [],_obstacles: [],_events: []}, null, 4);
    Deno.writeTextFileSync('./temp/temp.dat', thing)

    const swData = new swJSON(diffName)
    Deno.writeTextFileSync('./temp/swTemp.sw',
        "Workspace\n\n" +
        "0: Import\n" +
        "   Path:temp.dat"
    )
    Deno.writeTextFileSync('./ScuffedWalls.json', JSON.stringify(swData.sw, null, 2))

    const info = JSON.parse(Deno.readTextFileSync('./Info.dat'))
    info._difficultyBeatmapSets[0]._difficultyBeatmaps._beatmapFilename = "tempOut.dat"
        console.log(info._difficultyBeatmapSets)
    Deno.writeTextFileSync('./temp/Info.dat', JSON.stringify(info, null, 4))
}

export function isArr (x: any) {
    if (Array.isArray(x)) {
        return true;
    } else return false;
}

export function HSVtoRGB(h: any, s: number, v: number) {
    let r: number, g: number, b: number, i: number, f: number, p: number, q: number, t: number;
    if (arguments.length === 1) {
        (s = h.s), (v = h.v), (h = h.h);
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            (r = v), (g = t), (b = p);
            break;
        case 1:
            (r = q), (g = v), (b = p);
            break;
        case 2:
            (r = p), (g = v), (b = t);
            break;
        case 3:
            (r = p), (g = q), (b = v);
            break;
        case 4:
            (r = t), (g = p), (b = v);
            break;
        case 5:
            (r = v), (g = p), (b = q);
            break;
        default:
            throw new Error("Error in HSVtoRGB")
    }
    return [r, g, b];
}

export function random(min: number, max: number, precision: number | null) {
    let p = 10;
    if (typeof precision !== 'undefined' && precision !== null) {
        p = Math.pow(p, precision);
    }
    return (Math.floor(Math.random() * (max - min + 1) * p ) + min)/p;
}