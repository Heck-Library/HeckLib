// deno-lint-ignore-file no-explicit-any
import * as fs from 'fs'
import { infoFile } from '../consts/info';


export default class Requirement {
    private r : string[];
    private f : string;
    /**
     * Sets the required mods for the map.
     * @param filename Set this as your OUTPUT difficulty name.
     */
    constructor(filename : string) {
        this.r = [];
        this.f = filename;
        infoFile._difficultyBeatmapSets.forEach((x : any) => {
            if (this.f.includes(x._beatmapCharacteristicName)) {
                x._difficultyBeatmaps.forEach((y : any) => {
                    if (y._beatmapFilename.includes(this.f)) {
                        if (!y._customData) 
                            y._customData = {};
                        
                    }
                });
            }
        });
        fs.writeFileSync("Info.dat", JSON.stringify(infoFile, null, 4));
    }
    /**
   * Adds Noodle Extensions as a requirement to the map.
   */
    noodle() {
        this.r.push("Noodle Extensions");
        this.End();
        return this;
    }
    /**
   * Adds Chroma as a requirement to the map.
   */
    chroma() {
        this.r.push("Chroma");
        this.End();
        return this;
    }
    /**
   * Adds Cinema as a requirement to the map.
   */
    cinema() {
        this.r.push("Cinema");
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
                        
                        y._customData._requirements = this.r;
                    }
                });
            }
        });
    
    fs.writeFileSync("Info.dat", JSON.stringify(infoFile, null, 4));
}}
