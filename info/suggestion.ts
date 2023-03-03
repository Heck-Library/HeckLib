// deno-lint-ignore-file no-explicit-any
import {readFileSync, writeFileSync} from 'fs'
import {infoFile} from '../consts/info';
/**
 * Adds suggestions to the map
 */
export default class Suggestion {
    s : string[];
    f : string;

    constructor(filename : string) {
        this.s = [];
        this.f = filename;
    }
    /**
     * Adds Chroma as a suggestion to the map.
     */
    chroma() {
        this.s.push("Chroma");
        this.End();
        return this;
    }
    /**
     * Adds Cinema as a suggestion to the map.
     */
    cinema() {
        this.s.push("Cinema");
        this.End();
        return this;
    }
    private End() {
        infoFile._difficultyBeatmapSets.forEach((x : any) => {
            if (this.f.includes(x._beatmapCharacteristicName)) {
                x._difficultyBeatmaps.forEach((y : any) => {
                    if (y._beatmapFilename.includes(this.f)) {
                        if (!y._customData) 
                            y._customData = {};
                        

                        y._customData._suggestions = this.s;
                    }
                });
            }
        });

        writeFileSync("Info.dat", JSON.stringify(infoFile, null, 4));
    }
}
