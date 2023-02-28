// deno-lint-ignore-file no-explicit-any
import * as fs from 'fs'
let infoFile: Record<string, any>;


/**
 * Adds requirements to the map
 */
export default class Requirement {
  r: string[];
  f: string;

  constructor(filename: string) {
    this.r = [];
    this.f = filename;
    infoFile._difficultyBeatmapSets.forEach((x: any) => {
      if (this.f.includes(x._beatmapCharacteristicName)) {
        x._difficultyBeatmaps.forEach((y: any) => {
          if (y._beatmapFilename.includes(this.f)) {
            if (!y._customData) y._customData = {};
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
    try {
        infoFile = JSON.parse(fs.readFileSync("Info.dat", 'utf-8'));
    } catch {
        console.warn("Reading Info.dat failed");
    }
    infoFile._difficultyBeatmapSets.forEach((x: any) => {
      if (this.f.includes(x._beatmapCharacteristicName)) {
        x._difficultyBeatmaps.forEach((y: any) => {
          if (y._beatmapFilename.includes(this.f)) {
            if (!y._customData) y._customData = {};
            y._customData._requirements = this.r;
          }
        });
      }
    });
    fs.writeFileSync("Info.dat", JSON.stringify(infoFile, null, 4));
  }
}