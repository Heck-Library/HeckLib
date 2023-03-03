import { readFileSync } from "fs";


export const infoFile = JSON.parse(readFileSync('Info.dat', 'utf-8'));