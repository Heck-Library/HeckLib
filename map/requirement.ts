import { readFileSync, writeFileSync } from "fs";
import IInfo from "../interfaces/info/info";
import { activeOutput } from "./initialize";

export default function setRequirements(reqs: string[]): void {
    const INFO_FILE: IInfo = JSON.parse(readFileSync("Info.dat", 'utf-8'));
    if (INFO_FILE._difficultyBeatmapSets) INFO_FILE._difficultyBeatmapSets.forEach((set) => {
        if (activeOutput.includes(set._beatmapCharacteristicName)) {
            set._difficultyBeatmaps.forEach((diff) => {
                if (activeOutput.includes(diff._difficulty)) {
                    diff._customData._requirements = reqs;
                }
            });
        }
    });
    writeFileSync("Info.dat", JSON.stringify(INFO_FILE, null, 4));
}