// deno-lint-ignore-file no-explicit-any
import { parse } from "https://deno.land/x/xml@2.0.4/mod.ts";
import { isPresent } from "./general.ts";
import { vec3, vec4, vec4anim } from "./types.ts";
const letters: any = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
    g: [],
    h: [],
    i: [],
    j: [],
    k: [],
    l: [],
    m: [],
    n: [],
    o: [],
    p: [],
    q: [],
    r: [],
    s: [],
    t: [],
    u: [],
    v: [],
    w: [],
    x: [],
    y: [],
    z: [],
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    H: [],
    I: [],
    J: [],
    K: [],
    L: [],
    M: [],
    N: [],
    O: [],
    P: [],
    Q: [],
    R: [],
    S: [],
    T: [],
    U: [],
    V: [],
    W: [],
    X: [],
    Y: [],
    Z: [],
    questionmark: [],
    exclamation: [],
    period: []
};

export function parseModel(filePath: string) {
    const xml = parse(Deno.readTextFileSync(filePath))
    const deez = [...filePath];
    const fileName = deez.splice(9).join("").toString().slice(0, 4);
    const json = JSON.parse(JSON.stringify(xml.COLLADA));
    if (json.library_visual_scenes.visual_scene.node !== null) {
        const node = json.library_visual_scenes.visual_scene.node;
        node.filter((x: any) => isPresent(x.instance_geometry?.bind_material?.technique_common?.instance_material)).forEach((y: any) => {   
            const matArray = [...y.instance_geometry.bind_material.technique_common.instance_material['@symbol']];
            matArray.splice(-9, 9)
            matArray.splice(0, 7)
            const matName = matArray.join("");
    
            Object.keys(letters).forEach(z => {
                if (z == matName) {
                    letters[z].push(y);
                }
            })
        });
    }
    Deno.writeTextFileSync(`./models/parsed/${fileName}.json`, JSON.stringify(letters, null, 4))
}

export function parseLetter(letter: string, fontDir: string) {
    letter = JSON.parse(Deno.readTextFileSync(fontDir))[letter];
    let coords = [...letter];
    const deez: any[] = [];
    coords.forEach((x: any) => {
        deez.push(x.matrix["#text"]);
    })
    deez.forEach((x: string) => {
        coords = x.split(" ")
        deez.push(coords)
    });
    deez.splice(0, deez.length / 2)
    const xPos: number[] = [];
    const yPos: number[] = [];
    const zPos: number[] = [];
    deez.forEach((x: any) => {
        xPos.push(Math.abs(x[0] - x[3]))
        yPos.push(Math.abs(x[1] - x[4]))
        zPos.push(Math.abs(x[2] - x[5]))
    })
    return [xPos, yPos, zPos];
}

export class Text {
    t: {
        time: number,
        text: string,
        path: string,
        color: vec4,
        pos: vec3,
        size: number,
        duration: number,
        animatePos?: vec4anim,
        outline?: number
    }
    constructor(time: number) {
        this.t = {
            time: time,
            text: "defaultText",
            path: "./models/font.dae",
            color: [1, 1, 1, -69],
            pos: [0, 0, 0],
            size: 1,
            duration: 4
        }
    }
    text(x: string) { this.t.text = x; return this; }
    path(x: string) { this.t.path = x; return this; }
    color(x: vec4) { this.t.color = x; return this; }
    pos(x: vec3) { this.t.pos = x; return this; }
    size(x: number) { this.t.size = x; return this; }
    duration(x: number) { this.t.duration = x; return this; }
    defPos(x: vec4anim) { this.t.animatePos = x; return this; }
    outline(x: number) { this.t.outline = x; return this; }
}