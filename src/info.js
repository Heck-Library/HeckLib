import { readFileSync } from 'fs'
const Info = require('../Info.dat')


export class Settings {
    constructor(diff) {
        this.d = JSON.parse(readFileSync('Info.dat'));

        this.d._difficultyBeatmapSets = "expert"
    }
}